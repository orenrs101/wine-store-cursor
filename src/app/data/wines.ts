export interface Wine {
  id: number;
  name: string;
  winery: string;
  price: number;
  image: string;
  type: 'red' | 'white';
  description?: string;
}

export const wines: Wine[] = [
  {
    id: 1,
    name: 'יין קברנה סוביניון',
    winery: 'יקב רמת הגולן',
    price: 89,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red',
    description: 'יין קברנה סוביניון מובחר מיקב רמת הגולן, בעל טעמים עמוקים של פירות יער ושזיפים, עם רמזים של וניל ואלון צרפתי. סיומת ארוכה ומעודנת עם טאנינים רכים.'
  },
  {
    id: 2,
    name: 'יין מרלו',
    winery: 'יקב תבור',
    price: 75,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red',
    description: 'מרלו עשיר ומאוזן מבית יקב תבור. בוקה מרהיב של פטל, דובדבן שחור ושוקולד עם נגיעות של אדמה ותבלינים. מתאים היטב לצד בשרים אדומים.'
  },
  {
    id: 3,
    name: 'יין שיראז',
    winery: 'יקב ברקן',
    price: 95,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red',
    description: 'שיראז עוצמתי במיוחד מיקב ברקן, מגלה ארומות עזות של פלפל שחור, פירות כהים ועשבי תיבול. טעם מלא גוף עם סיומת ארוכה ומורכבת.'
  },
  {
    id: 4,
    name: 'יין פטיט סירה',
    winery: 'יקב רקנאטי',
    price: 120,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red',
    description: 'פטיט סירה מיוחד מיקב רקנאטי, עם ארומות של אוכמניות, קפה קלוי ואדמה. גוף מלא ומורכב עם טאנינים מובנים היטב וסיומת מרשימה ומתמשכת.'
  },
  {
    id: 5,
    name: 'יין שרדונה',
    winery: 'יקב דלתון',
    price: 85,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white',
    description: 'שרדונה אלגנטי מיקב דלתון, בעל ארומות של פירות הדר, תפוח ירוק ואפרסק לבן. חמיצות מאוזנת וסיומת נקייה, מתאים מצוין לצד מנות דגים ופסטות בסגנון ים תיכוני.'
  },
  {
    id: 6,
    name: 'יין סוביניון בלאן',
    winery: 'יקב רמת נגב',
    price: 69,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 7,
    name: 'יין פינו נואר',
    winery: 'יקב רמת הגולן',
    price: 110,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 8,
    name: 'יין ריזלינג',
    winery: 'יקב תבור',
    price: 65,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 9,
    name: 'יין מוסקט',
    winery: 'יקב כרמל',
    price: 55,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 10,
    name: 'יין גוורצטרמינר',
    winery: 'יקב יתיר',
    price: 95,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 11,
    name: 'יין זינפנדל',
    winery: 'יקב ברקן',
    price: 85,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 12,
    name: 'יין קריניאן',
    winery: 'יקב רקנאטי',
    price: 79,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 13,
    name: 'יין רוזה',
    winery: 'יקב דלתון',
    price: 65,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 14,
    name: 'יין מלבק',
    winery: 'יקב תבור',
    price: 125,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 15,
    name: 'יין קאווה',
    winery: 'יקב כרמל',
    price: 70,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 16,
    name: 'יין שבלי',
    winery: 'יקב רמת נגב',
    price: 95,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 17,
    name: 'יין פטיט ורדו',
    winery: 'יקב רמת הגולן',
    price: 145,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 18,
    name: 'יין סנג׳ובזה',
    winery: 'יקב יתיר',
    price: 115,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 19,
    name: 'יין ויונייה',
    winery: 'יקב ברקן',
    price: 75,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 20,
    name: 'יין ברברה',
    winery: 'יקב רקנאטי',
    price: 90,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 21,
    name: 'יין שרדונה רזרב',
    winery: 'יקב דלתון',
    price: 115,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 22,
    name: 'יין קברנה פרנק',
    winery: 'יקב תבור',
    price: 105,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 23,
    name: 'יין גרנאש',
    winery: 'יקב כרמל',
    price: 88,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 24,
    name: 'יין סירה',
    winery: 'יקב רמת נגב',
    price: 99,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 25,
    name: 'יין גוורצטרמינר מבציר מאוחר',
    winery: 'יקב רמת הגולן',
    price: 130,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 26,
    name: 'יין טמפרניו',
    winery: 'יקב יתיר',
    price: 79,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 27,
    name: 'יין פינו גריג׳יו',
    winery: 'יקב ברקן',
    price: 69,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 28,
    name: 'יין נביולו',
    winery: 'יקב רקנאטי',
    price: 120,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 29,
    name: 'יין שנין בלאן',
    winery: 'יקב דלתון',
    price: 75,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 30,
    name: 'יין פטי סירה רזרב',
    winery: 'יקב תבור',
    price: 160,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 31,
    name: 'יין מוסקדה',
    winery: 'יקב כרמל',
    price: 59,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 32,
    name: 'יין טינטו',
    winery: 'יקב רמת נגב',
    price: 85,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 33,
    name: 'יין סוביניון בלאן רזרב',
    winery: 'יקב רמת הגולן',
    price: 110,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 34,
    name: 'יין מרסלאן',
    winery: 'יקב יתיר',
    price: 95,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 35,
    name: 'יין סמיון',
    winery: 'יקב ברקן',
    price: 65,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 36,
    name: 'יין קברנה סוביניון רזרב',
    winery: 'יקב רקנאטי',
    price: 180,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 37,
    name: 'יין מוסקטו',
    winery: 'יקב דלתון',
    price: 60,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 38,
    name: 'יין מלבק רזרב',
    winery: 'יקב תבור',
    price: 140,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 39,
    name: 'יין טוקאי',
    winery: 'יקב כרמל',
    price: 95,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 40,
    name: 'יין סנסו',
    winery: 'יקב רמת נגב',
    price: 79,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 41,
    name: 'יין שרדונה אלון',
    winery: 'יקב רמת הגולן',
    price: 125,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 42,
    name: 'יין קאריניאן',
    winery: 'יקב יתיר',
    price: 88,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 43,
    name: 'יין אלבריניו',
    winery: 'יקב ברקן',
    price: 75,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 44,
    name: 'יין סירה רזרב',
    winery: 'יקב רקנאטי',
    price: 150,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 45,
    name: 'יין גוורצטרמינר',
    winery: 'יקב דלתון',
    price: 85,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 46,
    name: 'יין פטיט ורדו רזרב',
    winery: 'יקב תבור',
    price: 170,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 47,
    name: 'יין מוסקט רזרב',
    winery: 'יקב כרמל',
    price: 80,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 48,
    name: 'יין סירה ספיישל רזרב',
    winery: 'יקב רמת נגב',
    price: 195,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  },
  {
    id: 49,
    name: 'יין ריזלינג אייסוויין',
    winery: 'יקב רמת הגולן',
    price: 210,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'white'
  },
  {
    id: 50,
    name: 'יין מרלו גרנד רזרב',
    winery: 'יקב יתיר',
    price: 225,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'red'
  }
]; 