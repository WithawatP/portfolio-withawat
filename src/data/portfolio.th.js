// Thai copy for /th/ (ROADMAP L1). DRAFT by Claude, waiting for the owner's line-by-line review: nothing
// unreviewed is merged. Same exports, keys and order as portfolio.js. Only the text the page shows is
// translated; everything else (email, links, the CV, names of technologies, companies and the project,
// and the fields the page does not show) comes from portfolio.js unchanged. Job titles stay in English,
// as in the CV. Months are Thai, years Gregorian.
import * as en from './portfolio'

export const profile = {
  ...en.profile,
  // The /th/ Hero shows the Thai name (Mitr 200); the title, footer, meta and share image keep the English one.
  heroName: 'วิทวัส ภิระบรรณ์',
  headline:
    'สร้างเว็บแอป full-stack ด้วย React และ Node.js แล้วทดสอบเองทั้งบนหลายเบราว์เซอร์ หลายขนาดหน้าจอ และในระดับ API',
  statusShort: 'เปิดรับงาน',
  statusLong: 'เปิดรับงาน · ปทุมธานีและกรุงเทพฯ ทำงานทางไกลหรือแบบไฮบริด',
  contactLine:
    'อยู่ที่ปทุมธานี เปิดรับงานแบบทำงานทางไกลและแบบไฮบริด ในกรุงเทพฯ และปทุมธานี',
}

export const coreStack = en.coreStack

export const quickContacts = en.quickContacts

export const featuredProject = {
  ...en.featuredProject,
  context: 'โปรเจกต์กลุ่ม JSD#13',
  summary:
    'ร้านค้าออนไลน์ full-stack สำหรับช่อดอกไม้สำเร็จรูปและช่อที่จัดเองได้ ทำร่วมกันเป็นทีม โดยรับผิดชอบระบบยืนยันตัวตน แดชบอร์ดผู้ดูแล และหน้าจอหลักฝั่งลูกค้าหลายหน้า',
  facts: [
    { label: 'บทบาท', value: 'นักพัฒนา Full-stack' },
    { label: 'ขอบเขต', value: 'Auth · Admin · Core UI' },
    { label: 'เทคโนโลยี', value: 'MERN + Stripe + Gemini' },
  ],
  links: [
    { ...en.featuredProject.links[0], shortLabel: 'เดโม' },
    { ...en.featuredProject.links[1], shortLabel: 'Frontend' },
    { ...en.featuredProject.links[2], shortLabel: 'Backend' },
    { ...en.featuredProject.links[3], shortLabel: 'สไลด์' },
  ],
  buildTitle: 'สิ่งที่ทำ',
  buildRows: [
    {
      icon: 'lock',
      title: 'ระบบยืนยันตัวตน',
      line: 'เข้าสู่ระบบ สมัครสมาชิก refresh token และรีเซ็ตรหัสผ่าน',
    },
    {
      icon: 'dashboard',
      title: 'แดชบอร์ดผู้ดูแล',
      line: 'CRUD แคตตาล็อกสินค้า จัดการคำสั่งซื้อ และติดตามงานหลังบ้าน',
    },
    {
      icon: 'bag',
      title: 'หน้าจอฝั่งลูกค้า',
      line: 'เมนูนำทาง แคตตาล็อกสินค้า สินค้าแนะนำ และประวัติการสั่งซื้อ',
    },
  ],
  testing: {
    ...en.featuredProject.testing,
    title: 'วิธีทดสอบ',
    requestCaption: 'คำขอ API ที่ทดสอบด้วยมือใน Postman collection เดียว แบ่งเป็นโฟลเดอร์ Auth และ Products',
    bugs: [
      {
        ...en.featuredProject.testing.bugs[0],
        tag: 'บั๊ก · การควบคุมสิทธิ์เข้าถึง',
        short: 'userId ถูกส่งมาใน URL ทำให้ใครก็อ่านข้อมูลของผู้ใช้คนอื่นได้ แก้โดยอ่าน userId จาก JWT แทน',
      },
      {
        ...en.featuredProject.testing.bugs[1],
        tag: 'บั๊ก · Session หมดอายุ',
        short: 'Token หมดอายุหลัง 15 นาที ทำให้การเรียก fetch แบบธรรมดาใช้งานไม่ได้ แก้ด้วย refresh-token interceptor ของ axios',
      },
    ],
  },
}

