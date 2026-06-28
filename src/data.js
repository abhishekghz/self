// All site content lives here so it is easy to edit in one place.
const img = (n) => `./img/${n}`

export const profile = {
  name: 'Abhishek Gautam',
  title: 'AI Researcher & Machine Learning Engineer',
  tagline:
    'Building intelligent systems at the intersection of Deep Learning, Computer Vision and Defence research.',
  about:
    'I am an AI researcher and Machine Learning Engineer with a strong foundation in Machine Learning, Deep Learning, Computer Vision and Natural Language Processing. My research focuses on developing intelligent systems that bridge cutting-edge AI techniques with practical, real-world applications.',
  aboutExtra:
    'My work spans hidden-target detection and optical-infrared image fusion for defence, AI-driven green-flocculant synthesis for mine-effluent treatment, and situation-aware cobots for post-disaster response. I am currently pursuing an Integrated PhD (IDDP) at AcSIR — CSIR-CSIO, with prior research at IIT Indore, DRDO (IRDE), IIT (ISM) Dhanbad and IIIT Una, and I actively build developer communities as a Co-Organiser at GDG Ludhiana.',
  heroImg: img('profile_standing.jpg'),
  candidImg: img('candid.jpg'),
  cv: './Abhishek-Gautam-CV.pdf',
  email: 'gautam.abhishek7100@gmail.com',
  emailAlt: 'abhishek.csio25a@acsir.res.in',
  phone: '+91 62021 23608',
  phoneRaw: '+916202123608',
}

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhishek-gautam-0a7a56192/', short: 'in' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=Abhishek+Gautam', short: 'GS' },
  { label: 'ORCID', href: 'https://orcid.org/0000-0001-6293-6056', short: 'iD' },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Abhishek-Gautam-34', short: 'RG' },
]

export const stats = [
  { n: 5, suffix: '+', label: 'Research Papers' },
  { n: 4, suffix: '', label: 'Conferences' },
  { n: 13, suffix: '', label: 'Certifications' },
  { n: 1, suffix: '', label: 'Patent Filed' },
]

export const skills = [
  'Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing',
  'Generative AI', 'Large Language Models', 'Neural Networks', 'Genetic Algorithms',
  'Image Fusion', 'Signal Processing', 'Python',
]

export const focus = [
  { icon: 'shield', title: 'AI for Defence', text: 'Hidden-target detection, optical-infrared image fusion and DIRCM trajectory modelling.' },
  { icon: 'brain', title: 'Deep Learning & Vision', text: 'Transformer-based fusion, defect detection and malware classification with CNNs.' },
  { icon: 'leaf', title: 'AI for Sustainability', text: 'Green-flocculant synthesis and low-cost smart monitoring for mining environments.' },
  { icon: 'bot', title: 'Robotics & Response', text: 'Situation-aware fly-and-swim cobots for post-disaster assessment and emergency response.' },
]

export const experience = [
  {
    role: 'Junior Research Fellow (JRF)', org: 'IIIT Una · HPSDMA', when: 'Nov 2024 – Apr 2025 · Remote',
    desc: 'Worked on Vimatsya — a situation-aware intelligent fly-and-swim cobot for post-disaster impact assessment and emergency response.',
    logo: img('exp_1.png'),
  },
  {
    role: 'Project Assistant', org: 'IIT (ISM) Dhanbad · TEXMIN', when: 'Jun 2024 – Apr 2025',
    desc: 'Applied genetic algorithms for polymer detection and AI-driven synthesis of green flocculant for the treatment of mine-process effluent.',
    logo: img('exp_2.png'),
  },
  {
    role: 'Research Trainee', org: 'DRDO · IRDE', when: 'Jan 2024 – Jun 2024',
    desc: 'Missile projection & trajectory DIRCM modelling, and AI-based hidden-target detection using the MUSIC algorithm.',
    logo: img('exp_3.png'),
  },
  {
    role: 'Research Intern', org: 'IIT Indore', when: 'Sep 2022 – Nov 2022',
    desc: 'Static malware detection using machine learning under Prof. Narendra S. Chaudhari.',
    logo: img('exp_4.png'),
  },
]

export const education = [
  { degree: 'Integrated PhD (IDDP)', org: 'Academy of Scientific & Innovative Research — CSIR-CSIO', when: '2025 – Present' },
  { degree: 'B.Tech, Computer Science & Engineering', org: 'Shaheed Bhagat Singh State University, Ferozepur', when: '2020 – 2024' },
  { degree: 'Senior Secondary (XII)', org: 'St. Paul Public School, Teghra', when: '2018 – 2020' },
  { degree: 'Secondary (X)', org: 'St. Paul Public School, Teghra', when: '2018' },
]

