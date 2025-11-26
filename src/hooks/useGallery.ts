import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export interface GalleryItem {
    id: string;
    image_url: string;
    created_at: string;
    title?: string;
    alt?: string;
    category?: string[];
}

export const useGallery = (tableName: string) => {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchImages = async () => {
            try {
                const { data, error } = await supabase
                    .from(tableName)
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;

                if (mounted) {
                    setImages(data || []);
                    setLoading(false);
                }
            } catch (error) {
                console.error(`Error fetching ${tableName}:`, error);
                if (mounted) setLoading(false);
            }
        };

        fetchImages();

        // Real-time subscription
        const subscription = supabase
            .channel(`public:${tableName}`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: tableName },
                (payload) => {
                    if (payload.eventType === "INSERT") {
                        setImages((prev) => [payload.new as GalleryItem, ...prev]);
                    } else if (payload.eventType === "DELETE") {
                        setImages((prev) => prev.filter((img) => img.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            mounted = false;
            supabase.removeChannel(subscription);
        };
    }, [tableName]);

    return { images, loading };
};
