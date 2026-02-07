
export const ALGERIAN_WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", 
  "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers", 
  "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", 
  "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", 
  "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", 
  "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", 
  "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès", 
  "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa"
];

export const CATEGORIZED_HARD_SKILLS = [
  {
    label: "Software & IT",
    options: [
      "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C#", "PHP", 
      "AWS", "Docker", "Kubernetes", "SQL", "NoSQL", "Cybersecurity", "Network Administration",
      "UI/UX Design", "Figma", "DevOps", "Mobile Development", "Data Analysis"
    ]
  },
  {
    label: "Engineering & Architecture",
    options: [
      "AutoCAD", "SolidWorks", "Revit", "Civil Engineering", "Structural Analysis", 
      "Electrical Engineering", "HVAC Systems", "PLC Programming", "Mechanical Design", 
      "Project Estimation", "Urban Planning", "Interior Design", "Matlab"
    ]
  },
  {
    label: "Business, Finance & Management",
    options: [
      "Accounting", "Financial Analysis", "Bookkeeping", "Project Management (PMP)", 
      "Digital Marketing", "SEO/SEM", "Content Strategy", "Sales Management", 
      "CRM Software", "Supply Chain Management", "Human Resources", "Recruitment",
      "Business Intelligence", "Risk Management", "Public Relations"
    ]
  },
  {
    label: "Healthcare & Medicine",
    options: [
      "Patient Care", "Nursing", "Clinical Research", "Medical Coding", "Phlebotomy", 
      "Radiology", "Pharmacy", "Surgery Assistance", "Emergency Response (CPR)", 
      "Laboratory Testing", "Healthcare Administration", "Nutrition Planning"
    ]
  },
  {
    label: "Creative & Arts",
    options: [
      "Graphic Design", "Adobe Photoshop", "Adobe Illustrator", "Video Editing", 
      "Premiere Pro", "After Effects", "Photography", "Copywriting", "Journalism", 
      "Fashion Design", "Music Production", "3D Modeling", "Animation"
    ]
  },
  {
    label: "Skilled Trades & Technical",
    options: [
      "Welding", "Carpentry", "Plumbing", "Electrical Wiring", "Automotive Repair", 
      "Machining (CNC)", "Heavy Equipment Operation", "Maintenance", "Painting", 
      "Masonry", "Forklift Operation", "HVAC Repair"
    ]
  },
  {
    label: "Education & Training",
    options: [
      "Curriculum Development", "Classroom Management", "E-Learning Platforms", 
      "Special Education", "Academic Research", "Tutoring", "Instructional Design"
    ]
  },
  {
    label: "Legal & Administrative",
    options: [
      "Legal Research", "Contract Law", "Data Entry", "Office Management", 
      "Typing", "Transcription", "Virtual Assistance", "Event Planning"
    ]
  }
];

export const COMMON_SOFT_SKILLS = [
  "Communication", "Teamwork", "Problem Solving", "Adaptability", "Critical Thinking", 
  "Time Management", "Leadership", "Empathy", "Collaboration", "Public Speaking", 
  "Negotiation", "Creativity", "Decision Making", "Stress Management", "Organization",
  "Emotional Intelligence", "Work Ethic", "Attention to Detail", "Conflict Resolution", "Active Listening"
];

export const ALGERIAN_DRIVING_PERMITS_DETAILS = [
  { value: "A1", label: "A1 - Motorcycles (Small Displacement)" },
  { value: "A", label: "A - Motorcycles (All Categories)" },
  { value: "B", label: "B - Passenger Vehicles (Up to 9 seats, <3.5T)" },
  { value: "B1", label: "B1 - Heavy Tricycles & Quadricycles" },
  { value: "C1", label: "C1 - Goods Vehicles (3.5T - 7.5T)" },
  { value: "C", label: "C - Heavy Goods Vehicles (>7.5T)" },
  { value: "D", label: "D - Passenger Transport (Bus, >8 passengers)" },
  { value: "BE", label: "BE - Category B Vehicle + Heavy Trailer" },
  { value: "CE", label: "CE - Category C Vehicle + Heavy Trailer" },
  { value: "DE", label: "DE - Category D Vehicle + Heavy Trailer" },
  { value: "F", label: "F - Special Category (Disabled Drivers)" }
];