export const publications = [
  {
    title: 'Development of an Algorithm for Detecting Hidden Targets Using Artificial Intelligence',
    authors: 'S.S. Yadav, A. Gautam, P. Sharma, D. Singh',
    venue: 'Defence Science Journal, Vol. 76(2), pp. 292–298', year: '2026', badge: 'Defence Science Journal',
  },
  {
    title: 'Sustainable Air-Pollution Management in Coal Mining through Low-Cost Sensors & a Smart Monitoring Platform',
    authors: 'A. Gautam et al.',
    venue: 'Environmental Technology (TENT) · DOI: 10.1080/09593330.2026.2693198', year: '2026', badge: 'Accepted',
  },
  {
    title: 'The Role of Cloud Computing in Machine Learning Approaches',
    authors: 'A. Gautam, S. Jindal, P.K. Baitha, A. Arora',
    venue: 'Int. Journal of Engineering Applied Sciences and Technology', year: '2023', badge: '',
  },
  {
    title: 'Aumann Agreement Theorem-based Human-Resource Performance Monitoring with IoT and 6G Technology',
    authors: 'P.S. Rao, S. Nayak, A. Gautam, M.E. Lourens, P.K. Dutta, S. Chowdhury',
    venue: '6th Smart Cities Symposium (SCS 2022), pp. 401–406', year: '2022', badge: '',
  },
  {
    title: 'Cloud Computing: A Review Paper',
    authors: 'A. Gautam',
    venue: 'International Journal for Research in Applied Science and Engineering', year: '2022', badge: '',
  },
]

export const patent = {
  id: 'Indian Patent Application · 202241042777',
  title: 'ML-based Approach to Monitor the Quality of Fibre-mixed Concrete with an IoT Alert Mechanism',
  authors: 'A. Gautam, M. Geethanjali, N. Sahu, D.S. ThenMozhi, D.V.G. Ramya N.',
}

export const projects = [
  { tag: 'IIIT Una · HPSDMA · 2024–25', title: 'Vimatsya', text: 'Situation-aware intelligent fly-and-swim cobot for post-disaster impact assessment, risk reduction and emergency-response services. Role: Junior Research Fellow.', pills: ['Robotics', 'Disaster Response', 'AI'] },
  { tag: 'IIT (ISM) Dhanbad · 2024–25', title: 'AI-driven Green Flocculant Synthesis', text: 'AI-driven synthesis of green flocculant and its application toward the treatment of mine-process effluent. Role: Project Assistant.', pills: ['Sustainability', 'Genetic Algorithm', 'Chemistry + AI'] },
  { tag: 'DRDO · IRDE · 2024', title: 'Hidden-Target Detection & DIRCM', text: 'Missile projection & trajectory DIRCM modelling and AI-based hidden-target detection using the MUSIC algorithm for defence applications.', pills: ['Defence', 'Signal Processing', 'MUSIC'] },
  { tag: 'IIT Indore · 2022', title: 'Static Malware Detection', text: 'Machine-learning approach to static malware detection — classifying malicious binaries without execution.', pills: ['Cybersecurity', 'ML'] },
]

export const conferences = [
  { title: 'A Novel Approach to Optical-Infrared Image Fusion for Target Detection', meta: 'EOP-2025 · Intl. Conf. on Electro-Optics & Photonics · Proceedings by Springer Nature · Nov 2025' },
  { title: 'Automated Defect Detection & Quality Control in Manufacturing using Computer Vision and Deep Learning', meta: 'ICAIML 2023 · Panjab University, Chandigarh · Nov 2023' },
  { title: 'Role of Meditation in Environmental Laws: National & International Perspective', meta: '2nd Intl. Marmara Scientific Research & Innovation Congress · ISARC, Istanbul · Apr 2022' },
  { title: 'Role of Meditation in Improving the Health of Human Beings', meta: '4th Intl. Palandoken Scientific Studies Congress · ISARC, Erzurum · Apr 2022' },
]

