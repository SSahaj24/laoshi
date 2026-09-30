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
// teacher's recap-grid review images (class_material/1-3, 7-9, 10-17), up to
// the red divider bar she draws to mark how far the class has covered.
// The grid grows lesson by lesson: 來/去/回/歡/迎/上/接/什麼/咖啡/牛奶/水
// entered with PDF 12-13, 紅/烏/龍/喜/要 with PDF 15, and 妳/您/她/哪/家/呢/很
// with PDF 17, whose divider now sits at the end of the third grid page.
// Still left out: anything sourced only from title slides or example
// sentences (e.g. 第/課 from "第一課", 起 from "一起").
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
  const word = rawWord.toLowerCase();
  const digitMatch = word.match(/^([a-z]*)([1-4])([a-z]*)$/);
  if (digitMatch) {
    const [, pre, toneStr, post] = digitMatch;
    if (!pre) return null; // digit with no preceding letter to mark
    const mark = accentChar(pre[pre.length - 1], parseInt(toneStr, 10));
    if (!mark) return null; // marked a consonant, not a vowel
    return pre.slice(0, -1) + mark + post;
  }
  if (ACCENTED_LETTER_RE.test(word)) return word; // already-accented input
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
    alts: [["老師", "去", "接", "我們"]],
    end: "。",
    gloss: "We're going to pick up the teacher.",
  },
  { chunks: ["你們", "有沒有", "我的", "電話號碼"], end: "？", gloss: "Do you have my phone number?" },
  { chunks: ["這個", "牛奶", "很", "好喝"], end: "。", gloss: "This milk is delicious." },
  {
    chunks: ["我", "喝", "紅茶，", "你", "呢"],
    alts: [["你", "喝", "紅茶，", "我", "呢"]],
    end: "？",
    gloss: "I drink black tea — and you?",
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
  });
  let k = 0;
  const words = chunks.map((c) => {
    const cjk = [...c].filter((ch) => CHAR_PINYIN.has(ch));
    const missing = [...c].filter((ch) => /\p{Script=Han}/u.test(ch) && !CHAR_PINYIN.has(ch));
    if (missing.length) console.error(`Word Order: ${missing.join("")} in "${c}" is not in the syllabus`);
    const word = cjk.map(() => syl[k++]).join("");
    return c.endsWith("，") ? `${word},` : word;
  });
  return words.join(" ") + (end === "？" ? "?" : ".");
}

const SENTENCES = SENTENCE_DEFS.map((def, i) => ({
  value: `sent-${i}`,
  kind: "sentence",
  chunks: def.chunks,
  accepted: [def.chunks, ...(def.alts || [])].map((order) => order.join("")),
  gloss: def.gloss,
  hanzi: def.chunks.join("") + def.end,
  pinyinDisplay: sentencePinyin(def.chunks, def.end),
}));

// ---------------------------------------------------------------------------
// Game state
// ---------------------------------------------------------------------------

const RANGES = {
  numbers: ALL_NUMBERS,
  words: WORDS,
  sentences: SENTENCES,
  homophones: HOMOPHONE_GROUPS,
  combo: COMBO_PAIRS,
};

// Every question object from every pool, keyed by its unique `value`, so a
// mistake logged in any mode can be looked back up regardless of which pool
// it originally came from. "mistakes" itself isn't a fixed RANGES entry —
// it's rebuilt from state.mistakes each time (see mistakesPool()).
const ALL_ENTRIES = [...ALL_NUMBERS, ...WORDS, ...SENTENCES, ...HOMOPHONE_GROUPS, ...COMBO_PAIRS];
const ENTRY_BY_VALUE = new Map(ALL_ENTRIES.map((e) => [e.value, e]));

function mistakesPool() {
  return [...state.mistakes].map((v) => ENTRY_BY_VALUE.get(v)).filter(Boolean);
}

const STORAGE_KEY = "laoshi_numbers_best_streak";
const MISTAKES_KEY = "laoshi_mistakes";

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
const sentenceBuilder = document.getElementById("sentenceBuilder");
const sentenceAnswer = document.getElementById("sentenceAnswer");
const sentenceBank = document.getElementById("sentenceBank");
const answerForm = document.getElementById("answerForm");
const pinyinInput = document.getElementById("pinyinInput");
const submitBtn = document.getElementById("submitBtn");
const skipBtn = document.getElementById("skipBtn");
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
  const oldValue = target.value;
  const cursorPos = target.selectionStart;
  let newValue = "";
  let newCursor = cursorPos;
  let i = 0;
  while (i < oldValue.length) {
    const letter = oldValue[i];
    const next = oldValue[i + 1];
    if (next && /[aeiouv]/i.test(letter) && /[1-4]/.test(next)) {
      const mark = accentChar(letter.toLowerCase(), parseInt(next, 10));
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
  if (newValue !== oldValue) {
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
  const next = drawNext();
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
    if (isCorrect) clearMistake(state.current.value);
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
function appendUseCases() {
  const value = String(state.current.value);
  if (!value.startsWith("homo-") && !value.startsWith("combo-")) return;
  const lines = [...state.current.hanzi]
    .map((ch) => {
      const ex = CHAR_EXAMPLES.get(ch);
      return ex ? `${ch} → ${ex.hanzi} (${ex.pinyinDisplay})` : null;
    })
    .filter(Boolean);
  if (lines.length === 0) return;
  const box = document.createElement("div");
  box.className = "use-cases";
  box.innerHTML =
    `<div class="use-cases-title">Used in:</div>` + lines.map((l) => `<div>${l}</div>`).join("");
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

function answerHtml(entry) {
  if (isSentence(entry)) {
    return (
      `<div class="sentence-reveal">` +
      `<div class="sentence-hanzi" lang="zh-Hant">${entry.hanzi}</div>` +
      `<div class="sentence-pinyin">${entry.pinyinDisplay}</div>` +
      `<div class="sentence-gloss">${entry.gloss}</div>` +
      `</div>`
    );
  }
  return `<span class="answer-pinyin">${entry.pinyinDisplay}</span>`;
}

function showFeedback(isCorrect) {
  const answer = answerHtml(state.current);
  if (isCorrect) {
    feedback.className = "feedback correct";
    feedback.innerHTML = `Correct! ${answer}`;
  } else {
    feedback.className = "feedback wrong";
    feedback.innerHTML = `Not quite — it's ${answer}`;
  }
  appendUseCases();
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
    clearMistake(state.current.value);
  } else {
    state.streak = 0;
    addMistake(state.current.value);
  }
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
    if (isCorrect) clearMistake(state.current.value);
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
  addMistake(state.current.value);
  feedback.className = "feedback wrong";
  feedback.innerHTML = `Skipped — it's ${answerHtml(state.current)}`;
  appendUseCases();
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
  state.pool = range === "mistakes" ? mistakesPool() : RANGES[range];
  state.deck = []; // start a fresh shuffled lap for the new pool
  [...rangeSelect.children].forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.range === range);
  });
  pickNext();
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
      return `<div class="lookup-row learned">${escapeHtml(r.parsed)} → <span class="lookup-chars">${r.chars.join(" / ")}</span></div>`;
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
nextBtn.addEventListener("click", pickNext);
rangeSelect.addEventListener("click", (e) => {
  const btn = e.target.closest(".range-btn");
  if (btn) setRange(btn.dataset.range);
});
resetMistakesBtn.addEventListener("click", resetMistakes);
lookupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderLookupResult(lookupInput.value);
});

updateStats();
updateMistakeCount();
pickNext();
