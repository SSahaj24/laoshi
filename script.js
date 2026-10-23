// ---------------------------------------------------------------------------
// Data: Traditional Chinese digits 0-9 and 十 (10), matched to the class
// material (class_material/6.numbers0828.pdf, 7.numbers0902.pdf).
// Tones are the base citation tones (no tone-sandhi applied to 一/七/八),
// matching how the digits are taught individually in the slides.
// ---------------------------------------------------------------------------

const DIGITS = [
  { ch: "零", base: "ling", tone: 2, accented: "líng" }, // 0
  { ch: "一", base: "yi",   tone: 1, accented: "yī"   }, // 1
  { ch: "二", base: "er",   tone: 4, accented: "èr"   }, // 2
  { ch: "三", base: "san",  tone: 1, accented: "sān"  }, // 3
  { ch: "四", base: "si",   tone: 4, accented: "sì"   }, // 4
  { ch: "五", base: "wu",   tone: 3, accented: "wǔ"   }, // 5
  { ch: "六", base: "liu",  tone: 4, accented: "liù"  }, // 6
  { ch: "七", base: "qi",   tone: 1, accented: "qī"   }, // 7
  { ch: "八", base: "ba",   tone: 1, accented: "bā"   }, // 8
  { ch: "九", base: "jiu",  tone: 3, accented: "jiǔ"  }, // 9
];
const TEN = { ch: "十", base: "shi", tone: 2, accented: "shí" };

// Shared shape for both numbers and vocabulary words: a hanzi string plus
// the canonical accented pinyin, one syllable per entry.
function makeEntry(syllables, value) {
  return {
    value,
    hanzi: syllables.map((s) => s.ch).join(""),
    pinyinDisplay: syllables.map((s) => s.accented).join(" "),
    // Canonical accented syllables, one per space-separated syllable the
    // learner is expected to type — used to check exact tone-mark placement.
    syllableAccents: syllables.map((s) => s.accented.toLowerCase()),
  };
}

function buildNumber(n) {
  let syllables;
  if (n === 0) {
    syllables = [DIGITS[0]];
  } else if (n < 10) {
    syllables = [DIGITS[n]];
  } else if (n === 10) {
    syllables = [TEN];
  } else if (n < 20) {
    syllables = [TEN, DIGITS[n - 10]];
  } else {
    const tensDigit = Math.floor(n / 10);
    const ones = n % 10;
    syllables = ones === 0 ? [DIGITS[tensDigit], TEN] : [DIGITS[tensDigit], TEN, DIGITS[ones]];
  }
  return makeEntry(syllables, n);
}

const ALL_NUMBERS = Array.from({ length: 100 }, (_, n) => buildNumber(n));

// ---------------------------------------------------------------------------
// Vocabulary words: only characters/words that actually appear in the
// teacher's recap-grid review images (class_material/1-3, 7-9, 10-24), up to
// the red divider bar she draws to mark how far the class has covered.
// The grid grows lesson by lesson: 來/去/回/歡/迎/上/接/什麼/咖啡/牛奶/水
// entered with PDF 12-13, 紅/烏/龍/喜/要 with PDF 15, 妳/您/她/哪/家/呢/很
// with PDF 17, and Lesson 2's 秋/節/餅/柚/烤/肉/祝/快/樂/第/張/怡/君/安/同/
// 田/誠/哥/弟/妹 with PDF 18, 幾/誰/進/坐/看/照/相 with PDF 19 and 片 with
// PDF 20 (past the divider, but the weekly test runs "till 片"), 漂/亮/多/都
// with PDF 21, 兄/伯/叔/阿/姨/名/字/書/兩 with PDF 22 (test "till 兩"), and
// 朋/友 plus the next grid page's 男/女/次/母 with PDF 23, and 太/說/打/球
// with PDF 24 (test "till 球").
// Still left out: anything sourced only from
// title slides or example sentences (e.g. 起 from "一起").
// Traditional characters throughout. Neutral-tone syllables (e.g. the second
// 謝 in 謝謝, or 的/子/個/了/嗎/們) carry no accent, matching how the slides
// themselves mark them. 不 appears twice with different tones — bù in 不可以
// (no sandhi, since 可 is 3rd tone) and bú in 不客氣 (sandhi, since 客 is
// 4th tone) — exactly as the slides distinguish them.
// ---------------------------------------------------------------------------

const WORD_DEFS = [
  [{ ch: "班", accented: "bān" }, { ch: "代", accented: "dài" }], // 班代 class rep
  [{ ch: "老", accented: "lǎo" }, { ch: "師", accented: "shī" }], // 老師 teacher
  [{ ch: "你", accented: "nǐ" }, { ch: "好", accented: "hǎo" }], // 你好 hello
  [{ ch: "老", accented: "lǎo" }, { ch: "師", accented: "shī" }, { ch: "早", accented: "zǎo" }], // 老師早 morning teacher
  [{ ch: "謝", accented: "xiè" }, { ch: "謝", accented: "xie" }], // 謝謝 thank you
  [{ ch: "再", accented: "zài" }, { ch: "見", accented: "jiàn" }], // 再見 goodbye
  [{ ch: "有", accented: "yǒu" }], // 有 to have
  [{ ch: "問", accented: "wèn" }, { ch: "題", accented: "tí" }], // 問題 problem
  [{ ch: "有", accented: "yǒu" }, { ch: "問", accented: "wèn" }, { ch: "題", accented: "tí" }, { ch: "嗎", accented: "ma" }], // 有問題嗎 any questions?
  [{ ch: "沒", accented: "méi" }, { ch: "有", accented: "yǒu" }], // 沒有 don't have
  [{ ch: "好", accented: "hǎo" }, { ch: "了", accented: "le" }], // 好了 done/ready
  [{ ch: "還", accented: "hái" }, { ch: "沒", accented: "méi" }], // 還沒 not yet
  [{ ch: "可", accented: "kě" }, { ch: "以", accented: "yǐ" }], // 可以 can/may
  [{ ch: "不", accented: "bù" }, { ch: "可", accented: "kě" }, { ch: "以", accented: "yǐ" }], // 不可以 cannot
  [{ ch: "不", accented: "bú" }, { ch: "客", accented: "kè" }, { ch: "氣", accented: "qì" }], // 不客氣 you're welcome
  [{ ch: "對", accented: "duì" }, { ch: "不", accented: "bù" }, { ch: "起", accented: "qǐ" }], // 對不起 sorry
  [{ ch: "沒", accented: "méi" }, { ch: "關", accented: "guān" }, { ch: "係", accented: "xi" }], // 沒關係 it's okay
  [{ ch: "下", accented: "xià" }, { ch: "課", accented: "kè" }], // 下課 end of class
  [{ ch: "中", accented: "zhōng" }, { ch: "國", accented: "guó" }], // 中國 China
  [{ ch: "台", accented: "tái" }, { ch: "灣", accented: "wān" }], // 台灣 Taiwan
  [{ ch: "是", accented: "shì" }], // 是 to be
  [{ ch: "馬", accented: "mǎ" }], // 馬 horse
  [{ ch: "媽", accented: "mā" }, { ch: "媽", accented: "ma" }], // 媽媽 mom
  [{ ch: "房", accented: "fáng" }, { ch: "子", accented: "zi" }], // 房子 house
  [{ ch: "我", accented: "wǒ" }, { ch: "的", accented: "de" }], // 我的 my
  [{ ch: "爸", accented: "bà" }, { ch: "爸", accented: "ba" }], // 爸爸 dad
  [{ ch: "這", accented: "zhè" }, { ch: "個", accented: "ge" }], // 這個 this
  [{ ch: "月", accented: "yuè" }], // 月 moon/month
  [{ ch: "小", accented: "xiǎo" }, { ch: "鹿", accented: "lù" }], // 小鹿 fawn
  [{ ch: "喝", accented: "hē" }], // 喝 to drink
  [{ ch: "綠", accented: "lǜ" }, { ch: "茶", accented: "chá" }], // 綠茶 green tea
  [{ ch: "電", accented: "diàn" }, { ch: "話", accented: "huà" }], // 電話 phone
  [{ ch: "號", accented: "hào" }, { ch: "碼", accented: "mǎ" }], // 號碼 number
  [{ ch: "手", accented: "shǒu" }, { ch: "機", accented: "jī" }], // 手機 cellphone
  [{ ch: "日", accented: "rì" }], // 日 day
  [{ ch: "生", accented: "shēng" }, { ch: "日", accented: "rì" }], // 生日 birthday
  [{ ch: "星", accented: "xīng" }, { ch: "期", accented: "qí" }], // 星期 week
  [{ ch: "今", accented: "jīn" }, { ch: "天", accented: "tiān" }], // 今天 today
  [{ ch: "昨", accented: "zuó" }, { ch: "天", accented: "tiān" }], // 昨天 yesterday
  [{ ch: "明", accented: "míng" }, { ch: "天", accented: "tiān" }], // 明天 tomorrow
  [{ ch: "陳", accented: "chén" }, { ch: "月", accented: "yuè" }, { ch: "美", accented: "měi" }], // 陳月美 (name)
  [{ ch: "李", accented: "lǐ" }, { ch: "明", accented: "míng" }, { ch: "華", accented: "huá" }], // 李明華 (name)
  [{ ch: "王", accented: "wáng" }, { ch: "開", accented: "kāi" }, { ch: "文", accented: "wén" }], // 王開文 (name)
  [{ ch: "叫", accented: "jiào" }], // 叫 to be called
  [{ ch: "姓", accented: "xìng" }], // 姓 to be surnamed
  [{ ch: "請", accented: "qǐng" }, { ch: "問", accented: "wèn" }], // 請問 excuse me...
  [{ ch: "先", accented: "xiān" }, { ch: "生", accented: "shēng" }], // 先生 Mr.
  [{ ch: "小", accented: "xiǎo" }, { ch: "姐", accented: "jiě" }], // 小姐 Miss
  [{ ch: "那", accented: "nà" }], // 那 that
  [{ ch: "日", accented: "rì" }, { ch: "本", accented: "běn" }], // 日本 Japan
  [{ ch: "英", accented: "yīng" }, { ch: "國", accented: "guó" }], // 英國 UK
  [{ ch: "美", accented: "měi" }, { ch: "國", accented: "guó" }], // 美國 USA
  [{ ch: "印", accented: "yìn" }, { ch: "度", accented: "dù" }], // 印度 India
  [{ ch: "人", accented: "rén" }], // 人 people
  [{ ch: "我", accented: "wǒ" }, { ch: "們", accented: "men" }], // 我們 we
  [{ ch: "你", accented: "nǐ" }, { ch: "們", accented: "men" }], // 你們 you (plural)
  [{ ch: "他", accented: "tā" }, { ch: "們", accented: "men" }], // 他們 they
  [{ ch: "來", accented: "lái" }], // 來 to come
  [{ ch: "去", accented: "qù" }], // 去 to go
  [{ ch: "回", accented: "huí" }], // 回 to return
  [{ ch: "歡", accented: "huān" }, { ch: "迎", accented: "yíng" }], // 歡迎 welcome
  [{ ch: "上", accented: "shàng" }], // 上 up (上課/上班)
  [{ ch: "接", accented: "jiē" }], // 接 to pick sb up
  [{ ch: "什", accented: "shén" }, { ch: "麼", accented: "me" }], // 什麼 what
  [{ ch: "咖", accented: "kā" }, { ch: "啡", accented: "fēi" }], // 咖啡 coffee
  [{ ch: "牛", accented: "niú" }, { ch: "奶", accented: "nǎi" }], // 牛奶 milk
  [{ ch: "水", accented: "shuǐ" }], // 水 water
  [{ ch: "紅", accented: "hóng" }, { ch: "茶", accented: "chá" }], // 紅茶 black tea
  [{ ch: "烏", accented: "wū" }, { ch: "龍", accented: "lóng" }, { ch: "茶", accented: "chá" }], // 烏龍茶 oolong tea
  [{ ch: "喜", accented: "xǐ" }, { ch: "歡", accented: "huān" }], // 喜歡 to like
  [{ ch: "要", accented: "yào" }], // 要 to want
  [{ ch: "妳", accented: "nǐ" }], // 妳 you (addressing a woman)
  [{ ch: "您", accented: "nín" }], // 您 you (polite)
  [{ ch: "她", accented: "tā" }], // 她 she
  [{ ch: "哪", accented: "nǎ" }], // 哪 which
  [{ ch: "國", accented: "guó" }, { ch: "家", accented: "jiā" }], // 國家 country
  [{ ch: "呢", accented: "ne" }], // 呢 ...and you? (question particle)
  [{ ch: "很", accented: "hěn" }], // 很 very
  // Lesson 2 (PDF 18)
  [{ ch: "中", accented: "zhōng" }, { ch: "秋", accented: "qiū" }, { ch: "節", accented: "jié" }], // 中秋節 Mid-Autumn Festival
  [{ ch: "月", accented: "yuè" }, { ch: "餅", accented: "bǐng" }], // 月餅 mooncake
  [{ ch: "柚", accented: "yòu" }, { ch: "子", accented: "zi" }], // 柚子 pomelo
  [{ ch: "烤", accented: "kǎo" }, { ch: "肉", accented: "ròu" }], // 烤肉 barbecue
  [{ ch: "快", accented: "kuài" }, { ch: "樂", accented: "lè" }], // 快樂 happy
  [
    { ch: "祝", accented: "zhù" },
    { ch: "你", accented: "nǐ" },
    { ch: "生", accented: "shēng" },
    { ch: "日", accented: "rì" },
    { ch: "快", accented: "kuài" },
    { ch: "樂", accented: "lè" },
  ], // 祝你生日快樂 happy birthday
  [{ ch: "第", accented: "dì" }, { ch: "二", accented: "èr" }, { ch: "課", accented: "kè" }], // 第二課 Lesson 2
  [{ ch: "張", accented: "zhāng" }, { ch: "怡", accented: "yí" }, { ch: "君", accented: "jūn" }], // 張怡君 (name)
  [{ ch: "馬", accented: "mǎ" }, { ch: "安", accented: "ān" }, { ch: "同", accented: "tóng" }], // 馬安同 (name)
  [
    { ch: "田", accented: "tián" },
    { ch: "中", accented: "zhōng" },
    { ch: "誠", accented: "chéng" },
    { ch: "一", accented: "yī" },
  ], // 田中誠一 (name)
  [{ ch: "家", accented: "jiā" }, { ch: "人", accented: "rén" }], // 家人 family
  [{ ch: "哥", accented: "gē" }, { ch: "哥", accented: "ge" }], // 哥哥 older brother
  [{ ch: "姐", accented: "jiě" }, { ch: "姐", accented: "jie" }], // 姐姐 older sister
  [{ ch: "弟", accented: "dì" }, { ch: "弟", accented: "di" }], // 弟弟 younger brother
  [{ ch: "妹", accented: "mèi" }, { ch: "妹", accented: "mei" }], // 妹妹 younger sister
  // PDF 19-20
  [{ ch: "幾", accented: "jǐ" }], // 幾 how many
  [{ ch: "誰", accented: "shéi" }], // 誰 who
  [{ ch: "請", accented: "qǐng" }, { ch: "進", accented: "jìn" }], // 請進 please come in
  [{ ch: "進", accented: "jìn" }, { ch: "來", accented: "lái" }], // 進來 come in
  [{ ch: "進", accented: "jìn" }, { ch: "去", accented: "qù" }], // 進去 go in
  [{ ch: "請", accented: "qǐng" }, { ch: "坐", accented: "zuò" }], // 請坐 please sit
  [{ ch: "看", accented: "kàn" }], // 看 to look, watch
  [{ ch: "課", accented: "kè" }, { ch: "本", accented: "běn" }], // 課本 textbook
  [{ ch: "照", accented: "zhào" }, { ch: "相", accented: "xiàng" }], // 照相 take a photo
  [{ ch: "照", accented: "zhào" }, { ch: "片", accented: "piàn" }], // 照片 photo
  [{ ch: "相", accented: "xiàng" }, { ch: "片", accented: "piàn" }], // 相片 photo
  [{ ch: "好", accented: "hǎo" }, { ch: "看", accented: "kàn" }], // 好看 good-looking
  [{ ch: "可", accented: "kě" }, { ch: "是", accented: "shì" }], // 可是 but
  // PDF 21-22
  [{ ch: "漂", accented: "piào" }, { ch: "亮", accented: "liàng" }], // 漂亮 pretty
  [{ ch: "多", accented: "duō" }], // 多 many, much
  [{ ch: "很", accented: "hěn" }, { ch: "多", accented: "duō" }], // 很多 a lot of
  [{ ch: "都", accented: "dōu" }], // 都 all, both
  [{ ch: "兄", accented: "xiōng" }, { ch: "弟", accented: "dì" }], // 兄弟 brothers
  [{ ch: "姐", accented: "jiě" }, { ch: "妹", accented: "mèi" }], // 姐妹 sisters
  [{ ch: "兄", accented: "xiōng" }, { ch: "弟", accented: "dì" }, { ch: "姐", accented: "jiě" }, { ch: "妹", accented: "mèi" }], // 兄弟姐妹 siblings
  [{ ch: "伯", accented: "bó" }, { ch: "伯", accented: "bo" }], // 伯伯 uncle (dad's older brother)
  [{ ch: "叔", accented: "shú" }, { ch: "叔", accented: "shu" }], // 叔叔 uncle (dad's younger brother)
  [{ ch: "阿", accented: "ā" }, { ch: "姨", accented: "yí" }], // 阿姨 aunt (mom's sister)
  [{ ch: "名", accented: "míng" }, { ch: "字", accented: "zi" }], // 名字 name
  [{ ch: "書", accented: "shū" }], // 書 book
  [{ ch: "看", accented: "kàn" }, { ch: "書", accented: "shū" }], // 看書 read a book
  [{ ch: "兩", accented: "liǎng" }], // 兩 two (of something)
  [{ ch: "兩", accented: "liǎng" }, { ch: "本", accented: "běn" }, { ch: "書", accented: "shū" }], // 兩本書 two books
  [{ ch: "兩", accented: "liǎng" }, { ch: "張", accented: "zhāng" }, { ch: "照", accented: "zhào" }, { ch: "片", accented: "piàn" }], // 兩張照片 two photos
  [{ ch: "中", accented: "zhōng" }, { ch: "文", accented: "wén" }], // 中文 Chinese (language)
  // PDF 23
  [{ ch: "朋", accented: "péng" }, { ch: "友", accented: "yǒu" }], // 朋友 friend
  [{ ch: "男", accented: "nán" }], // 男 male
  [{ ch: "女", accented: "nǚ" }], // 女 female
  [{ ch: "男", accented: "nán" }, { ch: "朋", accented: "péng" }, { ch: "友", accented: "yǒu" }], // 男朋友 boyfriend
  [{ ch: "女", accented: "nǚ" }, { ch: "朋", accented: "péng" }, { ch: "友", accented: "yǒu" }], // 女朋友 girlfriend
  [{ ch: "次", accented: "cì" }], // 次 time (measure word for actions)
  [{ ch: "一", accented: "yí" }, { ch: "次", accented: "cì" }], // 一次 once
  [{ ch: "再", accented: "zài" }, { ch: "看", accented: "kàn" }, { ch: "一", accented: "yí" }, { ch: "次", accented: "cì" }], // 再看一次 look once more
  [{ ch: "伯", accented: "bó" }, { ch: "母", accented: "mǔ" }], // 伯母 auntie (polite, a friend's mother)
  // PDF 24
  [{ ch: "太", accented: "tài" }, { ch: "太", accented: "tai" }], // 太太 Mrs., wife
  [{ ch: "說", accented: "shuō" }], // 說 to say, speak
  [{ ch: "說", accented: "shuō" }, { ch: "話", accented: "huà" }], // 說話 to talk
  [{ ch: "打", accented: "dǎ" }, { ch: "球", accented: "qiú" }], // 打球 to play ball games
  [{ ch: "男", accented: "nán" }, { ch: "人", accented: "rén" }], // 男人 man
  [{ ch: "女", accented: "nǚ" }, { ch: "人", accented: "rén" }], // 女人 woman
  [{ ch: "男", accented: "nán" }, { ch: "生", accented: "shēng" }], // 男生 male student, guy
  [{ ch: "女", accented: "nǚ" }, { ch: "生", accented: "shēng" }], // 女生 female student, girl
  [{ ch: "男", accented: "nán" }, { ch: "老", accented: "lǎo" }, { ch: "師", accented: "shī" }], // 男老師 male teacher
  [{ ch: "女", accented: "nǚ" }, { ch: "老", accented: "lǎo" }, { ch: "師", accented: "shī" }], // 女老師 female teacher
];

