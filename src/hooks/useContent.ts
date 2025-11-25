import { defaultContentMap } from "@/config/content";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useContent = () => {
    const [content, setContent] = useState<Record<string, string>>(defaultContentMap);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            // Fallback to local storage if Firebase is not configured
            const localContent = localStorage.getItem("sphinxContent");
            if (localContent) {
                try {
                    const parsed = JSON.parse(localContent);
                    setContent((prev) => ({ ...prev, ...parsed }));
                } catch (e) {
                    console.error("Failed to parse local content", e);
                }
            }
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(db, "siteContent", "main"),
            (doc) => {
                if (doc.exists()) {
                    const data = doc.data() as Record<string, string>;
                    setContent((prev) => ({ ...prev, ...data }));
                }
                setLoading(false);
            },
            (error) => {
                console.error("Failed to subscribe to content updates:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const getText = (id: string) => {
        return content[id] || defaultContentMap[id] || "";
    };

    const getImage = (id: string) => {
        return content[id] || defaultContentMap[id] || "";
    };

    return {
        content,
        loading,
        getText,
        getImage,
    };
};
