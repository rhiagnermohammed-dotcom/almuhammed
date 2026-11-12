import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PrayerCard from '../components/PrayerCard';
import {
  calculatePrayerTimes,
  getNextPrayer,
  CalculationMethod,
  PrayerTimesConfig,
} from '../services/prayerTimes';

interface PrayerScreenProps {
  onNavigateToQibla: () => void;
}

const METHODS = [
  { id: CalculationMethod.Egypt, name: 'الهيئة المصرية العامة للمساحة' },
  { id: CalculationMethod.Makkah, name: 'أم القرى - مكة المكرمة' },
  { id: CalculationMethod.MWL, name: 'رابطة العالم الإسلامي' },
  { id: CalculationMethod.ISNA, name: 'الجمعية الإسلامية لأمريكا الشمالية' },
  { id: CalculationMethod.Karachi, name: 'جامعة العلوم الإسلامية بكراتشي' },
];

const PrayerScreen: React.FC<PrayerScreenProps> = ({ onNavigateToQibla }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMethod, setSelectedMethod] = useState<CalculationMethod>(
    CalculationMethod.Egypt
  );
  const [asrJuristic, setAsrJuristic] = useState<0 | 1>(0);

  const config: PrayerTimesConfig = {
    latitude: 30.0444, // Default Cairo
    longitude: 31.2357,
    method: selectedMethod,
    asrJuristic: asrJuristic,
  };

  const prayerTimes = calculatePrayerTimes(currentTime, config);
  const nextPrayer = getNextPrayer(prayerTimes);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const prayerRows = [
    { name: 'الفجر', time: prayerTimes.fajr, icon: '🌙', desc: 'صلاة الفجر' },
    { name: 'الشروق', time: prayerTimes.sunrise, icon: '🌅', desc: 'شروق الشمس' },
    { name: 'الظهر', time: prayerTimes.dhuhr, icon: '☀️', desc: 'صلاة الظهر' },
    { name: 'العصر', time: prayerTimes.asr, icon: '🌤', desc: 'صلاة العصر' },
    { name: 'المغرب', time: prayerTimes.maghrib, icon: '🌇', desc: 'صلاة المغرب' },
    { name: 'العشاء', time: prayerTimes.isha, icon: '🌑', desc: 'صلاة العشاء' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Prayer Card */}
      <PrayerCard prayerTimes={prayerTimes} nextPrayer={nextPrayer} />

      {/* Qibla Compass Button */}
      <TouchableOpacity style={styles.qiblaBanner} onPress={onNavigateToQibla}>
        <View style={styles.qiblaTextCol}>
          <Text style={styles.qiblaBannerTitle}>بوصلة القبلة الذكية</Text>
          <Text style={styles.qiblaBannerSub}>تحديد اتجاه الكعبة المشرفة بدقة</Text>
        </View>
        <Text style={styles.qiblaBannerIcon}>🧭</Text>
      </TouchableOpacity>

      {/* Full Prayer Times List */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>مواقيت اليوم بالتفصيل</Text>
        {prayerRows.map((item, index) => {
          const isNext = nextPrayer.nameAr === item.name;
          return (
            <View
              key={index}
              style={[
                styles.prayerRow,
                isNext && styles.prayerRowActive,
                index === prayerRows.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View style={styles.prayerTimeWrap}>
                <Text style={[styles.prayerTimeText, isNext && styles.activeTimeText]}>
                  {item.time}
                </Text>
              </View>

              <View style={styles.prayerNameWrap}>
                <Text style={[styles.prayerNameText, isNext && styles.activeNameText]}>
                  {item.name}
                </Text>
                <Text style={styles.prayerDescText}>{item.desc}</Text>
              </View>

              <Text style={styles.rowIcon}>{item.icon}</Text>
            </View>
          );
        })}
      </View>

      {/* Calculation Settings */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>طريقة الحساب الفلكي</Text>
        {METHODS.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[
              styles.methodOption,
              selectedMethod === m.id && styles.activeMethodOption,
            ]}
            onPress={() => setSelectedMethod(m.id)}
          >
            <View style={[styles.radioCircle, selectedMethod === m.id && styles.radioActive]}>
              {selectedMethod === m.id && <View style={styles.radioInner} />}
            </View>
            <Text
              style={[
                styles.methodNameText,
                selectedMethod === m.id && styles.activeMethodText,
              ]}
            >
              {m.name}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Asr Juristic Option */}
        <View style={styles.asrToggleRow}>
          <Text style={styles.asrToggleLabel}>مذهب صلاة العصر:</Text>
          <View style={styles.asrToggleGroup}>
            <TouchableOpacity
              style={[styles.asrPill, asrJuristic === 0 && styles.activeAsrPill]}
              onPress={() => setAsrJuristic(0)}
            >
              <Text style={[styles.asrPillText, asrJuristic === 0 && styles.activeAsrPillText]}>
                شافعي / الجمهور
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.asrPill, asrJuristic === 1 && styles.activeAsrPill]}
              onPress={() => setAsrJuristic(1)}
            >
              <Text style={[styles.asrPillText, asrJuristic === 1 && styles.activeAsrPillText]}>
                حنفي
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
    paddingTop: 14,
    paddingBottom: 30,
  },
  qiblaBanner: {
    backgroundColor: '#1B5E20',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  qiblaTextCol: {
    alignItems: 'flex-end',
  },
  qiblaBannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  qiblaBannerSub: {
    fontSize: 12,
    color: '#D4AF37',
    marginTop: 2,
  },
  qiblaBannerIcon: {
    fontSize: 32,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'right',
  },
  prayerRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  prayerRowActive: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  rowIcon: {
    fontSize: 22,
  },
  prayerNameWrap: {
    flex: 1,
    marginRight: 12,
    alignItems: 'flex-end',
  },
  prayerNameText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  activeNameText: {
    color: '#1B5E20',
    fontWeight: '800',
  },
  prayerDescText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  prayerTimeWrap: {},
  prayerTimeText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  activeTimeText: {
    color: '#1B5E20',
    fontWeight: '800',
  },
  methodOption: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    gap: 10,
  },
  activeMethodOption: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    paddingHorizontal: 6,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: '#1B5E20',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1B5E20',
  },
  methodNameText: {
    fontSize: 13,
    color: '#475569',
    flex: 1,
    textAlign: 'right',
  },
  activeMethodText: {
    color: '#1B5E20',
    fontWeight: '700',
  },
  asrToggleRow: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  asrToggleLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 8,
  },
  asrToggleGroup: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  asrPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  activeAsrPill: {
    backgroundColor: '#1B5E20',
  },
  asrPillText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  activeAsrPillText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default PrayerScreen;