const WORDS = WORD_DEFS.map((syllables, i) => makeEntry(syllables, `word-${i}`));

// ---------------------------------------------------------------------------
// Answer parsing.
//
// The tone digit must sit immediately after the letter the learner believes
// carries the tone mark — not just at the end of the syllable — so e.g. 二
// (èr) requires "e4r", not "er4", and 零 (líng) requires "li2ng", not
// "ling2". This is what actually tests whether they know where the mark
// goes, instead of letting them always bolt the number onto the end.
// Already-accented pinyin (āáǎà...) typed via an IME is also accepted as-is.
// ---------------------------------------------------------------------------

const VOWEL_ACCENTS = {
  a: ["ā", "á", "ǎ", "à"],
  e: ["ē", "é", "ě", "è"],
  i: ["ī", "í", "ǐ", "ì"],
  o: ["ō", "ó", "ǒ", "ò"],
  u: ["ū", "ú", "ǔ", "ù"],
  v: ["ǖ", "ǘ", "ǚ", "ǜ"], // ü, typed as v
};

const ACCENTED_LETTER_RE = /^[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+$/;

function accentChar(letter, tone) {
  const table = VOWEL_ACCENTS[letter];
  return table ? table[tone - 1] || null : null;
}

// Reconstructs the accented syllable a single space-separated word encodes,
// or null if it's not a valid/complete syllable.
function parseSyllableWord(rawWord) {
  // A typed ü (phone keyboards may send u + a combining ¨, hence NFC) means
  // the same as the v shortcut; any v left unmarked is written back as ü.
  const word = rawWord.normalize("NFC").toLowerCase().replace(/ü/g, "v");
  const digitMatch = word.match(/^([a-z]*)([1-4])([a-z]*)$/);
  if (digitMatch) {
    const [, pre, toneStr, post] = digitMatch;
    if (!pre) return null; // digit with no preceding letter to mark
    const mark = accentChar(pre[pre.length - 1], parseInt(toneStr, 10));
    if (!mark) return null; // marked a consonant, not a vowel
    return (pre.slice(0, -1) + mark + post).replace(/v/g, "ü");
  }
  if (ACCENTED_LETTER_RE.test(word)) return word.replace(/v/g, "ü"); // already-accented input
  return null;
}

function parseUserInput(raw) {
  return raw.trim().split(/\s+/).filter(Boolean).map(parseSyllableWord);
}

function syllablesMatch(userSyllables, expected) {
  if (userSyllables.length !== expected.length) return false;
  return userSyllables.every((s, i) => s !== null && s === expected[i]);
}

// ---------------------------------------------------------------------------
// Full character index: every distinct hanzi taught so far, each mapped to
// its canonical accented pinyin (first occurrence wins when a character
// shows up more than once — e.g. 媽 is mā the first time and neutral-toned
// the second time in 媽媽; the primary/dictionary tone is what gets indexed).
// This powers two extra practice modes built from the same underlying data:
//   - Homophones: characters that share a base syllable but differ in tone
//     (七/氣/起/期 are all "qi" in all four different tones, for instance) —
//     shown together so the learner has to tell them apart by tone alone.
//   - Combo: two random characters mashed together, not necessarily a real
//     word, so familiarity with whole words can't be used as a shortcut.
// ---------------------------------------------------------------------------

// Reverse of VOWEL_ACCENTS: accented vowel -> its plain letter.
const DECODE_ACCENT = {};
for (const [letter, table] of Object.entries(VOWEL_ACCENTS)) {
  table.forEach((ch) => {
    DECODE_ACCENT[ch] = letter;
  });
}

function toBaseSyllable(accented) {
  let base = "";
  for (const ch of accented) base += DECODE_ACCENT[ch] || ch;
  return base;
}

const CHAR_INDEX = (() => {
  const seen = new Map(); // ch -> {ch, accented}
  const add = (ch, accented) => {
    if (!seen.has(ch)) seen.set(ch, { ch, accented });
  };
  DIGITS.forEach((d) => add(d.ch, d.accented));
  add(TEN.ch, TEN.accented);
  WORD_DEFS.forEach((syllables) => syllables.forEach((s) => add(s.ch, s.accented)));
  return [...seen.values()];
})();

// Reverse lookup for the Quick Reference sidebar: accented syllable (lower-
// cased) -> every taught character pronounced that way. Almost always one
// character, but kept as an array in case two taught characters ever share
// an identical base+tone.
const PINYIN_LOOKUP = (() => {
  const map = new Map();
  for (const entry of CHAR_INDEX) {
    const key = entry.accented.toLowerCase();
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(entry.ch);
  }
  return map;
})();

const HOMOPHONE_GROUPS = (() => {
  const byBase = new Map();
  for (const entry of CHAR_INDEX) {
    const base = toBaseSyllable(entry.accented);
    if (!byBase.has(base)) byBase.set(base, []);
    byBase.get(base).push(entry);
  }
  return [...byBase.values()]
    // Two different tones is the whole point — 你/妳 and 他/她 share a base
    // *and* a tone, so pairing them would test nothing.
    .filter((group) => new Set(group.map((e) => e.accented)).size >= 2)
    .map((group, i) => makeEntry(group, `homo-${i}`));
})();

const COMBO_PAIRS = (() => {
  const pairs = [];
  for (let i = 0; i < CHAR_INDEX.length; i++) {
    for (let j = i + 1; j < CHAR_INDEX.length; j++) {
      pairs.push(makeEntry([CHAR_INDEX[i], CHAR_INDEX[j]], `combo-${i}-${j}`));
    }
  }
  return pairs;
})();

// For each character, a real word it's actually used in — shown as context
// under the answer in Homophones/Combo modes, since those two modes strip
// characters out of any meaningful word. Prefers real vocabulary (WORD_DEFS);
// falls back to a two-digit number for the few digits that never appear in
// a word (e.g. 七 only shows up standalone, so its example is 十七).
const CHAR_EXAMPLES = (() => {
  const examples = new Map(); // ch -> {hanzi, pinyinDisplay}
  for (const syllables of WORD_DEFS) {
    const hanzi = syllables.map((s) => s.ch).join("");
    const pinyinDisplay = syllables.map((s) => s.accented).join(" ");
    for (const s of syllables) {
      if (!examples.has(s.ch)) examples.set(s.ch, { hanzi, pinyinDisplay });
    }
  }
  for (const n of ALL_NUMBERS) {
    if (n.value < 10) continue; // skip the trivial single-digit self-match
    for (const ch of n.hanzi) {
      if (!examples.has(ch)) examples.set(ch, { hanzi: n.hanzi, pinyinDisplay: n.pinyinDisplay });
    }
  }
  return examples;
})();

// ---------------------------------------------------------------------------
// Look-alikes: characters sharing a visible part, shown together so they have
// to be told apart rather than recognised one at a time. Hand-picked, since
// shape isn't in the data. Characters not yet in the syllabus are dropped, and
// a group needs two left. The note is shown with the answer.
// ---------------------------------------------------------------------------

const LOOKALIKE_DEFS = [
  { chars: "開關問們", note: "All contain 門 (door)." },
  { chars: "馬媽嗎碼", note: "All contain 馬 (horse)." },
  { chars: "還迎這", note: "All have 辶, the “walk” radical." },
  { chars: "謝課話請誠", note: "All have 訁, the “speech” radical, on the left." },
  { chars: "叫喝哪呢", note: "All have 口 (mouth) on the left." },
  { chars: "好姐姓奶妹", note: "All have 女 (woman) on the left." },
  { chars: "你妳您", note: "妳 swaps in 女 for a woman; 您 adds 心 underneath to be polite." },
  { chars: "他她", note: "亻 (person) vs 女 (woman) on the left." },
  { chars: "生星姓牛", note: "星 and 姓 contain 生; 牛 just looks like it." },
  { chars: "茶英華", note: "All have 艹 (grass) on top." },
  { chars: "客家安", note: "All have 宀 (roof) on top." },
  { chars: "電零", note: "Both have 雨 (rain) on top." },
  { chars: "紅綠", note: "Both have 糸 (silk) on the left." },
  { chars: "回四國", note: "All boxed in by 囗." },
  { chars: "日明昨", note: "日 (sun), and 日 on the left." },
  { chars: "早是星", note: "All have 日 (sun) on top." },
  { chars: "月有期", note: "All contain 月 (moon)." },
  { chars: "是題", note: "題 contains 是." },
  { chars: "了子李", note: "子 is 了 with a line across; 李 has 子 underneath." },
  { chars: "十什", note: "什 is 亻 + 十." },
  { chars: "二三王", note: "Stacked lines — 王 is 三 with a stroke through it." },
  { chars: "上下", note: "Mirror images." },
  { chars: "人八", note: "人's strokes meet at the top; 八's don't." },
  { chars: "那哪", note: "哪 is 口 + 那." },
  { chars: "度麼房鹿", note: "All have a roof over the top left." },
  { chars: "烏馬", note: "Both end in four dots (灬)." },
  { chars: "本來機", note: "All built on 木 (tree)." },
  // Lesson 2
  { chars: "可哥", note: "哥 is 可 stacked twice." },
  { chars: "弟第", note: "第 looks like 弟 with ⺮ (bamboo) on top." },
  { chars: "第節", note: "Both have ⺮ (bamboo) on top." },
  { chars: "日田", note: "日 is a box split once; 田 is split into four." },
  { chars: "快怡", note: "Both have 忄 (heart) on the left." },
  { chars: "秋烤", note: "Both contain 火 (fire)." },
  // PDF 19-20
  { chars: "誰進", note: "Both contain 隹 — 訁 (speech) for 誰, 辶 (walk) for 進." },
  { chars: "幾機", note: "機 is 木 (tree) + 幾." },
  { chars: "看相", note: "Both contain 目 (eye)." },
  { chars: "照烏馬", note: "All end in four dots (灬)." },
  { chars: "進還迎這", note: "All have 辶, the “walk” radical." },
  // PDF 21-22
  { chars: "都那阿陳", note: "All have 阝 — on the right in 都 and 那, on the left in 阿 and 陳." },
  { chars: "名多", note: "Both built from 夕 — 多 is two of them, 名 is 夕 over 口." },
  { chars: "祝兄", note: "祝 is 礻 + 兄." },
  { chars: "伯他們代你", note: "All have 亻 (person) on the left." },
  { chars: "漂沒灣", note: "All have 氵 (water) on the left." },
  { chars: "字客家安", note: "All have 宀 (roof) on top — 字 is 子 under it." },
  { chars: "姨好姐姓奶妹", note: "All have 女 (woman) on the left." },
  // PDF 23
  { chars: "朋月", note: "朋 is two 月 side by side." },
  { chars: "友有", note: "Same top — 友 has 又 underneath, 有 has 月." },
  { chars: "友叔", note: "Both contain 又." },
  { chars: "男田", note: "男 is 田 (field) over 力 (strength)." },
  { chars: "女她好", note: "女 on its own, then as the left side." },
  { chars: "次歡", note: "Both have 欠 on the right." },
  // PDF 24
  { chars: "太天", note: "Both grow out of 大 (big): 太 adds a dot, 天 a line on top." },
  { chars: "說話誰", note: "All have 訁 (speech) on the left." },
  { chars: "打接", note: "Both have 扌 (hand) on the left." },
  { chars: "球班王", note: "球 has 王 (jade) on the left; 班 has two of them." },
];

const LOOKALIKES = LOOKALIKE_DEFS.map((def, i) => {
  const syllables = [...def.chars].map((ch) => CHAR_INDEX.find((e) => e.ch === ch)).filter(Boolean);
  if (syllables.length < 2) return null;
  return { ...makeEntry(syllables, `look-${i}`), kind: "lookalike", syllables, note: def.note };
}).filter(Boolean);

// Reshuffled each time it's shown, so a group can't be answered from memory of
// the order. The value stays the same, so mistakes still track the group.
function presentable(entry) {
  if (entry.kind !== "lookalike") return entry;
  return { ...entry, ...makeEntry(shuffled(entry.syllables), entry.value) };
}

// ---------------------------------------------------------------------------
// Word Order: the weekly test's rearrange-the-sentence format
// (class_material/17, slide 25). Chunks follow the slide's own cuts — 是 and
// 不是 stay separate, so a V-not-V question has to be rebuilt, not recognised.
// `alts` lists other orders that are just as grammatical, so a valid answer
// is never marked wrong. Every character must already be in CHAR_INDEX.
// ---------------------------------------------------------------------------

const SENTENCE_DEFS = [
  // The five from the test slide itself.
  { chunks: ["請問", "你", "是", "不是", "日本人"], end: "？", gloss: "Excuse me, are you Japanese?" },
  { chunks: ["綠茶", "很", "好喝"], end: "。", gloss: "Green tea is delicious." },
  { chunks: ["我", "很", "喜歡", "喝", "咖啡"], end: "。", gloss: "I really like drinking coffee." },
  { chunks: ["陳先生", "不", "是", "美國人", "嗎"], end: "？", gloss: "Isn't Mr. Chen American?" },
  { chunks: ["歡迎", "你", "來", "台灣"], end: "。", gloss: "Welcome to Taiwan." },
  // Same patterns, built from the rest of the syllabus.
  {
    chunks: ["妳的", "生日", "是", "不是", "明天"],
    alts: [["明天", "是", "不是", "妳的", "生日"]],
    end: "？",
    gloss: "Is your birthday tomorrow?",
  },
  { chunks: ["那個", "房子", "很", "美"], end: "。", gloss: "That house is beautiful." },
  { chunks: ["他", "有", "沒有", "手機"], end: "？", gloss: "Does he have a mobile phone?" },
  { chunks: ["你", "喜", "不喜歡", "喝", "烏龍茶"], end: "？", gloss: "Do you like oolong tea?" },
  {
    chunks: ["今天", "我", "要", "回家"],
    alts: [["我", "今天", "要", "回家"]],
    end: "。",
    gloss: "I'm going home today.",
  },
  { chunks: ["那個", "小姐", "是", "哪國人"], end: "？", gloss: "What nationality is that woman?" },
  {
    chunks: ["我們", "去", "接", "老師"],
    alts: [{ chunks: ["老師", "去", "接", "我們"], gloss: "The teacher is going to pick us up." }],
    end: "。",
    gloss: "We're going to pick up the teacher.",
  },
  { chunks: ["你們", "有沒有", "我的", "電話號碼"], end: "？", gloss: "Do you have my phone number?" },
  { chunks: ["這個", "牛奶", "很", "好喝"], end: "。", gloss: "This milk is delicious." },
  {
    chunks: ["我", "喝", "紅茶，", "你", "呢"],
    alts: [{ chunks: ["你", "喝", "紅茶，", "我", "呢"], gloss: "You drink black tea — and me?" }],
    end: "？",
    gloss: "I drink black tea — and you?",
  },
  // Long two-clause sentences from the 作業六 slide, for Hard.
  {
    chunks: ["李小姐", "不", "喜歡", "喝", "牛奶，", "她", "喜歡", "喝", "綠茶"],
    alts: [
      {
        chunks: ["李小姐", "喜歡", "喝", "牛奶，", "她", "不", "喜歡", "喝", "綠茶"],
        gloss: "Miss Li likes drinking milk; she doesn't like green tea.",
      },
    ],
    end: "。",
    gloss: "Miss Li doesn't like drinking milk; she likes green tea.",
  },
  {
    chunks: ["你的", "印度", "老師", "今天", "來，", "你", "要", "去", "接", "他", "嗎"],
    alts: [["今天", "你的", "印度", "老師", "來，", "你", "要", "去", "接", "他", "嗎"]],
    end: "？",
    gloss: "Your Indian teacher is coming today — are you going to pick him up?",
  },
  {
    chunks: ["王開文", "要", "來", "印度，", "你們", "有", "他的", "電話號碼", "嗎"],
    end: "？",
    gloss: "Wang Kaiwen is coming to India — do you have his phone number?",
  },
  // Lesson 2 (PDF 18): greetings, 對話二, and the 很 / V-not-V slide.
  { chunks: ["祝", "你", "生日", "快樂"], end: "。", gloss: "Happy birthday to you." },
  { chunks: ["祝", "你", "中秋節", "快樂"], end: "。", gloss: "Happy Mid-Autumn Festival to you." },
  { chunks: ["台灣人", "喜歡", "喝", "茶"], end: "。", gloss: "Taiwanese people like drinking tea." },
  { chunks: ["日本", "茶", "好喝", "嗎"], end: "？", gloss: "Is Japanese tea good?" },
  { chunks: ["陳小姐的", "奶奶", "不", "老"], end: "。", gloss: "Miss Chen's grandma isn't old." },
  {
    chunks: ["我", "不", "喝", "咖啡，", "我", "喜歡", "喝", "茶"],
    alts: [
      { chunks: ["我", "喜歡", "喝", "咖啡，", "我", "不", "喝", "茶"], gloss: "I like drinking coffee — I don't drink tea." },
    ],
    end: "。",
    gloss: "I don't drink coffee — I like drinking tea.",
  },
  // PDF 19: the word-order test slide, then the 幾 / 誰 / 看 / 照相 examples.
  { chunks: ["你", "要", "來", "印度", "喝", "奶茶", "嗎"], end: "？", gloss: "Will you come to India to drink milk tea?" },
  { chunks: ["請問", "您", "是", "陳中華", "老師", "嗎"], end: "？", gloss: "Excuse me, are you Teacher Chen Zhonghua?" },
  { chunks: ["你的", "老師", "要", "不要", "喝", "牛奶"], end: "？", gloss: "Does your teacher want milk?" },
  {
    chunks: ["我", "星期五", "要", "去", "印度", "喝", "奶茶"],
    alts: [["星期五", "我", "要", "去", "印度", "喝", "奶茶"]],
    end: "。",
    gloss: "On Friday I'm going to India to drink milk tea.",
  },
  {
    chunks: ["他們", "來", "接", "我", "去", "上", "英文", "課"],
    alts: [{ chunks: ["我", "來", "接", "他們", "去", "上", "英文", "課"], gloss: "I'm coming to take them to English class." }],
    end: "。",
    gloss: "They're coming to take me to English class.",
  },
  { chunks: ["老師", "很", "喜歡", "喝", "台灣", "烏龍茶"], end: "。", gloss: "The teacher really likes Taiwanese oolong tea." },
  { chunks: ["你的", "生日", "是", "幾月", "幾號"], end: "？", gloss: "What date is your birthday?" },
  { chunks: ["你", "有", "幾個", "台灣", "老師"], end: "？", gloss: "How many Taiwanese teachers do you have?" },
  {
    chunks: ["誰", "是", "你的", "英文", "老師"],
    alts: [["你的", "英文", "老師", "是", "誰"]],
    end: "？",
    gloss: "Who is your English teacher?",
  },
  { chunks: ["請問，", "誰的", "姐姐", "喜歡", "喝", "咖啡"], end: "？", gloss: "Excuse me, whose older sister likes coffee?" },
  {
    chunks: ["老師", "叫", "我們", "看", "課本"],
    alts: [{ chunks: ["我們", "叫", "老師", "看", "課本"], gloss: "We tell the teacher to read the textbook." }],
    end: "。",
    gloss: "The teacher tells us to read the textbook.",
  },
  { chunks: ["開文", "不", "喜歡", "看", "英文", "課本"], end: "。", gloss: "Kaiwen doesn't like reading the English textbook." },
  { chunks: ["弟弟", "很", "喜歡", "照相"], end: "。", gloss: "Younger brother really likes taking photos." },
  { chunks: ["英文", "老師", "不", "要", "照相"], end: "。", gloss: "The English teacher doesn't want a photo taken." },
  { chunks: ["誰的", "家人", "喜歡", "照相"], end: "？", gloss: "Whose family likes taking photos?" },
  // PDF 20: 照片 / 相片 with 張 as the measure word.
  { chunks: ["你", "有", "老師的", "照片", "嗎"], end: "？", gloss: "Do you have a photo of the teacher?" },
  { chunks: ["誠一", "很", "喜歡", "那張", "相片"], end: "。", gloss: "Seiichi really likes that photo." },
  { chunks: ["這", "三張", "照片", "是", "奶奶的"], end: "。", gloss: "These three photos are Grandma's." },
  // PDF 21: 好看 / 漂亮 / 多 / 都, the modification-marker drill and 對話一.
  { chunks: ["安同的", "妹妹", "很", "好看"], end: "。", gloss: "Antong's younger sister is very good-looking." },
  { chunks: ["這個", "房子", "不", "好看"], end: "。", gloss: "This house isn't nice-looking." },
  { chunks: ["那張", "相片", "好看", "嗎"], end: "？", gloss: "Is that photo nice?" },
  { chunks: ["怡君的", "老師", "不", "漂亮"], end: "。", gloss: "Yijun's teacher isn't pretty." },
  { chunks: ["誠一的", "姐姐", "漂亮", "嗎"], end: "？", gloss: "Is Seiichi's older sister pretty?" },
  { chunks: ["安同", "有", "很多", "好看的", "照片"], end: "。", gloss: "Antong has lots of nice photos." },
  { chunks: ["他的", "家人", "多", "不多"], end: "？", gloss: "Does he have a big family?" },
  {
    chunks: ["今天", "我", "有", "很多", "課"],
    alts: [["我", "今天", "有", "很多", "課"]],
    end: "。",
    gloss: "I have a lot of classes today.",
  },
  { chunks: ["今天", "我的", "課", "很", "多"], end: "。", gloss: "I have a lot of classes today." },
  { chunks: ["開文、月美", "都", "是", "台灣人"], end: "。", gloss: "Kaiwen and Yuemei are both Taiwanese." },
  { chunks: ["他們", "都", "姓", "張"], end: "。", gloss: "Their surname is Zhang, all of them." },
  { chunks: ["咖啡、茶，", "我", "都", "喜歡", "喝"], end: "。", gloss: "Coffee and tea — I like drinking both." },
  { chunks: ["英國、日本，", "媽媽", "都", "要", "去"], end: "。", gloss: "The UK and Japan — Mom wants to go to both." },
  {
    chunks: ["怡君、安同", "都", "不", "喝", "咖啡"],
    alts: [{ chunks: ["怡君、安同", "不", "都", "喝", "咖啡"], gloss: "Yijun and Antong don't both drink coffee." }],
    end: "。",
    gloss: "Neither Yijun nor Antong drinks coffee.",
  },
  {
    chunks: ["今天", "我們", "都", "沒", "課"],
    alts: [["我們", "今天", "都", "沒", "課"]],
    end: "。",
    gloss: "None of us have class today.",
  },
  {
    chunks: ["我們班", "不", "都", "是", "美國人"],
    alts: [{ chunks: ["我們班", "都", "不", "是", "美國人"], gloss: "Nobody in our class is American." }],
    end: "。",
    gloss: "Not everyone in our class is American.",
  },
  {
    chunks: ["印度人", "不", "都", "喝", "奶茶"],
    alts: [{ chunks: ["印度人", "都", "不", "喝", "奶茶"], gloss: "No Indians drink milk tea." }],
    end: "。",
    gloss: "Not all Indians drink milk tea.",
  },
  { chunks: ["你們", "都", "是", "老師"], end: "。", gloss: "You're both teachers." },
  { chunks: ["我們", "都", "喜歡", "喝", "咖啡"], end: "。", gloss: "We both like drinking coffee." },
  {
    chunks: ["你們", "都", "不", "要", "照相"],
    alts: [{ chunks: ["你們", "不", "都", "要", "照相"], gloss: "You don't both want a photo taken." }],
    end: "。",
    gloss: "Neither of you wants a photo taken.",
  },
  { chunks: ["很好看的", "人", "多", "不多"], end: "？", gloss: "Are there many good-looking people?" },
  { chunks: ["王老師", "要", "好喝的", "茶"], end: "。", gloss: "Teacher Wang wants good tea." },
  { chunks: ["我", "沒有", "很多", "好看的", "照片"], end: "。", gloss: "I don't have many nice photos." },
  { chunks: ["我", "喜歡", "漂亮的", "房子"], end: "。", gloss: "I like pretty houses." },
  { chunks: ["你家", "有", "很多", "照片"], end: "。", gloss: "Your home has lots of photos." },
  { chunks: ["我", "家人", "都", "喜歡", "照相"], end: "。", gloss: "Everyone in my family likes taking photos." },
  { chunks: ["這張", "照片", "很", "好看"], end: "。", gloss: "This photo is really nice." },
  { chunks: ["你", "家人", "都", "很", "好看"], end: "。", gloss: "Your family are all good-looking." },
  // PDF 22: 兄弟姐妹, 伯伯 / 叔叔 / 阿姨, 名字, 書, 兩 and 對話二.
  { chunks: ["他的", "姐妹", "都", "很", "好看"], end: "。", gloss: "His sisters are all good-looking." },
  { chunks: ["你的", "兄弟", "叫", "你", "喝", "茶"], end: "。", gloss: "Your brother is telling you to drink tea." },
  { chunks: ["張小姐", "有", "六個", "兄弟姐妹"], end: "。", gloss: "Miss Zhang has six brothers and sisters." },
  {
    chunks: ["爸爸的", "哥哥", "是", "伯伯"],
    alts: [["伯伯", "是", "爸爸的", "哥哥"]],
    end: "。",
    gloss: "Dad's older brother is 伯伯.",
  },
  { chunks: ["爸爸的", "弟弟", "叫", "叔叔"], end: "。", gloss: "Dad's younger brother is called 叔叔." },
  { chunks: ["媽媽的", "姐妹", "叫", "阿姨"], end: "。", gloss: "Mom's sisters are called 阿姨." },
  { chunks: ["你", "叫", "什麼", "名字"], end: "？", gloss: "What's your name?" },
  { chunks: ["你", "有", "中文", "名字", "嗎"], end: "？", gloss: "Do you have a Chinese name?" },
  { chunks: ["弟弟", "不", "喜歡", "看", "書"], end: "。", gloss: "Younger brother doesn't like reading." },
  { chunks: ["這本", "書", "很", "好看"], end: "。", gloss: "This book is really good." },
  { chunks: ["老師", "有", "一本", "好看的", "英文", "書"], end: "。", gloss: "The teacher has a good English book." },
  { chunks: ["你們家", "有", "很多", "書"], end: "。", gloss: "Your home has a lot of books." },
  { chunks: ["都", "是", "我哥哥的", "書"], end: "。", gloss: "They're all my older brother's books." },
  { chunks: ["他", "很", "喜歡", "看", "書"], end: "。", gloss: "He really likes reading." },
  { chunks: ["你家", "有", "幾個", "人"], end: "？", gloss: "How many people are in your family?" },
  { chunks: ["你", "有", "沒有", "兄弟姐妹"], end: "？", gloss: "Do you have any brothers or sisters?" },
  { chunks: ["我家", "有", "五個", "人，", "我", "有", "兩個", "妹妹"], end: "。", gloss: "There are five of us in my family — I have two younger sisters." },
  { chunks: ["我", "有", "兩張", "奶奶的", "照片"], end: "。", gloss: "I have two photos of Grandma." },
  // PDF 23: 誰 questions, the self-introduction, the 個 / 的 / 張 and 的 drills.
  { chunks: ["哪一張", "照片", "漂亮"], end: "？", gloss: "Which photo is pretty?" },
  {
    chunks: ["他們", "是", "誰"],
    alts: [["誰", "是", "他們"]],
    end: "？",
    gloss: "Who are they?",
  },
  { chunks: ["誰", "有", "很多", "書"], end: "？", gloss: "Who has a lot of books?" },
  { chunks: ["誰", "不", "喜歡", "看", "書"], end: "？", gloss: "Who doesn't like reading?" },
  { chunks: ["誰的", "爸爸", "喜歡", "照相"], end: "？", gloss: "Whose dad likes taking photos?" },
  { chunks: ["誰", "有", "好喝的", "茶"], end: "？", gloss: "Who has good tea?" },
  { chunks: ["我、我爸爸", "都", "是", "美國人"], end: "。", gloss: "My dad and I are both American." },
  { chunks: ["我", "沒有", "兄弟姐妹"], end: "。", gloss: "I don't have any brothers or sisters." },
  { chunks: ["我爸爸媽媽", "都", "喜歡", "喝茶、看書"], end: "。", gloss: "My mom and dad both like drinking tea and reading." },
  { chunks: ["我家", "有", "很多", "茶，", "有", "很多", "書"], end: "。", gloss: "My home has lots of tea and lots of books." },
  { chunks: ["我家", "有", "很多", "很漂亮的", "照片"], end: "。", gloss: "My home has lots of really pretty photos." },
  { chunks: ["王先生的", "老師", "很", "漂亮"], end: "。", gloss: "Mr. Wang's teacher is very pretty." },
  { chunks: ["我", "有", "很多", "好喝的", "茶"], end: "。", gloss: "I have lots of good tea." },
  { chunks: ["他", "有", "三個", "弟弟"], end: "。", gloss: "He has three younger brothers." },
  { chunks: ["李阿姨家", "有", "六個", "人"], end: "。", gloss: "There are six people in Auntie Li's family." },
  { chunks: ["陳小姐", "有", "五張", "照片"], end: "。", gloss: "Miss Chen has five photos." },
  {
    chunks: ["他的", "名字", "是", "馬安同"],
    alts: [["馬安同", "是", "他的", "名字"]],
    end: "。",
    gloss: "His name is Ma Antong.",
  },
  { chunks: ["陳先生的", "老師", "姓", "李"], end: "。", gloss: "Mr. Chen's teacher's surname is Li." },
  { chunks: ["你爸爸", "來", "不來"], end: "？", gloss: "Is your dad coming?" },
  { chunks: ["你們家", "很", "漂亮", "嗎"], end: "？", gloss: "Is your home very pretty?" },
  { chunks: ["伯母，", "您", "好"], end: "。", gloss: "Hello, Auntie." },
  { chunks: ["我", "有", "很多", "好", "兄弟"], end: "。", gloss: "I have lots of good brothers." },
  {
    chunks: ["星期天", "我", "要", "去", "伯伯家"],
    alts: [["我", "星期天", "要", "去", "伯伯家"]],
    end: "。",
    gloss: "On Sunday I'm going to my uncle's home.",
  },
  { chunks: ["你的", "阿姨", "喜歡", "喝", "什麼"], end: "？", gloss: "What does your aunt like to drink?" },
  { chunks: ["你", "喜歡", "看", "書", "嗎"], end: "？", gloss: "Do you like reading?" },
  { chunks: ["我", "有", "很多", "中文", "書"], end: "。", gloss: "I have lots of Chinese books." },
  { chunks: ["我們班", "有", "兩個", "老師"], end: "。", gloss: "There are two teachers in our class." },
  { chunks: ["我哥哥", "有", "兩張", "你的", "照片"], end: "。", gloss: "My older brother has two photos of you." },
  { chunks: ["請", "你", "再", "看", "一次"], end: "。", gloss: "Please look at it once more." },
  // PDF 24: the slides' 朋友 / 男女 / 次 / 節 / 伯母 prompts.
  { chunks: ["他", "是", "我的", "好", "朋友"], end: "。", gloss: "He is my good friend." },
  { chunks: ["我", "有", "很多", "印度", "朋友"], end: "。", gloss: "I have lots of Indian friends." },
  { chunks: ["那個", "男老師", "是", "台灣人"], end: "。", gloss: "That male teacher is Taiwanese." },
  { chunks: ["我們", "是", "好朋友，", "不是", "男女朋友"], end: "。", gloss: "We're good friends, not a couple." },
  {
    chunks: ["我", "一個星期", "喝", "三次", "咖啡"],
    alts: [["一個星期", "我", "喝", "三次", "咖啡"]],
    end: "。",
    gloss: "I drink coffee three times a week.",
  },
  { chunks: ["這", "是", "我", "第一次", "來", "台灣"], end: "。", gloss: "This is my first time in Taiwan." },
  { chunks: ["我們", "還", "有", "一節", "課"], end: "。", gloss: "We still have one class left." },
  {
    chunks: ["我們", "一個星期", "有", "兩節", "中文課"],
    alts: [["一個星期", "我們", "有", "兩節", "中文課"]],
    end: "。",
    gloss: "We have two Chinese lessons a week.",
  },
  { chunks: ["我伯母", "很", "喜歡", "喝", "茶"], end: "。", gloss: "My aunt (dad's older brother's wife) really likes tea." },
  {
    chunks: ["我阿姨", "今天", "要", "來", "我家"],
    alts: [["今天", "我阿姨", "要", "來", "我家"]],
    end: "。",
    gloss: "My aunt is coming to my home today.",
  },
];

const CHAR_PINYIN = new Map(CHAR_INDEX.map((e) => [e.ch, e.accented]));
const FOURTH_TONE_RE = /[àèìòùǜ]/;

// Word-segmented pinyin ("qǐngwèn nǐ shì búshì rìběnrén?"). 不 is resolved
// across the whole sentence first, since the syllable that decides bù vs bú
// can sit in the next chunk (陳先生 / 不 / 是).
function sentencePinyin(chunks, end) {
  const chars = chunks.flatMap((c) => [...c].filter((ch) => CHAR_PINYIN.has(ch)));
  const syl = chars.map((ch) => CHAR_PINYIN.get(ch));
  chars.forEach((ch, i) => {
    if (ch === "不") syl[i] = FOURTH_TONE_RE.test(syl[i + 1] || "") ? "bú" : "bù";
    // 一 before a measure word: yí before a 4th tone (次, and 個, underlyingly
    // gè), yì before 本 / 張 / 節. Elsewhere (誠一, 星期一) it stays yī, and so
    // does an ordinal: 第一次 is dì yī cì.
    if (ch === "一" && chars[i - 1] !== "第" && "個本張次節".includes(chars[i + 1] || ""))
      syl[i] = "個次".includes(chars[i + 1]) ? "yí" : "yì";
  });
  let k = 0;
  const words = chunks.map((c) => {
    const missing = [...c].filter((ch) => /\p{Script=Han}/u.test(ch) && !CHAR_PINYIN.has(ch));
    if (missing.length) console.error(`Word Order: ${missing.join("")} in "${c}" is not in the syllabus`);
    // 、 lists words inside one tile (開文、月美), so each part is its own word.
    const word = c
      .split("、")
      .map((part) => {
        const han = [...part].filter((ch) => CHAR_PINYIN.has(ch));
        return han
          .map(() => syl[k++])
          // A doubled character is neutral the second time: 哥哥 gēge, 奶奶 nǎinai.
          .map((s, i) => (i > 0 && han[i] === han[i - 1] ? toBaseSyllable(s).replace(/v/g, "ü") : s))
          // Standard pinyin apostrophe before an a/o/e syllable: xīngqí'èr, not xīngqíèr.
          .map((s, i) => (i > 0 && /^[aeoāáǎàēéěèōóǒò]/.test(s) ? `'${s}` : s))
          .join("");
      })
      .join(", ");
    return c.endsWith("，") ? `${word},` : word;
  });
  return words.join(" ") + (end === "？" ? "?" : ".");
}

// One reveal per accepted order, so a correct alternate shows *your* sentence
// and its meaning — 老師去接我們 is not the same claim as 我們去接老師.
function sentenceReveal(chunks, end, gloss) {
  return { hanzi: chunks.join("") + end, pinyinDisplay: sentencePinyin(chunks, end), gloss };
}


// ---------------------------------------------------------------------------
// Generated Word Order sentences: a small grammar. Vocabulary is tagged by
// type, each pattern has typed slots (喝 only takes drinks, 去 only places),
// and every pattern can be put in the four forms the assignments drill:
// statement, 嗎?, V-not-V and negative. Any word using a character outside
// the syllabus is dropped at load, so later slides only need new words here.
// Easy / Medium / Hard are set by sentence length (tile count).
// ---------------------------------------------------------------------------

const LEX = {
  // `grp` marks 1st/2nd person so 我 never picks up 我們; `pro` = pronoun.
  person: [
    { zh: "我", en: "I", obj: "me", be: "am", poss: "my", pro: true, grp: 1 },
    { zh: "你", en: "you", obj: "you", be: "are", poss: "your", pro: true, grp: 2 },
    { zh: "妳", en: "you", obj: "you", be: "are", poss: "your", pro: true, grp: 2 },
    { zh: "您", en: "you", obj: "you", be: "are", poss: "your", pro: true, grp: 2 },
    { zh: "他", en: "he", obj: "him", be: "is", poss: "his", pro: true, s3: true },
    { zh: "她", en: "she", obj: "her", be: "is", poss: "her", pro: true, s3: true },
    { zh: "我們", en: "we", obj: "us", be: "are", poss: "our", pro: true, plural: true, grp: 1 },
    { zh: "你們", en: "you all", obj: "you all", be: "are", poss: "your", pro: true, plural: true, grp: 2 },
    { zh: "他們", en: "they", obj: "them", be: "are", poss: "their", pro: true, plural: true },
    { zh: "陳先生", en: "Mr. Chen", be: "is", s3: true },
    { zh: "李小姐", en: "Miss Li", be: "is", s3: true },
    { zh: "王先生", en: "Mr. Wang", be: "is", s3: true },
    { zh: "陳小姐", en: "Miss Chen", be: "is", s3: true },
    { zh: "老師", en: "the teacher", be: "is", s3: true },
    { zh: "班代", en: "the class rep", be: "is", s3: true },
    { zh: "那個人", en: "that person", be: "is", s3: true },
    { zh: "那個小姐", en: "that woman", be: "is", s3: true },
    { zh: "張小姐", en: "Miss Zhang", be: "is", s3: true },
    { zh: "田中先生", en: "Mr. Tanaka", be: "is", s3: true },
    { zh: "王太太", en: "Mrs. Wang", be: "is", s3: true },
    { zh: "陳太太", en: "Mrs. Chen", be: "is", s3: true },
  ],
  drink: [
    { zh: "綠茶", en: "green tea", brewed: true },
    { zh: "紅茶", en: "black tea", brewed: true },
    { zh: "奶茶", en: "milk tea", brewed: true },
    { zh: "烏龍茶", en: "oolong tea", brewed: true },
    { zh: "咖啡", en: "coffee", brewed: true },
    { zh: "牛奶", en: "milk" },
    { zh: "水", en: "water" },
    { zh: "茶", en: "tea", brewed: true },
  ],
  place: [
    { zh: "台灣", en: "Taiwan", adj: "Taiwanese" },
    { zh: "日本", en: "Japan", adj: "Japanese" },
    { zh: "英國", en: "the UK", adj: "British" },
    { zh: "美國", en: "the US", adj: "American" },
    { zh: "印度", en: "India", adj: "Indian" },
    { zh: "中國", en: "China", adj: "Chinese" },
  ],
  nationality: [
    { zh: "台灣人", en: "Taiwanese" },
    { zh: "日本人", en: "Japanese" },
    { zh: "英國人", en: "British" },
    { zh: "美國人", en: "American" },
    { zh: "印度人", en: "Indian" },
    { zh: "中國人", en: "Chinese" },
  ],
  motion: [
    { zh: "去", en: "go to", en3: "goes to" },
    { zh: "來", en: "come to", en3: "comes to" },
    { zh: "回", en: "go back to", en3: "goes back to" },
  ],
  time: [
    { zh: "今天", en: "today" },
    { zh: "明天", en: "tomorrow" },
    { zh: "星期一", en: "on Monday" },
    { zh: "星期二", en: "on Tuesday" },
    { zh: "星期三", en: "on Wednesday" },
    { zh: "星期四", en: "on Thursday" },
    { zh: "星期五", en: "on Friday" },
    { zh: "星期六", en: "on Saturday" },
    { zh: "星期天", en: "on Sunday" },
  ],
  thing: [
    { zh: "手機", en: "a mobile phone" },
    { zh: "房子", en: "a house" },
    { zh: "問題", en: "a question" },
    { zh: "照片", en: "a photo" },
    { zh: "書", en: "a book" },
    { zh: "中文名字", en: "a Chinese name" },
  ],
  surname: [
    { zh: "陳", en: "Chen" },
    { zh: "李", en: "Li" },
    { zh: "王", en: "Wang" },
    { zh: "張", en: "Zhang" },
  ],
  activity: [
    { zh: "打球", en: "playing ball games" },
    { zh: "看書", en: "reading" },
    { zh: "說中文", en: "speaking Chinese" },
    { zh: "說英文", en: "speaking English" },
  ],
  // `vnv` is the V-not-V pair, split as on the slide: 快 / 不快樂.
  adjective: [
    { zh: "快樂", en: "happy", vnv: ["快", "不快樂"] },
    { zh: "美", en: "beautiful", vnv: ["美", "不美"] },
    { zh: "老", en: "old", vnv: ["老", "不老"] },
    { zh: "好看", en: "good-looking", vnv: ["好", "不好看"] },
    { zh: "漂亮", en: "pretty", vnv: ["漂", "不漂亮"] },
  ],
};

// A word is one tile unless it's a multi-tile phrase (`tiles`).
const T = (w) => w.tiles || [w.zh];
const wordKey = (w) => T(w).join("|");

// Longer noun phrases, used more at higher levels: 我的老師 / 美國老師 /
// 印度奶茶. Each stays two tiles, so they also make the puzzle longer.
for (const p of LEX.person.filter((w) => w.pro)) {
  for (const role of [
    { zh: "老師", en: "teacher" },
    { zh: "班代", en: "class rep" },
    { zh: "爸爸", en: "dad" },
    { zh: "媽媽", en: "mom" },
    { zh: "哥哥", en: "older brother" },
    { zh: "姐姐", en: "older sister" },
    { zh: "弟弟", en: "younger brother" },
    { zh: "妹妹", en: "younger sister" },
    { zh: "伯伯", en: "uncle" },
    { zh: "叔叔", en: "uncle" },
    { zh: "阿姨", en: "aunt" },
    { zh: "朋友", en: "friend" },
    { zh: "男朋友", en: "boyfriend", single: true },
    { zh: "女朋友", en: "girlfriend", single: true },
    { zh: "太太", en: "wife", single: true },
  ]) {
    if (role.single && p.plural) continue; // 他們的男朋友 reads oddly
    LEX.person.push({ tiles: [`${p.zh}的`, role.zh], en: `${p.poss} ${role.en}`, be: "is", s3: true, mod: true });
  }
}
for (const pl of LEX.place) {
  // natMod: "the American teacher" can't then be 日本人 in the same sentence.
  LEX.person.push({ tiles: [pl.zh, "老師"], en: `the ${pl.adj} teacher`, be: "is", s3: true, mod: true, natMod: true });
  for (const d of LEX.drink.filter((w) => w.brewed)) {
    LEX.drink.push({ tiles: [pl.zh, d.zh], en: `${pl.adj} ${d.en}`, mod: true });
  }
}

for (const cat of Object.keys(LEX)) {
  LEX[cat] = LEX[cat].filter((w) => T(w).every((tile) => [...tile].every((ch) => CHAR_PINYIN.has(ch))));
}
// 姓 only makes sense with a singular pronoun — 陳先生姓王 contradicts itself.
LEX.pronoun = LEX.person.filter((p) => p.pro && !p.plural);
// 都 needs a group: 我們 / 你們 / 他們.
LEX.plural = LEX.person.filter((p) => p.pro && p.plural);
const ofThem = (p) => p.obj.replace(" all", "");

const does = (p) => (p.s3 ? "does" : "do");
const doesnt = (p) => (p.s3 ? "doesn't" : "don't");
const third = (p, base, s) => (p.s3 ? s : base);
const pickUp = (o) => (o.pro ? `pick ${o.obj} up` : `pick up ${o.en}`);
const whatAbout = (o) => `what about ${o.pro ? o.obj : o.en}?`;
const capFirst = (s) => s[0].toUpperCase() + s.slice(1);
// The comma that ends a first clause rides on that clause's last tile.
const withComma = (tiles) => [...tiles.slice(0, -1), `${tiles.at(-1)}，`];
const noSharedTiles = (...ws) => {
  const all = ws.flatMap(T);
  return new Set(all).size === all.length;
};
const differentPeople = (a, b) => a !== b && !(a.grp && a.grp === b.grp);

const QUESTION_FORMS = new Set(["ma", "vnv", "ne"]);
const formEnd = (form) => (QUESTION_FORMS.has(form) ? "？" : "。");

// Each build() returns the subject tiles, the predicate tiles for the
// requested form, and an English gloss. `t` is the English time (" tomorrow")
// or "". Chunks follow the test slide: V-not-V splits as V / 不V, negatives
// as 不 / V, and 嗎 and 很 are their own tiles. `long` patterns are the
// two-clause and purpose sentences that Hard mode leans on.
const PATTERNS = [
  {
    id: "nat",
    slots: ["person", "nationality"],
    forms: ["stmt", "ma", "vnv", "neg"],
    ok: ([s]) => !s.natMod,
    build: ([s, n], form) => ({
      subject: T(s),
      pred: { stmt: ["是", n.zh], ma: ["是", n.zh, "嗎"], vnv: ["是", "不是", n.zh], neg: ["不", "是", n.zh] }[form],
      en:
        form === "stmt" ? `${s.en} ${s.be} ${n.en}.`
        : form === "neg" ? `${s.en} ${s.be} not ${n.en}.`
        : `${s.be} ${s.en} ${n.en}?`,
    }),
  },
  {
    id: "drink",
    slots: ["person", "drink"],
    forms: ["stmt", "ma", "vnv", "neg"],
    build: ([s, d], form) => ({
      subject: T(s),
      pred: { stmt: ["喝", ...T(d)], ma: ["喝", ...T(d), "嗎"], vnv: ["喝", "不喝", ...T(d)], neg: ["不", "喝", ...T(d)] }[form],
      en:
        form === "stmt" ? `${s.en} ${third(s, "drink", "drinks")} ${d.en}.`
        : form === "neg" ? `${s.en} ${doesnt(s)} drink ${d.en}.`
        : `${does(s)} ${s.en} drink ${d.en}?`,
    }),
  },
  {
    id: "like",
    slots: ["person", "drink"],
    forms: ["stmt", "ma", "vnv", "neg"],
    build: ([s, d], form) => ({
      subject: T(s),
      pred: {
        stmt: ["很", "喜歡", "喝", ...T(d)],
        ma: ["喜歡", "喝", ...T(d), "嗎"],
        vnv: ["喜", "不喜歡", "喝", ...T(d)],
        neg: ["不", "喜歡", "喝", ...T(d)],
      }[form],
      en:
        form === "stmt" ? `${s.en} really ${third(s, "like", "likes")} drinking ${d.en}.`
        : form === "neg" ? `${s.en} ${doesnt(s)} like drinking ${d.en}.`
        : `${does(s)} ${s.en} like drinking ${d.en}?`,
    }),
  },
  {
    id: "want",
    slots: ["person", "place"],
    time: true,
    forms: ["stmt", "ma", "vnv", "neg"],
    build: ([s, p], form, t) => ({
      subject: T(s),
      pred: {
        stmt: ["要", "去", p.zh],
        ma: ["要", "去", p.zh, "嗎"],
        vnv: ["要", "不要", "去", p.zh],
        neg: ["不", "要", "去", p.zh],
      }[form],
      en:
        form === "stmt" ? `${s.en} ${third(s, "want", "wants")} to go to ${p.en}${t}.`
        : form === "neg" ? `${s.en} ${doesnt(s)} want to go to ${p.en}${t}.`
        : `${does(s)} ${s.en} want to go to ${p.en}${t}?`,
    }),
  },
  {
    id: "move",
    slots: ["person", "motion", "place"],
    time: true,
    forms: ["stmt", "ma", "vnv", "neg"],
    build: ([s, v, p], form, t) => ({
      subject: T(s),
      pred: {
        stmt: [v.zh, p.zh],
        ma: [v.zh, p.zh, "嗎"],
        vnv: [v.zh, `不${v.zh}`, p.zh],
        neg: ["不", v.zh, p.zh],
      }[form],
      en:
        form === "stmt" ? `${s.en} ${s.s3 ? v.en3 : v.en} ${p.en}${t}.`
        : form === "neg" ? `${s.en} ${doesnt(s)} ${v.en} ${p.en}${t}.`
        : `${does(s)} ${s.en} ${v.en} ${p.en}${t}?`,
    }),
  },
  {
    id: "have",
    slots: ["person", "thing"],
    forms: ["stmt", "ma", "vnv", "neg"],
    // 有 is the one verb negated with 沒, so its V-not-V is 有沒有.
    build: ([s, x], form) => ({
      subject: T(s),
      pred: { stmt: ["有", x.zh], ma: ["有", x.zh, "嗎"], vnv: ["有", "沒有", x.zh], neg: ["沒", "有", x.zh] }[form],
      en:
        form === "stmt" ? `${s.en} ${third(s, "have", "has")} ${x.en}.`
        : form === "neg" ? `${s.en} ${doesnt(s)} have ${x.en}.`
        : `${does(s)} ${s.en} have ${x.en}?`,
    }),
  },
  {
    id: "tasty",
    slots: ["drink"],
    forms: ["stmt", "ma", "vnv", "neg"],
    build: ([d], form) => ({
      subject: T(d),
      pred: { stmt: ["很", "好喝"], ma: ["好喝", "嗎"], vnv: ["好", "不好喝"], neg: ["不", "好喝"] }[form],
      en:
        form === "stmt" ? `${d.en} is really good.`
        : form === "neg" ? `${d.en} isn't good.`
        : `is ${d.en} good?`,
    }),
  },
  {
    id: "adj",
    slots: ["person", "adjective"],
    forms: ["stmt", "ma", "vnv", "neg"],
    build: ([s, a], form) => ({
      subject: T(s),
      pred: { stmt: ["很", a.zh], ma: [a.zh, "嗎"], vnv: a.vnv, neg: ["不", a.zh] }[form],
      en:
        form === "stmt" ? `${s.en} ${s.be} very ${a.en}.`
        : form === "neg" ? `${s.en} ${s.be} not ${a.en}.`
        : `${s.be} ${s.en} ${a.en}?`,
    }),
  },
  {
    // 他們都是台灣人 / 都不是 / 不都是 — where 都 sits against 不 decides
    // "none" vs "not all" (PDF 21).
    id: "allNat",
    slots: ["plural", "nationality"],
    forms: ["all", "none", "notAll"],
    build: ([s, n], form) => ({
      subject: T(s),
      pred: { all: ["都", "是", n.zh], none: ["都", "不", "是", n.zh], notAll: ["不", "都", "是", n.zh] }[form],
      en:
        form === "all" ? `${ofThem(s) === "you" ? "you" : s.en} are all ${n.en}.`
        : form === "none" ? `none of ${ofThem(s)} are ${n.en}.`
        : `not all of ${ofThem(s)} are ${n.en}.`,
    }),
  },
  {
    // 我們都喜歡喝咖啡 / 都不喜歡 / 不都喜歡.
    id: "allLike",
    slots: ["plural", "drink"],
    forms: ["all", "none", "notAll"],
    build: ([s, d], form) => ({
      subject: T(s),
      pred: {
        all: ["都", "喜歡", "喝", ...T(d)],
        none: ["都", "不", "喜歡", "喝", ...T(d)],
        notAll: ["不", "都", "喜歡", "喝", ...T(d)],
      }[form],
      en:
        form === "all" ? `${ofThem(s) === "you" ? "you" : s.en} all like drinking ${d.en}.`
        : form === "none" ? `none of ${ofThem(s)} like drinking ${d.en}.`
        : `not all of ${ofThem(s)} like drinking ${d.en}.`,
    }),
  },
  {
    // 他很喜歡打球 / 說中文 (PDF 24).
    id: "hobby",
    slots: ["person", "activity"],
    forms: ["stmt", "ma", "vnv", "neg"],
    build: ([s, a], form) => ({
      subject: T(s),
      pred: {
        stmt: ["很", "喜歡", a.zh],
        ma: ["喜歡", a.zh, "嗎"],
        vnv: ["喜", "不喜歡", a.zh],
        neg: ["不", "喜歡", a.zh],
      }[form],
      en:
        form === "stmt" ? `${s.en} really ${third(s, "like", "likes")} ${a.en}.`
        : form === "neg" ? `${s.en} ${doesnt(s)} like ${a.en}.`
        : `${does(s)} ${s.en} like ${a.en}?`,
    }),
  },
  {
    // 弟弟很喜歡照相 (PDF 19).
    id: "photo",
    slots: ["person"],
    forms: ["stmt", "ma", "vnv", "neg"],
    build: ([s], form) => ({
      subject: T(s),
      pred: {
        stmt: ["很", "喜歡", "照相"],
        ma: ["喜歡", "照相", "嗎"],
        vnv: ["喜", "不喜歡", "照相"],
        neg: ["不", "喜歡", "照相"],
      }[form],
      en:
        form === "stmt" ? `${s.en} really ${third(s, "like", "likes")} taking photos.`
        : form === "neg" ? `${s.en} ${doesnt(s)} like taking photos.`
        : `${does(s)} ${s.en} like taking photos?`,
    }),
  },
  {
    id: "pickup",
    slots: ["person", "person"],
    time: true,
    forms: ["stmt", "ma", "vnv", "neg"],
    ok: ([s, o]) => differentPeople(s, o) && noSharedTiles(s, o),
    build: ([s, o], form, t) => ({
      subject: T(s),
      pred: {
        stmt: ["去", "接", ...T(o)],
        ma: ["去", "接", ...T(o), "嗎"],
        vnv: ["去", "不去", "接", ...T(o)],
        neg: ["不", "去", "接", ...T(o)],
      }[form],
      en:
        form === "stmt" ? `${s.en} ${s.be} going to ${pickUp(o)}${t}.`
        : form === "neg" ? `${s.en} ${s.be} not going to ${pickUp(o)}${t}.`
        : `${s.be} ${s.en} going to ${pickUp(o)}${t}?`,
    }),
  },
  {
    id: "surname",
    slots: ["pronoun", "surname"],
    forms: ["stmt", "ma", "neg"], // 你姓不姓陳 is stilted; the textbook asks 你姓陳嗎
    build: ([s, x], form) => ({
      subject: T(s),
      pred: { stmt: ["姓", x.zh], ma: ["姓", x.zh, "嗎"], neg: ["不", "姓", x.zh] }[form],
      en:
        form === "stmt" ? `${s.poss} surname is ${x.en}.`
        : form === "neg" ? `${s.poss} surname isn't ${x.en}.`
        : `is ${s.poss} surname ${x.en}?`,
    }),
  },
  {
    id: "welcome",
    slots: ["person", "place"],
    forms: ["stmt"],
    ok: ([o]) => o.grp !== 1, // nobody welcomes themselves: no 歡迎我們
    build: ([o, p]) => ({
      subject: ["歡迎"],
      pred: [...T(o), "來", p.zh],
      en: `${o.en} ${o.be} welcome to come to ${p.en}.`,
    }),
  },
  {
    // 我要去印度喝印度茶 — go somewhere to drink something.
    id: "purpose",
    slots: ["person", "place", "drink"],
    time: true,
    long: true,
    forms: ["stmt", "ma", "vnv", "neg"],
    // You go somewhere for its tea or coffee: 去印度喝印度奶茶, not 去日本喝水
    // or 去美國喝中國茶. The shared place tile is intended, so it's exempt from
    // the distinct-tiles rule below.
    ok: ([, p, d]) => (d.mod ? d.tiles[0] === p.zh : Boolean(d.brewed)),
    allowShared: true,
    build: ([s, p, d], form, t) => ({
      subject: T(s),
      pred: {
        stmt: ["要", "去", p.zh, "喝", ...T(d)],
        ma: ["要", "去", p.zh, "喝", ...T(d), "嗎"],
        vnv: ["要", "不要", "去", p.zh, "喝", ...T(d)],
        neg: ["不", "要", "去", p.zh, "喝", ...T(d)],
      }[form],
      en:
        form === "stmt" ? `${s.en} ${third(s, "want", "wants")} to go to ${p.en} to drink ${d.en}${t}.`
        : form === "neg" ? `${s.en} ${doesnt(s)} want to go to ${p.en} to drink ${d.en}${t}.`
        : `${does(s)} ${s.en} want to go to ${p.en} to drink ${d.en}${t}?`,
    }),
  },
  {
    // 李小姐不喜歡喝牛奶，喜歡喝綠茶 — the 作業六 two-clause contrast.
    id: "contrast",
    slots: ["person", "drink", "drink"],
    long: true,
    forms: ["posneg", "negpos"],
    ok: ([, a, b]) => a !== b && noSharedTiles(a, b),
    build: ([s, a, b], form) => ({
      subject: T(s),
      pred:
        form === "posneg"
          ? ["喜歡", "喝", ...withComma(T(a)), "不", "喜歡", "喝", ...T(b)]
          : ["不", "喜歡", "喝", ...withComma(T(a)), "喜歡", "喝", ...T(b)],
      en:
        form === "posneg"
          ? `${s.en} ${third(s, "like", "likes")} drinking ${a.en}, but not ${b.en}.`
          : `${s.en} ${doesnt(s)} like drinking ${a.en}, but ${third(s, "like", "likes")} ${b.en}.`,
    }),
  },
  {
    // 我很喜歡喝奶茶，你呢？
    id: "neLike",
    slots: ["person", "drink", "person"],
    long: true,
    forms: ["ne"],
    ok: ([s, , s2]) => differentPeople(s, s2) && noSharedTiles(s, s2),
    build: ([s, d, s2]) => ({
      subject: T(s),
      pred: ["很", "喜歡", "喝", ...withComma(T(d)), ...T(s2), "呢"],
      en: `${s.en} really ${third(s, "like", "likes")} drinking ${d.en} — ${whatAbout(s2)}`,
    }),
  },
  {
    // 老師明天要去日本，你呢？
    id: "neWant",
    slots: ["person", "place", "person"],
    time: true,
    long: true,
    forms: ["ne"],
    ok: ([s, , s2]) => differentPeople(s, s2) && noSharedTiles(s, s2),
    build: ([s, p, s2], form, t) => ({
      subject: T(s),
      pred: ["要", "去", `${p.zh}，`, ...T(s2), "呢"],
      en: `${s.en} ${third(s, "want", "wants")} to go to ${p.en}${t} — ${whatAbout(s2)}`,
    }),
  },
];
const PATTERN_BY_ID = new Map(PATTERNS.map((p) => [p.id, p]));

function realize(pat, fillers, form, time, tp) {
  const { subject, pred, en } = pat.build(fillers, form, time ? ` ${time.en}` : "");
  const chunks = !time ? [...subject, ...pred] : tp === "front" ? [time.zh, ...subject, ...pred] : [...subject, time.zh, ...pred];
  return { chunks, en };
}

const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];
const cartesian = (lists) => lists.reduce((acc, list) => acc.flatMap((a) => list.map((x) => [...a, x])), [[]]);
const tileBag = (tiles) => [...tiles].sort().join("\u0001");

