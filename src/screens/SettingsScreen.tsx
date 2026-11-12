import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';

const SettingsScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [adhanSoundEnabled, setAdhanSoundEnabled] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const handleClearData = () => {
    Alert.alert(
      'تأكيد إعادة التعيين',
      'هل ترغب حقاً في إعادة ضبط كافة العلامات المرجعية وعدادات التسبيح؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'نعم، إعادة ضبط',
          style: 'destructive',
          onPress: () => Alert.alert('تمت العملية', 'تمت إعادة ضبط البيانات بنجاح.'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Profile / App Branding */}
      <View style={styles.brandingCard}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>م</Text>
        </View>
        <Text style={styles.appName}>تطبيق المحمد</Text>
        <Text style={styles.appVersion}>الإصدار 1.0.0 • رفيق المسلم اليومي</Text>
        <View style={styles.freeBadge}>
          <Text style={styles.freeBadgeText}>خالٍ تماماً من الإعلانات ١٠٠٪</Text>
        </View>
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>التنبيهات والأذان</Text>

        <View style={styles.row}>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#CBD5E1', true: '#81C784' }}
            thumbColor={notificationsEnabled ? '#1B5E20' : '#F1F5F9'}
          />
          <View style={styles.rowLabelWrap}>
            <Text style={styles.rowTitle}>تنبيهات مواقيت الصلاة</Text>
            <Text style={styles.rowSub}>إشعار عند دخول وقت كل صلاة</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Switch
            value={adhanSoundEnabled}
            onValueChange={setAdhanSoundEnabled}
            trackColor={{ false: '#CBD5E1', true: '#81C784' }}
            thumbColor={adhanSoundEnabled ? '#1B5E20' : '#F1F5F9'}
          />
          <View style={styles.rowLabelWrap}>
            <Text style={styles.rowTitle}>صوت الأذان</Text>
            <Text style={styles.rowSub}>تشغيل الأذان كاملاً عند دخول الوقت</Text>
          </View>
        </View>

        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Switch
            value={hapticFeedback}
            onValueChange={setHapticFeedback}
            trackColor={{ false: '#CBD5E1', true: '#81C784' }}
            thumbColor={hapticFeedback ? '#1B5E20' : '#F1F5F9'}
          />
          <View style={styles.rowLabelWrap}>
            <Text style={styles.rowTitle}>الاهتزاز والتفاعل اللمسي</Text>
            <Text style={styles.rowSub}>اهتزاز خفيف عند التسبيح ومحاذاة القبلة</Text>
          </View>
        </View>
      </View>

      {/* Appearance Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>المظهر والعرض</Text>

        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: '#CBD5E1', true: '#81C784' }}
            thumbColor={isDarkMode ? '#1B5E20' : '#F1F5F9'}
          />
          <View style={styles.rowLabelWrap}>
            <Text style={styles.rowTitle}>الوضع الليلي (الداكن)</Text>
            <Text style={styles.rowSub}>مريح للعين أثناء القراءة ليلاً</Text>
          </View>
        </View>
      </View>

      {/* Storage and Reset */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>البيانات والذاكرة</Text>
        <TouchableOpacity style={styles.actionRow} onPress={handleClearData}>
          <Text style={styles.chevron}>←</Text>
          <Text style={styles.actionRowTextDanger}>إعادة ضبط البيانات والعلامات المرجعية</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>عن التطبيق</Text>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutValue}>1.0.0</Text>
          <Text style={styles.aboutLabel}>رقم الإصدار</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutValue}>خاص ومجاني لوجه الله</Text>
          <Text style={styles.aboutLabel}>الترخيص</Text>
        </View>
        <View style={[styles.aboutRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.aboutValue}>حساب فلكي دقيق + AlQuran Cloud</Text>
          <Text style={styles.aboutLabel}>المصادر والبيانات</Text>
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
    paddingVertical: 14,
    paddingBottom: 40,
  },
  brandingCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 14,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1B5E20',
    borderWidth: 3,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  appVersion: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  freeBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#A5D6A7',
  },
  freeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1B5E20',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  rowLabelWrap: {
    alignItems: 'flex-end',
    flex: 1,
    marginLeft: 12,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  rowSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  actionRowTextDanger: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
    textAlign: 'right',
  },
  chevron: {
    fontSize: 16,
    color: '#94A3B8',
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  aboutLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  aboutValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
});

export default SettingsScreen;
