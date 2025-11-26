import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { Edit2, Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface GalleryItem {
    id: string;
    image_url: string;
    created_at: string;
    title?: string;
    alt?: string;
    category?: string[];
}

const GalleryManager = () => {
    const [activeTab, setActiveTab] = useState("gallery");
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Edit State
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editAlt, setEditAlt] = useState("");
    const [editCategories, setEditCategories] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);

    const categories = ["weddings", "baptisms", "corporate"];

    useEffect(() => {
        fetchGallery(activeTab);
    }, [activeTab]);

    const fetchGallery = async (table: string) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from(table)
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error(`Error fetching ${table}:`, error);
            toast.error(`Failed to load ${table} images`);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const fileExt = file.name.split(".").pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${activeTab}-images/${fileName}`;

                // Upload to Storage
                const { error: uploadError } = await supabase.storage
                    .from("gallery-images")
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                // Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from("gallery-images")
                    .getPublicUrl(filePath);

                // Insert into Database
                const { error: dbError } = await supabase
                    .from(activeTab)
                    .insert({ image_url: publicUrl });

                if (dbError) throw dbError;
            });

            await Promise.all(uploadPromises);
            toast.success("Images uploaded successfully");
            fetchGallery(activeTab); // Refresh list
        } catch (error: any) {
            console.error("Error uploading images:", error);
            toast.error(`Failed to upload: ${error.message || "Unknown error"}`);
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = "";
        }
    };

    const handleDelete = async (id: string, imageUrl: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            // Delete from Database
            const { error: dbError } = await supabase
                .from(activeTab)
                .delete()
                .eq("id", id);

            if (dbError) throw dbError;

            setImages((prev) => prev.filter((img) => img.id !== id));
            toast.success("Image deleted");
        } catch (error) {
            console.error("Error deleting image:", error);
            toast.error("Failed to delete image");
        }
    };

    const openEditDialog = (item: GalleryItem) => {
        setEditingItem(item);
        setEditTitle(item.title || "");
        setEditAlt(item.alt || "");
        setEditCategories(item.category || []);
    };

    const handleUpdate = async () => {
        if (!editingItem) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from(activeTab)
                .update({
                    title: editTitle,
                    alt: editAlt,
                    category: editCategories
                })
                .eq("id", editingItem.id);

            if (error) throw error;

            toast.success("Image details updated");
            setEditingItem(null);
            fetchGallery(activeTab);
        } catch (error) {
            console.error("Error updating image:", error);
            toast.error("Failed to update image details");
        } finally {
            setSaving(false);
        }
    };

    const toggleCategory = (category: string) => {
        setEditCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900">Gallery Manager</h2>
                <p className="text-gray-500 mt-2">Manage photo collections for different sections.</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
                    <TabsTrigger value="gallery">Main Gallery</TabsTrigger>
                    <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
                    <TabsTrigger value="night">Night Events</TabsTrigger>
                </TabsList>

                <div className="flex justify-end mb-6">
                    <div className="relative">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleUpload}
                            className="hidden"
                            id="gallery-upload"
                            disabled={uploading}
                        />
                        <Button
                            asChild
                            className="bg-sage hover:bg-sage/90 text-white cursor-pointer"
                            disabled={uploading}
                        >
                            <label htmlFor="gallery-upload">
                                {uploading ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                    <Plus className="h-4 w-4 mr-2" />
                                )}
                                {uploading ? "Uploading..." : "Add Images"}
                            </label>
                        </Button>
                    </div>
                </div>

                <TabsContent value={activeTab} className="mt-0">
                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="h-8 w-8 animate-spin text-sage" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((img) => (
                                <Card key={img.id} className="group relative overflow-hidden">
                                    <CardContent className="p-0 aspect-square">
                                        <img
                                            src={img.image_url}
                                            alt={img.alt || "Gallery item"}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                            <Dialog open={editingItem?.id === img.id} onOpenChange={(open) => !open && setEditingItem(null)}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="secondary"
                                                        size="icon"
                                                        className="rounded-full"
                                                        onClick={() => openEditDialog(img)}
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Image Details</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <div className="space-y-2">
                                                            <Label>Title</Label>
                                                            <Input
                                                                value={editTitle}
                                                                onChange={(e) => setEditTitle(e.target.value)}
                                                                placeholder="Image Title"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Alt Text</Label>
                                                            <Input
                                                                value={editAlt}
                                                                onChange={(e) => setEditAlt(e.target.value)}
                                                                placeholder="Descriptive text for accessibility"
                                                            />
                                                        </div>
                                                        {activeTab === "gallery" && (
                                                            <div className="space-y-2">
                                                                <Label>Categories</Label>
                                                                <div className="flex flex-wrap gap-4">
                                                                    {categories.map(cat => (
                                                                        <div key={cat} className="flex items-center space-x-2">
                                                                            <Checkbox
                                                                                id={cat}
                                                                                checked={editCategories.includes(cat)}
                                                                                onCheckedChange={() => toggleCategory(cat)}
                                                                            />
                                                                            <Label htmlFor={cat} className="capitalize cursor-pointer">{cat}</Label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <Button
                                                            onClick={handleUpdate}
                                                            disabled={saving}
                                                            className="w-full bg-sage hover:bg-sage/90"
                                                        >
                                                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                            Save Changes
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDelete(img.id, img.image_url)}
                                                className="rounded-full"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {images.length === 0 && (
                                <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed">
                                    <p className="text-gray-500">No images in this gallery.</p>
                                </div>
                            )}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default GalleryManager;