// Every sentence the grammar can make from exactly these tiles, each with its
// own reveal. This is how answers are marked: any of these is correct. It
// covers moved time words, swapped people, and a 不 moved to the other
// clause — and the reveal shows the meaning of the order actually used.
function grammarVariants(tiles, end) {
  const bag = tileBag(tiles);
  const avail = new Set(tiles.map((t) => t.replace(/，$/, "")));
  const fits = (w) => T(w).every((t) => avail.has(t));
  const times = [null, ...LEX.time.filter(fits)];
  const out = {};
  for (const pat of PATTERNS) {
    const pools = pat.slots.map((cat) => LEX[cat].filter(fits));
    if (pools.some((pool) => pool.length === 0)) continue;
    for (const fillers of cartesian(pools)) {
      if (new Set(fillers).size !== fillers.length || (pat.ok && !pat.ok(fillers))) continue;
      for (const form of pat.forms) {
        if (formEnd(form) !== end) continue;
        for (const time of pat.time ? times : [null]) {
          for (const tp of time ? ["front", "mid"] : ["mid"]) {
            const v = realize(pat, fillers, form, time, tp);
            if (tileBag(v.chunks) !== bag) continue;
            out[v.chunks.join("")] ??= sentenceReveal(v.chunks, end, capFirst(v.en));
          }
        }
      }
    }
  }
  return out;
}

