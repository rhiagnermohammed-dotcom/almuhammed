/**
 * Azkar (أذكار) Data - Islamic Remembrances from Hisn Al-Muslim
 * حصن المسلم من أذكار الكتاب والسنة
 */

export interface Dhikr {
  id: number;
  text: string;        // Arabic text
  translation: string; // English translation
  count: number;       // How many times to repeat
  reference: string;   // Hadith source
}

export interface AzkarCategory {
  id: string;
  title: string;       // Arabic title
  titleEn: string;     // English title
  icon: string;        // Emoji icon
  azkar: Dhikr[];
}

let globalId = 0;
const nextId = () => ++globalId;

export const azkarData: AzkarCategory[] = [
  // =============================================
  // 1. أذكار الصباح - Morning Azkar
  // =============================================
  {
    id: 'morning',
    title: 'أذكار الصباح',
    titleEn: 'Morning Azkar',
    icon: '🌅',
    azkar: [
      {
        id: nextId(),
        text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.',
        translation: 'We have reached the morning and at this very time the whole kingdom belongs to Allah. All praise is due to Allah. None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent. My Lord, I ask You for the good of this day and the good of what follows it, and I seek refuge in You from the evil of this day and the evil of what follows it. My Lord, I seek refuge in You from laziness and the misery of old age. My Lord, I seek refuge in You from torment in the Hellfire and torment in the grave.',
        count: 1,
        reference: 'صحيح مسلم ٤/٢٠٨٨',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ.',
        translation: 'O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening. By Your leave we live and die, and unto You is the resurrection.',
        count: 1,
        reference: 'سنن الترمذي ٥/٤٦٦',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.',
        translation: 'O Allah, You are my Lord. None has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favour upon me, and I acknowledge my sin, so forgive me, for verily none can forgive sins except You.',
        count: 1,
        reference: 'صحيح البخاري ٧/١٥٠',
      },
      {
        id: nextId(),
        text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.',
        translation: 'Glory is to Allah and praise is to Him.',
        count: 100,
        reference: 'صحيح مسلم ٤/٢٠٧١',
      },
      {
        id: nextId(),
        text: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ.',
        translation: 'None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent.',
        count: 10,
        reference: 'صحيح البخاري ٤/٩٥ ومسلم ٤/٢٠٧١',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي.',
        translation: 'O Allah, I ask You for well-being in this world and the next. O Allah, I ask You for pardon and well-being in my religious and worldly affairs, and my family and my wealth. O Allah, conceal my faults and set at ease my dismay. O Allah, preserve me from the front and from behind, and on my right and on my left, and from above, and I seek refuge in Your greatness from being unexpectedly destroyed from beneath me.',
        count: 1,
        reference: 'سنن أبي داود ٤/٣٢٤ وابن ماجه ٢/٣٣٢',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَىٰ نَفْسِي سُوءًا، أَوْ أَجُرَّهُ إِلَىٰ مُسْلِمٍ.',
        translation: 'O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord and Sovereign of all things, I bear witness that none has the right to be worshipped except You. I seek refuge in You from the evil of my soul and from the evil and traps of Satan, and from committing wrong against my soul or bringing such upon another Muslim.',
        count: 1,
        reference: 'سنن الترمذي ٣/١٤٢ وسنن أبي داود ٤/٣١٧',
      },
      {
        id: nextId(),
        text: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.',
        translation: 'In the name of Allah with whose name nothing is harmed on earth nor in the heavens, and He is the All-Hearing, the All-Knowing.',
        count: 3,
        reference: 'سنن أبي داود ٤/٣٢٣ والترمذي ٥/٤٦٥',
      },
      {
        id: nextId(),
        text: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا.',
        translation: 'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace and blessings of Allah be upon him) as my Prophet.',
        count: 3,
        reference: 'سنن أبي داود ٤/٣١٨ والترمذي ٥/٤٦٥',
      },
      {
        id: nextId(),
        text: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ.',
        translation: 'O Ever-Living, O Self-Sustaining, in Your mercy I seek relief. Rectify for me all of my affairs and do not leave me to myself, even for the blink of an eye.',
        count: 1,
        reference: 'صحيح الترغيب والترهيب ١/٢٧٣',
      },
      {
        id: nextId(),
        text: 'أَصْبَحْنَا عَلَىٰ فِطْرَةِ الْإِسْلَامِ، وَعَلَىٰ كَلِمَةِ الْإِخْلَاصِ، وَعَلَىٰ دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَىٰ مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ.',
        translation: 'We rise upon the fitrah of Islam, and the word of pure faith, and upon the religion of our Prophet Muhammad (peace and blessings of Allah be upon him), and the religion of our forefather Ibrahim, who was a Muslim and of true faith and was not of those who associate others with Allah.',
        count: 1,
        reference: 'مسند أحمد ٣/٤٠٦-٤٠٧',
      },
      {
        id: nextId(),
        text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.',
        translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
        count: 3,
        reference: 'صحيح مسلم ٤/٢٠٨١',
      },
    ],
  },

  // =============================================
  // 2. أذكار المساء - Evening Azkar
  // =============================================
  {
    id: 'evening',
    title: 'أذكار المساء',
    titleEn: 'Evening Azkar',
    icon: '🌙',
    azkar: [
      {
        id: nextId(),
        text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.',
        translation: 'We have reached the evening and at this very time the whole kingdom belongs to Allah. All praise is due to Allah. None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent. My Lord, I ask You for the good of this night and the good of what follows it, and I seek refuge in You from the evil of this night and the evil of what follows it. My Lord, I seek refuge in You from laziness and the misery of old age. My Lord, I seek refuge in You from torment in the Hellfire and torment in the grave.',
        count: 1,
        reference: 'صحيح مسلم ٤/٢٠٨٨',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ.',
        translation: 'O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning. By Your leave we live and die, and unto You is the return.',
        count: 1,
        reference: 'سنن الترمذي ٥/٤٦٦',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.',
        translation: 'O Allah, You are my Lord. None has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favour upon me, and I acknowledge my sin, so forgive me, for verily none can forgive sins except You.',
        count: 1,
        reference: 'صحيح البخاري ٧/١٥٠',
      },
      {
        id: nextId(),
        text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.',
        translation: 'Glory is to Allah and praise is to Him.',
        count: 100,
        reference: 'صحيح مسلم ٤/٢٠٧١',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي.',
        translation: 'O Allah, I ask You for well-being in this world and the next. O Allah, I ask You for pardon and well-being in my religious and worldly affairs, and my family and my wealth. O Allah, conceal my faults and set at ease my dismay. O Allah, preserve me from the front and from behind, and on my right and on my left, and from above, and I seek refuge in Your greatness from being unexpectedly destroyed from beneath me.',
        count: 1,
        reference: 'سنن أبي داود ٤/٣٢٤ وابن ماجه ٢/٣٣٢',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَىٰ نَفْسِي سُوءًا، أَوْ أَجُرَّهُ إِلَىٰ مُسْلِمٍ.',
        translation: 'O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord and Sovereign of all things, I bear witness that none has the right to be worshipped except You. I seek refuge in You from the evil of my soul and from the evil and traps of Satan, and from committing wrong against my soul or bringing such upon another Muslim.',
        count: 1,
        reference: 'سنن الترمذي ٣/١٤٢ وسنن أبي داود ٤/٣١٧',
      },
      {
        id: nextId(),
        text: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.',
        translation: 'In the name of Allah with whose name nothing is harmed on earth nor in the heavens, and He is the All-Hearing, the All-Knowing.',
        count: 3,
        reference: 'سنن أبي داود ٤/٣٢٣ والترمذي ٥/٤٦٥',
      },
      {
        id: nextId(),
        text: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا.',
        translation: 'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace and blessings of Allah be upon him) as my Prophet.',
        count: 3,
        reference: 'سنن أبي داود ٤/٣١٨ والترمذي ٥/٤٦٥',
      },
      {
        id: nextId(),
        text: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ.',
        translation: 'O Ever-Living, O Self-Sustaining, in Your mercy I seek relief. Rectify for me all of my affairs and do not leave me to myself, even for the blink of an eye.',
        count: 1,
        reference: 'صحيح الترغيب والترهيب ١/٢٧٣',
      },
      {
        id: nextId(),
        text: 'أَمْسَيْنَا عَلَىٰ فِطْرَةِ الْإِسْلَامِ، وَعَلَىٰ كَلِمَةِ الْإِخْلَاصِ، وَعَلَىٰ دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَىٰ مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ.',
        translation: 'We have ended the day upon the fitrah of Islam, and the word of pure faith, and upon the religion of our Prophet Muhammad (peace and blessings of Allah be upon him), and the religion of our forefather Ibrahim, who was a Muslim and of true faith and was not of those who associate others with Allah.',
        count: 1,
        reference: 'مسند أحمد ٣/٤٠٦-٤٠٧',
      },
      {
        id: nextId(),
        text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.',
        translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
        count: 3,
        reference: 'صحيح مسلم ٤/٢٠٨١',
      },
      {
        id: nextId(),
        text: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ.',
        translation: 'None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent.',
        count: 10,
        reference: 'صحيح البخاري ٤/٩٥ ومسلم ٤/٢٠٧١',
      },
    ],
  },

  // =============================================
  // 3. أذكار بعد الصلاة - After Prayer Azkar
  // =============================================
  {
    id: 'after-prayer',
    title: 'أذكار بعد الصلاة',
    titleEn: 'After Prayer Azkar',
    icon: '🕌',
    azkar: [
      {
        id: nextId(),
        text: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ.',
        translation: 'I seek the forgiveness of Allah. (three times)',
        count: 3,
        reference: 'صحيح مسلم ١/٤١٤',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.',
        translation: 'O Allah, You are As-Salam (Peace), and from You is peace. Blessed are You, O Possessor of Majesty and Honour.',
        count: 1,
        reference: 'صحيح مسلم ١/٤١٤',
      },
      {
        id: nextId(),
        text: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ.',
        translation: 'None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent. O Allah, none can prevent what You have willed to bestow, and none can bestow what You have willed to prevent, and no wealth or majesty can benefit anyone, as from You is all wealth and majesty.',
        count: 1,
        reference: 'صحيح البخاري ١/٢٥٥ ومسلم ١/٤١٤',
      },
      {
        id: nextId(),
        text: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ. لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ، وَلَا نَعْبُدُ إِلَّا إِيَّاهُ، لَهُ النِّعْمَةُ وَلَهُ الْفَضْلُ وَلَهُ الثَّنَاءُ الْحَسَنُ، لَا إِلَٰهَ إِلَّا اللَّهُ مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ.',
        translation: 'None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise and He is over all things omnipotent. There is no might nor power except with Allah. None has the right to be worshipped except Allah, and we worship none except Him. For Him is all favour, grace, and glorious praise. None has the right to be worshipped except Allah and we are sincere in faith and devotion to Him although the disbelievers detest it.',
        count: 1,
        reference: 'صحيح مسلم ١/٤١٥',
      },
      {
        id: nextId(),
        text: 'سُبْحَانَ اللَّهِ.',
        translation: 'Glory is to Allah.',
        count: 33,
        reference: 'صحيح مسلم ١/٤١٨',
      },
      {
        id: nextId(),
        text: 'الْحَمْدُ لِلَّهِ.',
        translation: 'Praise is to Allah.',
        count: 33,
        reference: 'صحيح مسلم ١/٤١٨',
      },
      {
        id: nextId(),
        text: 'اللَّهُ أَكْبَرُ.',
        translation: 'Allah is the Greatest.',
        count: 33,
        reference: 'صحيح مسلم ١/٤١٨',
      },
      {
        id: nextId(),
        text: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ.',
        translation: 'None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise and He is over all things omnipotent. (said once to complete 100)',
        count: 1,
        reference: 'صحيح مسلم ١/٤١٨',
      },
      {
        id: nextId(),
        text: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ.',
        translation: 'Say: He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent. (Surah Al-Ikhlas)',
        count: 1,
        reference: 'سنن أبي داود ٢/٨٦ والنسائي ٣/٦٨',
      },
      {
        id: nextId(),
        text: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.',
        translation: 'Say: I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies. (Surah Al-Falaq)',
        count: 1,
        reference: 'سنن أبي داود ٢/٨٦ والنسائي ٣/٦٨',
      },
      {
        id: nextId(),
        text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ.',
        translation: 'Say: I seek refuge in the Lord of mankind. The Sovereign of mankind. The God of mankind. From the evil of the retreating whisperer. Who whispers [evil] into the breasts of mankind. From among the jinn and mankind. (Surah An-Nas)',
        count: 1,
        reference: 'سنن أبي داود ٢/٨٦ والنسائي ٣/٦٨',
      },
    ],
  },

  // =============================================
  // 4. أذكار النوم - Sleep Azkar
  // =============================================
  {
    id: 'sleep',
    title: 'أذكار النوم',
    titleEn: 'Sleep Azkar',
    icon: '🌜',
    azkar: [
      {
        id: nextId(),
        text: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا.',
        translation: 'In Your name, O Allah, I die and I live.',
        count: 1,
        reference: 'صحيح البخاري ١١/١١٣',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ.',
        translation: 'O Allah, protect me from Your punishment on the day You resurrect Your servants.',
        count: 3,
        reference: 'سنن أبي داود ٤/٣١١',
      },
      {
        id: nextId(),
        text: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا، بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.',
        translation: 'In Your name my Lord, I lie down and in Your name I rise. If You should take my soul then have mercy upon it, and if You should return my soul then protect it in the manner You do so with Your righteous servants.',
        count: 1,
        reference: 'صحيح البخاري ١١/١٢٦ ومسلم ٤/٢٠٨٤',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْيَاهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا. اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ.',
        translation: 'O Allah, verily You have created my soul and You shall take its life. To You belongs its life and death. If You should keep my soul alive then protect it, and if You should take its life then forgive it. O Allah, I ask You to grant me well-being.',
        count: 1,
        reference: 'صحيح مسلم ٤/٢٠٨٣',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَرَبَّ الْأَرْضِ، وَرَبَّ الْعَرْشِ الْعَظِيمِ، رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ، فَالِقَ الْحَبِّ وَالنَّوَىٰ، وَمُنْزِلَ التَّوْرَاةِ وَالْإِنْجِيلِ وَالْفُرْقَانِ، أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ. اللَّهُمَّ أَنْتَ الْأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ، وَأَنْتَ الْآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ، وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ، وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ، اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ.',
        translation: 'O Allah, Lord of the seven heavens and Lord of the earth, and Lord of the Great Throne, our Lord and Lord of all things, Splitter of the seed and the date-stone, Revealer of the Torah, the Gospel and the Criterion (Quran). I seek refuge in You from the evil of all things You shall seize by the forelock (have power over). O Allah, You are the First so there is nothing before You, and You are the Last so there is nothing after You, and You are the Most High so there is nothing above You, and You are the Most Near so there is nothing closer than You. Settle our debt for us and spare us from poverty.',
        count: 1,
        reference: 'صحيح مسلم ٤/٢٠٨٤',
      },
      {
        id: nextId(),
        text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لَا كَافِيَ لَهُ وَلَا مُؤْوِيَ.',
        translation: 'All praise is for Allah, who fed us and gave us drink, and who is sufficient for us and has sheltered us. For how many have none to suffice them or shelter them.',
        count: 1,
        reference: 'صحيح مسلم ٤/٢٠٨٥',
      },
      {
        id: nextId(),
        text: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ.',
        translation: 'Glory is to Allah (33 times), praise is to Allah (33 times), Allah is the Greatest (34 times).',
        count: 1,
        reference: 'صحيح البخاري ٧/٧١ ومسلم ٤/٢٠٩١',
      },
    ],
  },

  // =============================================
  // 5. أذكار الاستيقاظ - Waking Up Azkar
  // =============================================
  {
    id: 'waking-up',
    title: 'أذكار الاستيقاظ',
    titleEn: 'Waking Up Azkar',
    icon: '☀️',
    azkar: [
      {
        id: nextId(),
        text: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ.',
        translation: 'All praise is for Allah who gave us life after having taken it from us, and unto Him is the resurrection.',
        count: 1,
        reference: 'صحيح البخاري ١١/١١٣',
      },
      {
        id: nextId(),
        text: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ. سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَٰهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ. رَبِّ اغْفِرْ لِي.',
        translation: 'None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent. Glory is to Allah, praise is to Allah, none has the right to be worshipped except Allah, Allah is the Greatest, and there is no might nor power except with Allah, the Most High, the Most Great. My Lord, forgive me.',
        count: 1,
        reference: 'صحيح البخاري ١١/١١٣ (من قالها حين يستيقظ ثم دعا أُجيب له)',
      },
      {
        id: nextId(),
        text: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ.',
        translation: 'All praise is for Allah who restored to me my health, returned to me my soul, and permitted me to remember Him.',
        count: 1,
        reference: 'سنن الترمذي ٥/٤٧٣',
      },
      {
        id: nextId(),
        text: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ ۝ الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ.',
        translation: 'Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding. Who remember Allah while standing or sitting or [lying] on their sides and give thought to the creation of the heavens and the earth, [saying], "Our Lord, You did not create this aimlessly; exalted are You [above such a thing]; then protect us from the punishment of the Fire." (Quran 3:190-191)',
        count: 1,
        reference: 'صحيح البخاري ٨/٢٣٧ ومسلم ١/٥٣٠',
      },
    ],
  },

  // =============================================
  // 6. أدعية متنوعة - Miscellaneous Duas
  // =============================================
  {
    id: 'misc-duas',
    title: 'أدعية متنوعة',
    titleEn: 'Miscellaneous Duas',
    icon: '🤲',
    azkar: [
      {
        id: nextId(),
        text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.',
        translation: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
        count: 1,
        reference: 'سورة البقرة ٢:٢٠١ - صحيح البخاري ٨/٦٧ ومسلم ٤/٢٠٧٠',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ.',
        translation: 'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.',
        count: 1,
        reference: 'صحيح البخاري ٧/١٥٨',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَىٰ وَالتُّقَىٰ وَالْعَفَافَ وَالْغِنَىٰ.',
        translation: 'O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.',
        count: 1,
        reference: 'صحيح مسلم ٤/٢٠٨٧',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي، وَاجْعَلِ الْحَيَاةَ زِيَادَةً لِي فِي كُلِّ خَيْرٍ، وَاجْعَلِ الْمَوْتَ رَاحَةً لِي مِنْ كُلِّ شَرٍّ.',
        translation: 'O Allah, rectify for me my religion which is the safeguard of my affairs. And rectify for me my worldly [affairs] wherein is my living. And rectify for me my Hereafter to which is my return. And make life for me [a means of] increase in every good, and make death a relief for me from every evil.',
        count: 1,
        reference: 'صحيح مسلم ٤/٢٠٨٧',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ، وَتَحَوُّلِ عَافِيَتِكَ، وَفُجَاءَةِ نِقْمَتِكَ، وَجَمِيعِ سَخَطِكَ.',
        translation: 'O Allah, I seek refuge in You from the decline of Your blessings, the change of Your protection, the suddenness of Your punishment and all of Your wrath.',
        count: 1,
        reference: 'صحيح مسلم ٤/٢٠٩٧',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْهَرَمِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ.',
        translation: 'O Allah, I seek refuge in You from weakness and laziness, cowardice and old age, and I seek refuge in You from the torment of the grave, and I seek refuge in You from the trials of life and death.',
        count: 1,
        reference: 'صحيح مسلم ٤/٢٠٨٨',
      },
      {
        id: nextId(),
        text: 'رَبِّ اغْفِرْ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَعَافِنِي، وَارْزُقْنِي.',
        translation: 'My Lord, forgive me, have mercy upon me, guide me, give me well-being, and provide for me.',
        count: 1,
        reference: 'صحيح مسلم ٤/٢٠٧٣',
      },
      {
        id: nextId(),
        text: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلَانِيَتَهُ وَسِرَّهُ.',
        translation: 'O Allah, forgive me all of my sins, the small and the great, the first and the last, the open and the secret.',
        count: 1,
        reference: 'صحيح مسلم ١/٣٥٠',
      },
    ],
  },
];
