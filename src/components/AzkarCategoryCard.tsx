import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
} from 'react-native';

I18nManager.allowRTL(true);

interface AzkarCategoryCardProps {
  icon: string;
  nameAr: string;
  count: number;
  onPress: () => void;
}

const AzkarCategoryCard: React.FC<AzkarCategoryCardProps> = ({
  icon,
  nameAr,
  count,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Background layers for gradient effect */}
      <View style={styles.bgBase} />
      <View style={styles.bgOverlay} />

      {/* Decorative circle */}
      <View style={styles.decorCircle} />

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        <Text style={styles.nameAr}>{nameAr}</Text>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count} ذكر</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 6,
    marginVertical: 6,
    flex: 1,
    minHeight: 160,
    elevation: 5,
    shadowColor: '#0D7C3D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  bgBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0D7C3D',
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#085A2C',
    opacity: 0.4,
    borderTopLeftRadius: 100,
    transform: [{ translateX: 40 }, { translateY: -30 }],
  },
  decorCircle: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  icon: {
    fontSize: 28,
  },
  nameAr: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  countBadge: {
    backgroundColor: 'rgba(255,215,0,0.2)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
  },
  countText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
    writingDirection: 'rtl',
  },
});

export default AzkarCategoryCard;