// Difficulty is tile count: Easy 3–4, Medium 5–6, Hard 7+.
const LEVELS = {
  easy: { mod: 0, time: 0 },
  medium: { mod: 0.35, time: 0.4 },
  hard: { mod: 0.6, time: 0.6 },
};
const levelOf = (tileCount) => (tileCount <= 4 ? "easy" : tileCount <= 6 ? "medium" : "hard");

function randomSentenceSpec(level) {
  const cfg = LEVELS[level];
  const pat =
    level === "hard" && Math.random() < 0.6 ? pickOne(PATTERNS.filter((p) => p.long))
    : level === "easy" ? pickOne(PATTERNS.filter((p) => !p.long))
    : pickOne(PATTERNS);
  for (let tries = 0; tries < 20; tries++) {
    const fillers = pat.slots.map((cat) => {
      const mods = LEX[cat].filter((w) => w.mod);
      return mods.length && Math.random() < cfg.mod ? pickOne(mods) : pickOne(LEX[cat].filter((w) => !w.mod));
    });
    const time = pat.time && Math.random() < cfg.time ? pickOne(LEX.time) : null;
    if (new Set(fillers).size !== fillers.length || (pat.ok && !pat.ok(fillers))) continue;
    // Words sharing a tile (我的老師 + 美國老師) could recombine into sentences
    // the grammar can't recognise, so keep every word's tiles distinct.
    if (!pat.allowShared && !noSharedTiles(...fillers, ...(time ? [time] : []))) continue;
    return {
      p: pat.id,
      f: pickOne(pat.forms),
      s: fillers.map(wordKey),
      t: time ? time.zh : null,
      tp: Math.random() < 0.5 ? "front" : "mid",
    };
  }
  return null;
}

