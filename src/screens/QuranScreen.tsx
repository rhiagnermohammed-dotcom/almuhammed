import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { surahList, SurahInfo } from '../data/surahs';
import SurahListItem from '../components/SurahListItem';

interface QuranScreenProps {
  onSelectSurah: (surah: SurahInfo) => void;
}

const QuranScreen: React.FC<QuranScreenProps> = ({ onSelectSurah }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all');

  const filteredSurahs = useMemo(() => {
    return surahList.filter((surah) => {
      const matchesSearch =
        surah.name.includes(searchQuery) ||
        surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.number.toString() === searchQuery.trim();

      const matchesFilter =
        filterType === 'all' || surah.revelationType === filterType;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterType]);

  const renderItem = ({ item }: { item: SurahInfo }) => (
    <SurahListItem
      number={item.number}
      nameAr={item.name}
      nameEn={item.englishName}
      nameTranslation={item.englishNameTranslation}
      numberOfAyahs={item.numberOfAyahs}
      revelationType={item.revelationType}
      onPress={() => onSelectSurah(item)}
    />
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="ابحث عن اسم السورة أو رقمها..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          textAlign="right"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => setSearchQuery('')}
          >
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[styles.filterChip, filterType === 'all' && styles.activeChip]}
          onPress={() => setFilterType('all')}
        >
          <Text
            style={[
              styles.filterText,
              filterType === 'all' && styles.activeFilterText,
            ]}
          >
            الكل (١١٤)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filterType === 'Meccan' && styles.activeChip]}
          onPress={() => setFilterType('Meccan')}
        >
          <Text
            style={[
              styles.filterText,
              filterType === 'Meccan' && styles.activeFilterText,
            ]}
          >
            مكية (٨٦)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filterType === 'Medinan' && styles.activeChip]}
          onPress={() => setFilterType('Medinan')}
        >
          <Text
            style={[
              styles.filterText,
              filterType === 'Medinan' && styles.activeFilterText,
            ]}
          >
            مدنية (٢٨)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Surah List */}
      <FlatList
        data={filteredSurahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>لم يتم العثور على سور مطابقة</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  clearBtn: {
    position: 'absolute',
    left: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
  },
  filterBar: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  activeChip: {
    backgroundColor: '#1B5E20',
    borderColor: '#1B5E20',
  },
  filterText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 15,
    color: '#94A3B8',
    fontWeight: '600',
  },
});

export default QuranScreen;
