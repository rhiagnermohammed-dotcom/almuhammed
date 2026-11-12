import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
}) => {
  return (
    <View style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1B5E20" />
      <View style={styles.header}>
        {/* Left Action / Back button */}
        <View style={styles.actionSlot}>
          {showBack && onBack ? (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onBack}
              accessibilityLabel="رجوع"
            >
              <Text style={styles.actionIcon}>←</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Center Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {/* Right Action */}
        <View style={styles.actionSlot}>
          {rightAction ? (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={rightAction.onPress}
            >
              <Text style={styles.actionIcon}>{rightAction.icon}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#1B5E20',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 48,
  },
  header: {
    height: 56,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2E7D32',
  },
  actionSlot: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#D4AF37',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
});

export default Header;
