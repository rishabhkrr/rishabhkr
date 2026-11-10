export type ProjectFilter = 'AI' | 'Backend' | 'Data' | 'Web' | 'Games';

export type Project = {
  slug: string; // also the screenshot name: public/images/projects/<slug>.png
  title: string;
  copy: string;
  chips: string[];
  filter: ProjectFilter;
  year: string;
  /** Only repos confirmed public (GitHub API, unauthenticated). Empty hides the Code button. */
  code?: string;
  live?: string;
};

export const projectsCopy = {
  heading: "More things I've built",
  intro: 'Earlier builds, from college games to backend services. This is where I learned how systems actually work.',
  filters: ['All', 'AI', 'Backend', 'Data', 'Web', 'Games'] as const,
  code: 'Code',
  live: 'Live / Demo',
};

const gh = (repo: string) => `https://github.com/rishabhkrr/${repo}`;

export const projects: Project[] = [
  { slug: 'ai-interview-assistant', title: 'AI Interview Assistant', copy: 'Speak a question and get a GPT answer in real time: Whisper transcription, a FastAPI backend, a React UI and a one-command Docker setup.', chips: ['OpenAI', 'Whisper', 'FastAPI', 'React', 'Docker'], filter: 'AI', year: '2025', code: gh('GenAI-Project-1') },
  { slug: 'banking-microservices', title: 'Banking Microservices', copy: 'Accounts, loans, employees and users as separate Spring Boot services behind a Zuul gateway with Eureka discovery.', chips: ['Java', 'Spring Boot', 'Eureka', 'Zuul'], filter: 'Backend', year: '2021', code: gh('FIS_Microservices') },
  { slug: 'spring-boot-labs', title: 'Spring Boot Lab Collection', copy: 'JDBC, JPA, Security, Lambda and a banking app: the hands-on base for my backend work.', chips: ['Java', 'Spring', 'JPA', 'Spring Security'], filter: 'Backend', year: '2021', code: gh('FIS_Spring') },
  { slug: 'mask-attendance', title: 'Mask & Attendance Manager', copy: 'A Django app that detects face masks on camera and marks attendance automatically.', chips: ['Python', 'Django', 'OpenCV', 'SQLite'], filter: 'AI', year: '2021', code: gh('Mask--Attandance--Management') },
  { slug: 'ecommerce', title: 'E-Commerce Website', copy: 'An online store with product listings, cart and checkout, built on Django.', chips: ['Django', 'Python', 'JavaScript', 'Bootstrap'], filter: 'Web', year: '2020' },
  { slug: 'smart-contact-manager', title: 'Smart Contact Manager', copy: 'A full-stack contact book with login and per-user contacts.', chips: ['Java', 'Spring', 'Thymeleaf'], filter: 'Web', year: '2020', code: gh('Contact-Manager') },
  { slug: 'power-bi-dashboards', title: 'Power BI Dashboards', copy: 'Practice reports and a project dashboard, built while learning data modelling and DAX.', chips: ['Power BI', 'DAX'], filter: 'Data', year: '2024', code: gh('PowerBI-Practice-and-Projects') },
  { slug: 'excel-bike-sales', title: 'Excel Bike Sales Dashboard', copy: 'Cleaned a raw sales dataset and built an interactive pivot dashboard.', chips: ['Excel', 'Pivot tables', 'Data cleaning'], filter: 'Data', year: '2024', code: gh('Excel-Projects-and-worksheets') },
  { slug: 'covid-notifier', title: 'COVID-19 Desktop Notifier', copy: 'Scrapes live state-wise case counts and pushes desktop notifications. Built during the 2020 lockdown.', chips: ['Python', 'BeautifulSoup', 'Plyer'], filter: 'Data', year: '2020', code: gh('Covid-19-Notification-for-Desktop') },
  { slug: 'tour-management', title: 'Tour Management System', copy: 'A tour-booking site with packages, enquiries, tickets and an admin panel.', chips: ['PHP', 'MySQL', 'Bootstrap', 'jQuery'], filter: 'Web', year: '2020', code: gh('Tourist-Management-System') },
  { slug: 'jarvis', title: 'Jarvis Voice Assistant', copy: 'A Python voice assistant that searches Wikipedia, opens sites and sends email on voice command.', chips: ['Python', 'Speech recognition'], filter: 'AI', year: '2020', code: gh('Jarves') },
  { slug: 'car-rental', title: 'Car Rental System', copy: 'Rental bookings modelled with graphs, trees, stacks and linked lists.', chips: ['C/C++', 'Data structures'], filter: 'Backend', year: '2018–20', code: gh('Car-Rental-System') },
  { slug: 'notes-app', title: 'Notes App', copy: 'Create, save and delete notes in the browser with localStorage.', chips: ['JavaScript', 'HTML', 'CSS'], filter: 'Web', year: '2020', code: gh('notes-taking-app') },
  { slug: 'my-bookshelf', title: 'My Bookshelf', copy: 'A small JavaScript library app to add and list books.', chips: ['JavaScript', 'HTML', 'Bootstrap'], filter: 'Web', year: '2020', code: gh('MybookSelf') },
  { slug: 'space-war', title: 'Space War', copy: 'A 2D arcade shooter with sound effects and sprite graphics.', chips: ['Python', 'Pygame'], filter: 'Games', year: '2020', code: gh('Space-War') },
  { slug: 'tic-tac-toe', title: 'Tic-Tac-Toe', copy: 'The classic two-player game.', chips: ['Python'], filter: 'Games', year: '2020', code: gh('Tic-Tac-Tow') },
];

export const learningArchive = {
  title: 'Coursework & labs',
  intro: "Structured coursework I completed alongside full-time work. It's the groundwork behind the projects above.",
  tracks: [
    ['Python for Data Science', 'NumPy, Pandas, EDA, visualisation'],
    ['Java & OOP', 'OOP principles, algorithms'],
    ['Data structures & algorithms', 'Problem solving'],
    ['Backend development', 'Spring MVC, REST'],
    ['Frontend', 'DOM, ES6, responsive layout'],
    ['College-era courses', 'Django, Machine Learning, Neural Networks, Python Data Scientist, Streamlit data apps (Coursera Project Network, 2020)'],
  ] as [string, string][],
};
