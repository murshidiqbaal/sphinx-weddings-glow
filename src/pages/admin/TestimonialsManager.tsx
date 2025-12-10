import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { Edit2, Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TestimonialItem {
    id: number;
    name: string;
    type: string;
    initials: string;
    testimonial: string;
    created_at: string;
}

const TestimonialsManager = () => {
    const [items, setItems] = useState<TestimonialItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit/Add State
    const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        initials: "",
        testimonial: "",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("testimonials")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const { error } = await supabase
                .from("testimonials")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setItems((prev) => prev.filter((item) => item.id !== id));
            toast.success("Testimonial deleted");
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            toast.error("Failed to delete testimonial");
        }
    };

    const openAddDialog = () => {
        setEditingItem(null);
        setFormData({
            name: "",
            type: "",
            initials: "",
            testimonial: "",
        });
        setIsDialogOpen(true);
    };

    const openEditDialog = (item: TestimonialItem) => {
        setEditingItem(item);
        setFormData({
            name: item.name || "",
            type: item.type || "",
            initials: item.initials || "",
            testimonial: item.testimonial || "",
        });
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editingItem) {
                // Update
                const { error } = await supabase
                    .from("testimonials")
                    .update({
                        name: formData.name,
                        type: formData.type,
                        initials: formData.initials,
                        testimonial: formData.testimonial,
                    })
                    .eq("id", editingItem.id);

                if (error) throw error;
                toast.success("Testimonial updated");
            } else {
                // Insert
                const { error } = await supabase
                    .from("testimonials")
                    .insert({
                        name: formData.name,
                        type: formData.type,
                        initials: formData.initials,
                        testimonial: formData.testimonial,
                    });

                if (error) throw error;
                toast.success("Testimonial added");
            }

            setIsDialogOpen(false);
            fetchItems();
        } catch (error) {
            console.error("Error saving testimonial:", error);
            toast.error("Failed to save testimonial");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-sans font-bold text-gray-900">Testimonials Manager</h2>
                <p className="text-gray-500 mt-2">Manage client reviews and testimonials.</p>
            </div>

            <div className="flex justify-end mb-6">
                <Button onClick={openAddDialog} className="bg-sage hover:bg-sage/90 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Testimonial
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-sage" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <Card key={item.id} className="group relative">
                            <CardContent className="p-6">
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                                        onClick={() => openEditDialog(item)}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center text-white font-semibold text-lg mr-3 shadow-md">
                                        {item.initials}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-primary">{item.name}</h4>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.type}</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed italic text-justify">
                                    "{item.testimonial}"
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                    {items.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed">
                            <p className="text-gray-500">No testimonials found. Add one to get started.</p>
                        </div>
                    )}
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Sarah & Michael"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Initials</Label>
                                <Input
                                    value={formData.initials}
                                    onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
                                    placeholder="e.g. SM"
                                    maxLength={2}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Client Type</Label>
                            <Input
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                placeholder="e.g. Wedding Clients"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Testimonial</Label>
                            <Textarea
                                value={formData.testimonial}
                                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                                placeholder="Enter the testimonial text..."
                                rows={4}
                            />
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full bg-sage hover:bg-sage/90 text-white"
                        >
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {editingItem ? "Update Testimonial" : "Add Testimonial"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TestimonialsManager;
