export const data = {
  bio: {
    fullName: "Mofiz Rahman",
    title: "Software Engineer",
    summary: "Experienced developer passionate about building scalable systems and mentoring others.",
    location: "Berlin, Germany",
    dob: "1990-05-12",
    photo: "https://example.com/photos/alex.jpg",
    content: "<p>NA</p>\n"
  },
  contact: {
    title: "Contacts for language: de",
    contacts: [
      {
        type: "Email",
        value: "alex@example.com",
        label: "Work"
      },
      {
        type: "Phone",
        value: "+49 1522 1234567",
        label: "Mobile"
      },
      {
        type: "Website",
        value: "https://alexjohnson.dev",
        label: "Website"
      },
      {
        type: "Address",
        value: "Berlin, Germany",
        description: "Current residence"
      }
    ],
    content: "<p>NA</p>\n"
  },
  interest: {
    items: [
      "Photography",
      "Traveling",
      "Open-source projects",
      "Reading",
      "Music",
      "Sports"
    ],
    content: "<p>NA</p>\n"
  },
  languages: {
    title: "Languages for language: de",
    languages: [
      {
        name: "English",
        read: "Fluent",
        write: "Fluent",
        speak: "Fluent",
        listen: "Fluent",
        tests: [
          "IELTS",
          "TOEFL"
        ],
        level: "C1"
      },
      {
        name: "German",
        read: "Intermediate",
        write: "Intermediate",
        speak: "Intermediate",
        listen: "Intermediate",
        tests: [
          "Goethe B2",
          "Telc B2"
        ],
        level: "B2"
      },
      {
        name: "French",
        read: "Good",
        write: "Good",
        speak: "Intermediate",
        listen: "Good",
        level: "B1"
      }
    ],
    content: "<p>NA</p>\n"
  },
  reference: {
    title: "References for language: de",
    references: [
      {
        name: "Dr. Laura Schmidt",
        position: "Engineering Manager",
        organization: "TechCorp GmbH",
        email: "laura.schmidt@techcorp.de",
        phone: "+49 1522 111222",
        relation: "Manager at TechCorp"
      },
      {
        name: "Prof. Mofiz Rahman",
        position: "Professor of Computer Science",
        organization: "University of Hamburg",
        email: "j.doe@uni-hamburg.de",
        relation: "Thesis Supervisor"
      }
    ],
    content: "<p>NA</p>\n"
  },
  skills: {
    title: "Skills for language: de",
    skills: [
      {
        category: "Programming",
        items: [
          "Python",
          "TypeScript",
          "Java",
          "C++"
        ]
      },
      {
        category: "Tools & Cloud",
        items: [
          "AWS",
          "Docker",
          "Kubernetes"
        ]
      },
      {
        category: "Soft Skills",
        items: [
          "Leadership",
          "Communication",
          "Mentoring"
        ]
      },
      {
        category: "Design & Creative",
        items: [
          "Photoshop",
          "Figma",
          "Adobe Illustrator"
        ]
      },
      {
        category: "Languages",
        items: [
          "English",
          "German",
          "French"
        ]
      }
    ],
    content: "<p>NA</p>\n"
  },
  social: {
    title: "Social Links for language: de",
    social_links: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/alexjohnson",
        username: "alexjohnson"
      },
      {
        platform: "GitHub",
        url: "https://github.com/alexjohnson",
        username: "alexjohnson"
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/alexjohnson"
      }
    ],
    content: "<p>NA</p>\n"
  }
} as const;
export default data;
