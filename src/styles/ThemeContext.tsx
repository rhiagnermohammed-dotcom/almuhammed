/**
 * Theme Context for المحمد app.
 * Provides light/dark mode toggling with AsyncStorage persistence.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, type Theme } from './theme';

// ─── Constants ──────────────────────────────────────────────
const THEME_STORAGE_KEY = '@almuhammad_theme_mode';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  /** Current resolved theme colors */
  theme: Theme;
  /** Current theme mode setting */
  themeMode: ThemeMode;
  /** Whether the resolved theme is dark */
  isDark: boolean;
  /** Toggle between light and dark (ignores system) */
  toggleTheme: () => void;
  /** Set a specific theme mode */
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ─── Provider ───────────────────────────────────────────────
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted theme preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setThemeModeState(stored);
        }
      } catch (error) {
        // Silently fall back to system default
        console.warn('[ThemeContext] Failed to load theme preference:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadTheme();
  }, []);

  // Persist theme preference when it changes
  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.warn('[ThemeContext] Failed to save theme preference:', error);
    }
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setThemeMode(themeMode === 'dark' ? 'light' : themeMode === 'light' ? 'dark' : (systemColorScheme === 'dark' ? 'light' : 'dark'));
  }, [themeMode, systemColorScheme, setThemeMode]);

  // Resolve theme based on mode
  const isDark = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      themeMode,
      isDark,
      toggleTheme,
      setThemeMode,
    }),
    [theme, themeMode, isDark, toggleTheme, setThemeMode],
  );

  // Don't render children until we've loaded the persisted preference
  // to avoid a flash of the wrong theme.
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────

/**
 * Access the current theme and theme controls.
 *
 * @example
 * ```tsx
 * const { theme, isDark, toggleTheme } = useAppTheme();
 * return (
 *   <View style={{ backgroundColor: theme.background }}>
 *     <Text style={{ color: theme.textPrimary }}>مرحبا</Text>
 *     <Switch value={isDark} onValueChange={toggleTheme} />
 *   </View>
 * );
 * ```
 */
export function useAppTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useAppTheme must be used within a <ThemeProvider>. ' +
      'Wrap your app root with <ThemeProvider>.',
    );
  }
  return context;
}

export default ThemeContext;
