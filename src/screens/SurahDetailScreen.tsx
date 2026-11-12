import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import AyahView from '../components/AyahView';
import { getSurah, QURAN_RECITERS, Ayah } from '../services/quranApi';
import { SurahInfo } from '../data/surahs';

interface SurahDetailScreenProps {
  surah: SurahInfo;
  onBack: () => void;
}

const SurahDetailScreen: React.FC<SurahDetailScreenProps> = ({ surah, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [fontSize, setFontSize] = useState(24);
  const [selectedReciter, setSelectedReciter] = useState(QURAN_RECITERS[0]);
  const [activeAyahNumber, setActiveAyahNumber] = useState<number | null>(null);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<number[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function loadAyahs() {
      setLoading(true);
      try {
        const response = await getSurah(surah.number, 'quran-uthmani');
        if (isMounted && response?.data?.ayahs) {
          setAyahs(response.data.ayahs);
        }
      } catch (err) {
        // Fallback placeholder ayahs if offline
        if (isMounted) {
          const fallbackList: Ayah[] = Array.from({ length: Math.min(surah.numberOfAyahs, 10) }, (_, i) => ({
            number: i + 1,
            text: `آية تجريبية رقم ${i + 1} من سورة ${surah.name}`,
            numberInSurah: i + 1,
            juz: 1,
            manzil: 1,
            page: 1,
            ruku: 1,
            hizbQuarter: 1,
            sajda: false,
          }));
          setAyahs(fallbackList);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadAyahs();
    return () => {
      isMounted = false;
    };
  }, [surah.number]);

  const toggleBookmark = (ayahNumber: number) => {
    if (bookmarkedAyahs.includes(ayahNumber)) {
      setBookmarkedAyahs(bookmarkedAyahs.filter((n) => n !== ayahNumber));
    } else {
      setBookmarkedAyahs([...bookmarkedAyahs, ayahNumber]);
      Alert.alert('تم الحفظ', `تمت إضافة الآية ${ayahNumber} إلى العلامات المرجعية`);
    }
  };

  const renderHeader = () => (
    <View style={styles.surahInfoCard}>
      <Text style={styles.surahTitleArabic}>{surah.name}</Text>
      <Text style={styles.surahSubtitleEnglish}>
        {surah.englishName} • {surah.englishNameTranslation}
      </Text>

      <View style={styles.metaRow}>
        <View style={styles.metaPill}>
          <Text style={styles.metaPillText}>{surah.revelationTypeAr}</Text>
        </View>
        <View style={styles.metaPill}>
          <Text style={styles.metaPillText}>{surah.numberOfAyahs} آية</Text>
        </View>
        <View style={styles.metaPill}>
          <Text style={styles.metaPillText}>ترتيبها {surah.number}</Text>
        </View>
      </View>

      {/* Font Size & Settings Bar */}
      <View style={styles.controlsRow}>
        <View style={styles.fontSizeControls}>
          <TouchableOpacity
            style={styles.fontBtn}
            onPress={() => setFontSize(Math.min(fontSize + 2, 38))}
          >
            <Text style={styles.fontBtnText}>أ+</Text>
          </TouchableOpacity>
          <Text style={styles.fontSizeLabel}>{fontSize}</Text>
          <TouchableOpacity
            style={styles.fontBtn}
            onPress={() => setFontSize(Math.max(fontSize - 2, 18))}
          >
            <Text style={styles.fontBtnText}>أ-</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.reciterLabel}>القارئ: {selectedReciter.nameAr}</Text>
      </View>

      {/* Bismillah Header (Except Surah At-Tawbah) */}
      {surah.number !== 9 && (
        <View style={styles.bismillahBox}>
          <Text style={styles.bismillahText}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title={`سورة ${surah.name}`}
        subtitle={`${surah.revelationTypeAr} - ${surah.numberOfAyahs} آية`}
        showBack={true}
        onBack={onBack}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1B5E20" />
          <Text style={styles.loadingText}>جاري تحميل السورة الكريمة...</Text>
        </View>
      ) : (
        <FlatList
          data={ayahs}
          keyExtractor={(item) => item.number.toString()}
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => (
            <AyahView
              numberInSurah={item.numberInSurah}
              text={item.text}
              fontSize={fontSize}
              isPlaying={activeAyahNumber === item.numberInSurah}
              isBookmarked={bookmarkedAyahs.includes(item.numberInSurah)}
              onPlay={() =>
                setActiveAyahNumber(
                  activeAyahNumber === item.numberInSurah ? null : item.numberInSurah
                )
              }
              onBookmark={() => toggleBookmark(item.numberInSurah)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#1B5E20',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 30,
  },
  surahInfoCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  surahTitleArabic: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B5E20',
  },
  surahSubtitleEnglish: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row-reverse',
    gap: 8,
    marginTop: 12,
  },
  metaPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  metaPillText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  controlsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  fontSizeControls: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  fontBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B5E20',
  },
  fontSizeLabel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  reciterLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  bismillahBox: {
    marginTop: 16,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFDF0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3E5AB',
  },
  bismillahText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#B78103',
  },
});

export default SurahDetailScreen;
