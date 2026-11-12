import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { azkarData, AzkarCategory, Dhikr } from '../data/azkar';
import AzkarCard from '../components/AzkarCard';
import AzkarCategoryCard from '../components/AzkarCategoryCard';
import Header from '../components/Header';

interface AzkarScreenProps {
  initialCategoryId?: string;
}

const AzkarScreen: React.FC<AzkarScreenProps> = ({ initialCategoryId }) => {
  const [selectedCategory, setSelectedCategory] = useState<AzkarCategory | null>(
    initialCategoryId
      ? azkarData.find((c) => c.id === initialCategoryId) || null
      : null
  );

  const [counterState, setCounterState] = useState<{ [id: number]: number }>({});

  const handleIncrement = (dhikr: Dhikr) => {
    const current = counterState[dhikr.id] || 0;
    if (current < dhikr.count) {
      setCounterState({
        ...counterState,
        [dhikr.id]: current + 1,
      });
    }
  };

  const handleResetCategory = () => {
    if (!selectedCategory) return;
    const updated = { ...counterState };
    selectedCategory.azkar.forEach((d) => {
      delete updated[d.id];
    });
    setCounterState(updated);
    Alert.alert('تمت الإعادة', 'تمت إعادة ضبط عدادات الأذكار لهذه الفئة');
  };

  if (selectedCategory) {
    const totalAzkar = selectedCategory.azkar.length;
    const completedAzkar = selectedCategory.azkar.filter(
      (d) => (counterState[d.id] || 0) >= d.count
    ).length;

    return (
      <View style={styles.container}>
        <Header
          title={selectedCategory.title}
          subtitle={`${completedAzkar} من ${totalAzkar} مكتمل`}
          showBack={true}
          onBack={() => setSelectedCategory(null)}
          rightAction={{
            icon: '↺',
            onPress: handleResetCategory,
          }}
        />

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(completedAzkar / (totalAzkar || 1)) * 100}%` },
            ]}
          />
        </View>

        <FlatList
          data={selectedCategory.azkar}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AzkarCard
              dhikr={item}
              currentCount={counterState[item.id] || 0}
              onIncrement={() => handleIncrement(item)}
            />
          )}
          contentContainerStyle={styles.azkarListContent}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroBanner}>
        <Text style={styles.heroEmoji}>📿</Text>
        <Text style={styles.heroTitle}>أذكار وأدعية المسلم</Text>
        <Text style={styles.heroSub}>
          مأثورة وصحيحة من كتاب حصن المسلم
        </Text>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionHeader}>الأقسام والفئات</Text>
        <View style={styles.categoriesGrid}>
          {azkarData.map((category) => (
            <AzkarCategoryCard
              key={category.id}
              category={category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </View>
      </View>

      <View style={{ height: 30 }} />
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
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
  },
  heroEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSub: {
    fontSize: 13,
    color: '#D4AF37',
    marginTop: 4,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E2E8F0',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1B5E20',
  },
  categoriesSection: {
    paddingHorizontal: 16,
    marginTop: 18,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'right',
  },
  categoriesGrid: {
    gap: 12,
  },
  azkarListContent: {
    paddingVertical: 12,
    paddingBottom: 30,
  },
});

export default AzkarScreen;
