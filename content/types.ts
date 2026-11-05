export type Language = "es" | "en";

export type PortfolioContent = {
  profile: {
    name: string;
    initials: string;
    role: string;
    intro: string;
    email: string;
    socials: { label: string; href: string }[];
  };
  navLinks: { id: string; label: string }[];
  hero: {
    player: string;
    status: string;
    titleBefore: string;
    titleAccent: string;
    explore: string;
    profile: string;
    imageAlt: string;
    imageCaption: string;
  };
  about: {
    eyebrow: string;
    title: string;
    skillsLabel: string;
    paragraphs: string[];
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    imageAlt: string;
    slideHint: string;
    items: {
      year: string;
      name: string;
      description: string;
      stack: string;
      image: string;
      github: string;
      demo: string;
    }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    imageAlt: string;
    items: {
      quote: string;
      name: string;
      role: string;
      image: string;
    }[];
  };
  experience: {
    eyebrow: string;
    title: string;
    items: {
      period: string;
      title: string;
      place: string;
      description: string;
      type: string;
    }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
    groups: {
      group: string;
      items: { name: string; mark: string; tone: string }[];
    }[];
  };
  footer: string;
  header: {
    online: string;
    profileLabel: string;
    language: string;
    menu: string;
    close: string;
    navigation: string;
    contact: string;
  };
};
