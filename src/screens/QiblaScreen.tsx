import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import QiblaCompass from '../components/QiblaCompass';
import {
  calculateQiblaDirection,
  distanceToKaaba,
  getQiblaCardinalDirection,
} from '../services/qibla';

interface QiblaScreenProps {
  onBack?: () => void;
}

const QiblaScreen: React.FC<QiblaScreenProps> = ({ onBack }) => {
  // Default coordinates: Cairo (30.0444, 31.2357)
  const [userLat, setUserLat] = useState(30.0444);
  const [userLng, setUserLng] = useState(31.2357);
  const [deviceHeading, setDeviceHeading] = useState(0);

  const qiblaAngle = Math.round(calculateQiblaDirection(userLat, userLng));
  const distance = Math.round(distanceToKaaba(userLat, userLng));
  const cardinalText = getQiblaCardinalDirection(qiblaAngle);

  // Check if device is aligned within 5 degrees
  const angleDiff = Math.abs((deviceHeading - qiblaAngle + 360) % 360);
  const isAligned = angleDiff < 5 || angleDiff > 355;

  return (
    <View style={styles.container}>
      <Header
        title="اتجاه القبلة"
        subtitle="مكة المكرمة - الكعبة المشرفة"
        showBack={Boolean(onBack)}
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Alignment Status Banner */}
        <View
          style={[
            styles.statusBanner,
            isAligned ? styles.statusAligned : styles.statusNotAligned,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isAligned ? styles.statusTextAligned : styles.statusTextNotAligned,
            ]}
          >
            {isAligned
              ? '✓ أنت تواجه اتجاه القبلة المشرفة بدقة'
              : `قم بتدوير هاتفك حتى يصل المؤشر إلى ${qiblaAngle}°`}
          </Text>
        </View>

        {/* Compass Component */}
        <View style={styles.compassContainer}>
          <QiblaCompass
            qiblaDirection={qiblaAngle}
            deviceHeading={deviceHeading}
          />
        </View>

        {/* Info Cards */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>المسافة إلى الكعبة</Text>
            <Text style={styles.infoValue}>{distance} كم</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>زاوية القبلة</Text>
            <Text style={styles.infoValue}>{qiblaAngle}°</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>الاتجاه الجغرافي</Text>
            <Text style={styles.infoValue}>{cardinalText}</Text>
          </View>
        </View>

        {/* Heading manual adjustment / sensor simulation controls */}
        <View style={styles.manualControls}>
          <Text style={styles.manualLabel}>
            محاكاة تدوير البوصلة (للاختبار والتعيير): {Math.round(deviceHeading)}°
          </Text>
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.adjustBtn}
              onPress={() => setDeviceHeading((prev) => (prev - 15 + 360) % 360)}
            >
              <Text style={styles.adjustBtnText}>↺ -15°</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.adjustBtn, styles.alignQuickBtn]}
              onPress={() => setDeviceHeading(qiblaAngle)}
            >
              <Text style={styles.alignQuickBtnText}>محاذاة مباشرة للكعبة</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.adjustBtn}
              onPress={() => setDeviceHeading((prev) => (prev + 15) % 360)}
            >
              <Text style={styles.adjustBtnText}>↻ +15°</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>تعليمات دقة البوصلة:</Text>
          <Text style={styles.instructionItem}>
            • ضع الهاتف بشكل أفقي مستوٍ على راحة يدك.
          </Text>
          <Text style={styles.instructionItem}>
            • ابتعد عن الأجهزة الإلكترونية والمجالات المغناطيسية القوية.
          </Text>
          <Text style={styles.instructionItem}>
            • حرك الهاتف في الهواء على شكل رقم 8 لمعايرة الحساسات.
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingBottom: 24,
    alignItems: 'center',
  },
  statusBanner: {
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 14,
    marginBottom: 8,
    alignItems: 'center',
  },
  statusAligned: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#81C784',
  },
  statusNotAligned: {
    backgroundColor: '#FFFBE6',
    borderWidth: 1,
    borderColor: '#FFE58F',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  statusTextAligned: {
    color: '#1B5E20',
  },
  statusTextNotAligned: {
    color: '#B78103',
  },
  compassContainer: {
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row-reverse',
    width: '92%',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 10,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B5E20',
  },
  manualControls: {
    width: '92%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  manualLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 10,
  },
  btnRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: 8,
  },
  adjustBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  adjustBtnText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  alignQuickBtn: {
    backgroundColor: '#1B5E20',
  },
  alignQuickBtnText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  instructionsCard: {
    width: '92%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  instructionsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
    textAlign: 'right',
  },
  instructionItem: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 20,
    textAlign: 'right',
  },
});

export default QiblaScreen;