// Certificates & recognitions — order matches public/img/cert_N.jpg
export const certificates = [
  { src: img('cert_1.jpg'),  title: 'Practical Training — Hidden Target Detection by AI', org: 'IRDE · DRDO, Ministry of Defence', year: '2024' },
  { src: img('cert_2.jpg'),  title: 'Reviewer — Certificate of Appreciation', org: 'IEEE SPACE 2024 · IEEE AESS & DRDO', year: '2024' },
  { src: img('cert_3.jpg'),  title: 'Research Internship — Static Malware Detection', org: 'IIT Indore', year: '2022' },
  { src: img('cert_4.jpg'),  title: 'Excellence in Peer-Reviewing', org: 'BP International', year: '2024' },
  { src: img('cert_5.jpg'),  title: 'Reviewer — SIET 2025', org: 'Intl. Conf. on Sustainable Information Engineering & Technology · Bali', year: '2025' },
  { src: img('cert_6.jpg'),  title: 'Quantum Computing — One-Month Course', org: 'C-DAC Hyderabad & IIT Roorkee · MeitY', year: '2025' },
  { src: img('cert_7.jpg'),  title: 'Paper Presentation — 6th Smart Cities Symposium', org: 'IET (Institution of Engineering and Technology)', year: '2022' },
  { src: img('cert_8.jpg'),  title: 'Session Chairing — Smart City Based on IoT', org: 'IET · 6th Smart Cities Symposium', year: '2022' },
  { src: img('cert_9.jpg'),  title: 'Project Assistant — Recommendation', org: 'TEXMIN Foundation · IIT (ISM) Dhanbad', year: '2025' },
  { src: img('cert_10.jpg'), title: 'Cyber Security Training — Cyber Hygiene', org: 'MeitY, Government of India', year: '2022' },
  { src: img('cert_11.jpg'), title: 'Reviewer Recognition — DASA 2025', org: 'Applied Science University, Bahrain · IEEE', year: '2025' },
  { src: img('cert_12.jpg'), title: 'Webinar — AI-Driven Future Smart Cyber-Space Security', org: 'IEEE MTT-S', year: '2025' },
  { src: img('cert_13.jpg'), title: 'Research Poster — Optical-Infrared Image Fusion', org: 'EOP-2025 · DRDO, AcSIR & IIT Roorkee', year: '2025' },
]

// Conference photos / certificates gallery
export const confGallery = [
  img('conf_1.jpg'), img('conf_2.jpg'), img('conf_3.jpg'), img('conf_4.jpg'),
]

export const talks = [
  { title: 'Computational Thinking & AI in Real-World Contexts', role: 'Guest Lecture · SGGS Collegiate Public School, Sector 26, Chandigarh · Jun 2026' },
  { title: 'Bharat Tech Xperience Hackathon', role: 'Mentor' },
  { title: 'Smart Hackathon 2023', role: 'Mentor' },
  { title: '“Build an App with Flutter”', role: 'Guest Lecture · GDSC, SBSSU' },
  { title: 'Google Wallet API', role: 'Guest Lecture · DevFest, GDG Ludhiana' },
  { title: 'ML & its Use Cases', role: 'Guest Lecture' },
  { title: 'International Youth Summit', role: 'Speaker · GDG Ludhiana' },
]

export const talkGallery = [
  img('ctai_group.jpg'), img('ctai_activity.jpg'), img('ctai_panel.jpg'),
  img('talk_1.jpg'), img('talk_2.jpg'), img('talk_3.jpg'), img('talk_4.jpg'),
  img('talk_5.jpg'), img('talk_6.jpg'), img('talk_7.jpg'),
]

export const leadership = [
  { role: 'Secretary — IEEE Student Branch Chapter', org: 'AcSIR', when: 'Present' },
  { role: 'Co-Organiser — GDG Ludhiana', org: 'Google Developer Groups', when: '2023' },
  { role: 'President — ISTE', org: 'SBSSU', when: 'Feb 2023' },
  { role: 'Organizer — University Innovation Cell', org: 'SBSSU', when: 'Nov 2022' },
  { role: 'Student Coordinator', org: 'SBSSU', when: 'Oct 2020' },
]

export const reviewing = [
  { role: 'TPC Reviewer — IEEE SPACE', org: 'Space, Aerospace & Defence Conference', when: '2024 · 2025/26 (Active)' },
  { role: 'Reviewer — SIET 2025', org: 'Sustainable Information Engineering & Technology', when: '2025' },
  { role: 'Reviewer — DASA 2025', org: 'Decision Aid Sciences & Applications, Bahrain', when: '2025' },
  { role: 'Book-Chapter Reviewer', org: 'BP International', when: 'Feb 2024' },
]

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'certs', label: 'Certifications' },
  { id: 'community', label: 'Community' },
  { id: 'contact', label: 'Contact' },
]
