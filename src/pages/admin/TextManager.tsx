import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

interface TextItem {
    id: string;
    section_name: string;
    field_key: string;
    field_value: string;
}

const TextManager = () => {
    const [texts, setTexts] = useState<TextItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);

    useEffect(() => {
        fetchTexts();
    }, []);

    const fetchTexts = async () => {
        try {
            const { data, error } = await supabase
                .from("texts")
                .select("*")
                .order("section_name", { ascending: true });

            if (error) throw error;
            setTexts(data || []);
        } catch (error) {
            console.error("Error fetching texts:", error);
            toast.error("Failed to load text content");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (item: TextItem) => {
        setSaving(item.id);
        try {
            const { error } = await supabase
                .from("texts")
                .upsert({
                    id: item.id,
                    section_name: item.section_name,
                    field_key: item.field_key,
                    field_value: item.field_value,
                });

            if (error) throw error;
            toast.success("Text updated successfully");
        } catch (error) {
            console.error("Error saving text:", error);
            toast.error("Failed to save changes");
        } finally {
            setSaving(null);
        }
    };

    const handleChange = (id: string, value: string) => {
        setTexts((prev) =>
            prev.map((item) => (item.id === id ? { ...item, field_value: value } : item))
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-sage" />
            </div>
        );
    }

    // Group by section
    const groupedTexts = texts.reduce((acc, item) => {
        if (!acc[item.section_name]) acc[item.section_name] = [];
        acc[item.section_name].push(item);
        return acc;
    }, {} as Record<string, TextItem[]>);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-sans font-bold text-gray-900">Text Content</h2>
                <p className="text-gray-500 mt-2">Manage website text sections.</p>
            </div>

            {Object.entries(groupedTexts).map(([section, items]) => (
                <Card key={section}>
                    <CardHeader>
                        <CardTitle className="capitalize">{section} Section</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {items.map((item) => (
                            <div key={item.id} className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">
                                    {item.field_key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                </label>
                                <div className="bg-white">
                                    <ReactQuill
                                        theme="snow"
                                        value={item.field_value || ""}
                                        onChange={(val) => handleChange(item.id, val)}
                                        modules={{
                                            toolbar: [
                                                ["bold", "italic", "underline"],
                                                [{ list: "ordered" }, { list: "bullet" }],
                                                ["clean"],
                                            ],
                                        }}
                                    />
                                </div>
                                <div className="flex justify-end mt-2">
                                    <Button
                                        size="sm"
                                        onClick={() => handleSave(item)}
                                        disabled={saving === item.id}
                                        className="bg-sage hover:bg-sage/90 text-white"
                                    >
                                        {saving === item.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Save className="h-4 w-4 mr-2" />
                                        )}
                                        Save
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}

            {texts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                    <p className="text-gray-500">No text content found in the database.</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Run the migration script or manually add entries to the 'texts' table.
                    </p>
                </div>
            )}
        </div>
    );
};

export default TextManager;
