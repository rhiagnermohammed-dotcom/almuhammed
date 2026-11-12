import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

interface AyahViewProps {
  numberInSurah: number;
  text: string;
  translation?: string;
  tafsir?: string;
  fontSize?: number;
  isPlaying?: boolean;
  isBookmarked?: boolean;
  onPlay?: () => void;
  onBookmark?: () => void;
}

const AyahView: React.FC<AyahViewProps> = ({
  numberInSurah,
  text,
  translation,
  tafsir,
  fontSize = 24,
  isPlaying = false,
  isBookmarked = false,
  onPlay,
  onBookmark,
}) => {
  const [showTafsir, setShowTafsir] = useState(false);

  return (
    <View style={[styles.container, isPlaying && styles.containerPlaying]}>
      {/* Ayah Header Bar with Verse badge and action buttons */}
      <View style={styles.topBar}>
        <View style={styles.numberBadge}>
          <Text style={styles.numberText}>{numberInSurah}</Text>
        </View>

        <View style={styles.actionsRow}>
          {onPlay && (
            <TouchableOpacity style={styles.iconButton} onPress={onPlay}>
              <Text style={styles.actionIconText}>{isPlaying ? '⏸' : '▶'}</Text>
            </TouchableOpacity>
          )}

          {tafsir && (
            <TouchableOpacity
              style={[styles.iconButton, showTafsir && styles.activeIconButton]}
              onPress={() => setShowTafsir(!showTafsir)}
            >
              <Text style={styles.actionIconText}>📖</Text>
            </TouchableOpacity>
          )}

          {onBookmark && (
            <TouchableOpacity style={styles.iconButton} onPress={onBookmark}>
              <Text style={styles.actionIconText}>{isBookmarked ? '★' : '☆'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Arabic Ayah Text */}
      <View style={styles.textContainer}>
        <Text style={[styles.arabicText, { fontSize, lineHeight: fontSize * 1.9 }]}>
          {text} ﴿{numberInSurah}﴾
        </Text>
      </View>

      {/* Translation if available */}
      {translation ? (
        <View style={styles.translationContainer}>
          <Text style={styles.translationText}>{translation}</Text>
        </View>
      ) : null}

      {/* Expandable Tafsir Section */}
      {showTafsir && tafsir ? (
        <View style={styles.tafsirContainer}>
          <View style={styles.tafsirHeader}>
            <Text style={styles.tafsirTitle}>التفسير الميسر</Text>
          </View>
          <Text style={styles.tafsirText}>{tafsir}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8ECF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  containerPlaying: {
    borderColor: '#1B5E20',
    backgroundColor: '#F1F8F1',
    borderWidth: 1.5,
  },
  topBar: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  numberBadge: {
    minWidth: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#A5D6A7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  numberText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1B5E20',
  },
  actionsRow: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconButton: {
    backgroundColor: '#C8E6C9',
  },
  actionIconText: {
    fontSize: 14,
    color: '#333333',
  },
  textContainer: {
    marginVertical: 4,
  },
  arabicText: {
    textAlign: 'right',
    color: '#1C2833',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  translationContainer: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  translationText: {
    textAlign: 'left',
    fontSize: 13,
    color: '#5D6D7E',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  tafsirContainer: {
    marginTop: 12,
    backgroundColor: '#FFFBE6',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFE58F',
  },
  tafsirHeader: {
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE58F',
    paddingBottom: 4,
  },
  tafsirTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B78103',
    textAlign: 'right',
  },
  tafsirText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#595959',
    textAlign: 'right',
  },
});

export default AyahView;
