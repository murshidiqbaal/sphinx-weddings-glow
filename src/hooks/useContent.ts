import { defaultContentMap } from "@/config/content";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export const useContent = () => {
    const [content, setContent] = useState<Record<string, string>>(defaultContentMap);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchContent = async () => {
            try {
                // Fetch Texts
                const { data: textsData } = await supabase.from("texts").select("field_key, field_value");

                // Fetch Images
                const { data: imagesData } = await supabase.from("images").select("field_key, image_url");

                if (mounted) {
                    const newContent = { ...defaultContentMap };

                    // Merge Texts
                    textsData?.forEach((item) => {
                        if (item.field_value) newContent[item.field_key] = item.field_value;
                    });

                    // Merge Images
                    imagesData?.forEach((item) => {
                        if (item.image_url) newContent[item.field_key] = item.image_url;
                    });

                    setContent(newContent);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching content:", error);
                if (mounted) setLoading(false);
            }
        };

        fetchContent();

        // Real-time subscriptions
        const textsSubscription = supabase
            .channel("public:texts")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "texts" },
                (payload) => {
                    const newData = payload.new as { field_key: string; field_value: string };
                    if (newData && newData.field_key) {
                        setContent((prev) => ({
                            ...prev,
                            [newData.field_key]: newData.field_value,
                        }));
                    }
                }
            )
            .subscribe();

        const imagesSubscription = supabase
            .channel("public:images")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "images" },
                (payload) => {
                    const newData = payload.new as { field_key: string; image_url: string };
                    if (newData && newData.field_key) {
                        setContent((prev) => ({
                            ...prev,
                            [newData.field_key]: newData.image_url,
                        }));
                    }
                }
            )
            .subscribe();

        return () => {
            mounted = false;
            supabase.removeChannel(textsSubscription);
            supabase.removeChannel(imagesSubscription);
        };
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
