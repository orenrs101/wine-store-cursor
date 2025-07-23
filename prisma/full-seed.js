const { PrismaClient } = require('../src/generated/prisma');

// All 50 wines from the original data
const staticWines = [
  {
    name: 'יין קברנה סוביניון',
    winery: 'יקב רמת הגולן',
    price: 89,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED',
    description: 'יין קברנה סוביניון מובחר מיקב רמת הגולן, בעל טעמים עמוקים של פירות יער ושזיפים, עם רמזים של וניל ואלון צרפתי. סיומת ארוכה ומעודנת עם טאנינים רכים.'
  },
  {
    name: 'יין מרלו',
    winery: 'יקב תבור',
    price: 75,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED',
    description: 'מרלו עשיר ומאוזן מבית יקב תבור. בוקה מרהיב של פטל, דובדבן שחור ושוקולד עם נגיעות של אדמה ותבלינים. מתאים היטב לצד בשרים אדומים.'
  },
  {
    name: 'יין שיראז',
    winery: 'יקב ברקן',
    price: 95,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED',
    description: 'שיראז עוצמתי במיוחד מיקב ברקן, מגלה ארומות עזות של פלפל שחור, פירות כהים ועשבי תיבול. טעם מלא גוף עם סיומת ארוכה ומורכבת.'
  },
  {
    name: 'יין פטיט סירה',
    winery: 'יקב רקנאטי',
    price: 120,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED',
    description: 'פטיט סירה מיוחד מיקב רקנאטי, עם ארומות של אוכמניות, קפה קלוי ואדמה. גוף מלא ומורכב עם טאנינים מובנים היטב וסיומת מרשימה ומתמשכת.'
  },
  {
    name: 'יין שרדונה',
    winery: 'יקב דלתון',
    price: 85,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE',
    description: 'שרדונה אלגנטי מיקב דלתון, בעל ארומות של פירות הדר, תפוח ירוק ואפרסק לבן. חמיצות מאוזנת וסיומת נקייה, מתאים מצוין לצד מנות דגים ופסטות בסגנון ים תיכוני.'
  },
  {
    name: 'יין סוביניון בלאן',
    winery: 'יקב רמת נגב',
    price: 69,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין פינו נואר',
    winery: 'יקב רמת הגולן',
    price: 110,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין ריזלינג',
    winery: 'יקב תבור',
    price: 65,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין מוסקט',
    winery: 'יקב כרמל',
    price: 55,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין גוורצטרמינר',
    winery: 'יקב יתיר',
    price: 95,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין זינפנדל',
    winery: 'יקב ברקן',
    price: 85,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין קריניאן',
    winery: 'יקב רקנאטי',
    price: 79,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין רוזה',
    winery: 'יקב דלתון',
    price: 65,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין מלבק',
    winery: 'יקב תבור',
    price: 125,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין קאווה',
    winery: 'יקב כרמל',
    price: 70,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין שבלי',
    winery: 'יקב רמת נגב',
    price: 95,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין פטיט ורדו',
    winery: 'יקב רמת הגולן',
    price: 145,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין סנג׳ובזה',
    winery: 'יקב יתיר',
    price: 115,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין ויונייה',
    winery: 'יקב ברקן',
    price: 75,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין ברברה',
    winery: 'יקב רקנאטי',
    price: 90,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין שרדונה רזרב',
    winery: 'יקב דלתון',
    price: 115,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין קברנה פרנק',
    winery: 'יקב תבור',
    price: 105,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין גרנאש',
    winery: 'יקב כרמל',
    price: 88,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין סירה',
    winery: 'יקב רמת נגב',
    price: 99,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין גוורצטרמינר מבציר מאוחר',
    winery: 'יקב רמת הגולן',
    price: 130,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין טמפרניו',
    winery: 'יקב יתיר',
    price: 79,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין פינו גריג׳יו',
    winery: 'יקב ברקן',
    price: 69,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין נביולו',
    winery: 'יקב רקנאטי',
    price: 120,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין שנין בלאן',
    winery: 'יקב דלתון',
    price: 75,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין פטי סירה רזרב',
    winery: 'יקב תבור',
    price: 160,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין מוסקדה',
    winery: 'יקב כרמל',
    price: 59,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין טינטו',
    winery: 'יקב רמת נגב',
    price: 85,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין סוביניון בלאן רזרב',
    winery: 'יקב רמת הגולן',
    price: 110,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין מרסלאן',
    winery: 'יקב יתיר',
    price: 95,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין סמיון',
    winery: 'יקב ברקן',
    price: 65,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין קברנה סוביניון רזרב',
    winery: 'יקב רקנאטי',
    price: 180,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין מוסקטו',
    winery: 'יקב דלתון',
    price: 60,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין מלבק רזרב',
    winery: 'יקב תבור',
    price: 140,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין טוקאי',
    winery: 'יקב כרמל',
    price: 95,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין סנסו',
    winery: 'יקב רמת נגב',
    price: 79,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין שרדונה אלון',
    winery: 'יקב רמת הגולן',
    price: 125,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין קאריניאן',
    winery: 'יקב יתיר',
    price: 88,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין אלבריניו',
    winery: 'יקב ברקן',
    price: 75,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין סירה רזרב',
    winery: 'יקב רקנאטי',
    price: 150,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין גוורצטרמינר',
    winery: 'יקב דלתון',
    price: 85,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין פטיט ורדו רזרב',
    winery: 'יקב תבור',
    price: 170,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין מוסקט רזרב',
    winery: 'יקב כרמל',
    price: 80,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין סירה ספיישל רזרב',
    winery: 'יקב רמת נגב',
    price: 195,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  },
  {
    name: 'יין ריזלינג אייסוויין',
    winery: 'יקב רמת הגולן',
    price: 210,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'WHITE'
  },
  {
    name: 'יין מרלו גרנד רזרב',
    winery: 'יקב יתיר',
    price: 225,
    image: 'https://www.paneco.co.il/media/catalog/product/cache/1170c7ba137a4ff58deca5f994bf29dd/7/6/76-10152_1_.png',
    type: 'RED'
  }
];

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding with ${staticWines.length} wines...`);

  // Clear existing data to prevent duplicates on re-running the seed
  await prisma.wine.deleteMany({});
  console.log('Deleted all existing wines.');

  for (const wine of staticWines) {
    const createdWine = await prisma.wine.create({
      data: {
        name: wine.name,
        winery: wine.winery,
        price: wine.price,
        image: wine.image,
        type: wine.type,
        description: wine.description,
      },
    });
    console.log(`Created wine: ${createdWine.name}`);
  }

  console.log(`Seeding finished with ${staticWines.length} wines.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 