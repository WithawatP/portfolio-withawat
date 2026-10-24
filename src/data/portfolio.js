export const profile = {
  name: 'Withawat Phiraban',
  roles: ['Junior Software Developer', 'Quality Assurance / Software Tester'],
  headline:
    'Combining a MERN-stack foundation, a UI/UX eye, and a quality mindset to build and test reliable web applications.',
  bio: 'A bootcamp-trained full-stack developer with a QA mindset, shaped by front-end QC, graphic design, IT support, and shift management experience.',
  email: 'withawat1201@gmail.com',
  phone: '(+66) 84-229-9742',
  phoneHref: 'tel:+66842299742',
  location: 'Pathum Thani, Thailand',
  workPreference: 'Remote / Hybrid',
  workArea: 'Bangkok / Pathum Thani',
  salary: 'THB 20,000 – 25,000',
  cvHref: '/withawat-phiraban-cv.pdf',
  github: 'https://github.com/WithawatP',
  githubLabel: 'github.com/WithawatP',
  linkedin: 'https://www.linkedin.com/in/withawatp',
  linkedinLabel: 'linkedin.com/in/withawatp',
}

export const coreStack = [
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'Tailwind CSS',
  'QA Testing',
]

export const quickContacts = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: 'mail',
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: profile.phoneHref,
    icon: 'phone',
  },
  {
    label: 'Location',
    value: profile.location,
    href: 'https://maps.google.com/?q=Pathum+Thani,Thailand',
    icon: 'mapPin',
  },
  {
    label: 'GitHub',
    value: profile.githubLabel,
    href: profile.github,
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    value: profile.linkedinLabel,
    href: profile.linkedin,
    icon: 'linkedin',
  },
]

export const featuredProject = {
  name: 'Atelier De Flora',
  context: 'JSD#13 Group Project',
  type: 'Full-stack e-commerce & custom bouquet web application',
  summary:
    'A full-stack storefront for ready-made and custom bouquets, built as a team. I owned authentication, the admin dashboard, and several core customer-facing interfaces.',
  facts: [
    { label: 'Role', value: 'Full-stack developer' },
    { label: 'Scope', value: 'Auth · Admin · Core UI' },
    { label: 'Build', value: 'MERN + Stripe + Gemini' },
  ],
  stack: [
    {
      label: 'Frontend',
      items: ['React 19', 'Vite', 'Tailwind CSS', 'Axios', 'React Router v7'],
    },
    {
      label: 'Backend',
      items: ['Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose'],
    },
    {
      label: 'Integrations',
      items: ['Stripe PromptPay QR', 'Google Gemini AI API'],
    },
  ],
  contributions: [
    {
      title: 'Authentication & security',
      body: 'Engineered end-to-end authentication workflows across /auth/login, /auth/register, /auth/refresh, and /auth/logout using JWT stored in httpOnly cookies and password hashing with bcrypt.',
    },
    {
      title: 'Admin dashboard & management',
      body: 'Developed back-office modules for product catalog CRUD operations, order management, and administrative tracking.',
    },
    {
      title: 'Core UI components',
      body: 'Built key user interfaces including navigation, the product catalog, featured items, and purchase history pages.',
    },
  ],
  links: [
    {
      label: 'Live demo',
      href: 'https://jsd-13-group-project2-mc-kraken-spr.vercel.app',
      icon: 'external',
    },
    {
      label: 'Frontend repository',
      href: 'https://github.com/JittrinP/JSD13_Group_Project2_McKraken_sprint2',
      icon: 'github',
    },
    {
      label: 'Backend repository',
      href: 'https://github.com/JittrinP/McKraken_sprint3_Backend',
      icon: 'github',
    },
    {
      label: 'Presentation deck',
      href: 'https://gp-02-data-system.vercel.app',
      icon: 'presentation',
    },
  ],
}

export const experiences = [
  {
    company: 'Generation Thailand',
    period: 'July 2026 – October 2026',
    role: 'Junior Software Developer Student',
    highlights:
      'Completed an intensive 4-month software engineering bootcamp focusing on MERN Stack, Agile methodologies, Git/GitHub collaborative workflows, and team-based software delivery.',
    tags: ['MERN', 'Agile', 'Git / GitHub'],
  },
  {
    company: 'PH Capital Company Limited',
    period: 'June 2023 – September 2024',
    role: 'Shift Manager',
    highlights:
      'Managed shift operations and inventory control under high-pressure seasonal demands while maintaining zero customer complaints. Coached team members and resolved operational bottlenecks efficiently.',
    tags: ['Operations', 'Inventory control', 'Team coaching'],
  },
  {
    company: 'Versatile Haus',
    period: 'March 2023 – May 2023',
    role: 'Front-End Developer & Quality Control (QC)',
    highlights:
      'Developed responsive front-end templates and conducted rigorous Quality Control (QC), cross-browser testing, and visual debugging to guarantee UI/UX accuracy prior to client handoff.',
    tags: ['Front-end', 'QC', 'Cross-browser testing'],
  },
  {
    company: 'Versatile Haus',
    period: 'March 2021 – September 2021',
    role: 'Graphic Design Intern',
    highlights:
      'Designed web layouts, banners, and digital marketing assets for e-commerce clients using Adobe Illustrator, applying core UI/UX visual hierarchy principles.',
    tags: ['Adobe Illustrator', 'UI/UX', 'E-commerce'],
  },
  {
    company: 'Topview Point Co., Ltd.',
    period: 'October 2019 – February 2020',
    role: 'IT Support Intern',
    highlights:
      'Delivered comprehensive IT troubleshooting and hardware maintenance; successfully provisioned, upgraded, and maintained enterprise workstation fleets to ensure seamless daily operations and minimize technical downtime.',
    tags: ['IT support', 'Hardware', 'Troubleshooting'],
  },
]

export const skillGroups = [
  {
    title: 'Programming & Web Development',
    summary: 'Languages, frameworks, and data tools used to ship full-stack work.',
    groups: [
      {
        label: 'Languages',
        items: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'PHP'],
      },
      {
        label: 'Frameworks & Libraries',
        items: ['React', 'Node.js', 'Express.js', 'Tailwind CSS', 'REST APIs'],
      },
      {
        label: 'Tools & Databases',
        items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Git', 'GitHub', 'Vite'],
      },
    ],
  },
  {
    title: 'Quality Assurance & Testing',
    summary: 'A testing mindset applied across interfaces, APIs, and browsers.',
    items: [
      'Manual Testing',
      'Exploratory Testing',
      'Cross-Browser QC',
      'Visual Debugging',
      'Postman API Testing',
    ],
  },
  {
    title: 'Design & UI/UX',
    summary: 'Visual decisions that keep layouts clear and responsive.',
    items: ['Visual Hierarchy', 'Responsive Web Layouts', 'Adobe Illustrator'],
  },
  {
    title: 'Soft Skills & Management',
    summary: 'How I work with people when pressure and deadlines arrive.',
    items: [
      'Problem-Solving',
      'Team Leadership',
      'Crisis Management',
      'Communication',
      'Fast Learner',
    ],
  },
]
