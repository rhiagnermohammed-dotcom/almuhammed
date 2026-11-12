import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from 'react-native';

interface DhikrItem {
  id?: number;
  text?: string;
  translation?: string;
  count?: number;
  reference?: string;
}

interface AzkarCardProps {
  dhikr?: DhikrItem;
  currentCount?: number;
  onIncrement?: () => void;
  arabicText?: string;
  translation?: string;
  totalCount?: number;
  reference?: string;
  onComplete?: () => void;
}

const AzkarCard: React.FC<AzkarCardProps> = ({
  dhikr,
  currentCount,
  onIncrement,
  arabicText: propArabicText,
  translation: propTranslation,
  totalCount: propTotalCount,
  reference: propReference,
  onComplete,
}) => {
  const arabicText = dhikr?.text || propArabicText || '';
  const translation = dhikr?.translation || propTranslation || '';
  const totalCount = dhikr?.count || propTotalCount || 1;
  const reference = dhikr?.reference || propReference || '';

  const [internalCount, setInternalCount] = useState(0);
  const count = currentCount !== undefined ? currentCount : internalCount;
  const isComplete = count >= totalCount;
  const progress = Math.min(count / (totalCount || 1), 1);

  const handleCount = useCallback(() => {
    if (isComplete) return;

    try {
      Vibration.vibrate(40);
    } catch (e) {}

    if (onIncrement) {
      onIncrement();
    } else {
      const newCount = count + 1;
      setInternalCount(newCount);
      if (newCount >= totalCount && onComplete) {
        onComplete();
      }
    }
  }, [count, isComplete, totalCount, onComplete, onIncrement]);

  const handleReset = useCallback(() => {
    setInternalCount(0);
  }, []);
  }, []);

  return (
    <View style={[styles.container, isComplete && styles.containerComplete]}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${progress * 100}%` },
            isComplete && styles.progressBarComplete,
          ]}
        />
      </View>

      {/* Arabic Text */}
      <View style={styles.arabicContainer}>
        <Text style={styles.arabicText}>{arabicText}</Text>
      </View>

      {/* Translation */}
      <View style={styles.translationContainer}>
        <Text style={styles.translationText}>{translation}</Text>
      </View>

      {/* Counter Section */}
      <View style={styles.counterSection}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.7}
        >
          <Text style={styles.resetButtonText}>↺</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.counterButton,
            isComplete && styles.counterButtonComplete,
          ]}
          onPress={handleCount}
          activeOpacity={0.7}
          disabled={isComplete}
        >
          <Text style={styles.counterText}>
            {count}
          </Text>
          <Text style={styles.counterDivider}>/</Text>
          <Text style={styles.counterTotal}>{totalCount}</Text>
        </TouchableOpacity>

        <View style={styles.percentageContainer}>
          <Text style={styles.percentageText}>
            {Math.round(progress * 100)}%
          </Text>
        </View>
      </View>

      {/* Completion badge */}
      {isComplete && (
        <View style={styles.completeBadge}>
          <Text style={styles.completeBadgeText}>✓ تم</Text>
        </View>
      )}

      {/* Reference */}
      <View style={styles.referenceContainer}>
        <Text style={styles.referenceText}>{reference}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  containerComplete: {
    borderColor: '#4CAF50',
    borderWidth: 1.5,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E8F5E9',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0D7C3D',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  progressBarComplete: {
    backgroundColor: '#4CAF50',
  },
  arabicContainer: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 16,
  },
  arabicText: {
    fontSize: 26,
    lineHeight: 46,
    color: '#1A1A1A',
    textAlign: 'center',
    writingDirection: 'rtl',
    fontWeight: '500',
  },
  translationContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    marginHorizontal: 16,
  },
  translationText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  counterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 16,
  },
  counterButton: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#0D7C3D',
    borderRadius: 30,
    paddingHorizontal: 28,
    paddingVertical: 14,
    elevation: 4,
    shadowColor: '#0D7C3D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  counterButtonComplete: {
    backgroundColor: '#4CAF50',
  },
  counterText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  counterDivider: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.6)',
    marginHorizontal: 4,
  },
  counterTotal: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  resetButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontSize: 22,
    color: '#999999',
  },
  percentageContainer: {
    width: 44,
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 13,
    color: '#0D7C3D',
    fontWeight: '600',
  },
  completeBadge: {
    alignSelf: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 8,
  },
  completeBadgeText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    writingDirection: 'rtl',
  },
  referenceContainer: {
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  referenceText: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});

export default AzkarCard;
