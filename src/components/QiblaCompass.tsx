import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

interface QiblaCompassProps {
  qiblaDirection: number;
  deviceHeading: number;
}

const DEGREE_MARKS = Array.from({ length: 36 }, (_, i) => i * 10);
const CARDINAL_DIRECTIONS: Record<number, string> = {
  0: 'ش',    // North (شمال)
  90: 'شر',  // East (شرق)
  180: 'ج',  // South (جنوب)
  270: 'غ',  // West (غرب)
};

const QiblaCompass: React.FC<QiblaCompassProps> = ({
  qiblaDirection,
  deviceHeading,
}) => {
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const arrowAnim = useRef(new Animated.Value(0)).current;

  // Rotation for the compass dial (opposite of device heading)
  useEffect(() => {
    Animated.timing(rotationAnim, {
      toValue: -deviceHeading,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [deviceHeading, rotationAnim]);

  // Rotation for the Qibla arrow
  useEffect(() => {
    const qiblaRelative = qiblaDirection - deviceHeading;
    Animated.timing(arrowAnim, {
      toValue: qiblaRelative,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [qiblaDirection, deviceHeading, arrowAnim]);

  const compassRotation = rotationAnim.interpolate({
    inputRange: [-360, 0, 360],
    outputRange: ['-360deg', '0deg', '360deg'],
  });

  const arrowRotation = arrowAnim.interpolate({
    inputRange: [-360, 0, 360],
    outputRange: ['-360deg', '0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Heading Display */}
      <View style={styles.headingDisplay}>
        <Text style={styles.headingLabel}>اتجاهك</Text>
        <Text style={styles.headingValue}>{Math.round(deviceHeading)}°</Text>
      </View>

      {/* Compass */}
      <View style={styles.compassWrapper}>
        {/* Outer Ring */}
        <View style={styles.outerRing}>
          {/* Compass Dial - rotates with device */}
          <Animated.View
            style={[
              styles.compassDial,
              { transform: [{ rotate: compassRotation }] },
            ]}
          >
            {/* Degree marks */}
            {DEGREE_MARKS.map((deg) => {
              const isCardinal = deg % 90 === 0;
              const isMajor = deg % 30 === 0;
              return (
                <View
                  key={deg}
                  style={[
                    styles.markContainer,
                    { transform: [{ rotate: `${deg}deg` }] },
                  ]}
                >
                  <View
                    style={[
                      styles.mark,
                      isCardinal && styles.markCardinal,
                      isMajor && !isCardinal && styles.markMajor,
                    ]}
                  />
                  {isCardinal && (
                    <View
                      style={[
                        styles.cardinalContainer,
                        { transform: [{ rotate: `-${deg}deg` }] },
                      ]}
                    >
                      <Text
                        style={[
                          styles.cardinalText,
                          deg === 0 && styles.northText,
                        ]}
                      >
                        {CARDINAL_DIRECTIONS[deg]}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </Animated.View>

          {/* Qibla Arrow - points to Qibla */}
          <Animated.View
            style={[
              styles.arrowContainer,
              { transform: [{ rotate: arrowRotation }] },
            ]}
          >
            <View style={styles.arrowHead} />
            <View style={styles.arrowShaft} />
            <Text style={styles.kaaba}>🕋</Text>
          </Animated.View>

          {/* Center circle */}
          <View style={styles.centerCircle}>
            <Text style={styles.centerDot}>●</Text>
          </View>

          {/* North indicator (fixed) */}
          <View style={styles.northIndicator}>
            <Text style={styles.northIndicatorText}>▼</Text>
          </View>
        </View>
      </View>

      {/* Qibla Angle Display */}
      <View style={styles.qiblaDisplay}>
        <Text style={styles.qiblaLabel}>اتجاه القبلة</Text>
        <Text style={styles.qiblaValue}>{Math.round(qiblaDirection)}°</Text>
      </View>
    </View>
  );
};

const COMPASS_SIZE = 280;
const OUTER_RING_SIZE = COMPASS_SIZE + 20;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  headingDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headingLabel: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  headingValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0D7C3D',
  },
  compassWrapper: {
    width: OUTER_RING_SIZE,
    height: OUTER_RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    width: OUTER_RING_SIZE,
    height: OUTER_RING_SIZE,
    borderRadius: OUTER_RING_SIZE / 2,
    borderWidth: 3,
    borderColor: '#0D7C3D',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFFF5',
    elevation: 6,
    shadowColor: '#0D7C3D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  compassDial: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markContainer: {
    position: 'absolute',
    width: 2,
    height: COMPASS_SIZE / 2,
    alignItems: 'center',
    bottom: COMPASS_SIZE / 2,
    transformOrigin: 'bottom',
  },
  mark: {
    width: 1,
    height: 8,
    backgroundColor: '#CCCCCC',
  },
  markMajor: {
    width: 2,
    height: 14,
    backgroundColor: '#999999',
  },
  markCardinal: {
    width: 3,
    height: 18,
    backgroundColor: '#0D7C3D',
  },
  cardinalContainer: {
    position: 'absolute',
    top: 22,
    alignItems: 'center',
  },
  cardinalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D7C3D',
  },
  northText: {
    color: '#D32F2F',
    fontSize: 18,
  },
  arrowContainer: {
    position: 'absolute',
    width: 40,
    height: COMPASS_SIZE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 28,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFD700',
    marginTop: 20,
  },
  arrowShaft: {
    width: 4,
    height: 50,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  kaaba: {
    fontSize: 20,
    marginTop: 2,
  },
  centerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#0D7C3D',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  centerDot: {
    fontSize: 8,
    color: '#0D7C3D',
  },
  northIndicator: {
    position: 'absolute',
    top: -2,
    alignItems: 'center',
  },
  northIndicatorText: {
    fontSize: 14,
    color: '#D32F2F',
  },
  qiblaDisplay: {
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: '#F0F9F3',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4EDDA',
  },
  qiblaLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  qiblaValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D7C3D',
    marginTop: 2,
  },
});

export default QiblaCompass;