export const experiences = [
  {
    ...en.experiences[0],
    period: 'กรกฎาคม 2026 – ตุลาคม 2026',
    highlights: [
      'จบ bootcamp วิศวกรรมซอฟต์แวร์แบบเข้มข้น 4 เดือน เน้น MERN Stack แนวทาง Agile การทำงานร่วมกันผ่าน Git/GitHub และการส่งมอบซอฟต์แวร์เป็นทีม',
    ],
  },
  {
    ...en.experiences[1],
    period: 'มิถุนายน 2023 – กันยายน 2024',
    highlights: [
      'ผลัดกันคุมกะในฐานะหนึ่งในผู้จัดการกะสามคนของร้านอาหาร และจัดตารางงานให้ทีม 5 คน',
      'ควบคุมสต็อกในช่วงเทศกาลที่ลูกค้าหนาแน่น รวมถึงนับสต็อกทุกวันจันทร์อย่างละเอียดถึงระดับกรัม',
      'แก้ออเดอร์ผิดได้ทันทีโดยไม่ให้คิวสะดุด และสอนพนักงานให้แก้ปัญหาเบื้องต้นได้เอง ตลอดช่วงที่ทำตำแหน่งนี้ไม่มีเรื่องร้องเรียนส่งถึงเลย',
    ],
    tags: ['งานบริหารหน้าร้าน', 'ควบคุมสต็อก', 'สอนงานทีม'],
  },
  {
    ...en.experiences[2],
    period: 'มีนาคม 2023 – พฤษภาคม 2023',
    highlights: [
      'พัฒนาเทมเพลตหน้าเว็บแบบ responsive',
      'ทดสอบเทมเพลตสำหรับลูกค้าของบริษัท 20 ชิ้นบน Chrome, Edge และ Brave ส่วนใหญ่ผ่าน DevTools ก่อนส่งมอบ ข้อบกพร่องที่พบส่วนมากเป็นปัญหาเลย์เอาต์แบบ responsive',
    ],
  },
  {
    ...en.experiences[3],
    period: 'มีนาคม 2021 – กันยายน 2021',
    highlights: [
      'ออกแบบเลย์เอาต์เว็บ แบนเนอร์ และสื่อการตลาดดิจิทัลให้ลูกค้าอีคอมเมิร์ซด้วย Adobe Illustrator โดยใช้หลัก visual hierarchy ของ UI/UX',
    ],
  },
  {
    ...en.experiences[4],
    period: 'ตุลาคม 2019 – กุมภาพันธ์ 2020',
    highlights: [
      'ดูแลเครื่องมากกว่า 80 เครื่องที่บริษัท IT outsourcing ซึ่งให้บริการสำนักงานและโรงเรียน ทั้งวิเคราะห์อาการเสีย ซ่อม อัปเกรด แล้วส่งเครื่องกลับไปใช้งาน',
      'ออกไปติดตั้งเครื่องถึงสำนักงานและบ้านของลูกค้า',
    ],
    tags: ['IT support', 'ฮาร์ดแวร์', 'แก้ปัญหาเครื่อง'],
  },
]

export const skillGroups = [
  {
    ...en.skillGroups[0],
    title: 'การเขียนโปรแกรมและพัฒนาเว็บ',
    summary: 'ภาษา เฟรมเวิร์ก และเครื่องมือด้านข้อมูลที่ใช้ทำงาน full-stack',
    groups: [
      { ...en.skillGroups[0].groups[0], label: 'ภาษา' },
      { ...en.skillGroups[0].groups[1], label: 'เฟรมเวิร์ก' },
      { ...en.skillGroups[0].groups[2], label: 'เครื่องมือและข้อมูล' },
    ],
  },
  {
    ...en.skillGroups[1],
    title: 'การประกันคุณภาพและการทดสอบ',
    summary: 'ใช้ทดสอบหน้าจอ ทดสอบ API ผ่าน Postman และทดสอบบน Chrome, Edge และ Brave',
  },
  {
    ...en.skillGroups[2],
    title: 'การออกแบบและ UI/UX',
    summary: 'เลย์เอาต์เว็บ แบนเนอร์ และสื่อการตลาดให้ลูกค้าอีคอมเมิร์ซ',
  },
  {
    ...en.skillGroups[3],
    title: 'ทักษะด้านคนและการบริหาร',
    summary: 'จากการคุมกะร้านอาหารในฐานะหนึ่งในผู้จัดการกะสามคน และการสอนงานพนักงาน',
    items: ['การแก้ปัญหา', 'การนำทีม', 'การสื่อสาร'],
  },
]

