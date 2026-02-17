import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { Edit2, Loader2, Plus, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    image_url: string;
    bio: string;
    created_at: string;
}

const TeamManager = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Edit/Add State
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        bio: "",
        image_url: "",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("team")
                .select("*")
                .order("created_at", { ascending: true });

            if (error) {
                // If table doesn't exist, we'll just show empty or let the user know
                if (error.code === '42P01' || error.message.includes('relation "team" does not exist')) {
                    setMembers([]);
                } else {
                    throw error;
                }
            } else {
                setMembers(data || []);
            }
        } catch (error) {
            console.error("Error fetching team members:", error);
            toast.error("Failed to load team members");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const bucketName = "site-images";

            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(`team/${fileName}`, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from(bucketName)
                .getPublicUrl(`team/${fileName}`);

            setFormData(prev => ({ ...prev, image_url: publicUrl }));
            toast.success("Image uploaded successfully");
        } catch (error: any) {
            console.error("Error uploading image:", error);
            toast.error(`Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this team member?")) return;

        try {
            const { error } = await supabase
                .from("team")
                .delete()
                .eq("id", id);


            if (error) throw error;

            setMembers((prev) => prev.filter((m) => m.id !== id));
            toast.success("Team member deleted");
        } catch (error) {
            console.error("Error deleting member:", error);
            toast.error("Failed to delete team member");
        }
    };

    const openAddDialog = () => {
        setEditingMember(null);
        setFormData({
            name: "",
            role: "",
            bio: "",
            image_url: "",
        });
        setIsDialogOpen(true);
    };

    const openEditDialog = (member: TeamMember) => {
        setEditingMember(member);
        setFormData({
            name: member.name || "",
            role: member.role || "",
            bio: member.bio || "",
            image_url: member.image_url || "",
        });
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.role) {
            toast.error("Name and Role are required");
            return;
        }

        setSaving(true);
        try {
            if (editingMember) {
                // Update
                const { error } = await supabase
                    .from("team")
                    .update({
                        name: formData.name,
                        role: formData.role,
                        bio: formData.bio,
                        image_url: formData.image_url,
                    })
                    .eq("id", editingMember.id);

                if (error) throw error;
                toast.success("Team member updated");
            } else {
                // Insert
                const { error } = await supabase
                    .from("team")
                    .insert({
                        name: formData.name,
                        role: formData.role,
                        bio: formData.bio,
                        image_url: formData.image_url,
                    });

                if (error) throw error;
                toast.success("Team member added");
            }

            setIsDialogOpen(false);
            fetchMembers();
        } catch (error: any) {
            console.error("Error saving team member:", error);
            toast.error(`Failed to save: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-sans font-bold text-gray-900">Team Manager</h2>
                <p className="text-gray-500 mt-2">Manage the "Meet the Team" section members.</p>
            </div>

            <div className="flex justify-end mb-6">
                <Button onClick={openAddDialog} className="bg-sage hover:bg-sage/90 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-sage" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member) => (
                        <Card key={member.id} className="group relative overflow-hidden">
                            <CardContent className="p-0">
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={member.image_url || "https://via.placeholder.com/400x400?text=No+Image"}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="rounded-full"
                                            onClick={() => openEditDialog(member)}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(member.id)}
                                            className="rounded-full"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-sans text-lg font-semibold text-primary">{member.name}</h3>
                                        <span className="text-[10px] uppercase tracking-widest text-[#d6bba3] font-bold">{member.role}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {members.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed">
                            <p className="text-gray-500">No team members found. Add one to get started.</p>
                        </div>
                    )}
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Zakaria Mohan"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Input
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                placeholder="e.g. Founder & Lead Planner"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Bio</Label>
                            <Textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Short biography..."
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Image</Label>
                            <div className="flex gap-4 items-center">
                                {formData.image_url && (
                                    <div className="w-16 h-16 rounded-full overflow-hidden border">
                                        <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="relative flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="member-image-upload"
                                        disabled={uploading}
                                    />
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full cursor-pointer"
                                        disabled={uploading}
                                    >
                                        <label htmlFor="member-image-upload">
                                            {uploading ? (
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            ) : (
                                                <Upload className="h-4 w-4 mr-2" />
                                            )}
                                            {uploading ? "Uploading..." : "Upload Photo"}
                                        </label>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={saving || uploading}
                            className="w-full bg-sage hover:bg-sage/90 text-white"
                        >
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {editingMember ? "Update Member" : "Add Member"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TeamManager;
