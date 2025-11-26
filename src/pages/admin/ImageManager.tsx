import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { Loader2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ImageItem {
    id: string;
    section_name: string;
    field_key: string;
    image_url: string;
}

const ImageManager = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState<string | null>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const { data, error } = await supabase
                .from("images")
                .select("*")
                .order("section_name", { ascending: true });

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error("Error fetching images:", error);
            toast.error("Failed to load images");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (item: ImageItem, file: File) => {
        setUploading(item.id);
        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${item.field_key}-${Date.now()}.${fileExt}`;
            const filePath = `site-images/${fileName}`;

            // Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from("site-images")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from("site-images")
                .getPublicUrl(filePath);

            // Update Database
            const { error: dbError } = await supabase
                .from("images")
                .update({ image_url: publicUrl })
                .eq("id", item.id);

            if (dbError) throw dbError;

            // Update Local State
            setImages((prev) =>
                prev.map((img) => (img.id === item.id ? { ...img, image_url: publicUrl } : img))
            );

            toast.success("Image updated successfully");
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image");
        } finally {
            setUploading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-sage" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900">Site Images</h2>
                <p className="text-gray-500 mt-2">Manage static images across the site.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {images.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                {item.field_key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative border">
                                {item.image_url ? (
                                    <img
                                        src={item.image_url}
                                        alt={item.field_key}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFileUpload(item, file);
                                    }}
                                    disabled={uploading === item.id}
                                    className="hidden"
                                    id={`upload-${item.id}`}
                                />
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full cursor-pointer"
                                    disabled={uploading === item.id}
                                >
                                    <label htmlFor={`upload-${item.id}`}>
                                        {uploading === item.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        ) : (
                                            <Upload className="h-4 w-4 mr-2" />
                                        )}
                                        {uploading === item.id ? "Uploading..." : "Replace Image"}
                                    </label>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {images.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                    <p className="text-gray-500">No images found in the database.</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Run the migration script or manually add entries to the 'images' table.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ImageManager;
