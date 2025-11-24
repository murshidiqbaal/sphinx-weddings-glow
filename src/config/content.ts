import bouquet from "@/assets/bouquet.jpg";
import coupleHands from "@/assets/couple-hands.jpg";
import rings from "@/assets/imgs/IMG_6162.JPEG.jpg";
import plannerConsultation from "@/assets/imgs/IMG_6163.JPEG.jpg";
import venueLights from "@/assets/imgs/IMG_6166.JPEG.jpg";
import weddingTable from "@/assets/imgs/IMG_6172.JPEG.jpg";
import aboutImage from "@/assets/planner-consultation.jpg";
import heroImage from "@/assets/wedding-ceremony.jpg";

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
    defaultValue: heroImage,
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
    defaultValue: coupleHands,
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
];

export const defaultContentMap = contentItems.reduce<Record<string, string>>((acc, item) => {
  acc[item.id] = item.defaultValue;
  return acc;
}, {});

