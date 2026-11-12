import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import PrayerCard from '../components/PrayerCard';
import TasbeehCard from '../components/TasbeehCard';
import { calculatePrayerTimes, getNextPrayer, CalculationMethod } from '../services/prayerTimes';

interface HomeScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Default Cairo coordinates: 30.0444, 31.2357
  const prayerTimes = calculatePrayerTimes(currentTime, {
    latitude: 30.0444,
    longitude: 31.2357,
    method: CalculationMethod.Egypt,
    asrJuristic: 0,
  });

  const nextPrayer = getNextPrayer(prayerTimes);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setCurrentTime(new Date());
    setTimeout(() => setRefreshing(false), 500);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Top Banner / Greeting */}
      <View style={styles.heroBanner}>
        <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
        <Text style={styles.appTitle}>تطبيق المحمد</Text>
        <Text style={styles.dateText}>
          {currentTime.toLocaleDateString('ar-EG', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </View>

      {/* Prayer Times Card */}
      <PrayerCard prayerTimes={prayerTimes} nextPrayer={nextPrayer} />

      {/* Quick Access Grid */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>الوصول السريع</Text>
      </View>
      <View style={styles.quickGrid}>
        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: '#1B5E20' }]}
          onPress={() => onNavigate('surah', { surahNumber: 18, surahName: 'الكهف' })}
        >
          <Text style={styles.quickIcon}>📖</Text>
          <Text style={styles.quickTitle}>سورة الكهف</Text>
          <Text style={styles.quickSubtitle}>نور ما بين الجمعتين</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: '#B78103' }]}
          onPress={() => onNavigate('azkar-detail', { categoryId: 'morning' })}
        >
          <Text style={styles.quickIcon}>☀️</Text>
          <Text style={styles.quickTitle}>أذكار الصباح</Text>
          <Text style={styles.quickSubtitle}>تحصين ويوم مبارك</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: '#1A365D' }]}
          onPress={() => onNavigate('azkar-detail', { categoryId: 'evening' })}
        >
          <Text style={styles.quickIcon}>🌙</Text>
          <Text style={styles.quickTitle}>أذكار المساء</Text>
          <Text style={styles.quickSubtitle}>حفظ وسكينة</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickCard, { backgroundColor: '#2C7A7B' }]}
          onPress={() => onNavigate('qibla')}
        >
          <Text style={styles.quickIcon}>🧭</Text>
          <Text style={styles.quickTitle}>اتجاه القبلة</Text>
          <Text style={styles.quickSubtitle}>تحديد دقيق للكعبة</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Ayah Card */}
      <View style={styles.quoteCard}>
        <View style={styles.quoteBadge}>
          <Text style={styles.quoteBadgeText}>آية اليوم</Text>
        </View>
        <Text style={styles.quoteArabic}>
          ﴿ وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ﴾
        </Text>
        <Text style={styles.quoteRef}>سورة البقرة - الآية ١٨٦</Text>
      </View>

      {/* Digital Tasbeeh */}
      <TasbeehCard />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingBottom: 24,
  },
  heroBanner: {
    backgroundColor: '#1B5E20',
    paddingTop: 16,
    paddingBottom: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  bismillah: {
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: '600',
    marginBottom: 4,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 4,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'right',
  },
  quickGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    justifyContent: 'space-between',
  },
  quickCard: {
    width: '48%',
    borderRadius: 16,
    padding: 14,
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  quickTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  quickSubtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    textAlign: 'right',
  },
  quoteCard: {
    backgroundColor: '#FFFDF0',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3E5AB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  quoteBadge: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 10,
  },
  quoteBadgeText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  quoteArabic: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 28,
  },
  quoteRef: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen;
