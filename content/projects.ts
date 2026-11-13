export type Project = {
  id: string;
  title: string;
  description: string;
  tier: 'flagship' | 'featured' | 'fun';
  category: string;
  stack: string[];
  status: 'live' | 'demo' | 'screenshots' | 'case-study';
  github?: string;
  liveUrl?: string;
  isPrivate: boolean;
};

export const projects: Project[] = [
  // ─── TIER 1: FLAGSHIP ───
  {
    id: 'quantdesk',
    title: 'QuantDesk',
    description: 'Quantitative analysis dashboard for financial modeling and data-driven decision making.',
    tier: 'flagship',
    category: 'Data & Analytics',
    stack: ['Python', 'React', 'PostgreSQL'],
    status: 'case-study',
    isPrivate: true,
  },
  {
    id: 'job-search-copilot',
    title: 'Job Search Copilot',
    description: 'AI-powered job search assistant that streamlines applications and tracks opportunities.',
    tier: 'flagship',
    category: 'AI & Automation',
    stack: ['Python', 'AI/ML', 'Web App'],
    status: 'case-study',
    isPrivate: true,
  },
  {
    id: 'ticket-tracker',
    title: 'Ticket Tracker',
    description: 'Comprehensive ticket tracking system for project management and issue resolution.',
    tier: 'flagship',
    category: 'Productivity',
    stack: ['Full Stack', 'Database', 'UI/UX'],
    status: 'case-study',
    isPrivate: true,
  },
  {
    id: 'genai-project-1',
    title: 'ParakeetAI Clone',
    description: 'AI-powered interview assistant with real-time audio transcription using Whisper + GPT-4.',
    tier: 'flagship',
    category: 'AI & Automation',
    stack: ['FastAPI', 'React', 'OpenAI', 'Docker', 'Whisper'],
    status: 'live',
    github: 'https://github.com/rishabhkrr/GenAI-Project-1',
    isPrivate: false,
  },

  // ─── TIER 2: FEATURED ───
  {
    id: 'mask-attendance',
    title: 'Mask Attendance System',
    description: 'Face-mask-based attendance system using computer vision and deep learning.',
    tier: 'featured',
    category: 'AI & Automation',
    stack: ['Python', 'Django', 'OpenCV', 'face_recognition'],
    status: 'demo',
    github: 'https://github.com/rishabhkrr/Mask--Attandance--Management',
    isPrivate: false,
  },
  {
    id: 'covid-notifier',
    title: 'COVID-19 Desktop Notifier',
    description: 'Desktop notification app that scrapes COVID data and sends real-time system alerts.',
    tier: 'featured',
    category: 'Utilities',
    stack: ['Python', 'BeautifulSoup', 'plyer', 'requests'],
    status: 'demo',
    github: 'https://github.com/rishabhkrr/Covid-19-Notification-for-Desktop',
    isPrivate: false,
  },
  {
    id: 'contact-manager',
    title: 'Smart Contact Manager',
    description: 'Full-featured contact management system with authentication and CRUD operations.',
    tier: 'featured',
    category: 'Web Applications',
    stack: ['Java', 'Spring Boot', 'Thymeleaf', 'Spring Security', 'MySQL'],
    status: 'demo',
    github: 'https://github.com/rishabhkrr/Contact-Manager',
    isPrivate: false,
  },
  {
    id: 'tourist-management',
    title: 'Tourist Management System',
    description: 'Complete tour booking website with admin panel, package management, and booking system.',
    tier: 'featured',
    category: 'Web Applications',
    stack: ['PHP', 'MySQL', 'Bootstrap', 'jQuery', 'Font Awesome'],
    status: 'demo',
    github: 'https://github.com/rishabhkrr/Tourist-Management-System',
    isPrivate: false,
  },
  {
    id: 'jarves',
    title: 'Jarves AI Assistant',
    description: 'Voice-controlled AI assistant with text-to-speech, web automation, and email integration.',
    tier: 'featured',
    category: 'AI & Automation',
    stack: ['Python', 'pyttsx3', 'speech_recognition', 'Wikipedia API'],
    status: 'demo',
    github: 'https://github.com/rishabhkrr/Jarves',
    isPrivate: false,
  },
  {
    id: 'notes-taking-app',
    title: 'Notes Taking App',
    description: 'Simple and elegant notes application built with vanilla JavaScript.',
    tier: 'featured',
    category: 'Web Applications',
    stack: ['HTML', 'CSS', 'JavaScript'],
    status: 'live',
    github: 'https://github.com/rishabhkrr/notes-taking-app',
    isPrivate: false,
  },
  {
    id: 'mybookself',
    title: 'MyBookSelf',
    description: 'Book list manager with Bootstrap UI and local storage persistence.',
    tier: 'featured',
    category: 'Web Applications',
    stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    status: 'live',
    github: 'https://github.com/rishabhkrr/MybookSelf',
    isPrivate: false,
  },

  // ─── TIER 3: FUN / MINI ───
  {
    id: 'space-war',
    title: 'Space War',
    description: 'Classic space shooter game built with Pygame featuring sprites, sound, and scoring.',
    tier: 'fun',
    category: 'Games',
    stack: ['Python', 'Pygame'],
    status: 'demo',
    github: 'https://github.com/rishabhkrr/Space-War',
    isPrivate: false,
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    description: 'Command-line tic-tac-toe game with clean game logic and board display.',
    tier: 'fun',
    category: 'Games',
    stack: ['Python'],
    status: 'demo',
    github: 'https://github.com/rishabhkrr/Tic-Tac-Tow',
    isPrivate: false,
  },

];

export const getProjectsByTier = (tier: Project['tier']) =>
  projects.filter((p) => p.tier === tier);

export const getProjectsByCategory = (category: string) =>
  projects.filter((p) => p.category === category);

export const getCategories = () =>
  [...new Set(projects.map((p) => p.category))];
