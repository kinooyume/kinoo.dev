import type { fr } from "./fr";

export const en = {
  meta: {
    title: "Martin Kinoo · Freelance Front-end Developer",
    description:
      "Freelance front-end developer based in Paris. Specialised in TypeScript, Svelte and Astro. Building fast, accessible websites.",
    skipLink: "Skip to content",
  },
  nav: {
    articles: "Articles",
    realisations: "Projects",
    experiences: "Experience",
    formations: "Education",
    contact: "Contact",
    designSystem: "Design System",
    theme: "Theme",
    cta: "Let's work together",
  },
  hero: {
    subtitle: "Freelance Frontend Developer",
    punchline: "Frontend done right, plain and simple.",
    catchphrase:
      "Clear, modular, scalable web applications, without needless complexity.",
    intro: `I simplify technical decisions and secure the architecture so
projects move forward predictably. Whatever the framework, the rigour and the
architecture stay the same.`,
    yourStack: "Your stack?",
    photoAlt: "Photo of Martin Kinoo",
  },
  sections: {
    articles: { subtitle: "My", title: "Articles" },
    realisations: { subtitle: "My", title: "Projects" },
    experiences: { subtitle: "My", title: "Experience" },
    formations: { subtitle: "My", title: "Education" },
    experiencesCta: "View my resume",
    realisationsCta: "See more on GitHub",
  },
  contact: {
    subtitle: "Let's talk about",
    title: "Your project",
    intro: `Looking for an experienced freelance frontend developer to launch a
product, grow an application or strengthen your team?`,
    outro: `Describe your context and your goals. I'll get back to you quickly
with clear, pragmatic solutions that fit.`,
    linkedin: "Find me on LinkedIn",
    form: {
      nameLabel: "Your name",
      namePlaceholder: "Claude Monet",
      emailLabel: "Your email",
      emailPlaceholder: "claude@giverny.fr",
      messageLabel: "Your project",
      messagePlaceholder:
        "Describe your context, your goals and the technical stakes. (Product to launch, rebuild, team reinforcement…)",
      submitIdle: "Let's talk!",
      submitSending: "Sending…",
      submitSent: "Message sent ✓",
      hint: "Reply within 24-48h.",
      nameRequired: "Name is required.",
      emailRequired: "Please enter your email.",
      emailInvalid: "The email address is badly formatted.",
      messageRequired: "Message is required.",
    },
    toast: {
      sending: "Sending…",
      success: "Your message has been sent. I'll reply shortly.",
      error: "Something went wrong. Please try again later.",
    },
  },
  article: {
    back: "Portfolio",
  },
  footer: {
    by: "Designed and coded by",
    builtWith: "Built with",
    and: "and",
  },
  a11y: {
    themeToggle: "Toggle theme",
    langToggle: "Passer en français",
    sliderPrev: "Previous slide",
    floatingContact: "Contact me",
    sliderNext: "Next slide",
  },
  rss: {
    title: "Martin Kinoo",
    description:
      "Articles on front-end development, architecture and tooling.",
  },
} satisfies typeof fr;
