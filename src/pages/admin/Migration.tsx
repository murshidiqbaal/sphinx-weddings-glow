import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contentItems } from "@/config/content";
import { supabase } from "@/lib/supabase";
import { Loader2, Play } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Migration = () => {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
    };

    const getSectionName = (id: string) => {
        if (id.startsWith("hero-")) return "hero";
        if (id.startsWith("intro-")) return "intro";
        if (id.startsWith("about-")) return "about";
        if (id.startsWith("gallery-")) return "gallery";
        if (id.startsWith("contact-")) return "contact";
        if (id.startsWith("wedding-")) return "wedding";
        if (id.startsWith("outdoor-")) return "outdoor";
        if (id.startsWith("night-")) return "night";
        return "other";
    };

    const handleMigration = async () => {
        setLoading(true);
        setLogs([]);
        addLog("Starting migration...");

        try {
            for (const item of contentItems) {
                const section = getSectionName(item.id);

                if (item.type === "image") {
                    addLog(`Processing image: ${item.id}`);

                    // For images, we need to fetch the blob and upload it
                    try {
                        const response = await fetch(item.defaultValue);
                        const blob = await response.blob();
                        const fileName = `${section}/${item.id}.jpg`;

                        const { error: uploadError } = await supabase.storage
                            .from("site-images")
                            .upload(fileName, blob, {
                                upsert: true,
                                contentType: blob.type
                            });

                        if (uploadError) {
                            addLog(`Error uploading ${item.id}: ${uploadError.message}`);
                            continue;
                        }

                        const { data: { publicUrl } } = supabase.storage
                            .from("site-images")
                            .getPublicUrl(fileName);

                        // Insert into images table
                        const { error: dbError } = await supabase
                            .from("images")
                            .upsert({
                                section_name: section,
                                field_key: item.id,
                                image_url: publicUrl
                            }, { onConflict: 'field_key' });

                        if (dbError) {
                            addLog(`Error saving to DB ${item.id}: ${dbError.message}`);
                        } else {
                            addLog(`Successfully migrated image: ${item.id}`);
                        }

                    } catch (err) {
                        addLog(`Failed to process image ${item.id}: ${err}`);
                    }
                } else {
                    // Handle text content
                    addLog(`Processing text: ${item.id}`);

                    const { error } = await supabase
                        .from("texts")
                        .upsert({
                            section_name: section,
                            field_key: item.id,
                            field_value: item.defaultValue
                        }, { onConflict: 'field_key' });

                    if (error) {
                        addLog(`Error saving text ${item.id}: ${error.message}`);
                    } else {
                        addLog(`Successfully migrated text: ${item.id}`);
                    }
                }
            }

            addLog("Migration completed!");
            toast.success("Migration completed successfully");
        } catch (error) {
            console.error("Migration failed:", error);
            addLog(`Critical error: ${error}`);
            toast.error("Migration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900">Content Migration</h2>
                <p className="text-gray-500 mt-2">Migrate local content to Supabase.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Migration Tool</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md text-sm text-yellow-800">
                        <p className="font-bold mb-1">Warning</p>
                        <p>This will overwrite existing content in Supabase with the default values from your local configuration. Ensure you have created the 'site-images' bucket in Supabase Storage before running.</p>
                    </div>

                    <Button
                        onClick={handleMigration}
                        disabled={loading}
                        className="bg-sage hover:bg-sage/90 text-white w-full sm:w-auto"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Migrating...
                            </>
                        ) : (
                            <>
                                <Play className="mr-2 h-4 w-4" />
                                Start Migration
                            </>
                        )}
                    </Button>

                    <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm h-96 overflow-y-auto">
                        {logs.length === 0 ? (
                            <span className="text-gray-500">Ready to start...</span>
                        ) : (
                            logs.map((log, index) => (
                                <div key={index} className="mb-1">
                                    {log}
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Migration;
