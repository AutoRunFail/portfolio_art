/* =====================================================================
   DATA  -  everything on the site comes from this block.
   To add a project, copy one entry in PROJECTS and edit it.
   ===================================================================== */

const SETTINGS = {
  name: 'Moss Wilder',
  intro: 'Illustrator, poet and designer. Fifteen years of making things in pixels, paint, ink and polygons.',
  places: 'Portland, Los Angeles & Chicago',
  email: 'wildismoss@gmail.com',

  // Where images come from:
  //   'local' = a folder named "portfolio" sitting next to your .html pages (use this for your real site)
  //   'drive' = pulls straight from Google Drive (only works if the Drive files are shared as "Anyone with the link")
  source: 'local',
  localRoot: 'portfolio/'
};

/* The three groups. The order here is the order they appear on the home page and the Work page.
   color = the group's accent color, text = a version that reads well on the dark background (optional). */
const FAMILIES = {
  digital: { name: 'Digital art and design', color: '#7C5CFF', text: '#9078FF', blurb: 'Illustration, vector design and digital finishing.' },
  paper:   { name: 'Paper and paint',        color: '#FF5D8F',                  blurb: 'Watercolor, drawing and mixed media, shown stage by stage.' },
  three:   { name: '3D',                     color: '#F2A900',                  blurb: 'Modeling, texturing and real-time renders.' }
};

/* Every tool or medium. family must be digital, paper or three.
   text = a lighter version of the color for text on the dark background (optional). */
const MEDIUMS = [
  { id: 'procreate',   name: 'Procreate',         family: 'digital', color: '#7C5CFF', text: '#9078FF', blurb: 'Concept sketches and finished illustrations.' },
  { id: 'affinity',    name: 'Affinity Designer', family: 'digital', color: '#00A896', blurb: 'Vector logos, emotes, posters and layouts.' },
  { id: 'illustrator', name: 'Adobe Illustrator', family: 'digital', color: '#FF7A29', blurb: 'Vector art for banners, logos and apparel.' },
  { id: 'photoshop',   name: 'Adobe Photoshop',   family: 'digital', color: '#2E6BFF', text: '#5C8DFF', blurb: 'Digital finishing and comic pages.' },
  { id: 'watercolor',  name: 'Watercolor',        family: 'paper',   color: '#FF5D8F', blurb: 'Paint on paper, shown stage by stage.' },
  { id: 'drawing',     name: 'Drawing',           family: 'paper',   color: '#5B4FA8', text: '#9A8CF0', blurb: 'Hand-drawn work on paper.' },
  { id: 'mixed',       name: 'Mixed media',       family: 'paper',   color: '#9BC53D', blurb: 'Physical pieces made with more than one medium.' },
  { id: 'blender',     name: 'Blender',           family: 'three',   color: '#F2A900', blurb: 'Modeling and rendering.' },
  { id: 'ue4',         name: 'Unreal Engine 4',   family: 'three',   color: '#E8446D', blurb: 'Real-time terrain and foliage tests.' },
  { id: 'substance',   name: 'Substance Painter', family: 'three',   color: '#3BB273', blurb: 'Texturing 3D props.' },
  { id: 'magica',      name: 'MagicaVoxel',       family: 'three',   color: '#00B7D8', blurb: 'Voxel modeling.' }
];

/* ---------- helpers for writing items ----------
   I(file, driveId, caption)   an image
   V(file, driveId, caption)   a video
   numbered('Step', [[file,id],...])  captions "Step 1", "Step 2"...
   File names must match the file names in your Drive folder.            */
const I = (file, id, cap) => ({ file, id, cap: cap || file.replace(/\.[^.]+$/, '') });
const V = (file, id, cap) => ({ file, id, cap, video: true });
const numbered = (label, list) => list.map(([f, id], n) => I(f, id, label + ' ' + (n + 1)));

/* ---------- PROJECTS ----------
   slug     unique id used in the link (yourdomain.com/#slug)
   year     leave out if unknown
   tools    medium ids from MEDIUMS (first one sets the project's color)
   dir      the Drive folder name (path inside /portfolio when hosting locally)
   process  true = steps are shown numbered, as a sequence
   fit      'contain' for logos / transparent PNGs so they are not cropped
   cover    file name to use as the card image (default: last image)
   phases   the steps. Each has a title t, optional tool, optional dir (sub-folder),
            optional tile:'sm' (small tiles), and items.                      */