// Text that lived in the components (same keys as `ui` in portfolio.js).
export const ui = {
  nav: { home: 'หน้าแรก', project: 'โปรเจกต์', experience: 'ประสบการณ์', work: 'งาน', skills: 'ทักษะ', contact: 'ติดต่อ' },
  primaryNav: 'เมนูหลัก',
  sectionNav: 'นำทางไปยังส่วนต่าง ๆ',
  backToTop: `WP ${en.profile.name} กลับขึ้นด้านบน`,
  darkTheme: 'ธีมมืด',
  language: { label: 'EN', name: 'English', href: '/', lang: 'en' },
  hero: { downloadCv: 'ดาวน์โหลด CV', viewProject: 'ดูโปรเจกต์' },
  featured: {
    eyebrow: 'โปรเจกต์เด่น',
    views: { build: 'พัฒนา', test: 'ทดสอบ' },
    viewsLabel: 'มุมมองโปรเจกต์',
    gallery: [
      'หน้าแคตตาล็อกสินค้าพร้อมตัวกรองและการ์ดช่อดอกไม้',
      'หน้าแรกของ Atelier De Flora พร้อมเครื่องมือจัดช่อดอกไม้เอง',
      'บล็อกการดูแลดอกไม้ พร้อมคู่มือและเรื่องราวจากสตูดิโอ',
    ],
  },
  experience: {
    title: 'ประสบการณ์ทำงาน',
    intro:
      'เส้นทางที่เริ่มจากงาน IT support และงานออกแบบ ผ่านงานบริหารหน้าร้าน สู่งานพัฒนา full-stack และงาน front-end ที่เน้นคุณภาพ',
    years: '2019 – 2026',
  },
  skills: {
    title: 'ทักษะด้านเทคนิค',
    intro:
      'เครื่องมือและวิธีการที่ใช้สร้าง ทดสอบ และออกแบบเว็บแอปพลิเคชัน รวมถึงทักษะด้านคนจากการคุมกะร้านอาหาร',
    tabs: {
      dev: { label: 'การพัฒนา', short: 'พัฒนา' },
      qa: { label: 'QA และการทดสอบ', short: 'QA' },
      design: { label: 'การออกแบบ', short: 'ออกแบบ' },
      soft: { label: 'ทักษะด้านคน', short: 'ด้านคน' },
    },
    tabsLabel: 'กลุ่มทักษะ',
    countLabel: 'ทักษะในกลุ่ม',
  },
  contact: {
    title: 'ติดต่อ',
    copyEmail: 'คัดลอกอีเมล',
    copied: 'คัดลอกแล้ว',
    copyFailed: 'คัดลอกไม่สำเร็จ',
    sendEmail: 'ส่งอีเมล',
    downloadCv: 'ดาวน์โหลด CV',
    call: 'โทร',
    cv: 'CV',
  },
  footer: { builtWith: 'สร้างด้วย React และ Tailwind CSS' },
}

// <head> of /th/ (scripts/prerender.mjs).
export const meta = {
  title: 'Withawat Phiraban — นักพัฒนาซอฟต์แวร์และ QA',
  description:
    'Withawat Phiraban นักพัฒนาซอฟต์แวร์ระดับจูเนียร์และ QA / software tester สร้างเว็บแอปด้วย MERN และทดสอบเองทั้งด้วยมือ ใน Postman และบนหลายเบราว์เซอร์',
  ogDescription:
    'นักพัฒนาซอฟต์แวร์ระดับจูเนียร์และ QA / software tester สร้างเว็บแอปด้วย MERN และทดสอบเองทั้งด้วยมือ ใน Postman และบนหลายเบราว์เซอร์',
}
