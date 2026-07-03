import auraaHerbal from "../assets/work/auraa-herbal-campaign.webp";
import brewCoffee from "../assets/work/brew-coffee-campaign.webp";
import burgerCampaign from "../assets/work/burger-campaign.webp";
import emberX from "../assets/work/ember-x-fragrance.webp";
import fashionEditorial from "../assets/work/fashion-editorial.webp";
import fitnessEditorial from "../assets/work/fitness-editorial.webp";
import jackDaniels from "../assets/work/jack-daniels-campaign.webp";
import jblBlackFriday from "../assets/work/jbl-black-friday.webp";
import kingsman from "../assets/work/kingsman-poster.webp";
import laysMaxx from "../assets/work/lays-maxx-campaign.webp";
import pizzaCampaign from "../assets/work/pizza-campaign.webp";
import spidermanPoster from "../assets/work/spiderman-poster.webp";

export const projects = [
  {
    id: "jbl-black-friday",
    title: "Black Friday / JBL",
    category: "Advertising",
    year: "2026",
    role: "Art Direction & Compositing",
    image: jblBlackFriday,
    accent: "#3972ff",
    description:
      "A high-energy retail campaign built around cinematic product lighting, layered geometry and sharp promotional hierarchy.",
    tags: ["Social Campaign", "Photo Manipulation", "Typography"],
    size: "wide",
    objectPosition: "center center",
  },
  {
    id: "burger-campaign",
    title: "Burger Hot & Special",
    category: "Food Campaign",
    year: "2026",
    role: "Visual Design",
    image: burgerCampaign,
    accent: "#ff6a00",
    description:
      "A bold food promotion designed for instant appetite appeal with oversized type, offer-led messaging and warm, energetic colour.",
    tags: ["Poster", "Food Styling", "Promotion"],
    size: "tall",
    objectPosition: "center center",
  },
  {
    id: "spiderman-poster",
    title: "Spider-Man / Fan Poster",
    category: "Poster Design",
    year: "2026",
    role: "Key Art & Compositing",
    image: spidermanPoster,
    accent: "#e11d48",
    description:
      "A cinematic fan poster balancing character scale, atmosphere, depth and glowing effects for a theatrical finish.",
    tags: ["Movie Poster", "Compositing", "Key Art"],
    size: "tall",
    objectPosition: "center center",
  },
  {
    id: "fashion-editorial",
    title: "Fashion / 40+",
    category: "Editorial",
    year: "2026",
    role: "Editorial Art Direction",
    image: fashionEditorial,
    accent: "#d6a315",
    description:
      "A contemporary menswear editorial mixing luxury typography, disciplined grids and monochrome imagery.",
    tags: ["Magazine", "Layout", "Typography"],
    size: "tall",
    objectPosition: "center center",
  },
  {
    id: "lays-maxx",
    title: "Experience the Maxx",
    category: "Advertising",
    year: "2026",
    role: "Campaign Design",
    image: laysMaxx,
    accent: "#87b900",
    description:
      "A product-first snack campaign with dramatic flavour cues, dimensional composition and bold supermarket visibility.",
    tags: ["FMCG", "Social Media", "Product Visual"],
    size: "wide",
    objectPosition: "center center",
  },
  {
    id: "brew-coffee",
    title: "Brew Coffee Co.",
    category: "Brand Campaign",
    year: "2026",
    role: "Brand & Campaign Design",
    image: brewCoffee,
    accent: "#8b5e3c",
    description:
      "A calm lifestyle advertisement combining tactile neutrals, focused copy and a warm product atmosphere.",
    tags: ["Branding", "Social Ad", "Product Design"],
    size: "tall",
    objectPosition: "center center",
  },
  {
    id: "auraa-herbal",
    title: "Auraa Herbal",
    category: "Brand Campaign",
    year: "2026",
    role: "Product Art Direction",
    image: auraaHerbal,
    accent: "#70863f",
    description:
      "A premium botanical product visual using deep greens, soft highlights and natural material cues to communicate trust.",
    tags: ["Beauty", "Product Ad", "Art Direction"],
    size: "tall",
    objectPosition: "center center",
  },
  {
    id: "ember-x",
    title: "Ember X / Noir Edge",
    category: "Photo Manipulation",
    year: "2026",
    role: "Concept & Compositing",
    image: emberX,
    accent: "#4c8dff",
    description:
      "A dramatic fragrance concept created with storm light, mountain scale and a surreal wolf silhouette for a bold launch visual.",
    tags: ["Fragrance", "Photo Manipulation", "Concept Art"],
    size: "wide",
    objectPosition: "center center",
  },
  {
    id: "jack-daniels",
    title: "Jack Daniel's / Make It Count",
    category: "Advertising",
    year: "2026",
    role: "Product Campaign Design",
    image: jackDaniels,
    accent: "#c48b42",
    description:
      "A moody, premium product composition using controlled lighting and structured information for a classic spirits aesthetic.",
    tags: ["Product Ad", "Lighting", "Typography"],
    size: "tall",
    objectPosition: "center center",
  },
  {
    id: "kingsman",
    title: "Kingsman / Fan Poster",
    category: "Poster Design",
    year: "2026",
    role: "Key Art Design",
    image: kingsman,
    accent: "#b91c1c",
    description:
      "A character-led theatrical poster with a split-fire concept, strong silhouette and controlled cinematic contrast.",
    tags: ["Movie Poster", "Key Art", "Compositing"],
    size: "tall",
    objectPosition: "center center",
  },
  {
    id: "fitness-editorial",
    title: "Men's Fitness",
    category: "Editorial",
    year: "2026",
    role: "Cover & Editorial Design",
    image: fitnessEditorial,
    accent: "#4d9d54",
    description:
      "A high-impact fitness cover with dense editorial hierarchy, performance-led callouts and strong shelf presence.",
    tags: ["Magazine Cover", "Editorial", "Typography"],
    size: "tall",
    objectPosition: "center center",
  },
  {
    id: "pizza-campaign",
    title: "Super Delicious Food",
    category: "Food Campaign",
    year: "2026",
    role: "Campaign & Layout Design",
    image: pizzaCampaign,
    accent: "#f59e0b",
    description:
      "A detailed restaurant promotion balancing texture, offers, product scale and ordering information in one energetic system.",
    tags: ["Restaurant", "Poster", "Promotion"],
    size: "tall",
    objectPosition: "center center",
  },
];

export const categories = [
  "All",
  "Advertising",
  "Food Campaign",
  "Poster Design",
  "Editorial",
  "Brand Campaign",
  "Photo Manipulation",
];

export const projectImageUrls = projects.map((project) => project.image);