// The spec is the entry's `value`, so a missed generated sentence can be
// rebuilt exactly when it comes back in My Mistakes.
function buildGenerated(spec) {
  const pat = spec && PATTERN_BY_ID.get(spec.p);
  if (!pat || !pat.forms.includes(spec.f)) return null;
  const fillers = pat.slots.map((cat, i) => LEX[cat].find((w) => wordKey(w) === spec.s[i]));
  const time = spec.t ? LEX.time.find((w) => w.zh === spec.t) : null;
  if (fillers.some((w) => !w) || (spec.t && !time)) return null;
  const end = formEnd(spec.f);
  const main = realize(pat, fillers, spec.f, time, spec.tp);
  const mainText = main.chunks.join("");
  const variants = grammarVariants(main.chunks, end);
  variants[mainText] = sentenceReveal(main.chunks, end, capFirst(main.en));
  return {
    value: "gen:" + JSON.stringify(spec),
    kind: "sentence",
    chunks: main.chunks,
    level: levelOf(main.chunks.length),
    accepted: Object.keys(variants),
    variants,
    ...variants[mainText],
  };
}

const SENTENCES = SENTENCE_DEFS.map((def, i) => {
  // Hand-written alternates first (an alt is a chunk list, or { chunks, gloss }
  // when the new order changes the meaning); then anything else the grammar
  // can build from the same tiles.
  const orders = [def, ...(def.alts || []).map((a) => (Array.isArray(a) ? { chunks: a } : a))];
  const variants = {
    ...grammarVariants(def.chunks, def.end),
    ...Object.fromEntries(orders.map((o) => [o.chunks.join(""), sentenceReveal(o.chunks, def.end, o.gloss || def.gloss)])),
  };
  return {
    value: `sent-${i}`,
    kind: "sentence",
    chunks: def.chunks,
    level: levelOf(def.chunks.length),
    accepted: Object.keys(variants),
    variants,
    ...variants[def.chunks.join("")],
  };
});

