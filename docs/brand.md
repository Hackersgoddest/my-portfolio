# Hackersgoddest: the brand

Hackersgoddest is the working name of Frank Konadu Oppong, a software engineer and ML researcher in Accra. Every choice below has its reason next to it, so a later change can see what it would give up.

## The idea: printed cloth

The site is a length of hand-printed cloth. A printer in Ntonso rules the cloth with a comb, then stamps it one square at a time; a hacker works the same way, patiently and by hand, on a grid. It also gives the brand something no other developer portfolio has: it could only have come from here.

| Decision | Why |
| --- | --- |
| **The process, not the symbols** | Ghana's National Folklore Board treats Adinkra in corporate branding as use that needs its permission (Copyright Act 2005, Act 690), and has licensed brands like MTN and the Ghana Stock Exchange. So the brand borrows how the cloth is made and uses **no Adinkra symbols or kente patterns**. This is a design decision, not legal advice: talk to the Board before ever adding a real symbol. |
| **White cloth, not red or brown** | Kuntunkuni brown, red and blue-black are the colours of funeral cloth; white cloth is worn to celebrate the living. A red-and-black portfolio would say the wrong thing to a Ghanaian visitor. |
| **One theme, no toggle** | A brand is a set of decisions, and a light/dark switch hands the biggest one to the visitor. The page declares `color-scheme: only light` so browsers leave it alone. |
| **Light and warm** | Black text on warm backgrounds read fastest in a study of 341 readers (Rello & Bigham, 2017), and it steps away from the dark-navy-and-neon look that most developer sites and AI-generated pages share. |
| **No animation** | The print is still. Hover states change colour instantly. |

## The name

"Goddest" reads as a superlative: god, godder, goddest. The confidence is the joke, and the craft has to earn it. Written as one word, **Hackersgoddest**, and set on two lines (HACKERS / GODDEST) when there's room. "Hacker" here is the old meaning: playful cleverness, not breaking into things.

## The mark

An **H cut from a 3×3 grid**, seven squares, with the crossbar's middle square in gold.

| Decision | Why |
| --- | --- |
| **3×3** | The grid of the glider from Conway's Game of Life, proposed as the hacker emblem by Eric S. Raymond. |
| **Squares with nudged corners** | They print like a block cut by hand. Each stamp is carved, and no two prints match. |
| **One gold square** | The one thing in the mark that's different is the thing you remember. |
| **A simpler favicon** | Straight squares on an ink tile (`public/favicon.svg`), because the nudges disappear at 16px. Checked at 16 and 32px. |

## The portrait

The hero's portrait (`public/portrait.webp`) is the studio photo in full colour, cropped square, mirrored so it faces the name, and matted in gold. A real face is the one thing in the hero nobody else can have, so it isn't filtered.

## Colour

| Name | Hex | Use | Contrast |
| --- | --- | --- | --- |
| Cloth | `#F6EFE1` | The page | |
| Cloth deep | `#EADFC8` | Mats behind pictures, the Skills band | |
| Ink | `#15182B` | Text, contact and footer | 15.3:1 on cloth |
| Ink soft | `#4C4A52` | Body copy | 7.6:1 on cloth, 6.6:1 on cloth deep |
| Ink faint | `#5C5849` | Labels | 6.2:1 on cloth, 5.4:1 on cloth deep |
| Cloth dim | `#CFC8B8` | Secondary text on ink | 10.5:1 |
| Gold | `#F2B01E` | Fills, underlines, text on ink only | 9.2:1 with ink |
| Gold deep | `#8A5A00` | Only when gold must be text on cloth | 5.2:1 on cloth |

Gold on cloth is 1.7:1, so it is never text on cloth. Two inks and a cloth: it should look printable.

## Type

| Face | Use | Why |
| --- | --- | --- |
| **Ga Maamli** | Name, headings, big numerals | Drawn by a Ghanaian team (Afotey Clement Nii Odai, Ama Asantewa Diaka, David Abbey-Thompson) from Accra's handwritten event posters. Capitals only, so keep it to short lines at large sizes. Never for paragraphs. |
| **Hanken Grotesk** | Reading text | Warm and plain, so the poster face can be loud. |
| **DM Mono** | Labels, tool lists | The engineer's voice, in small amounts. |

All three are served from this site through Astro's font API.

## The comb rule

Four fine lines (`.comb`) open every section, echoing the comb that marks out the cloth's grid before printing. It takes the colour of the text around it. Solid 1px ink rules are for inside a section.

## Voice

Plain and specific. Name what was built and for whom. No "passionate", no "innovative solutions". Confidence belongs in the name; the sentences stay modest.

## Research

- [Cooper Hewitt: Adinkra, message and medium](https://www.cooperhewitt.org/2018/09/07/adinkra-message-and-medium/): comb grid, calabash stamps, badie ink, funeral and celebration colours.
- [Graphic Online: compensation for use of folklore](https://graphic.com.gh/news/general-news/we-ll-seek-compensation-from-businesses-that-use-folklore.html), [GhanaWeb: seek authorization before using Adinkra](https://mobile.ghanaweb.com/GhanaHomePage/education/Seek-authorization-before-using-Adinkra-symbols-National-Folklore-Board-745396), [Voyages Afriq: licences to MTN, GSE](https://voyagesafriq.com/?p=14523).
- [KNUST thesis](https://ir.knust.edu.gh/handle/123456789/3367): Ghanaian symbols are often used without knowing their meaning.
- [Rello & Bigham, Good Background Colors for Readers (2017)](https://www.changedyslexia.org/publications/pdfs/2017-ASSETS-Good%20Background%20Colors.pdf).
- [The Creative's Note: Ga Maamli](https://thecreativesnote.substack.com/p/google-fonts-adds-ga-maamli-accra-inspired-font?open=false).
- [Wikipedia: Hacker culture](https://en.wikipedia.org/wiki/Hacker_culture): the glider emblem and "playful cleverness".