const PROJECTS = [

  /* ---------------- 2026 ---------------- */
  {
    slug: 'book-illustrations', title: 'Book Illustrations', year: 2026,
    tools: ['watercolor'], process: true,
    dir: 'Book Illustrations (2026)', cover: 'Illustrations Camera.jpg',
    phases: [
      // No Drive ids needed: these load from the portfolio folder (source: 'local')
      { t: 'In progress', tool: 'watercolor', items: numbered('In progress', [
          ['Illustrations In Progress 1.jpg', null], ['Illustrations In Progress 2.jpg', null], ['Illustrations In Progress 3.jpg', null]
        ]) },
      { t: 'Finished pieces', tool: 'watercolor', items: [
          I('Acorn Parcel.png', null, 'Acorn Parcel'),
          I('Fall Curled Oak Leaf.png', null, 'Fall Curled Oak Leaf'),
          I('Feather Quill.png', null, 'Feather Quill'),
          I('Green Oak Leaf.png', null, 'Green Oak Leaf')
        ] },
      { t: 'All together', tool: 'watercolor', items: [
          I('Illustrations Camera.jpg', null, 'The finished pieces side by side on the desk')
        ] }
    ]
  },
  {
    slug: 'skate-deck-birds', title: 'Skate Deck Show: Birds', year: 2026,
    tools: ['watercolor', 'procreate'], process: true,
    dir: 'Skate Deck Show 2026', cover: 'Final Boards.jpg',
    phases: [
      { t: 'Alternate concepts', tool: 'procreate', dir: 'Alt Concepts (Procreate)', tile: 'sm',
        items: numbered('Alt concept', [
          ['IMG_0480.PNG','13rSuiXvbOP23E2_FxGn2q21tAvuuQlSG'], ['IMG_0482.PNG','12rLjAISd0JxHJV-RanQtETIUzszQlsI7'],
          ['IMG_0483.PNG','1ukDTNRE-Ju87LGq0WJQt3xflcvjys2w2'], ['IMG_0484.PNG','1Sk09e7PmWRLCLLLuH24dYs10KuGf_xpg'],
          ['IMG_0486.PNG','1wRXwese6573PKnx-Okrw3JvIl9at0Jqt'], ['IMG_0487.PNG','1VYlH53wE44HFl6VzG8dYvesNsWdmy3ia'],
          ['IMG_0488.PNG','10GiBWYTCH-acXrVO9KLY1sjW6tYTBnX6'], ['IMG_0489.PNG','1Y8XDJVL_t-lTkH2ECXjWHf_8gsJ9ctrk'],
          ['IMG_0491.PNG','1gjXa_R6-OfOvee9mddz79sgFX5uobX-t'], ['IMG_0493.PNG','1fgqWYS_9dKu3mQ0QcByr3q07sy92uUMI'],
          ['IMG_0494.PNG','1dDBJiyRGj0XKKQAIxmcv9K2E_a3Tp3yn'], ['IMG_0495.PNG','1FGF5l1fyX3WBDbAD76VSWQYBRTPGXRtm'],
          ['IMG_0501.PNG','10pSNlOhWrcmJIReD6tA2IoMf7NWherec'], ['IMG_0506.PNG','1Avh0AtM6c-HN_rX_WvQC6up54Y39O4Y9'],
          ['IMG_0507.PNG','10ku94M5yGx7o9_NOQcnj3ypw85Q8hjgV'], ['IMG_0520.PNG','1WmupGkU1LHM1jD-eoRSyj7uslA2fFI13'],
          ['IMG_0523.PNG','1Jg08whWE7zR5Y52R8jXSvOB3vmk6hhCP']
        ]) },
      { t: 'Concepts', tool: 'procreate', dir: 'Final Paint (Procreate Concept & Watercolor Final)',
        items: [
          I('Birds Concept 1.png', '1CmSHYSxGY_srheswRKzwkj-FpILlh8aK', 'Concept 1'),
          I('Birds Concept 2.png', '1ciXhAB64B9g66ZbNWJRl3pLgHuV0n1YJ', 'Concept 2'),
          I('Birds Concept 3.png', '1hWS3vw0d5zEi_SkD-1XSyilKwoKMjNJz', 'Concept 3'),
          I('Birds Concept 4 - Color.png', '1Cmay2FSFZFHgw_NfdN6VOSsFdRKBQSiu', 'Concept 4, with color')
        ] },
      { t: 'Painting', tool: 'watercolor', dir: 'Final Paint (Procreate Concept & Watercolor Final)',
        items: [
          I('Birds Paint Step 1.jpg', '1iQsb_llLodphIDLRYwBc2fduQfmn9KEp', 'Paint step 1'),
          I('Birds Paint Step 2.jpg', '1yK2tjJmAZEcKBhjpSGygEStRWJzuLIlL', 'Paint step 2'),
          I('Birds Paint Step 3.jpg', '1gZva6FKkj7ncf0QL6D7r5uSB5L6c_HBY', 'Paint step 3'),
          I('Birds Paint Step 4.jpg', '12x7b5gW9lYe-Rnb90QuzRxlns4Mw1cOr', 'Paint step 4')
        ] },
      { t: 'Details', tool: 'watercolor', dir: 'Final Paint (Procreate Concept & Watercolor Final)',
        items: numbered('Detail', [
          ['Birds Final Details 1.jpg','1RURtLZ7Ui-RctrcfwoL0PvrI-oTGtoO-'], ['Birds Final Details 2.jpg','1a9YWCbA_83wDPr_7Q9rFTv0u0paCTFOK'],
          ['Birds Final Details 3.jpg','1K3_ZPo_Ttj1hfi0fwtG38wKpz19t_qVW'], ['Birds Final Details 4.jpg','1YUs-1xN4RWB7nEtf60b0AVI_UEYo2ixj'],
          ['Birds Final Details 5.jpg','19IDKOc6omjhjgVzE-nvai6KnhN1SCjbs'], ['Birds Final Details 6.jpg','1piSgJPoarLtK2pYH4HBO8-W37EJd1ktc'],
          ['Birds Final Details 7.jpg','1u4qLcqUX5ePzcUwR376pciXxT0kjIAFq'], ['Birds Final Details 8.jpg','1tZbbZH2o7es1npqCxdlW0w9PWzjLs9r6'],
          ['Birds Final Details 9.jpg','17Qt5wymlJytO7IJweZJJXPvD7o1v0XOU'], ['Birds Final Details 10.jpg','1PxIKAuGiS2GYjwULljZ9X8zkmJYjJ45d']
        ]) },
      { t: 'Final boards', tool: 'watercolor', dir: 'Final Paint (Procreate Concept & Watercolor Final)',
        items: [
          I('Final Boards.jpg', '1EWWhU25vhKEi40QHHVXxx0EPPrkFP-MD', 'The finished boards')
        ] }
    ]
  },
  {
    slug: 'cult-of-the-peach', title: 'Cult of the Peach', year: 2026, tools: ['watercolor'],
    dir: 'Watercolor/Cult of the Peach',   // year comes from the photo dates
    phases: [{ t: 'Progress photos', items: numbered('Photo', [
      ['PXL_20260313_232703724.PORTRAIT.jpg','1ri0wtLrOIbJp5A2GLHI0UlGf2D4Bt79P'],
      ['PXL_20260320_022953600.PORTRAIT.ORIGINAL.jpg','16bI9yGlCcLZnlifzLsaFXg1RkAmXvNu6'],
      ['PXL_20260320_023008813.jpg','1-2yzlNqdNxCQreRoPdmunaVeHsOZXXW5']
    ]) }]
  },
  {
    slug: 'fire-and-water', title: 'Fire and Water', year: 2026, tools: ['watercolor'],
    dir: 'Watercolor/Fire & Water',        // year comes from the photo dates
    phases: [{ t: 'Progress photos', items: numbered('Photo', [
      ['PXL_20260221_215714802.jpg','1f9bvPLXPtcB00ijqlFstuGk1y1O77JWn'],
      ['PXL_20260221_220215551.jpg','1FDK0ZNwlHTvu1favKTpaQSNUWqcmCvvW']
    ]) }]
  },

  /* ---------------- 2025 ---------------- */
  {
    slug: 'wedding-poster', title: 'Wedding Poster', year: 2025, tools: ['affinity', 'procreate'], process: true,
    dir: 'Wedding Poster (2025)', cover: 'Wedding Poster Mordor-Final (Affinity Designer).png',
    phases: [
      { t: 'Concept sketches', tool: 'procreate', items: [I('Concepts (Procreate).jpg', '1fKSyCEBncUirORFEEhdc_zCAhqWyv8yF', 'First concepts')] },
      { t: 'Iterations', tool: 'procreate', items: [
        I('Concept Iterate 1 (Procreate).jpg', '1ufNCzE5R1-Anqm2luAFGG9a48WWZXHY1', 'Iteration 1'),
        I('Concept Iterate 2 (Procreate).jpg', '1nFoXiqE88mnd0VupWbi1Ou6ZtnOo28lT', 'Iteration 2'),
        I('Concept Iterate 3 (Procreate).jpg', '1SfSKrgHo2GRkhqxHRSW9tvPieX3JFhA6', 'Iteration 3')
      ] },
      { t: 'Color concepts', tool: 'affinity', items: [I('Color Concepts (Affinity Designer).png', '1u4-50Tw9s1zGycPzBZ1G1jG2WCKvl135', 'Color concepts')] },
      { t: 'Final poster', tool: 'affinity', items: [I('Wedding Poster Mordor-Final (Affinity Designer).png', '1ktUbjY17NfJVYpa3xhr4sSU3dQn0qLW8', 'Final poster')] },
      { t: 'Final print', items: [I('Final Wedding Print.jpg', '1d1V-W-gYqYBqkq9CxPjcqIiNqsoMHYBZ', 'Final print')] }
    ]
  },
  {
    slug: 'playing-the-cards', title: 'Playing the Cards Show', year: 2025, tools: ['mixed'], process: true,
    dir: 'Playing the Cards Show 2025 (Mixed Media)', cover: 'Playing the Cards Final (1).jpg',
    phases: [
      { t: 'Process', items: numbered('Step', [
        ['Playing the Cards Step 1.jpg','1pvIDsCrzqlTehJ58KCFc02NAGsZskMT8'], ['Playing the Cards Step 2.jpg','1sqvrzAKFMnp3HocmDjxdALKceSnJNatZ'],
        ['Playing the Cards Step 3.jpg','1PbtFk_6XJkg6u2NnagQHLQT43uPLnXly'], ['Playing the Cards Step 4.jpg','1S8X35acrBu5g8r7-PPBfDahFt0bWc-ES'],
        ['Playing the Cards Step 5.jpg','10xEqinrX8l2d9HvjHPp2Jg3Byjf9xCNx'], ['Playing the Cards Step 6.jpg','1hTLc-f9IJ5bDN_AQ7Kw5GSdvroUy0_22'],
        ['Playing the Cards Step 7.jpg','19c7dAX5d3Xv3KEfTr1fXPq8wBs2-IS87']
      ]) },
      { t: 'Finished pieces', items: numbered('Final', [
        ['Playing the Cards Final (1).jpg','1uaGuhOnaqbj-wyeYdrTbMtsZvHl-OjFE'], ['Playing the Cards Final (2).jpg','1DI1tUFxIg4YnmbYWafX0-Au9Kl5PXAZC'],
        ['Playing the Cards Final (3).jpg','1s1_sjF3UrDa0SFjVpp_Y6eD3C3o90EqZ'], ['Playing the Cards Final (4).jpg','15zM_DeRcmZLfdGL3h4EGZdN7aG34-AH3'],
        ['Playing the Cards Final (5).jpg','1RXuX2TS8Ch9Y3Blnf6q15yK3Xf1cSRS_'], ['Playing the Cards Final (6).jpg','1NihHZ4YaVHouTz3DgQ01Pi9hr_VmB5lz']
      ]) },
      { t: 'Show poster', items: [I('ADX Playing The Cards Poster.jpg', '18NjXvACsPH4sXzOyluKUg8fSEoum4xfC', 'Show poster')] }
    ]
  },
  {
    slug: 'minecraft-bee', title: 'Minecraft Bee', year: 2025, tools: ['watercolor'], process: true,
    dir: 'Watercolor/Minecraft Bee',        // year comes from the photo dates
    phases: [
      { t: 'In progress', items: numbered('Photo', [
        ['PXL_20251121_235907983.jpg','1kndLQx6KQO_A9ldCpP-T6xls2g_ujXgJ'], ['PXL_20251121_235911944.jpg','18yWPCk5oiVpMUbjJUWKPFgL9290YOxLq'],
        ['PXL_20251123_020647441.jpg','1cXCbf-VM9KqechMoUspUht3uKmWSr1Wc']
      ]) },
      { t: 'Final images', items: numbered('Final', [
        ['PXL_20251123_020600766.jpg','1UwWqsvs6SGoY6Q0-gBZnNZ7CDUMt8iOq'],
        ['PXL_20251123_035930380.PORTRAIT.jpg','1xIvKL4opY2xSAKubIXO74NP4M0gxkOF7']
      ]) }
    ]
  },
  {
    slug: 'world-snake', title: 'World Snake', year: 2025, tools: ['watercolor'], process: true,
    dir: 'Watercolor/World Snake',          // year comes from the photo dates
    phases: [
      { t: 'In progress', items: numbered('Photo', [
        ['original_abdf3bd9-828c-4a85-9bc5-545bbe5690dc_PXL_20251204_204309822.jpg','1tv-A2dSGMdDd3YZ7aqgVjwlexaTg0t6R'],
        ['PXL_20251204_211003924.jpg','1voAyh3BwSdxh5gc-nt90c42ZcXcrvAWu'], ['PXL_20251204_212444749.jpg','1B_TWW6XMQMFr1FMp7oM4UbnJgHF5ReXE'],
        ['PXL_20251204_213135186.jpg','1k7C4UyGc5l4mLVfNTfkXBkuXY3RKL94u'], ['PXL_20251204_214234129.jpg','1TYpPzFl_r1NBa6Bc9TxB5xRJJWsUFqyw']
      ]) },
      { t: 'Final image', items: [I('PXL_20251205_021338998.jpg','1FG1Gpwb9SIr-guPmMJg-0lcrup5BSF3F', 'Final')] }
    ]
  },

  /* ---------------- 2024 ---------------- */
  {
    slug: 'maple-leaf', title: 'Maple Leaf', year: 2024, tools: ['watercolor'], process: true,
    dir: 'Watercolor/Maple Leaf',           // year comes from the photo dates
    phases: [
      { t: 'In progress', items: numbered('Photo', [
        ['IMG_20240201_121411.jpg','160LV2DX35AIPeqcDOgT-6yBTzTdFa5xS'], ['IMG_20240201_140702.jpg','1hHHk4j6OmGzLwkWpH6o1-HfSGVZHLEft'],
        ['IMG_20240202_090119.jpg','1ugPZGHykb519jhqVy4UiMcxUy8VA_ViF'], ['IMG_20240202_152741_Bokeh.jpg','1WFQhc4AD2dnTRTgfwhJbBT8TrxjOTmr8'],
        ['IMG_20240202_154904.jpg','1HZ_d1eHouuopp4rhEoZaUbkaZ7UPAaCT']
      ]) },
      { t: 'Final image', items: [I('IMG_20240205_084633_309.jpg','1mbgPQ4pnu_pVHSY3iveTdAqwwAeuovHE', 'Final')] }
    ]
  },

  /* ---------------- 2022 ---------------- */
  {
    slug: 'twitch-cat-background', title: 'Twitch Commission: Cat Background', year: 2022,
    tools: ['affinity'], process: true, fit: 'contain',
    dir: 'Twitch Commission - Cat Background (Affinity Designer) (2022)', cover: 'SifMillie-Clear.png',
    phases: [
      { t: 'Concept', items: [I('Concept Millie Sword -1.PNG', '1auD5xwI2uPNioe_UW9QrPpkplPLo7f9d', 'Concept')] },
      { t: 'Build', items: [
        I('Millie Step 1.png', '1HSpBIM-nSRdLXcgk-g5JsQROSz3E7aku', 'Step 1'),
        I('Millie Step 2.png', '1_Mv_uTwXhEjjzen8E8vtf4ZwyOarBPR8', 'Step 2'),
        I('Millie Step 3.png', '1ErV1iIKoZySVrhsh6f6J0X2HIRHIs6vX', 'Step 3')
      ] },
      { t: 'Final', items: [
        // Step 3 is shown twice on purpose: once as a build step, once as the finished piece
        I('Millie Step 3.png', '1ErV1iIKoZySVrhsh6f6J0X2HIRHIs6vX', 'Final, for the Twitch stream offline page'),
        I('SifMillie-Clear.png', '1jGx7rXPPs46jUSPdrKb0hZPVh5jqzQxn', 'Alternative cat mascot pose')
      ] }
    ]
  },

  /* ---------------- 2020 ---------------- */
  {
    slug: 'twitch-stream-elements', title: 'Twitch Stream Elements', year: 2020,
    tools: ['illustrator', 'affinity'], process: true, fit: 'contain',
    dir: 'Twitch Stream Elements (Adobe Illustrator & Affinity Designer) (2020)', cover: 'Twitch Banner.png',
    phases: [
      { t: 'Logo', items: [
        I('Logo Versions.png', '1y5_TdY3WwrIJbj4rZMyf46qYFRnHGo2v', 'Logo versions'),
        I('IMG_20210506_134320_221.jpg', '10MyWblNucTNH4p-Dygjk6DYxwvFsa-pR', 'Logo stickers')
      ] },
      // tile:'native' shows these 64 px emotes at their real size on a clear background, so they stay sharp
      { t: 'Color variations', dir: 'Colored Logos', tile: 'native', items: [
        I('Logo-Fire.png','1E_gJu6Z3Z3MLbijA-REy6_GJR1A43Mjn','Fire'), I('Logo-PastelLady.png','1hAtdLoGUK95yLfehjNJqGFk-VAPggiIL','Pastel Lady'),
        I('Logo-FoggyLake.png','19FcBU6CpwEOGBqa5Oc6WrwtpHwG0K3cg','Foggy Lake'), I('Logo-Mocha.png','1Avp5DwWUTI1qzG0mH_VG1OROzEHV73YD','Mocha'),
        I('Logo-Seaweed.png','19c8p_cFelxOKTz57kEvkrz7G638MLiFs','Seaweed'), I('Logo-UpsideDown.png','1nc3E5scL1VH3fcIfpHSOlTLLLKkW2i0V','Upside Down'),
        I('Logo-BrightLava.png','1i_gEhodAWS9rRpaKs294oIj0Z6fiqocJ','Bright Lava'), I('Logo-JungleBeach.png','1-s6MOenuKqwsD8Wun1j72QCs8zQs9sf2','Jungle Beach'),
        I('Logo-DeepOcean.png','17R7AZt4_drStiJVfRIA5B__R520i1BtP','Deep Ocean'), I('Logo-PurPink.png','1YOYPTNslTXRzWzuYjc31gOJ9wgX1oOSC','Purple Pink'),
        I('Logo-Coral.png','112nGsOSG2sAuSQcsZJfQUqMrjaci6exY','Coral'), I('Logo-MagOrange.png','1sD27gIIs8FQvdZCaOAI75U6lnbCNH25m','Magenta Orange'),
        I('Logo-MagPurp.png','1ianGDlQCEBsR0H-lATLggkWo03og_GSh','Magenta Purple'), I('Logo-Beach.png','1FJ7V8l8BKGtkaranfi5q2knKjxgCaGLu','Beach'),
        I('Logo-Choco.png','14qAXg_h4egTZyqVf8XYkBf7oBOzXpU5C','Choco')
      ] },
      { t: 'Banner', items: [
        I('TTTwitch Banner-Original.png', '1Rd1-OwMBHkNnLKB5ds31g2Se_PJ9cYWa', 'Original banner'),
        I('Twitch Banner.png', '1D9p5weEEM7Pp3ODR3zfAJJwMbtxTaDe-', 'Final banner')
      ] },
      { t: 'Info panels', items: [
        I('Welcome Panel.png','1VSYQueFRJzVavIJS2iZUayYec_ENjwHt','Welcome'), I('Rules Panel.png','1OaS6Nhjefwn43KqBcuDKfFVkzbBhpOoo','Rules'),
        I('Playing Panel.png','1uggMqExjmmP2t6uN-3CsPAkNEaKaGXTK','Playing'), I('Tips Panel.png','1qTy225nTdXEgjD99Xy-tliRD1EvPyjA7','Tips'),
        I('KItteh Panel.png','1_CNmhH1OsezCACrA6DhD8xeEpNQIJjJT','Kitteh'), I('Emote Panel.png','1eVTWHfgQnXYdG9AaC4qWY-6rNHqOs8Sm','Emotes'),
        I('Credits Panel.png','1e9RD8eyBhQcZrQ4OqEAI9wCyyz_cTeDr','Credits')
      ] },
      { t: 'On the channel', items: [
        I('Twitch Screen-2.png', '1CcTHgsJbmp8UO4f8Ez_-uCbpgmh9Db7z', 'On screen'),
        I('Twitch Screenshot.png', '1qAblX_rB-aCPhgqwiMn-Ge72ejlt2_As', 'Screenshot')
      ] }
    ]
  },

  /* ---------------- 2019 ---------------- */
  {
    slug: 'avatars-and-emotes', title: 'Avatars and Emotes', year: 2019, tools: ['affinity'], fit: 'contain',
    dir: 'Avatars & Emotes (Affinity Designer) (2019)', cover: 'Tea Bea Logos (1).png',
    phases: [
      { t: 'Tea Bea logos', items: numbered('Logo', [
        ['Tea Bea Logos (1).png','1c1nNrZI26yBg2NjWRk8L7sjz4AKelyzc'], ['Tea Bea Logos (2).png','1hcsB-AWT1ikQ_XEVt6ZMGdljfiz_Bvts'],
        ['Tea Bea Logos (3).png','16LvQB-yO4iGrJNpvfLCNRnlhy_U2qPX1'], ['Tea Bea Logos (4).png','1Uz_3j4LWZCRBk9_845qDbB2Y0G8EJKNw']
      ]) },
      { t: 'Discord server emotes', items: [I('Discord Server Emotes.jpg', '19byRH7Krc4Gjmh3N826Z_yhX86hZ9cbW', 'Discord server emotes')] }
    ]
  },

  /* ---------------- 2018 ---------------- */
  {
    slug: 'digital-illustrations', title: 'Digital Illustrations', year: 2018, tools: ['procreate'],
    dir: 'Digital Illustrations (Procreate 2018)', cover: 'Mermaid.jpg',
    phases: [
      { t: 'Dragon', items: [I('Dragon.jpg', '1-4oZdG78gIAs5LESvCPdn1gV0PQ9L0Wy', 'Dragon')] },
      { t: 'Mermaid', items: [I('Mermaid.jpg', '1VL1Nj-FaF0bWHRUry6PAz7a4F7KxiUuO', 'Mermaid'), I('Mermaid Tail.jpg', '1Z6I2k19MsMkD50M1sHj3x9wzQBIBdGAe', 'Mermaid tail')] },
      { t: 'Jellyfish', items: [I('Jellyfish.jpg', '1YDlb0ulY8Dk5FVfmq0K92yGeCCWzSsQa', 'Jellyfish'), I('Multi Jellyfish.jpg', '16g0xHPEvTEyeXh5KzOTdriqRD4n3gAEE', 'Multiple jellyfish')] },
      { t: 'Espiritus potion', items: [I('Espiritus Potion.jpg', '1wqW1XWKZZbWPml-XW3IAdX5riKOU2TQG', 'Espiritus potion')] }
    ]
  },

  /* ---------------- 2017 ---------------- */
  {
    slug: 'sun-and-moon', title: 'Sun and Moon', year: 2017, tools: ['procreate'],
    dir: 'Sun and Moon (Procreate) 2017', cover: '20190510_124132.jpg',
    phases: [
      { t: 'Final images', items: numbered('Final', [
        ['IMG_0012.JPG','1cWlh65dd689xdP2TCtczSLNlxKkQotUg'], ['IMG_0013.JPG','14D4gTpswLO5JrG3mYBCy1T2ZosCAQ9RD'],
        ['20190510_123308.jpg','1TJKoCKgxmFs3w04Six5JElg-nDlAvL3j'], ['20190510_123812.jpg','19n3gD8gYMhE4THZ4tlSRj1yhrloj4w8X'],
        ['20190510_124132.jpg','1YxxZ8wA3vMACz73i83oOmUlN1ARINjZS']
      ]) }
    ]
  },

  /* ---------------- year not labeled in Drive ---------------- */
  {
    slug: 'sword-book-cover', title: 'Sword Book Cover Concepts', tools: ['affinity'],
    dir: 'Sword Book Cover Concepts (Affinity Designer)', cover: 'SwordShieldLeaf-1.png',
    phases: [{ t: 'Concepts', items: [
      I('Sword Book Cover Test.png', '1dLicHCeNJRXedEjW_y5eKEDg6n-WlSIB', 'Cover test'),
      I('SwordShieldLeaf-1.png', '1JQYmjmPiZDq-ASqxVuq2yOxjdgb3dz-r', 'Sword, shield and leaf')
    ] }]
  },
  {
    slug: 'baroque-robot-shirt', title: 'Baroque Robot T-shirt', tools: ['illustrator'], process: true,
    dir: 'Baroque Robot T-shirt (Adobe Illustrator)', cover: 'Shirt Final.jpg',
    phases: [
      { t: 'Original drawing', items: [I('Original Baroque Drawing.jpg', '1D5WLseSgXEdd3RTn6e15uzoyRyCAebeG', 'Original drawing')] },
      { t: 'Final shirt design', tool: 'illustrator', items: [I('Shirt Final.jpg', '17zd5m-3DJbV_7CmIwCCiGmvXfT6Ut0Xl', 'Final shirt design')] }
    ]
  },
  {
    slug: 'witchcraft-reddit-banner', title: 'Witchcraft Reddit Banner', tools: ['illustrator', 'procreate'],
    dir: 'Witchcraft Reddit Banner (Procreate & Adobe Illustrator)', cover: 'Witchcraft.jpg',
    phases: [{ t: 'Banner', items: [
      I('Witchcraft.jpg', '1SH3cGC3uAXdS6griQmFk2t0Nui8rn6R3', 'Banner'),
      I('download_20200713_185043.jpg', '13Lk4gv1MkNSvKl0h-rv9XNsjTuUiVyVx', 'Banner on the Witchcraft Subreddit')
    ] }]
  },
  {
    slug: 'northside-comics', title: 'Northside Comics', tools: ['drawing', 'photoshop'],
    dir: 'Comic - Northside Comics (Drawing & Adobe Photoshop)', cover: 'Page 1.jpg',
    phases: [{ t: 'Pages', items: numbered('Page', [
      ['Page 1.jpg','1AFY0C4I-e2fAjEmUje5F1ID4atIvxyBJ'], ['Page 2.jpg','1PzSd31TaR0yG1cEUwk3eiVm8ljS8NC7N'], ['Page 3.jpg','1t8B356Y5QC8mZiz7JvuzINMaPOUolkka']
    ]) }]
  },

  /* ---- 3D Bits (one folder in Drive, shown here as separate pieces) ---- */
  {
    slug: 'terrain-build-test', title: 'Terrain Build Test', tools: ['ue4', 'blender'], process: true, group: '3D Bits',
    dir: '3D Bits', cover: 'Terrain Build Test (3)(Unreal Engine 4 & Blender).jpg',
    phases: [{ t: 'Build tests', items: [
      I('Terrain Build Test (Unreal Engine 4 & Blender).jpg', '1KLa9IIsxC98xKrdcxqPRGBdKEppuLIFk', 'Build test'),
      I('Terrain Build Test (1) (Unreal Engine 4 & Blender).jpg', '12h7T_h6WqYpUB9n6_lktjK06IjXW2szX', 'Build test 1'),
      I('Terrain Build Test (2) (Unreal Engine 4 & Blender).jpg', '1rYE9GVdKvi9_3pITxbEBYrninYPK8zRu', 'Build test 2'),
      I('Terrain Build Test (3)(Unreal Engine 4 & Blender).jpg', '1KQhH6gUE07cI44Xm7kx5GQaWr6ndwIER', 'Build test 3')
    ] }]
  },
  {
    slug: 'tree-leaf-experiment', title: 'Tree Leaf Experiment', tools: ['ue4'], group: '3D Bits', dir: '3D Bits',
    phases: [{ t: 'Render', items: [I('Tree Leaf Experiment (Unreal Engine 4).png', '1Q1fg5sHIorXAFSF-iQ9n4BDGxJO0NDTL', 'Tree leaf experiment')] }]
  },
  {
    slug: 'komorebi', title: 'Komorebi', tools: ['blender'], group: '3D Bits', dir: '3D Bits',
    phases: [{ t: 'Renders', items: [
      I('Komorebi (Blender).png', '1s6TnYztMO6tae2wbXvuXTvB9xSrK8qMM', 'Komorebi'),
      I('Komorebi 2 (Blender).png', '1E1wBghjlitD_LPeKdGvinmYfU4XEO03D', 'Komorebi 2')
    ] }]
  },
  {
    slug: 'low-poly-ramen-house', title: 'Low Poly Ramen House', tools: ['blender'], group: '3D Bits', dir: '3D Bits',
    phases: [{ t: 'Render', items: [I('Low Poly Ramen House (Blender).jpg', '1yE6uEfcQP7T6Vx4o4XzifKV6jDLmyost', 'Low poly ramen house')] }]
  },
  {
    slug: 'greek-house', title: 'Greek House', tools: ['magica'], group: '3D Bits', dir: '3D Bits',
    phases: [{ t: 'Render', items: [I('Greek House(Magical Voxel).png', '1nid5OcN6wZOQvBZTzFLqCBjSLGDWCPgM', 'Greek house')] }]
  },
  {
    slug: 'camping-lamp', title: 'Camping Lamp', tools: ['substance'], group: '3D Bits', dir: '3D Bits',
    cover: 'Camping Lamp (Substance Painter).jpg',
    phases: [{ t: 'Textured prop', items: [
      I('Camping Lamp (Substance Painter).jpg', '1NzDaAwhAvhF-tcDX1bpRWf3MtepYOhyF', 'Camping lamp'),
      I('Camping Lamp Bottom (Substance Painter).jpg', '1EkFaAt7UpZTDvH5tQQUGxJj2Inq-0Zxd', 'Camping lamp, bottom')
    ] }]
  }
];
