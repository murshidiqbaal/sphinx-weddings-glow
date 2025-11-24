import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface SiteContentItem {
  id: string;
  value: string;
}

const collectionName = "siteContent";
const documentId = "main";

export const getContent = async (): Promise<SiteContentItem[]> => {
  if (!db) {
    console.warn("Firebase is not configured. Returning empty content set.");
    return [];
  }

  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return [];
    }

    const data = docSnap.data() as Record<string, string>;
    return Object.entries(data).map(([id, value]) => ({
      id,
      value,
    }));
  } catch (error) {
    console.error("Failed to fetch site content:", error);
    return [];
  }
};

export const getContentItem = async (id: string): Promise<SiteContentItem | undefined> => {
  const content = await getContent();
  return content.find((item) => item.id === id);
};

