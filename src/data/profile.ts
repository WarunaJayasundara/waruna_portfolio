// Personal details. Everything here comes from the CV (October 2026 edition).
export const profile = {
  name: 'Waruna Jayasundara',
  shortName: 'Waruna',
  role: 'Software Engineer',
  location: 'Kelaniya, Sri Lanka',
  availability: 'Open to roles and freelance projects',
  email: 'jwarunaravisanka@gmail.com',
  phone: '+94 71 923 7035',
  phoneHref: 'tel:+94719237035',
  whatsappNumber: '94719237035',
  github: 'https://github.com/WarunaJayasundara',
  githubHandle: 'WarunaJayasundara',
  linkedin: 'https://www.linkedin.com/in/waruna-jayasundara-3a80ab265',
  resume: 'Waruna_Jayasundara_CV.pdf',
  education: {
    degree: 'Bachelor of Information and Communication Technology (Hons)',
    school: 'University of Kelaniya',
    specialisation: 'Software Systems',
  },
} as const;

/** WhatsApp click-to-chat link with an optional pre-filled message. */
export const whatsappLink = (message = 'Hi Waruna, I saw your portfolio and would like to talk.') =>
  `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(message)}`;