// A fresh batch every lap: the hand-written sentences at this level (which
// include the real test-slide questions) plus newly generated ones.
function sentencePool(level, count = 25) {
  const curated = SENTENCES.filter((s) => s.level === level);
  const seen = new Set(curated.map((s) => s.hanzi));
  const fresh = [];
  for (let i = 0; i < count * 12 && fresh.length < count; i++) {
    const e = buildGenerated(randomSentenceSpec(level));
    if (e && e.level === level && !seen.has(e.hanzi)) {
      seen.add(e.hanzi);
      fresh.push(e);
    }
  }
  return [...curated, ...fresh];
}

function entryFromValue(v) {
  if (typeof v === "string" && v.startsWith("gen:")) {
    try {
      return buildGenerated(JSON.parse(v.slice(4)));
    } catch {
      return null;
    }
  }
  return ENTRY_BY_VALUE.get(v);
}

// ---------------------------------------------------------------------------
// By Class: each class session's new recap-grid characters (the grid diff
// from one PDF to the next), so a single class can be drilled on its own.
// A class's deck is its new characters plus every word that only became
// writable with them — 老師 lands in Aug 19, 綠茶 in Aug 22. Sessions that
// added nothing to the grid (PDF 6, 12, 17) are left out. `pdf` is the
// class_material file number. Append new classes at the end.
// ---------------------------------------------------------------------------

const CLASSES = [
  { pdf: 3, date: "Aug 19", title: "Fundamentals", chars: "班代老師好你早謝再見有問題嗎沒了還可以不客氣對起關係下課中國台灣我是英美印度" },
  { pdf: 4, date: "Aug 21", title: "Pinyin", chars: "馬一二三四" },
  { pdf: 5, date: "Aug 22", title: "Pinyin", chars: "媽房子的爸這個月小鹿喝綠茶" },
  { pdf: 7, date: "Sep 2", title: "Numbers", chars: "五六七八九十零電話號碼手機日" },
  { pdf: 8, date: "Sep 4", title: "Dates", chars: "生星期" },
  { pdf: 9, date: "Sep 5", title: "今天", chars: "今天昨明陳李華王開文" },
  { pdf: 10, date: "Sep 9", title: "第一課 · 小姐", chars: "叫姓請先姐" },
  { pdf: 11, date: "Sep 11", title: "第一課 · 們", chars: "那本人他們來去回歡迎接" },
  { pdf: 13, date: "Sep 18", title: "第一課 · 烏龍茶", chars: "上什麼咖啡牛奶水紅烏龍" },
  { pdf: 14, date: "Sep 19", title: "第一課 · 要", chars: "喜要" },
  { pdf: 15, date: "Sep 23", title: "第一課 · 國家", chars: "妳您她哪家" },
  { pdf: 16, date: "Sep 25", title: "第一課 · 很", chars: "呢很" },
  { pdf: 18, date: "Sep 30", title: "第二課 · 妹妹", chars: "秋節餅柚烤肉祝快樂第張怡君安同田誠哥弟妹" },
  { pdf: 19, date: "Oct 7", title: "第二課 · 照相", chars: "幾誰進坐看照相" },
  { pdf: 20, date: "Oct 9", title: "第二課 · 好看", chars: "片" },
  { pdf: 21, date: "Oct 14", title: "第二課 · 都", chars: "漂亮多都" },
  { pdf: 22, date: "Oct 16", title: "第二課 · 兩", chars: "兄伯叔阿姨名字書兩" },
  { pdf: 23, date: "Oct 21", title: "第二課 · 次", chars: "朋友男女次母" },
  { pdf: 24, date: "Oct 23", title: "第二課 · 打球", chars: "太說打球" },
];

const CLASS_OF_CHAR = new Map();
CLASSES.forEach((c, i) => [...c.chars].forEach((ch) => CLASS_OF_CHAR.has(ch) || CLASS_OF_CHAR.set(ch, i)));
const unplaced = CHAR_INDEX.filter((e) => !CLASS_OF_CHAR.has(e.ch)).map((e) => e.ch);
if (unplaced.length) console.error(`By Class: ${unplaced.join("")} is not in any class`);

// One card per character, for characters drilled on their own (班, 代 ...).
const CHAR_ENTRIES = CHAR_INDEX.map((e) => ({ ...makeEntry([e], `char-${e.ch}`), kind: "char" }));
const CHAR_ENTRY = new Map(CHAR_ENTRIES.map((e) => [e.hanzi, e]));

// Words taught later than all their characters, pinned to the class that
// taught them (課本 is all old characters but first came up in PDF 19).
const WORD_TAUGHT = { 課本: "Oct 7", 可是: "Oct 9", 好看: "Oct 9", 中文: "Oct 16", 姐妹: "Oct 16",
  男人: "Oct 23", 女人: "Oct 23", 男生: "Oct 23", 女生: "Oct 23", 男老師: "Oct 23", 女老師: "Oct 23" };
const classOfWord = (w) =>
  Math.max(
    ...[...w.hanzi].map((ch) => CLASS_OF_CHAR.get(ch) ?? -1),
    CLASSES.findIndex((c) => c.date === WORD_TAUGHT[w.hanzi]),
  );

const CLASS_POOLS = CLASSES.map((c, i) => {
  const words = WORDS.filter((w) => classOfWord(w) === i);
  const singles = new Set(words.map((w) => w.hanzi));
  const chars = [...c.chars].filter((ch) => CLASS_OF_CHAR.get(ch) === i && !singles.has(ch)).map((ch) => CHAR_ENTRY.get(ch)).filter(Boolean);
  return [...chars, ...words];
});

// ---------------------------------------------------------------------------
// Game state
// ---------------------------------------------------------------------------

const RANGES = {
  numbers: ALL_NUMBERS,
  words: WORDS,
  sentences: SENTENCES,
  homophones: HOMOPHONE_GROUPS,
  combo: COMBO_PAIRS,
  lookalikes: LOOKALIKES,
};

// Every question object from every pool, keyed by its unique `value`, so a
// mistake logged in any mode can be looked back up regardless of which pool
// it originally came from. "mistakes" itself isn't a fixed RANGES entry —
// it's rebuilt from state.mistakes each time (see mistakesPool()).
const ALL_ENTRIES = [...ALL_NUMBERS, ...WORDS, ...SENTENCES, ...HOMOPHONE_GROUPS, ...COMBO_PAIRS, ...LOOKALIKES, ...CHAR_ENTRIES];
const ENTRY_BY_VALUE = new Map(ALL_ENTRIES.map((e) => [e.value, e]));

function mistakesPool() {
  return [...state.mistakes].map(entryFromValue).filter(Boolean);
}

const STORAGE_KEY = "laoshi_numbers_best_streak";
const MISTAKES_KEY = "laoshi_mistakes";
const LEVEL_KEY = "laoshi_sentence_level";
const CLASS_KEY = "laoshi_class";
const COVERED_KEY = "laoshi_class_covered";

// By Class progress: per class (keyed by PDF number, which never changes),
// the cards answered right first time.
function loadCovered() {
  try {
    const raw = JSON.parse(localStorage.getItem(COVERED_KEY));
    return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  } catch {
    return {};
  }
}

function saveCovered() {
  try {
    localStorage.setItem(COVERED_KEY, JSON.stringify(state.covered));
  } catch {
    /* ignore (e.g. storage disabled) */
  }
}

// Defaults to the latest class — usually the one being studied.
function loadClass() {
  try {
    const v = parseInt(localStorage.getItem(CLASS_KEY), 10);
    return v >= 0 && v < CLASSES.length ? v : CLASSES.length - 1;
  } catch {
    return CLASSES.length - 1;
  }
}

function loadLevel() {
  try {
    const v = localStorage.getItem(LEVEL_KEY);
    return v in LEVELS ? v : "medium";
  } catch {
    return "medium";
  }
}

function loadMistakes() {
  try {
    const raw = JSON.parse(localStorage.getItem(MISTAKES_KEY));
    return new Set(Array.isArray(raw) ? raw : []);
  } catch {
    return new Set();
  }
}

function saveMistakes() {
  try {
    localStorage.setItem(MISTAKES_KEY, JSON.stringify([...state.mistakes]));
  } catch {
    /* ignore (e.g. storage disabled) */
  }
}

const state = {
  range: "numbers",
  pool: RANGES.numbers,
  deck: [], // shuffled-bag queue for the current pool — see pickNext()
  current: null,
  answered: false,
  gradedValue: null, // input value at the moment of grading — see submitAnswer()
  correct: 0,
  total: 0,
  streak: 0,
  best: loadBest(),
  mistakes: loadMistakes(), // Set of `value`s answered wrong/skipped, persisted
  level: loadLevel(), // Word Order difficulty
  classIndex: loadClass(), // By Class session
  covered: loadCovered(), // By Class progress: { pdf: [value, ...] }
};

// Fisher-Yates shuffle (does not mutate the input).
function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadBest() {
  try {
    return parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
  } catch {
    return 0;
  }
}

function saveBest(val) {
  try {
    localStorage.setItem(STORAGE_KEY, String(val));
  } catch {
    /* ignore (e.g. storage disabled) */
  }
}

// ---------------------------------------------------------------------------
// DOM wiring
// ---------------------------------------------------------------------------

