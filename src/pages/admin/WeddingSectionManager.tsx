import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Edit2, Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface WeddingMomentItem {
    id: number;
    image_url: string;
    caption: string;
    created_at: string;
}

const WeddingSectionManager = () => {
    const [items, setItems] = useState<WeddingMomentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Edit/Add State
    const [editingItem, setEditingItem] = useState<WeddingMomentItem | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        caption: "",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("wedding_moments")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (error) {
            console.error("Error fetching wedding moments:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        try {
            const file = files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

            // Upload to Storage
            const bucketName = "wedding_moments";
            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucketName)
                .getPublicUrl(fileName);

            // Insert into Database with default text
            const { error: dbError } = await supabase
                .from("wedding_moments")
                .insert({
                    image_url: publicUrl,
                    caption: "New Moment",
                });

            if (dbError) throw dbError;

            toast.success("Image uploaded successfully");
            fetchItems();
        } catch (error: any) {
            console.error("Error uploading image:", error);
            toast.error(`Failed to upload: ${error.message || "Unknown error"}`);
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this moment?")) return;

        try {
            const { error } = await supabase
                .from("wedding_moments")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setItems((prev) => prev.filter((item) => item.id !== id));
            toast.success("Moment deleted");
        } catch (error) {
            console.error("Error deleting moment:", error);
            toast.error("Failed to delete moment");
        }
    };

    const openEditDialog = (item: WeddingMomentItem) => {
        setEditingItem(item);
        setFormData({
            caption: item.caption || "",
        });
        setIsDialogOpen(true);
    };

    const handleUpdate = async () => {
        if (!editingItem) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from("wedding_moments")
                .update({
                    caption: formData.caption,
                })
                .eq("id", editingItem.id);

            if (error) throw error;

            toast.success("Moment updated");
            setIsDialogOpen(false);
            setEditingItem(null);
            fetchItems();
        } catch (error) {
            console.error("Error updating moment:", error);
            toast.error("Failed to update moment");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-sans font-bold text-gray-900">Wedding Section Manager</h2>
                <p className="text-gray-500 mt-2">Manage the images and captions for the "We're getting married" marquee.</p>
            </div>

            <div className="flex justify-end mb-6">
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="hidden"
                        id="wedding-moment-upload"
                        disabled={uploading}
                    />
                    <Button
                        asChild
                        className="bg-sage hover:bg-sage/90 text-white cursor-pointer"
                        disabled={uploading}
                    >
                        <label htmlFor="wedding-moment-upload">
                            {uploading ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                                <Plus className="h-4 w-4 mr-2" />
                            )}
                            {uploading ? "Uploading..." : "Add New Moment"}
                        </label>
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-sage" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <Card key={item.id} className="group relative overflow-hidden">
                            <CardContent className="p-0">
                                <div className="aspect-[4/5] overflow-hidden relative">
                                    <img
                                        src={item.image_url}
                                        alt={item.caption}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="rounded-full"
                                            onClick={() => openEditDialog(item)}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(item.id)}
                                            className="rounded-full"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-4 space-y-2">
                                    <h3 className="font-sans text-lg font-semibold text-primary">{item.caption}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {items.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed">
                            <p className="text-gray-500">No wedding moments added yet.</p>
                        </div>
                    )}
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Moment Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Caption</Label>
                            <Input
                                value={formData.caption}
                                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                                placeholder="e.g. Moment #1"
                            />
                        </div>
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
        </div>
    );
};

export default WeddingSectionManager;
