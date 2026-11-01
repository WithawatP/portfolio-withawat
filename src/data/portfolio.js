export const profile = {
  name: 'Withawat Phiraban',
  roles: ['Junior Software Developer', 'Quality Assurance / Software Tester'],
  headline:
    'I build MERN apps and test them: 14 API requests in Postman on a team storefront, 20 client templates across three browsers.',
  bio: 'Bootcamp-trained full-stack developer with earlier work in front-end QC, graphic design, IT support, and shift management.',
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
      shortLabel: 'Live demo',
      href: 'https://jsd-13-group-project2-mc-kraken-spr.vercel.app',
      icon: 'external',
    },
    {
      label: 'Frontend repository',
      shortLabel: 'Frontend',
      href: 'https://github.com/JittrinP/JSD13_Group_Project2_McKraken_sprint2',
      icon: 'github',
    },
    {
      label: 'Backend repository',
      shortLabel: 'Backend',
      href: 'https://github.com/JittrinP/McKraken_sprint3_Backend',
      icon: 'github',
    },
    {
      label: 'Presentation deck',
      shortLabel: 'Deck',
      href: 'https://gp-02-data-system.vercel.app',
      icon: 'presentation',
    },
  ],
  testing: {
    title: 'How I tested',
    method:
      'Manual API testing in Postman: I sent requests one endpoint at a time and checked the status code and response myself.',
    requestCount: '14',
    requestLabel: 'requests in one Postman collection, grouped in 2 folders',
    folders: [
      {
        label: 'Auth',
        items: [
          'Login',
          'Admin login',
          'Register',
          'Logout',
          'Refresh token',
          'Forget password',
          'Reset password',
          'Edit password',
          'Get data',
          'Get admin data',
        ],
      },
      {
        label: 'Products',
        items: ['Get', 'Add', 'Update', 'Delete'],
      },
    ],
    bugsTitle: 'Bugs I found and fixed',
    bugs: [
      {
        label: 'Bug 1',
        symptom: "The userId was sent in the URL, so anyone could view another user's data.",
        cause: 'The server trusted the userId coming from the client.',
        fix: 'Read the userId from the JWT instead (req.user.userId).',
      },
      {
        label: 'Bug 2',
        symptom: 'The token expired after 15 minutes, and plain fetch calls then broke.',
        cause: 'The client had no mechanism to renew the token.',
        fix: 'Moved to an axios instance with a refresh-token interceptor.',
      },
    ],
  },
}

export const experiences = [
  {
    company: 'Generation Thailand',
    period: 'July 2026 – October 2026',
    role: 'Junior Software Developer Student',
    highlights: [
      'Completed an intensive 4-month software engineering bootcamp focusing on MERN Stack, Agile methodologies, Git/GitHub collaborative workflows, and team-based software delivery.',
    ],
    tags: ['MERN', 'Agile', 'Git / GitHub'],
  },
  {
    company: 'PH Capital Company Limited',
    period: 'June 2023 – September 2024',
    role: 'Shift Manager',
    highlights: [
      'Rotated as one of three shift managers at a restaurant and built the schedule for a team of 5.',
      'Ran inventory control through festival-day peaks, including a weekly Monday stock count to the gram.',
      'Resolved wrong orders on the spot without stalling the line and trained staff on first-line fixes. No complaint reports reached me in this role.',
    ],
    tags: ['Operations', 'Inventory control', 'Team coaching'],
  },
  {
    company: 'Versatile Haus',
    period: 'March 2023 – May 2023',
    role: 'Front-End Developer & Quality Control (QC)',
    highlights: [
      'Developed responsive front-end templates.',
      "Tested 20 of the company's client-facing templates in Chrome, Edge, and Brave, mostly through DevTools, before handoff; most defects were responsive-layout issues.",
    ],
    tags: ['Front-end', 'QC', 'Responsive testing'],
  },
  {
    company: 'Versatile Haus',
    period: 'March 2021 – September 2021',
    role: 'Graphic Design Intern',
    highlights: [
      'Designed web layouts, banners, and digital marketing assets for e-commerce clients using Adobe Illustrator, applying core UI/UX visual hierarchy principles.',
    ],
    tags: ['Adobe Illustrator', 'UI/UX', 'E-commerce'],
  },
  {
    company: 'Topview Point Co., Ltd.',
    period: 'October 2019 – February 2020',
    role: 'IT Support Intern',
    highlights: [
      'Looked after 80+ machines at an IT outsourcing company serving offices and schools: diagnosed faults, repaired and upgraded units, and sent them back out.',
      'Carried out on-site installations at customer offices and homes.',
    ],
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
        items: ['JavaScript (ES6+)', 'HTML5', 'CSS3'],
      },
      {
        label: 'Frameworks & Libraries',
        items: ['React', 'Node.js', 'Express.js', 'Tailwind CSS', 'REST APIs'],
      },
      {
        label: 'Tools & Databases',
        items: ['MongoDB', 'PostgreSQL', 'Git', 'GitHub', 'Vite'],
      },
    ],
  },
  {
    title: 'Quality Assurance & Testing',
    summary: 'Used on interfaces, on APIs through Postman, and across Chrome, Edge, and Brave.',
    items: [
      'Manual Testing',
      'Exploratory Testing',
      'Responsive Testing',
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