const card = document.querySelector(".card");
const hanziDisplay = document.getElementById("hanziDisplay");
const levelSelect = document.getElementById("levelSelect");
const classSelect = document.getElementById("classSelect");
const classPick = document.getElementById("classPick");
const classNew = document.getElementById("classNew");
const classCovered = document.getElementById("classCovered");
const resetClassBtn = document.getElementById("resetClassBtn");
const sentenceBuilder = document.getElementById("sentenceBuilder");
const sentenceAnswer = document.getElementById("sentenceAnswer");
const sentenceBank = document.getElementById("sentenceBank");
const answerForm = document.getElementById("answerForm");
const pinyinInput = document.getElementById("pinyinInput");
const submitBtn = document.getElementById("submitBtn");
const skipBtn = document.getElementById("skipBtn");
const hintBtn = document.getElementById("hintBtn");
const nextBtn = document.getElementById("nextBtn");
const feedback = document.getElementById("feedback");
const scoreValue = document.getElementById("scoreValue");
const streakValue = document.getElementById("streakValue");
const bestValue = document.getElementById("bestValue");
const rangeSelect = document.getElementById("rangeSelect");
const mistakeCount = document.getElementById("mistakeCount");
const resetMistakesBtn = document.getElementById("resetMistakesBtn");
const lookupPanel = document.getElementById("lookupPanel");
const lookupForm = document.getElementById("lookupForm");
const lookupInput = document.getElementById("lookupInput");
const lookupResult = document.getElementById("lookupResult");

// As the learner types, convert a vowel immediately followed by a tone
// digit (1-4) into the accented character in place, live — so "sa1n"
// becomes "sān" the instant the "1" is typed. This mirrors parseSyllableWord
// exactly (same "letter right before the digit" rule), so what the learner
// sees while typing always matches how the answer will be checked. A digit
// typed after a consonant (an invalid placement) is deliberately left as a
// plain digit rather than transformed, since there is no vowel to mark.
// Shared by the main answer input and the Quick Reference lookup input.
function liveTransformInput(e) {
  const target = e.target;
  // Phone keyboards may type ü as u + a combining ¨; fold it into one ü first
  // so the tone digit after it has a letter to land on.
  const raw = target.value;
  const oldValue = raw.normalize("NFC");
  const cursorPos = raw.slice(0, target.selectionStart).normalize("NFC").length;
  let newValue = "";
  let newCursor = cursorPos;
  let i = 0;
  while (i < oldValue.length) {
    const letter = oldValue[i];
    const next = oldValue[i + 1];
    if (next && /[aeiouvü]/i.test(letter) && /[1-4]/.test(next)) {
      const base = letter.toLowerCase() === "ü" ? "v" : letter.toLowerCase();
      const mark = accentChar(base, parseInt(next, 10));
      if (mark) {
        newValue += mark;
        if (cursorPos > i) newCursor -= 1; // two chars collapsed into one
        i += 2;
        continue;
      }
    }
    newValue += letter;
    i += 1;
  }
  if (newValue !== raw) {
    target.value = newValue;
    target.setSelectionRange(newCursor, newCursor);
  }
}

// Shuffled-bag draw: deal out the pool in a random shuffle, one lap at a
// time, so every item is guaranteed to appear once before anything repeats
// — plain Math.random() picks can revisit a few items while neglecting
// others for a long stretch, which is exactly what a practice tool
// shouldn't do.
function drawNext() {
  if (state.deck.length === 0) {
    if (state.range === "sentences") state.pool = sentencePool(state.level);
    state.deck = shuffled(state.pool);
    // Don't let a fresh lap start with the item that just ended the last one.
    if (state.current && state.deck.length > 1 && state.deck[0].value === state.current.value) {
      [state.deck[0], state.deck[1]] = [state.deck[1], state.deck[0]];
    }
  }
  return state.deck.shift();
}

function pickNext() {
  if (state.pool.length === 0) {
    showEmptyMistakes();
    return;
  }
  const next = presentable(drawNext());
  state.current = next;
  state.answered = false;
  const sentence = isSentence(next);
  card.classList.toggle("sentence-mode", sentence);
  if (sentence) {
    hanziDisplay.textContent = "";
    renderSentence(next);
  } else {
    hanziDisplay.textContent = next.hanzi;
  }
  pinyinInput.value = "";
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.classList.add("hidden");
  skipBtn.classList.remove("hidden");
  state.hintUsed = false;
  hintBtn.classList.toggle("hidden", !canHint());
  submitBtn.disabled = false;
  pinyinInput.disabled = false;
  if (!sentence) pinyinInput.focus();
  state.gradedValue = null;
}

// ---------------------------------------------------------------------------
// Word Order tiles. Tap a chunk in the bank to append it to the sentence;
// tap a placed chunk to send it back. Tapping beats drag-and-drop on a phone.
// ---------------------------------------------------------------------------

function isSentence(entry) {
  return entry?.kind === "sentence";
}

function makeChunk(text, order) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "chunk";
  b.lang = "zh-Hant";
  b.textContent = text;
  b.dataset.order = order;
  return b;
}

function renderSentence(entry) {
  // Reshuffle if the deal happens to come out already solved.
  let order = shuffled(entry.chunks);
  for (let i = 0; i < 10 && entry.accepted.includes(order.join("")); i++) {
    order = shuffled(entry.chunks);
  }
  sentenceAnswer.replaceChildren();
  sentenceBank.replaceChildren(...order.map(makeChunk));
}

function arrangement() {
  return [...sentenceAnswer.children].map((c) => c.textContent).join("");
}

// Keep the bank's layout stable: a returned chunk goes back to its own slot.
function returnToBank(chunk) {
  const after = [...sentenceBank.children].find((c) => +c.dataset.order > +chunk.dataset.order);
  sentenceBank.insertBefore(chunk, after || null);
}

function moveChunk(chunk) {
  if (chunk.parentElement === sentenceBank) sentenceAnswer.appendChild(chunk);
  else returnToBank(chunk);
  if (!state.answered) {
    feedback.textContent = "";
    feedback.className = "feedback";
  }
}

// Mirrors the pinyin path: before grading, Check grades; after grading, an
// unchanged arrangement moves on and a changed one is a practice re-check
// that never touches score or streak.
function submitSentence() {
  const built = arrangement();
  const complete = sentenceBank.children.length === 0;
  if (state.answered) {
    if (built === state.gradedValue) {
      pickNext();
      return;
    }
    if (!complete) return;
    const isCorrect = state.current.accepted.includes(built);
    showPracticeCheck(isCorrect);
    if (isCorrect && !state.hintUsed) clearMistake(state.current.value);
    state.gradedValue = built;
    return;
  }
  if (!complete) {
    feedback.className = "feedback";
    feedback.textContent = "Use all the words first.";
    return;
  }
  gradeAnswer(state.current.accepted.includes(built));
  state.gradedValue = built;
}

// Shown instead of a question when the Mistakes pool is empty — either
// nothing's been missed yet, or everything missed has since been corrected.
function showEmptyMistakes() {
  state.current = null;
  state.answered = true;
  card.classList.remove("sentence-mode");
  hanziDisplay.textContent = "🎉";
  feedback.className = "feedback correct";
  feedback.textContent = "No mistakes saved — get one wrong or skipped in any mode to add it here.";
  pinyinInput.value = "";
  pinyinInput.disabled = true;
  submitBtn.disabled = true;
  skipBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  hintBtn.classList.add("hidden");
  state.gradedValue = null;
}

function updateStats() {
  scoreValue.textContent = `${state.correct} / ${state.total}`;
  streakValue.textContent = String(state.streak);
  bestValue.textContent = String(state.best);
}

function updateMistakeCount() {
  const n = state.mistakes.size;
  mistakeCount.textContent = `${n} mistake${n === 1 ? "" : "s"} saved`;
  resetMistakesBtn.disabled = n === 0;
}

// Keeps the live Mistakes pool/deck in sync when mistakes are added or
// corrected while that mode is active, so the next draw reflects it.
function refreshMistakesPoolIfActive() {
  if (state.range !== "mistakes") return;
  state.pool = mistakesPool();
  state.deck = state.deck.filter((e) => state.mistakes.has(e.value));
}

// Homophones/Combo pull characters out of any meaningful word, so whenever
// the answer is revealed (right, wrong, or skipped), show a real word each
// character actually comes from underneath it. Triggers on the entry itself
// (its `value` prefix) rather than the current range, so a homophone group
// or combo pair encountered via Mistakes mode still gets its use cases shown.
// Memory hints, shown in My Mistakes. Most characters are a meaning part
// (女 woman, 氵 water, 訁 speech ...) plus a part that gives the sound
// (媽 = 女 + 馬 mǎ); others are pictures. Characters with no honest hint
// are left out rather than given a made-up story.
const HINTS = {
  零: "雨 (rain) on top; 令 (lìng) gives the sound líng.",
  一: "One stroke.",
  二: "Two strokes.",
  三: "Three strokes.",
  四: "A box (囗) with two legs inside.",
  八: "Two strokes parting — 八 also means ‘split’.",
  十: "A cross.",
  班: "Two 王 (jade) split by 刂 (knife) — sorting into groups, a class.",
  代: "亻 (person) — someone standing in for another, like the 班代.",
  老: "An old person bent over a walking stick.",
  你: "亻 (person) — ‘you’ is a person.",
  好: "女 (woman) + 子 (child) = good.",
  早: "日 (sun) just over the horizon = early.",
  謝: "訁 (speech) — thanks is something you say.",
  見: "目 (eye) on legs — a walking eye: to see.",
  有: "A hand holding 月 (meat) = to have.",
  問: "口 (mouth) at 門 (door, mén) — asking at the door; 門 gives the -en: wèn.",
  題: "頁 (page/head) — the topic at the top of the page.",
  嗎: "口 (mouth) + 馬 (mǎ): a spoken ‘ma’.",
  沒: "氵 (water) — sunk under water, gone: méi, not have.",
  還: "辶 (walk) — walking back.",
  客: "宀 (roof) — someone under your roof is a guest.",
  氣: "气 (steam) over 米 (rice) — steam from cooking rice: air.",
  起: "走 (walk) — get up and go: to rise.",
  關: "門 (door) — closing the door.",
  係: "亻 + 系 (xì), which gives the sound xi.",
  上: "The stroke points up from the line.",
  下: "The stroke hangs down from the line.",
  課: "訁 (speech) — a lesson is spoken.",
  中: "A line through the middle of a box.",
  國: "囗 (border) around it — a country inside its borders.",
  灣: "氵 (water) + 彎 (wān, a bend) — a bend of water, a bay: wān.",
  馬: "A horse: mane at the top, four legs (灬) at the bottom.",
  媽: "女 (woman) + 馬 (mǎ) gives the sound: mā.",
  房: "戶 (door) + 方 (fāng) gives the sound: fáng.",
  子: "A baby with its arms out.",
  爸: "父 (father) on top + 巴 (bā) gives the sound: bà.",
  個: "亻 (person) — the measure word for people.",
  月: "A crescent moon.",
  小: "Something split into tiny bits.",
  鹿: "A deer: antlers on top, legs at the bottom.",
  喝: "口 (mouth) — drinking goes through the mouth.",
  綠: "糸 (silk) — dyed thread; the right side 彔 (lù) gives the sound: lǜ.",
  茶: "艹 (grass) on top, 木 (tree) below — leaves from a tea bush.",
  電: "雨 (rain) on top — lightning in a storm.",
  話: "訁 (speech) + 舌 (tongue) = words.",
  碼: "石 (stone) + 馬 (mǎ) gives the sound: mǎ.",
  號: "号 (to call out) + 虎 (tiger) — a tiger's roar.",
  手: "A hand with its fingers.",
  機: "木 (wood) + 幾 (jǐ) gives the sound: jī — old machines were wooden.",
  日: "The sun.",
  生: "A sprout coming up out of the ground.",
  星: "日 (light) over 生 (shēng) gives the sound: xīng.",
  期: "月 (moon) marks time; 其 (qí) gives the sound: qí.",
  天: "大 (a big person) with a line above the head — the sky.",
  昨: "日 (day) — the day before.",
  明: "日 (sun) + 月 (moon) = bright.",
  美: "羊 (sheep) over 大 (big) — a big sheep was a beautiful thing.",
  李: "木 (tree) + 子 — the plum tree.",
  王: "三 joined by one line — the king links heaven, earth and people.",
  開: "門 (door) with two hands inside opening it.",
  叫: "口 (mouth) — to call out.",
  姓: "女 (woman) + 生 (shēng, birth): xìng — family names came from the mother.",
  請: "訁 (speech) + 青 (qīng) gives the sound: qǐng.",
  姐: "女 (woman) + 且 (qiě) gives the sound: jiě.",
  哪: "口 (mouth) + 那 (nà): asking ‘which?’ — nǎ.",
  本: "木 (tree) with a mark at the root — the base.",
  英: "艹 (grass) + 央 (yāng) gives the sound: yīng.",
  人: "A person walking.",
  們: "亻 (people) + 門 (mén) gives the sound: men.",
  他: "亻 (person) — he.",
  她: "女 (woman) — she.",
  妳: "女 (woman) — ‘you’ to a woman. Same sound as 你.",
  您: "你 over 心 (heart) — ‘you’ said with respect.",
  回: "A box inside a box — going round and coming back.",
  歡: "欠 (open mouth) — opening your mouth with joy.",
  迎: "辶 (walk) — walking out to meet someone.",
  接: "扌 (hand) — receiving with your hand.",
  什: "亻 + 十 (shí) gives the sound: shén.",
  咖: "口 + 加 (jiā) — 口 marks a sound borrowed from another language: kā.",
  啡: "口 + 非 (fēi) gives the sound: fēi.",
  牛: "An ox head with horns.",
  奶: "女 (woman) + 乃 (nǎi) gives the sound: nǎi.",
  水: "Water flowing.",
  紅: "糸 (silk) — dyed thread; 工 (gōng) gives the -ong: hóng.",
  烏: "鳥 (bird) missing one stroke — a crow is so black you can't see its eye.",
  喜: "A drum over 口 (mouth) — music and singing: joy.",
  家: "宀 (roof) over 豕 (pig) — a pig under the roof is home.",
  呢: "口 (mouth) + 尼 (ní) gives the sound: ne.",
  很: "艮 (gèn) gives the -en: hěn.",
  秋: "禾 (grain) + 火 (fire) — harvest time, autumn.",
  節: "⺮ (bamboo) — bamboo grows in joints; a festival is a joint in the year.",
  餅: "飠 (food) + 并 (bìng) gives the sound: bǐng.",
  柚: "木 (tree) + 由 (yóu) gives the sound: yòu.",
  烤: "火 (fire) + 考 (kǎo) gives the sound: kǎo.",
  肉: "A cut of meat with its marbling.",
  快: "忄 (heart) + 夬 (guài) gives the sound: kuài.",
  祝: "礻 (altar) + 兄 — praying at the altar: to wish.",
  第: "⺮ (bamboo) + 弟 (dì) gives the sound: dì.",
  張: "弓 (bow) — drawing a bow open.",
  怡: "忄 (heart) — a happy heart.",
  安: "宀 (roof) + 女 (woman) — safe under the roof: peace.",
  田: "A field split into four plots.",
  誠: "訁 (speech) + 成 (chéng) gives the sound: chéng — sincere words.",
  哥: "可 (kě) stacked twice: gē.",
  妹: "女 (woman) + 未 (wèi) gives the -ei: mèi.",
  誰: "訁 (speech) — asking ‘who?’.",
  進: "辶 (walk) + 隹 (bird) — birds only fly forward: to go in.",
  坐: "Two 人 sitting on 土 (the ground).",
  看: "手 (hand) over 目 (eye) — shading your eyes to look.",
  照: "日 (sun) + 灬 (fire) — light shining.",
  相: "木 (tree) + 目 (eye) — an eye looking at a tree.",
  片: "Half of 木 — a split piece of wood: a slice.",
  漂: "氵 (water) + 票 (piào) gives the sound: piào.",
  多: "Two 夕 (evenings) stacked — many.",
  都: "阝 (city) — 都 also means capital city.",
  兄: "口 (mouth) on 儿 (legs) — the one who speaks for the kids: older brother.",
  伯: "亻 (person) + 白 (bái) gives the sound: bó.",
  阿: "阝 + 可 — a friendly ‘ā’ before names: 阿姨.",
  姨: "女 (woman) + 夷 (yí) gives the sound: yí.",
  名: "夕 (evening) + 口 (mouth) — in the dark you call out your name.",
  字: "宀 (roof) + 子 (child) — a child at home learning to write.",
  書: "聿 (a hand holding a brush) on top — writing: a book.",
  兩: "Two 入 inside one frame: two.",
  朋: "Two 月 side by side — two friends together.",
  友: "Two hands (𠂇 and 又) — hands joined: a friend.",
  男: "田 (field) + 力 (strength) — the one working the field: male.",
  女: "A woman kneeling. It's the 女 on the left of 媽 姐 妹 她 妳 奶 姓 姨 好.",
  母: "女 with two dots — a mother.",
  太: "大 (big) with an extra dot — even bigger: too much. 太太 is Mrs.",
  說: "訁 (speech) — to say.",
  打: "扌 (hand) — hitting with your hand.",
  球: "王 (jade) + 求 (qiú) gives the sound: qiú — a jade bead, a ball.",
};

