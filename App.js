import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import QuranScreen from './src/screens/QuranScreen';
import SurahDetailScreen from './src/screens/SurahDetailScreen';
import PrayerScreen from './src/screens/PrayerScreen';
import AzkarScreen from './src/screens/AzkarScreen';
import QiblaScreen from './src/screens/QiblaScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import Header from './src/components/Header';
import { surahList, SurahInfo } from './src/data/surahs';

type Tab = 'home' | 'quran' | 'prayer' | 'azkar' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [activeScreen, setActiveScreen] = useState<string>('tabs');
  const [selectedSurah, setSelectedSurah] = useState<SurahInfo | null>(null);
  const [azkarCategoryFilter, setAzkarCategoryFilter] = useState<string | undefined>(undefined);

  const handleNavigate = (screen: string, params?: any) => {
    if (screen === 'surah') {
      const s = surahList.find((item) => item.number === params?.surahNumber) || surahList[0];
      setSelectedSurah(s);
      setActiveScreen('surah');
    } else if (screen === 'qibla') {
      setActiveScreen('qibla');
    } else if (screen === 'azkar-detail') {
      setAzkarCategoryFilter(params?.categoryId);
      setActiveTab('azkar');
      setActiveScreen('tabs');
    } else if (screen === 'tabs') {
      setActiveScreen('tabs');
    }
  };

  const handleSelectSurahFromList = (surah: SurahInfo) => {
    setSelectedSurah(surah);
    setActiveScreen('surah');
  };

  // Render Stack Screen (Surah Detail or Qibla)
  if (activeScreen === 'surah' && selectedSurah) {
    return (
      <View style={styles.root}>
        <SurahDetailScreen
          surah={selectedSurah}
          onBack={() => setActiveScreen('tabs')}
        />
      </View>
    );
  }

  if (activeScreen === 'qibla') {
    return (
      <View style={styles.root}>
        <QiblaScreen onBack={() => setActiveScreen('tabs')} />
      </View>
    );
  }

  // Render Tabs
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1B5E20" />

      {/* Screen Header for non-home tabs */}
      {activeTab === 'quran' && (
        <Header title="القرآن الكريم" subtitle="١١٤ سورة مباركة" />
      )}
      {activeTab === 'prayer' && (
        <Header
          title="مواقيت الصلاة"
          subtitle="حساب فلكي دقيق حسب موقعك"
          rightAction={{
            icon: '🧭',
            onPress: () => setActiveScreen('qibla'),
          }}
        />
      )}
      {activeTab === 'azkar' && (
        <Header title="حصن المسلم" subtitle="الأذكار والأدعية اليومية" />
      )}
      {activeTab === 'settings' && (
        <Header title="الإعدادات" subtitle="تطبيق المحمد" />
      )}

      {/* Main Tab Screen Content */}
      <View style={styles.mainContainer}>
        {activeTab === 'home' && <HomeScreen onNavigate={handleNavigate} />}
        {activeTab === 'quran' && (
          <QuranScreen onSelectSurah={handleSelectSurahFromList} />
        )}
        {activeTab === 'prayer' && (
          <PrayerScreen onNavigateToQibla={() => setActiveScreen('qibla')} />
        )}
        {activeTab === 'azkar' && (
          <AzkarScreen initialCategoryId={azkarCategoryFilter} />
        )}
        {activeTab === 'settings' && <SettingsScreen />}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'home' && styles.activeTab]}
          onPress={() => {
            setActiveTab('home');
            setAzkarCategoryFilter(undefined);
          }}
        >
          <Text style={styles.tabIcon}>🏠</Text>
          <Text
            style={[
              styles.tabTitle,
              activeTab === 'home' && styles.activeTabTitle,
            ]}
          >
            الرئيسية
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'quran' && styles.activeTab]}
          onPress={() => setActiveTab('quran')}
        >
          <Text style={styles.tabIcon}>📖</Text>
          <Text
            style={[
              styles.tabTitle,
              activeTab === 'quran' && styles.activeTabTitle,
            ]}
          >
            القرآن
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'prayer' && styles.activeTab]}
          onPress={() => setActiveTab('prayer')}
        >
          <Text style={styles.tabIcon}>🕌</Text>
          <Text
            style={[
              styles.tabTitle,
              activeTab === 'prayer' && styles.activeTabTitle,
            ]}
          >
            الصلاة
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'azkar' && styles.activeTab]}
          onPress={() => {
            setAzkarCategoryFilter(undefined);
            setActiveTab('azkar');
          }}
        >
          <Text style={styles.tabIcon}>📿</Text>
          <Text
            style={[
              styles.tabTitle,
              activeTab === 'azkar' && styles.activeTabTitle,
            ]}
          >
            الأذكار
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Text style={styles.tabIcon}>⚙️</Text>
          <Text
            style={[
              styles.tabTitle,
              activeTab === 'settings' && styles.activeTabTitle,
            ]}
          >
            الإعدادات
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1B5E20',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  bottomBar: {
    height: Platform.OS === 'ios' ? 82 : 68,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row-reverse',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: Platform.OS === 'ios' ? 20 : 6,
    paddingTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  activeTab: {
    borderTopWidth: 3,
    borderTopColor: '#1B5E20',
    marginTop: -6,
    paddingTop: 7,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTabTitle: {
    color: '#1B5E20',
    fontWeight: '800',
  },
});
