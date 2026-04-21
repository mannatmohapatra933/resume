export const initialData = {
  personalInfo: {
    name: "Alexander Vance",
    title: "Senior Operations Director",
    location: "New York, NY",
    email: "contact@alexandervance.me",
    phone: "+1 (555) 012-3456",
    relocation: true,
    showPhoto: true,
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    isFresher: false,
    isATS: false,
    compactMode: false,
    themeColor: "#004349",
    summary: "Strategic Operations Director with 10+ years of experience in scaling high-growth SaaS companies. Expert in workflow optimization, cross-functional leadership, and data-driven decision making.",
    fontScale: "A2",
    visibility: {
      experience: true,
      education: true,
      projects: true,
      skills: true,
      socials: true,
      extras: true,
      certificates: true
    }
  },
  socials: [
    { platform: "Portfolio", url: "alexandervance.me", icon: "Globe" },
    { platform: "LinkedIn", url: "linkedin.com/in/alexvance", icon: "Linkedin" },
    { platform: "GitHub", url: "github.com/alexvance", icon: "Github" }
  ],
  experience: [
    {
      id: 1,
      title: "Senior Operations Director",
      company: "Stratagem Solutions",
      period: "2018 — Present",
      location: "New York, NY",
      type: "Full-time",
      desc: "Leading operational strategy for a global SaaS provider with $200M+ ARR. Responsible for optimizing cross-departmental workflows and driving enterprise efficiency.",
      points: [
        "Led a department-wide restructuring that improved efficiency by 30%.",
        "Managed a $15M annual budget with 98% accuracy.",
        "Introduced automated reporting tools that saved 20+ hours per week."
      ]
    },
    {
      id: 2,
      title: "Operations Manager",
      company: "Vertex Systems",
      period: "2015 — 2018",
      location: "San Francisco, CA",
      type: "Full-time",
      desc: "Managed daily operations and team logistics for a Series B startup.",
      points: [
        "Scaled the operations team from 5 to 25 members.",
        "Implemented a new CRM that increased lead conversion by 15%."
      ]
    }
  ],
  education: [
    {
      id: 1,
      school: "Stanford University",
      degree: "MBA in Strategic Management",
      period: "2013 — 2015"
    },
    {
      id: 2,
      school: "University of California, Berkeley",
      degree: "B.S. in Economics",
      period: "2009 — 2013"
    }
  ],
  projects: [
    {
      id: 1,
      title: "Global Supply Chain Audit",
      desc: "A comprehensive audit of international shipping routes that reduced costs by 12%.",
      url: "https://github.com/project-audit"
    },
    {
      id: 2,
      title: "AI-Driven Logistics Engine",
      desc: "Developed a prototype for automated route planning using machine learning.",
      url: "https://github.com/logistics-engine"
    }
  ],
  skills: [
    "Strategic Planning", "Team Leadership", "Budget Management", "Process Automation", 
    "Data Analysis", "Project Management", "Stakeholder Relations", "SaaS Operations"
  ],
  expertise: {
    desc: "A multidisciplinary approach to operational excellence, combining technical proficiency with strategic foresight.",
    proficiencies: ["Lean Six Sigma", "Agile Methodologies", "Financial Modeling", "Business Intelligence"]
  },
  certificates: [
    { title: "Project Management Professional (PMP)", issuer: "PMI", url: "#" },
    { title: "Certified Scrum Master", issuer: "Scrum Alliance", url: "#" }
  ],
  achievements: [
    "Winner of the 2022 Excellence in Operations Award.",
    "Featured speaker at the Global SaaS Summit 2021."
  ],
  hobbies: ["Photography", "Mountain Biking", "Chess"]
};

export const resumeData = initialData;