// A memory hint for each character in the answer: after any miss, and
// always in My Mistakes.
function appendHints(missed) {
  if ((!missed && state.range !== "mistakes") || isSentence(state.current)) return;
  const lines = [...new Set(state.current.hanzi)].filter((ch) => HINTS[ch]).map((ch) => `<div><span class="hint-char">${ch}</span> ${HINTS[ch]}</div>`);
  if (lines.length === 0) return;
  const box = document.createElement("div");
  box.className = "use-cases hints";
  box.innerHTML = `<div class="use-cases-title">Remember:</div>` + lines.join("");
  feedback.appendChild(box);
}

// My Mistakes can ask for the hint before answering. The answer's own pinyin
// is blanked out (媽: "…gives the sound: ?") so the hint helps recall rather
// than handing over the answer. Getting it right after a hint keeps the card
// in My Mistakes, so it has to be recalled unaided once to drop off.
function canHint() {
  return state.range === "mistakes" && !isSentence(state.current) && [...state.current.hanzi].some((ch) => HINTS[ch]);
}

function maskAnswer(text, entry) {
  return entry.syllableAccents.reduce(
    (t, syl) => t.replace(new RegExp(`(?<!\\p{L})${syl}(?!\\p{L})`, "gu"), "?"),
    text,
  );
}

function showHint() {
  if (state.answered || !canHint()) return;
  state.hintUsed = true;
  hintBtn.classList.add("hidden");
  const lines = [...new Set(state.current.hanzi)]
    .filter((ch) => HINTS[ch])
    .map((ch) => `<div><span class="hint-char">${ch}</span> ${maskAnswer(HINTS[ch], state.current)}</div>`);
  feedback.className = "feedback";
  feedback.innerHTML = `<div class="use-cases hints"><div class="use-cases-title">Hint:</div>${lines.join("")}</div>`;
  pinyinInput.focus();
}

function charWords(ch) {
  const words = WORDS.filter((w) => w.hanzi.length > 1 && w.hanzi.includes(ch)).slice(0, 3);
  if (words.length) return words;
  const ex = CHAR_EXAMPLES.get(ch); // digits like 七 only appear in numbers (十七)
  return ex ? [ex] : [];
}

function appendUseCases() {
  const value = String(state.current.value);
  if (!/^(homo|combo|look|char)-/.test(value)) return;
  // A lone character (By Class) gets up to three words it appears in.
  const lines = value.startsWith("char-")
    ? charWords(state.current.hanzi).map((w) => `${w.hanzi} (${w.pinyinDisplay})`)
    : [...state.current.hanzi]
        .map((ch) => {
          const ex = CHAR_EXAMPLES.get(ch);
          return ex ? `${ch} → ${ex.hanzi} (${ex.pinyinDisplay})` : null;
        })
        .filter(Boolean);
  if (lines.length === 0) return;
  const box = document.createElement("div");
  box.className = "use-cases";
  box.innerHTML =
    (state.current.note ? `<div class="lookalike-note">${state.current.note}</div>` : "") +
    `<div class="use-cases-title">Used in:</div>` +
    lines.map((l) => `<div>${l}</div>`).join("");
  feedback.appendChild(box);
}

// Any character/word/pair missed (wrong or skipped) anywhere is added to the
// Mistakes pool; getting it right anywhere — including a practice retype —
// takes it back off.
function addMistake(value) {
  if (state.mistakes.has(value)) return;
  state.mistakes.add(value);
  saveMistakes();
  updateMistakeCount();
  refreshMistakesPoolIfActive();
}

function clearMistake(value) {
  if (!state.mistakes.delete(value)) return;
  saveMistakes();
  updateMistakeCount();
  refreshMistakesPoolIfActive();
}

// For a sentence, `built` picks the reveal for the order actually used, so an
// accepted alternate shows the learner's own sentence rather than ours.
function answerHtml(entry, built) {
  if (isSentence(entry)) {
    const v = (built && entry.variants?.[built]) || entry;
    return (
      `<div class="sentence-reveal">` +
      `<div class="sentence-hanzi" lang="zh-Hant">${v.hanzi}</div>` +
      `<div class="sentence-pinyin">${v.pinyinDisplay}</div>` +
      `<div class="sentence-gloss">${v.gloss}</div>` +
      `</div>`
    );
  }
  return `<span class="answer-pinyin">${entry.pinyinDisplay}</span>`;
}

function showFeedback(isCorrect) {
  const answer = answerHtml(state.current, isCorrect && isSentence(state.current) ? arrangement() : null);
  if (isCorrect) {
    feedback.className = "feedback correct";
    feedback.innerHTML = `Correct! ${answer}`;
  } else {
    feedback.className = "feedback wrong";
    feedback.innerHTML = `Not quite — it's ${answer}`;
  }
  appendUseCases();
  appendHints(!isCorrect);
}

// After grading, the answer stays visible and the input stays live so the
// learner can retype the correct pinyin to practice it. Re-checking here
// never touches score/streak — it just confirms whether the retyped
// pinyin now matches.
function showPracticeCheck(isCorrect) {
  feedback.querySelector(".practice-note")?.remove();
  const note = document.createElement("div");
  note.className = `practice-note ${isCorrect ? "correct" : "wrong"}`;
  note.textContent = isCorrect ? "✓ That's it!" : "Not quite — keep trying.";
  feedback.appendChild(note);
}

// First-time grading, shared by the pinyin and Word Order paths.
function gradeAnswer(isCorrect) {
  state.answered = true;
  state.total += 1;
  if (isCorrect) {
    state.correct += 1;
    state.streak += 1;
    if (state.streak > state.best) {
      state.best = state.streak;
      saveBest(state.best);
    }
    if (!state.hintUsed) clearMistake(state.current.value);
    markCovered(state.current);
  } else {
    state.streak = 0;
    addMistake(state.current.value);
  }
  hintBtn.classList.add("hidden");
  revealLookupPanel();
  showFeedback(isCorrect);
  updateStats();
  nextBtn.classList.remove("hidden");
}

function submitAnswer(e) {
  e.preventDefault();
  if (!state.current) return;

  if (isSentence(state.current)) {
    submitSentence();
    return;
  }

  if (state.answered) {
    // Hitting Enter again without changing the input (e.g. right after
    // grading, or after a practice retype) advances to the next question
    // instead of re-checking the same text over and over.
    if (pinyinInput.value === state.gradedValue) {
      pickNext();
      return;
    }
    const userSyllables = parseUserInput(pinyinInput.value);
    const isCorrect = syllablesMatch(userSyllables, state.current.syllableAccents);
    showPracticeCheck(isCorrect);
    if (isCorrect && !state.hintUsed) clearMistake(state.current.value);
    pinyinInput.select();
    state.gradedValue = pinyinInput.value;
    return;
  }

  const userSyllables = parseUserInput(pinyinInput.value);
  gradeAnswer(syllablesMatch(userSyllables, state.current.syllableAccents));
  pinyinInput.select();
  state.gradedValue = pinyinInput.value;
}

function skipOrReveal() {
  if (state.answered) {
    pickNext();
    return;
  }
  state.answered = true;
  state.total += 1;
  state.streak = 0;
  hintBtn.classList.add("hidden");
  addMistake(state.current.value);
  feedback.className = "feedback wrong";
  feedback.innerHTML = `Skipped — it's ${answerHtml(state.current)}`;
  appendUseCases();
  appendHints(true);
  updateStats();
  nextBtn.classList.remove("hidden");
  if (isSentence(state.current)) {
    // Tiles stay put so the sentence can still be assembled for practice.
    state.gradedValue = arrangement();
  } else {
    pinyinInput.value = "";
    pinyinInput.focus();
    state.gradedValue = "";
  }
}

function setRange(range) {
  state.range = range;
  state.pool = range === "mistakes" ? mistakesPool() : range === "classes" ? CLASS_POOLS[state.classIndex] : RANGES[range];
  state.deck = []; // start a fresh shuffled lap for the new pool
  [...rangeSelect.children].forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.range === range);
  });
  // Only on the Word Order tab — sentences in My Mistakes keep whatever level they were.
  levelSelect.classList.toggle("hidden", range !== "sentences");
  classSelect.classList.toggle("hidden", range !== "classes");
  pickNext();
}

function setClass(i) {
  state.classIndex = i;
  try {
    localStorage.setItem(CLASS_KEY, String(i));
  } catch {
    /* ignore (e.g. storage disabled) */
  }
  classPick.value = String(i);
  classNew.textContent = `New: ${CLASSES[i].chars.split("").join(" ")}`;
  updateClassCovered();
  if (state.range === "classes") {
    state.pool = CLASS_POOLS[i];
    state.deck = [];
    pickNext();
  }
}

function coveredInClass(i) {
  const done = new Set(state.covered[CLASSES[i].pdf] || []);
  return CLASS_POOLS[i].filter((e) => done.has(String(e.value))).length;
}

function updateClassCovered() {
  const i = state.classIndex;
  const total = CLASS_POOLS[i].length;
  const done = coveredInClass(i);
  classCovered.textContent = done === total ? `All ${total} covered ✓` : `Covered ${done} / ${total}`;
  classCovered.classList.toggle("done", done === total);
  resetClassBtn.classList.toggle("hidden", done === 0);
}

function markCovered(entry) {
  if (state.range !== "classes") return;
  const key = CLASSES[state.classIndex].pdf;
  const list = state.covered[key] || (state.covered[key] = []);
  if (list.includes(String(entry.value))) return;
  list.push(String(entry.value));
  saveCovered();
  updateClassCovered();
}

function resetClassCovered() {
  const c = CLASSES[state.classIndex];
  if (!window.confirm(`Reset progress for PDF ${c.pdf} · ${c.date}?`)) return;
  delete state.covered[c.pdf];
  saveCovered();
  updateClassCovered();
}

// Newest first, since the latest class is the one most often wanted.
classPick.innerHTML = CLASSES.map((c, i) => ({ c, i }))
  .reverse()
  .map(({ c, i }) => `<option value="${i}">PDF ${c.pdf} · ${c.date} · ${escapeHtml(c.title)} (${CLASS_POOLS[i].length})</option>`)
  .join("");

function setLevel(level) {
  state.level = level;
  try {
    localStorage.setItem(LEVEL_KEY, level);
  } catch {
    /* ignore (e.g. storage disabled) */
  }
  [...levelSelect.children].forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.level === level);
  });
  if (state.range === "sentences") {
    state.deck = []; // deal a new batch at the new length
    pickNext();
  }
}

function resetMistakes() {
  if (state.mistakes.size === 0) return;
  const ok = window.confirm("Reset your saved mistakes? This clears the whole practice list.");
  if (!ok) return;
  state.mistakes.clear();
  saveMistakes();
  updateMistakeCount();
  if (state.range === "mistakes") {
    state.pool = [];
    state.deck = [];
    pickNext();
  }
}

// ---------------------------------------------------------------------------
// Quick Reference sidebar — look up any typed pinyin against everything
// taught so far (CHAR_INDEX), independent of the current game mode/range.
// Stays hidden until the learner has attempted a Check, per request.
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function lookupPinyin(raw) {
  return raw
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      const parsed = parseSyllableWord(word);
      if (!parsed) return { word, status: "invalid" };
      const chars = PINYIN_LOOKUP.get(parsed);
      return chars ? { word, status: "learned", parsed, chars } : { word, status: "unlearned", parsed };
    });
}

function renderLookupResult(raw) {
  const results = lookupPinyin(raw);
  if (results.length === 0) {
    lookupResult.innerHTML = "";
    return;
  }
  lookupResult.innerHTML = results
    .map((r) => {
      if (r.status === "invalid") {
        return `<div class="lookup-row invalid">${escapeHtml(r.word)} — not valid pinyin</div>`;
      }
      if (r.status === "unlearned") {
        return `<div class="lookup-row unlearned">${escapeHtml(r.parsed)} — haven't learned this yet</div>`;
      }
      // Memory hint for each matching character, same as in My Mistakes.
      const hints = r.chars
        .filter((ch) => HINTS[ch])
        .map((ch) => `<div class="lookup-hint"><span class="hint-char">${ch}</span> ${HINTS[ch]}</div>`)
        .join("");
      return `<div class="lookup-row learned">${escapeHtml(r.parsed)} → <span class="lookup-chars">${r.chars.join(" / ")}</span>${hints}</div>`;
    })
    .join("");
}

function revealLookupPanel() {
  lookupPanel.classList.remove("hidden");
}

sentenceBuilder.addEventListener("click", (e) => {
  const chunk = e.target.closest(".chunk");
  if (chunk) moveChunk(chunk);
});

// Desktop keyboard for Word Order: Enter checks, Backspace takes back the last
// placed chunk. Only when nothing else wants the key — not while typing in the
// lookup box, and not when a button like Skip has focus.
document.addEventListener("keydown", (e) => {
  if (!isSentence(state.current)) return;
  if (e.target !== document.body && !e.target.closest(".chunk")) return;
  if (e.key === "Enter") {
    e.preventDefault();
    answerForm.requestSubmit();
  } else if (e.key === "Backspace" && sentenceAnswer.lastElementChild) {
    e.preventDefault();
    moveChunk(sentenceAnswer.lastElementChild);
  }
});

pinyinInput.addEventListener("input", liveTransformInput);
lookupInput.addEventListener("input", liveTransformInput);
answerForm.addEventListener("submit", submitAnswer);
skipBtn.addEventListener("click", skipOrReveal);
hintBtn.addEventListener("click", showHint);
nextBtn.addEventListener("click", pickNext);
rangeSelect.addEventListener("click", (e) => {
  const btn = e.target.closest(".range-btn");
  if (btn) setRange(btn.dataset.range);
});
resetMistakesBtn.addEventListener("click", resetMistakes);
classPick.addEventListener("change", () => setClass(Number(classPick.value)));
resetClassBtn.addEventListener("click", resetClassCovered);
levelSelect.addEventListener("click", (e) => {
  const btn = e.target.closest(".level-btn");
  if (btn) setLevel(btn.dataset.level);
});
lookupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderLookupResult(lookupInput.value);
});

// The 楷書 fallback (LXGW WenKai TC) is served in unicode-range slices that
// load only when a character first appears, so each new card flashed the
// default font first. Fetch every slice the syllabus needs up front.
if (document.fonts?.load) {
  const allHanzi = [...new Set([...CHAR_INDEX.map((e) => e.ch), ..."，。？、"])].join("");
  document.fonts.load('400 1em "LXGW WenKai TC"', allHanzi).catch(() => {});
}

updateStats();
updateMistakeCount();
setLevel(state.level);
setClass(state.classIndex);
pickNext();
