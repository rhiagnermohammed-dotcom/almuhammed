import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  I18nManager,
} from 'react-native';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

interface PrayerCardProps {
  prayerTimes: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  nextPrayer: { name: string; nameAr: string; time: string; remaining: string };
}

const PRAYERS = [
  { key: 'fajr', nameAr: 'الفجر', icon: '🌙' },
  { key: 'sunrise', nameAr: 'الشروق', icon: '🌅' },
  { key: 'dhuhr', nameAr: 'الظهر', icon: '☀️' },
  { key: 'asr', nameAr: 'العصر', icon: '🌤' },
  { key: 'maghrib', nameAr: 'المغرب', icon: '🌇' },
  { key: 'isha', nameAr: 'العشاء', icon: '🌑' },
] as const;

const PrayerCard: React.FC<PrayerCardProps> = ({ prayerTimes, nextPrayer }) => {
  return (
    <View style={styles.container}>
      {/* Gradient-like layered background */}
      <View style={styles.bgLayer1} />
      <View style={styles.bgLayer2} />

      {/* Decorative pattern overlay */}
      <View style={styles.patternOverlay}>
        <Text style={styles.patternText}>﷽</Text>
      </View>

      {/* Next Prayer Section */}
      <View style={styles.nextPrayerSection}>
        <Text style={styles.nextPrayerLabel}>الصلاة القادمة</Text>
        <Text style={styles.nextPrayerName}>{nextPrayer.nameAr}</Text>
        <View style={styles.countdownContainer}>
          <View style={styles.countdownBadge}>
            <Text style={styles.countdownText}>{nextPrayer.remaining}</Text>
          </View>
        </View>
        <Text style={styles.nextPrayerTime}>{nextPrayer.time}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* All Prayers Row */}
      <View style={styles.prayersRow}>
        {PRAYERS.map((prayer) => {
          const isNext = prayer.key === nextPrayer.name;
          return (
            <View
              key={prayer.key}
              style={[
                styles.prayerItem,
                isNext && styles.prayerItemActive,
              ]}
            >
              <Text style={styles.prayerIcon}>{prayer.icon}</Text>
              <Text
                style={[
                  styles.prayerName,
                  isNext && styles.prayerNameActive,
                ]}
              >
                {prayer.nameAr}
              </Text>
              <Text
                style={[
                  styles.prayerTime,
                  isNext && styles.prayerTimeActive,
                ]}
              >
                {prayerTimes[prayer.key]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 8,
    shadowColor: '#0D7C3D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    position: 'relative',
  },
  bgLayer1: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0D7C3D',
  },
  bgLayer2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0A5C2E',
    opacity: 0.6,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 200,
  },
  patternOverlay: {
    position: 'absolute',
    top: -20,
    right: -10,
    opacity: 0.08,
  },
  patternText: {
    fontSize: 120,
    color: '#FFFFFF',
  },
  nextPrayerSection: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  nextPrayerLabel: {
    fontSize: 14,
    color: '#B8E6C8',
    fontWeight: '500',
    letterSpacing: 1,
  },
  nextPrayerName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  countdownContainer: {
    marginTop: 12,
  },
  countdownBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  countdownText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 2,
  },
  nextPrayerTime: {
    fontSize: 16,
    color: '#D4F0DD',
    marginTop: 8,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 20,
  },
  prayersRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  prayerItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 12,
    minWidth: 50,
  },
  prayerItemActive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.4)',
  },
  prayerIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  prayerName: {
    fontSize: 11,
    color: '#B8E6C8',
    fontWeight: '500',
    marginBottom: 2,
  },
  prayerNameActive: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  prayerTime: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  prayerTimeActive: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});

export default PrayerCard;
