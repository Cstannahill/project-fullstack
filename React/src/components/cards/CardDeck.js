const playerCards = [
  {
    name: "Galadriel",
    attack: 7,
    defense: 7,
    hp: 21,
    img: "https://cdn.vox-cdn.com/thumbor/kgV2QdsPpJqflNBywAN3_6Mdi38=/0x0:4957x3305/1200x675/filters:focal(2083x1257:2875x2049)/cdn.vox-cdn.com/uploads/chorus_image/image/71301970/RPAZ_S1_UT_210709_GRAMAT_00291_R2.0.jpg",
    type: "player",
  },
  {
    name: "Peregrin Took",
    attack: 3,
    defense: 3,
    hp: 12,
    img: "https://comicvine.gamespot.com/a/uploads/scale_medium/3/31370/1096442-pippin.jpg",
    type: "player",
  },
];

const enemyCards = [
  {
    name: "Sauron",
    attack: 10,
    defense: 5,
    hp: 30,
    img: "https://wikiofnerds.com/wp-content/uploads/2022/09/Why-did-Sauron-die-when-the-ring-was-cut-off-2-1024x576-1.webp",
    type: "enemy",
  },
  {
    name: "Lurtz",
    attack: 6,
    defense: 4,
    hp: 12,
    img: "https://i.pinimg.com/originals/10/b3/53/10b353c3410cf09dc2ffe320144d39f3.jpg",
    type: "enemy",
  },
];

const cardDecks = { playerCards, enemyCards };
export default cardDecks;
