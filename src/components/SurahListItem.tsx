import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
} from 'react-native';

I18nManager.allowRTL(true);

interface SurahListItemProps {
  number: number;
  nameAr: string;
  nameEn: string;
  versesCount: number;
  revelationType: 'meccan' | 'medinan';
  onPress: () => void;
}

const SurahListItem: React.FC<SurahListItemProps> = ({
  number,
  nameAr,
  nameEn,
  versesCount,
  revelationType,
  onPress,
}) => {
  const isMeccan = revelationType === 'meccan';
  const revelationIcon = isMeccan ? '🕋' : '🕌';
  const revelationLabel = isMeccan ? 'مكية' : 'مدنية';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Surah Number Diamond */}
      <View style={styles.diamondWrapper}>
        <View style={styles.diamond}>
          <View style={styles.diamondInner}>
            <Text style={styles.diamondText}>{number}</Text>
          </View>
        </View>
      </View>

      {/* Surah Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.nameAr}>{nameAr}</Text>
        <Text style={styles.nameEn}>{nameEn}</Text>
      </View>

      {/* Meta Info */}
      <View style={styles.metaContainer}>
        <View style={styles.revelationBadge}>
          <Text style={styles.revelationIcon}>{revelationIcon}</Text>
          <Text style={styles.revelationText}>{revelationLabel}</Text>
        </View>
        <Text style={styles.versesCount}>{versesCount} آية</Text>
      </View>

      {/* Chevron */}
      <Text style={styles.chevron}>‹</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  diamondWrapper: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  diamond: {
    width: 40,
    height: 40,
    transform: [{ rotate: '45deg' }],
    backgroundColor: '#0D7C3D',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#0D7C3D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  diamondInner: {
    transform: [{ rotate: '-45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  diamondText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  nameAr: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  nameEn: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 2,
  },
  metaContainer: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  revelationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9F3',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 4,
  },
  revelationIcon: {
    fontSize: 12,
    marginLeft: 4,
  },
  revelationText: {
    fontSize: 11,
    color: '#0D7C3D',
    fontWeight: '600',
  },
  versesCount: {
    fontSize: 12,
    color: '#AAAAAA',
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  chevron: {
    fontSize: 22,
    color: '#CCCCCC',
    marginRight: 4,
    fontWeight: '300',
  },
});

export default SurahListItem;
