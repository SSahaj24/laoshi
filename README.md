# 老師 · laoShi

A pinyin practice game for Traditional Chinese. Type the exact pinyin — including
where the tone mark sits — for the character shown.

**Play:** https://ssahaj24.github.io/laoshi/

## Modes

- **0–9 / 10–99 / 0–99** — numbers
- **Words** — vocabulary phrases
- **Homophones** — characters sharing a syllable but differing in tone, shown together
- **Combo** — two random characters, real word or not
- **Mistakes** — everything missed or skipped; answer it right and it drops off

## Typing tones

Put the tone number right after the letter that carries the mark, not at the end
of the syllable — that is what actually tests placement:

| Word | Type | Not |
| --- | --- | --- |
| sān shí wǔ | `sa1n shi2 wu3` | |
| èr | `e4r` | `er4` |
| líng | `li2ng` | `ling2` |
| lǜ | `lv4` | |

Typed tone marks (`sān shí wǔ`) work too. The input converts digits to accented
vowels as you type.

## Running locally

No build step — open `index.html` in a browser.

Vocabulary comes from a Traditional Chinese course's weekly recap grids. The
course slides themselves are not in this repo.
