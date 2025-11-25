import rings from "@/assets/imgs/IMG_6162.JPEG.jpg";
import { default as aboutImage, default as plannerConsultation } from "@/assets/imgs/IMG_6163.JPEG.jpg";
import weddingDetail from "@/assets/imgs/IMG_6166.JPEG.jpg";
import coupleHands from "@/assets/imgs/IMG_6172.JPEG.jpg";
import weddingAtmosphere from "@/assets/imgs/IMG_7428.JPG";
import bouquet from "@/assets/imgs/IMG_7448.JPG";
import weddingTable from "@/assets/imgs/IMG_7841.JPG";
import venueLights from "@/assets/imgs/IMG_7842.JPG";
import weddingCeremony from "@/assets/imgs/IMG_7843.JPG";

export type ContentType = "text" | "textarea" | "image";

export interface ContentItemDefinition {
  id: string;
  label: string;
  type: ContentType;
  defaultValue: string;
}

export const contentItems: ContentItemDefinition[] = [
  {
    id: "hero-title",
    label: "Hero Section Title",
    type: "text",
    defaultValue: "FOR THE LAID-BACK AND\nTHE WILDLY IN LOVE",
  },
  {
    id: "hero-subtitle",
    label: "Hero Section Subtitle",
    type: "text",
    defaultValue: "Because you deserve to preserve your memories, beautifully.",
  },
  {
    id: "hero-image",
    label: "Hero Section Background Image",
    type: "image",
    defaultValue: weddingCeremony,
  },
  {
    id: "intro-title",
    label: "Intro Section Title",
    type: "textarea",
    defaultValue:
      "IMAGINE HAVING A BEAUTIFULLY CRAFTED, TRULY EXCEPTIONAL CELEBRATION THAT PERFECTLY REFLECTS YOUR LOVE STORY",
  },
  {
    id: "intro-description",
    label: "Intro Section Description",
    type: "textarea",
    defaultValue:
      "As newly engaged couples, the excitement of wedding planning quickly turns into stress when juggling vendors, timelines, and endless details. That's where we come in—transforming your vision into reality with seamless coordination, thoughtful design, and expert guidance every step of the way.",
  },
  {
    id: "about-title",
    label: "About Section Title",
    type: "textarea",
    defaultValue:
      "UNIQUELY, YOU'RE LOOKING FOR A PLANNER WHO CAN HELP YOU FEEL AT EASE THROUGH EVERY STEP OF THE JOURNEY.",
  },
  {
    id: "about-image",
    label: "About Section Image",
    type: "image",
    defaultValue: aboutImage,
  },
  {
    id: "gallery-image-1",
    label: "Gallery Image 1 (Wedding Table)",
    type: "image",
    defaultValue: weddingTable,
  },
  {
    id: "gallery-image-2",
    label: "Gallery Image 2 (Couple Hands)",
    type: "image",
    defaultValue: 'src/assets/imgs/IMG',
  },
  {
    id: "gallery-image-3",
    label: "Gallery Image 3 (Bouquet)",
    type: "image",
    defaultValue: bouquet,
  },
  {
    id: "gallery-image-4",
    label: "Gallery Image 4 (Venue Lights)",
    type: "image",
    defaultValue: venueLights,
  },
  {
    id: "gallery-image-5",
    label: "Gallery Image 5 (Rings)",
    type: "image",
    defaultValue: rings,
  },
  {
    id: "gallery-image-6",
    label: "Gallery Image 6 (Planner Consultation)",
    type: "image",
    defaultValue: plannerConsultation,
  },
  {
    id: "contact-email",
    label: "Contact Email",
    type: "text",
    defaultValue: "sphinxweddings2025@gmail.com",
  },
  {
    id: "contact-phone",
    label: "Contact Phone",
    type: "text",
    defaultValue: "9072140083",
  },
  {
    id: "contact-address",
    label: "Contact Address",
    type: "textarea",
    defaultValue: "College Rd, near Ann theater, Kothamangalam, Kerala 686691",
  },
  // Wedding Section
  {
    id: "wedding-section-title",
    label: "Wedding Section Title",
    type: "textarea",
    defaultValue: "Perfectly Planned, \nBeautifully Executed",
  },
  {
    id: "wedding-vision-title",
    label: "The Vision Title",
    type: "text",
    defaultValue: "The Vision",
  },
  {
    id: "wedding-vision-desc",
    label: "The Vision Description",
    type: "textarea",
    defaultValue: "We believe that every love story deserves a setting as unique as the couple itself. Our process begins not with logistics, but with listening—understanding the nuances of your journey, your shared aesthetics, and the atmosphere you wish to cultivate. We don't just plan weddings; we curate experiences that feel authentically yours.",
  },
  {
    id: "wedding-process-title",
    label: "The Process Title",
    type: "text",
    defaultValue: "The Process",
  },
  {
    id: "wedding-process-desc",
    label: "The Process Description",
    type: "textarea",
    defaultValue: "From the initial concept board to the final floral arrangement, our approach is meticulous and collaborative. We handle the complexities of vendor management, timeline creation, and budget allocation with transparency and grace. This allows you to enjoy the creative aspects of planning without the weight of administrative stress. We are your advocates, your designers, and your peace of mind.",
  },
  {
    id: "wedding-celebration-title",
    label: "The Celebration Title",
    type: "text",
    defaultValue: "The Celebration",
  },
  {
    id: "wedding-celebration-desc",
    label: "The Celebration Description",
    type: "textarea",
    defaultValue: "On the day of, our presence is felt but rarely seen. We orchestrate the flow of events seamlessly, ensuring that you and your guests are immersed in the moment. From the quiet anticipation of the morning preparations to the last dance under the stars, we safeguard the magic of your celebration, allowing you to be fully present in the joy of your union.",
  },
  {
    id: "wedding-legacy-title",
    label: "The Legacy Title",
    type: "text",
    defaultValue: "The Legacy",
  },
  {
    id: "wedding-legacy-desc",
    label: "The Legacy Description",
    type: "textarea",
    defaultValue: "Long after the cake is cut and the flowers have faded, what remains are the memories of a day filled with love, laughter, and beauty. We take pride in creating timeless celebrations that you will look back on with fondness for decades to come. Your wedding is the first chapter of your new life together, and we are honored to help you write it beautifully.",
  },
  {
    id: "wedding-cta-button",
    label: "Wedding Section CTA Button",
    type: "text",
    defaultValue: "Start Your Journey",
  },
  {
    id: "wedding-image-tall",
    label: "Wedding Section Image (Tall)",
    type: "image",
    defaultValue: coupleHands,
  },
  {
    id: "wedding-image-stacked-1",
    label: "Wedding Section Image (Stacked Top)",
    type: "image",
    defaultValue: rings,
  },
  {
    id: "wedding-image-stacked-2",
    label: "Wedding Section Image (Stacked Bottom)",
    type: "image",
    defaultValue: weddingAtmosphere,
  },
  {
    id: "wedding-image-wide",
    label: "Wedding Section Image (Wide)",
    type: "image",
    defaultValue: weddingDetail,
  },
  // Gallery Page
  {
    id: "gallery-title",
    label: "Gallery Page Title",
    type: "text",
    defaultValue: "Gallery",
  },
  {
    id: "gallery-subtitle",
    label: "Gallery Page Subtitle",
    type: "text",
    defaultValue: "Explore our collection of beautifully curated celebrations",
  },
  // Outdoor Events Page
  {
    id: "outdoor-title",
    label: "Outdoor Events Title",
    type: "text",
    defaultValue: "Outdoor Events",
  },
  {
    id: "outdoor-subtitle",
    label: "Outdoor Events Subtitle",
    type: "text",
    defaultValue: "Celebrating under the open sky",
  },
  // Night Events Page
  {
    id: "night-title",
    label: "Night Events Title",
    type: "text",
    defaultValue: "Night Events",
  },
  {
    id: "night-subtitle",
    label: "Night Events Subtitle",
    type: "text",
    defaultValue: "Illuminated moments under the stars",
  },
  // Gallery Items (Sample set of 12 editable items)
  { id: "gallery-item-1-src", label: "Gallery Item 1 Image", type: "image", defaultValue: weddingCeremony },
  { id: "gallery-item-1-title", label: "Gallery Item 1 Title", type: "text", defaultValue: "Garden Ceremony" },
  { id: "gallery-item-2-src", label: "Gallery Item 2 Image", type: "image", defaultValue: weddingTable },
  { id: "gallery-item-2-title", label: "Gallery Item 2 Title", type: "text", defaultValue: "Elegant Reception" },
  { id: "gallery-item-3-src", label: "Gallery Item 3 Image", type: "image", defaultValue: coupleHands },
  { id: "gallery-item-3-title", label: "Gallery Item 3 Title", type: "text", defaultValue: "Intimate Moments" },
  { id: "gallery-item-4-src", label: "Gallery Item 4 Image", type: "image", defaultValue: bouquet },
  { id: "gallery-item-4-title", label: "Gallery Item 4 Title", type: "text", defaultValue: "Floral Artistry" },
  { id: "gallery-item-5-src", label: "Gallery Item 5 Image", type: "image", defaultValue: venueLights },
  { id: "gallery-item-5-title", label: "Gallery Item 5 Title", type: "text", defaultValue: "Evening Ambiance" },
  { id: "gallery-item-6-src", label: "Gallery Item 6 Image", type: "image", defaultValue: rings },
  { id: "gallery-item-6-title", label: "Gallery Item 6 Title", type: "text", defaultValue: "Symbol of Love" },
  { id: "gallery-item-7-src", label: "Gallery Item 7 Image", type: "image", defaultValue: plannerConsultation },
  { id: "gallery-item-7-title", label: "Gallery Item 7 Title", type: "text", defaultValue: "Personal Consultation" },
  { id: "gallery-item-8-src", label: "Gallery Item 8 Image", type: "image", defaultValue: weddingTable },
  { id: "gallery-item-8-title", label: "Gallery Item 8 Title", type: "text", defaultValue: "Baptism Celebration" },
  { id: "gallery-item-9-src", label: "Gallery Item 9 Image", type: "image", defaultValue: venueLights },
  { id: "gallery-item-9-title", label: "Gallery Item 9 Title", type: "text", defaultValue: "Corporate Gala" },
  { id: "gallery-item-10-src", label: "Gallery Item 10 Image", type: "image", defaultValue: bouquet },
  { id: "gallery-item-10-title", label: "Gallery Item 10 Title", type: "text", defaultValue: "Delicate Blooms" },
  { id: "gallery-item-11-src", label: "Gallery Item 11 Image", type: "image", defaultValue: coupleHands },
  { id: "gallery-item-11-title", label: "Gallery Item 11 Title", type: "text", defaultValue: "Forever Yours" },
  { id: "gallery-item-12-src", label: "Gallery Item 12 Image", type: "image", defaultValue: weddingCeremony },
  { id: "gallery-item-12-title", label: "Gallery Item 12 Title", type: "text", defaultValue: "Vows Exchange" },
];

export const defaultContentMap = contentItems.reduce<Record<string, string>>((acc, item) => {
  acc[item.id] = item.defaultValue;
  return acc;
}, {});

