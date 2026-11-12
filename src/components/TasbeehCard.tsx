import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';

const PRESETS = [
  'سبحان الله',
  'الحمد لله',
  'لا إله إلا الله',
  'الله أكبر',
  'أستغفر الله وأتوب إليه',
  'اللهم صلِّ على محمد',
  'لا حول ولا قوة إلا بالله',
];

interface TasbeehCardProps {
  onCountChange?: (count: number) => void;
}

const TasbeehCard: React.FC<TasbeehCardProps> = ({ onCountChange }) => {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [selectedZikr, setSelectedZikr] = useState(PRESETS[0]);

  const handleIncrement = () => {
    const next = count + 1;
    const nextTotal = totalCount + 1;
    setTotalCount(nextTotal);

    if (next >= target) {
      // Vibrate on target completion
      try {
        Vibration.vibrate(100);
      } catch (e) {}
      setCount(0);
    } else {
      setCount(next);
    }

    if (onCountChange) {
      onCountChange(nextTotal);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>السبحة الإلكترونية</Text>
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.resetText}>إعادة ضبط ↺</Text>
        </TouchableOpacity>
      </View>

      {/* Preset Selector */}
      <View style={styles.presetsContainer}>
        {PRESETS.slice(0, 4).map((zikr, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.presetChip,
              selectedZikr === zikr && styles.activePresetChip,
            ]}
            onPress={() => setSelectedZikr(zikr)}
          >
            <Text
              style={[
                styles.presetChipText,
                selectedZikr === zikr && styles.activePresetChipText,
              ]}
            >
              {zikr}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Selected Dhikr Display */}
      <Text style={styles.selectedZikrText}>{selectedZikr}</Text>

      {/* Big Counter Button */}
      <TouchableOpacity
        style={styles.counterCircle}
        activeOpacity={0.8}
        onPress={handleIncrement}
      >
        <Text style={styles.counterNumber}>{count}</Text>
        <Text style={styles.counterTargetText}>من {target}</Text>
        <Text style={styles.tapPrompt}>اضغط للتسبيح</Text>
      </TouchableOpacity>

      {/* Target Selector */}
      <View style={styles.targetRow}>
        <Text style={styles.targetLabel}>الهدف:</Text>
        {[33, 100, 1000].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.targetBtn, target === t && styles.activeTargetBtn]}
            onPress={() => setTarget(t)}
          >
            <Text
              style={[
                styles.targetBtnText,
                target === t && styles.activeTargetBtnText,
              ]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Total Count */}
      <View style={styles.footerRow}>
        <Text style={styles.totalLabel}>إجمالي التسبيحات اليوم: </Text>
        <Text style={styles.totalValue}>{totalCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B5E20',
  },
  resetButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  resetText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  presetsContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 14,
  },
  presetChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  activePresetChip: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2E7D32',
  },
  presetChipText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  activePresetChipText: {
    color: '#1B5E20',
    fontWeight: '700',
  },
  selectedZikrText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
    textAlign: 'center',
  },
  counterCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#1B5E20',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#D4AF37',
  },
  counterNumber: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  counterTargetText: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '600',
    marginTop: -2,
  },
  tapPrompt: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 2,
  },
  targetRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 18,
    gap: 8,
  },
  targetLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  targetBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeTargetBtn: {
    backgroundColor: '#1B5E20',
    borderColor: '#1B5E20',
  },
  targetBtnText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  activeTargetBtnText: {
    color: '#FFFFFF',
  },
  footerRow: {
    flexDirection: 'row-reverse',
    marginTop: 14,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  totalValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1B5E20',
  },
});

export default TasbeehCard;