export const MOCK_CANDIDATES = [
  {
    id: 1,
    name: "Youcef Benali",
    initials: "YB",
    title: "Senior Full Stack Developer",
    location: "Algiers",
    experience: 6,
    skills: ["React", "Node.js", "AWS", "TypeScript"],
    matchScore: 98,
    verified: true,
    educationLevel: "Master",
    availability: "Immediate",
    salaryRange: "120k-150k DZD",
    languages: ["English", "French", "Arabic"],
    whatsapp: "213550123456",
    email: "youcef.b@example.com",
    bio: "Passionate Full Stack Developer specializing in scalable web architectures. Proven track record in fintech and e-commerce sectors."
  },
  {
    id: 2,
    name: "Sarah K.",
    initials: "SK",
    title: "UX/UI Designer",
    location: "Oran",
    experience: 4,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    matchScore: 95,
    verified: true,
    educationLevel: "Bachelor",
    availability: "1 Month Notice",
    salaryRange: "80k-100k DZD",
    languages: ["French", "Arabic"],
    whatsapp: "213661987654",
    email: "sarah.design@example.com",
    bio: "Creative UX/UI Designer with a focus on mobile-first experiences. I turn complex problems into intuitive and beautiful designs."
  },
  {
    id: 3,
    name: "Karim O.",
    initials: "KO",
    title: "DevOps Engineer",
    location: "Constantine",
    experience: 5,
    skills: ["Docker", "Kubernetes", "CI/CD", "Azure"],
    matchScore: 92,
    verified: true,
    educationLevel: "Master",
    availability: "Immediate",
    salaryRange: "150k+ DZD",
    languages: ["English", "Arabic"],
    whatsapp: "213770555111",
    email: "karim.ops@example.com",
    bio: "DevOps specialist obsessed with automation and infrastructure as code. Certified in AWS and Azure solutions."
  },
  {
    id: 4,
    name: "Yacine M.",
    initials: "YM",
    title: "Digital Marketing Specialist",
    location: "Algiers",
    experience: 3,
    skills: ["SEO", "Content Marketing", "Google Analytics", "Social Media"],
    matchScore: 89,
    verified: false,
    educationLevel: "Bachelor",
    availability: "Immediate",
    salaryRange: "60k-80k DZD",
    languages: ["Arabic", "French", "English"],
    whatsapp: "213555222333",
    email: "yacine.mkt@example.com",
    bio: "Data-driven marketer helping brands grow their online presence. Expert in SEO strategies and social media campaigns."
  },
  {
    id: 5,
    name: "Meriem S.",
    initials: "MS",
    title: "Project Manager",
    location: "Setif",
    experience: 8,
    skills: ["Agile", "Scrum", "Jira", "Risk Management"],
    matchScore: 88,
    verified: true,
    educationLevel: "MBA",
    availability: "2 Months Notice",
    salaryRange: "150k+ DZD",
    languages: ["English", "French", "Arabic"],
    whatsapp: "213666888999",
    email: "meriem.pm@example.com",
    bio: "Certified PMP with 8 years of experience leading cross-functional teams in software development projects."
  },
  {
    id: 6,
    name: "Lamine D.",
    initials: "LD",
    title: "Frontend Developer",
    location: "Annaba",
    experience: 2,
    skills: ["Vue.js", "Tailwind CSS", "JavaScript"],
    matchScore: 85,
    verified: true,
    educationLevel: "Bachelor",
    availability: "Immediate",
    salaryRange: "60k-80k DZD",
    languages: ["English", "Arabic"],
    whatsapp: "213777444111",
    email: "lamine.dev@example.com",
    bio: "Enthusiastic Frontend Developer creating responsive and interactive web applications. Loves modern CSS and Vue ecosystem."
  }
];
