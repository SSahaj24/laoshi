# Adding a new class PDF

Run through this every time a new PDF lands in `class_material/` (gitignored;
the slides are the teacher's material and are never committed). Keep this file
up to date when the process changes.

## Rules

- [ ] **Recap grid only.** A character counts only once it appears in the
      teacher's recap grid (the coloured character grid at the start of each
      PDF). Title-slide or example-only characters stay out.
- [ ] **How far to go.** The red divider marks what's been covered. If the
      weekly-test slide says "Till X" further along, include up to X, and say
      so in the commit and to the user.
- [ ] **Traditional characters only.**
- [ ] **Append, never insert.** New entries go at the end of `WORD_DEFS`,
      `LOOKALIKE_DEFS`, `SENTENCE_DEFS` and `CLASSES`. Saved mistakes are stored
      by position (`word-N`, `look-N`, `sent-N`), so inserting breaks them.

## 1. Read the PDF

- [ ] Read the whole PDF: the grid, the vocabulary slides with their pinyin,
      the example sentences, the dialogues, any word-order or fill-in drills,
      the assignment slide and the weekly-test slide.
- [ ] Get the grid's text layer to see exactly what was added (prints each
      PDF's new grid characters):

      ```bash
      cd class_material && python -I -c "
      import pypdf,glob,re,sys; sys.stdout.reconfigure(encoding='utf-8')
      seen=''
      for f in sorted(glob.glob('*.pdf'),key=lambda f:int(f.split('.')[0])):
          g=''
          for pg in pypdf.PdfReader(f).pages:
              t=pg.extract_text() or ''
              if '袁筱惠' in t: break
              g+=''.join(re.findall(r'[一-鿿]',t))
          new=''.join(dict.fromkeys(c for c in g if c not in seen)); seen+=new
          print(f, '->', new)"
      ```

      The text layer can run past the divider, so check it against the slide
      image.

## 2. `script.js`

- [ ] **Header comment** above `WORD_DEFS`: add the PDF to the range and list
      the characters it added.
- [ ] **`WORD_DEFS`**: add a `// PDF N` comment, then the new words. Take the
      pinyin from the slides. Neutral tones have no mark (`{ ch: "字", accented: "zi" }`).
      The first time a character appears decides its reading everywhere, so
      don't introduce a new character through a tone-changed form (一 as yí).
- [ ] **`CLASSES`** (By Class): add
      `{ pdf: N, date: "Mon D", title: "第X課 · topic", chars: "…" }` with the
      PDF number, the date from the file name, the topic from the file name,
      and only the newly added grid characters. Skip a PDF that added nothing.
- [ ] **`WORD_TAUGHT`**: if a new word uses only old characters (e.g. 課本),
      pin it to this class.
- [ ] **`HINTS`**: add a memory hint for each new character: its meaning part,
      its sound part (媽 = 女 + 馬 mǎ), or the picture behind it. If there's no
      honest hint, leave it out.
- [ ] **`LOOKALIKE_DEFS`**: add groups for new characters that look like
      existing ones (shared parts, e.g. 都那阿陳 all have 阝). Don't add groups
      where every answer is the same pinyin.
- [ ] **`SENTENCE_DEFS`** (Word Order): add the slide's example sentences and
      drill answers, split into tiles the way the slides split them. Every
      character must be in the syllabus. For other valid orders, add `alts`,
      with their own `gloss` if the meaning changes (都不 vs 不都).
- [ ] **`LEX` / `PATTERNS`** (generated sentences): add new nouns, adjectives
      (with `vnv`), family roles or patterns where they fit naturally. Mark
      anything that only works with a singular owner (`single: true`).
- [ ] **Pinyin rules** in `sentencePinyin` if the slides teach a new one, as
      with 不 and 一 tone changes or neutral second syllables.

## 3. Cache-busting

- [ ] Bump `?v=N` on both `style.css` and `script.js` in `index.html`.
- [ ] Bump the port in `.claude/launch.json` so the preview doesn't serve
      stale files.

## 4. Check in the browser

- [ ] `node --check script.js` passes.
- [ ] Paste into the browser console on the preview page, with
      `NEW = "<new chars>"` filled in:

      ```js
      const NEW = "朋友男女次母";
      const errs = []; const oe = console.error; console.error = (...a) => errs.push(a.join(" "));
      let fails = 0;
      for (const lv of ["easy", "medium", "hard"]) for (let i = 0; i < 40; i++)
        for (const e of sentencePool(lv)) if (!e.accepted.includes(e.chunks.join(""))) fails++;
      console.error = oe;
      ({
        pinyin: [...NEW].map((c) => c + ":" + (CHAR_PINYIN.get(c) || "MISSING")).join(" "),
        noClass: CHAR_INDEX.filter((e) => !CLASS_OF_CHAR.has(e.ch)).map((e) => e.ch).join(""),
        noHint: [...NEW].filter((c) => !HINTS[c]).join(""),
        newSentences: SENTENCES.slice(-10).map((s) => `${s.hanzi} | ${s.pinyinDisplay}`),
        generatedFailures: fails,
        errors: [...new Set(errs)],
      })
      ```

  You want: no `MISSING`, `noClass` empty, `generatedFailures: 0`, no
  `errors`. Check by eye that the new sentences' pinyin matches the slides,
  including tone changes and neutral tones.
- [ ] Click through the new class in **By Class**, and check that phone width
      doesn't scroll sideways.

## 5. Ship

- [ ] Commit with a message naming the PDF and characters, ending with the
      `Co-Authored-By` line.
- [ ] `git push origin main`, then wait until GitHub Pages serves it:
      `curl -s "https://ssahaj24.github.io/laoshi/script.js?cb=$RANDOM" | grep -q '<something new>'`.
- [ ] Tell the user what was added, and flag any judgement calls: past the
      divider, separate grid slides, words left out.
- [ ] If the process changed, update this file.
