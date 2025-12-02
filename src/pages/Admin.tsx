import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContentItemDefinition, contentItems } from "@/config/content";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Loader2, LogOut, Save, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type EditableContentItem = ContentItemDefinition & { value: string };

const collectionName = "siteContent";
const documentId = "main";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("admin123");
  const [firestoreDb] = useState(db);
  const [content, setContent] = useState<EditableContentItem[]>(
    () =>
      contentItems.map((item) => ({
        ...item,
        value: item.defaultValue,
      }))
  );
  const [savedMessage, setSavedMessage] = useState("");
  const [loadingContent, setLoadingContent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImageId, setUploadingImageId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("adminAuthenticated");
    if (stored === "true") {
      setIsAuthenticated(true);
    }

    const savedContent = localStorage.getItem("sphinxContent");
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        if (Array.isArray(parsed)) {
          setContent(parsed);
        } else {
          applyContentMap(parsed);
        }
      } catch (error) {
        console.error("Failed to parse local content", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!firestoreDb) {
      return;
    }

    const fetchContent = async () => {
      setLoadingContent(true);
      try {
        const docRef = doc(firestoreDb, collectionName, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          applyContentMap(docSnap.data());
        }
      } catch (error) {
        console.error("Failed to load content", error);
        setSavedMessage("Failed to load content from Firebase.");
      } finally {
        setLoadingContent(false);
      }
    };

    fetchContent();
  }, [firestoreDb]);

  const applyContentMap = (data: Record<string, string>) => {
    setContent((prev) =>
      prev.map((item) => ({
        ...item,
        value: data[item.id] ?? item.value,
      }))
    );
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      setPassword("");
      setSavedMessage("Logged in successfully!");
    } else {
      setSavedMessage("Incorrect password!");
    }
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    navigate("/");
  };

  const handleContentChange = (id: string, value: string) => {
    setContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleSave = async () => {
    const payload = content.reduce<Record<string, string>>((acc, item) => {
      acc[item.id] = item.value;
      return acc;
    }, {});

    localStorage.setItem("sphinxContent", JSON.stringify(payload));

    if (!firestoreDb) {
      setSavedMessage("Saved locally. Configure Firebase to sync online.");
      setTimeout(() => setSavedMessage(""), 3000);
      return;
    }

    setSaving(true);
    try {
      const docRef = doc(firestoreDb, collectionName, documentId);
      await setDoc(docRef, payload, { merge: true });
      setSavedMessage("All changes saved successfully!");
    } catch (error) {
      console.error("Failed to save content", error);
      setSavedMessage("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setSavedMessage(""), 3000);
    }
  };

  const handleImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!storage) {
      setSavedMessage("Firebase storage is not configured.");
      setTimeout(() => setSavedMessage(""), 3000);
      return;
    }

    setUploadingImageId(id);
    try {
      const fileRef = ref(storage, `site-images/${id}-${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      handleContentChange(id, downloadURL);
      setSavedMessage("Image uploaded. Remember to save changes.");
    } catch (error) {
      console.error("Failed to upload image", error);
      setSavedMessage("Image upload failed. Please try again.");
    } finally {
      setUploadingImageId(null);
      setTimeout(() => setSavedMessage(""), 3000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-sans font-bold text-primary mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="bg-background"
              />
            </div>
            {savedMessage && (
              <p
                className={`text-sm ${savedMessage.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                  }`}
              >
                {savedMessage}
              </p>
            )}
            <Button type="submit" className="w-full bg-sage hover:bg-sage/90">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-forest text-white backdrop-blur-sm border-b border-forest/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-sans font-bold">Admin Panel</h1>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-white hover:text-white/80"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-sans font-bold text-primary mb-8">
              Edit Content
            </h2>

            {savedMessage && (
              <div
                className={`mb-6 p-4 rounded-lg ${savedMessage.includes("successfully")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                  }`}
              >
                {savedMessage}
              </div>
            )}
            {loadingContent && (
              <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading latest content from Firebase...
              </div>
            )}

            <div className="space-y-8">
              {/* Text Content Section */}
              <div>
                <h3 className="text-xl font-sans font-bold text-primary mb-4 pb-2 border-b-2 border-sage">
                  Text Content
                </h3>
                <div className="space-y-6">
                  {content
                    .filter((item) => item.type === "text")
                    .map((item) => (
                      <div key={item.id} className="border-b border-sage/20 pb-4">
                        <label className="block text-sm font-semibold text-primary mb-2">
                          {item.label}
                        </label>
                        <Input
                          value={item.value}
                          onChange={(e) =>
                            handleContentChange(item.id, e.target.value)
                          }
                          className="bg-background"
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Textarea Content Section */}
              <div>
                <h3 className="text-xl font-sans font-bold text-primary mb-4 pb-2 border-b-2 border-sage">
                  Descriptions & Long Text
                </h3>
                <div className="space-y-6">
                  {content
                    .filter((item) => item.type === "textarea")
                    .map((item) => (
                      <div key={item.id} className="border-b border-sage/20 pb-4">
                        <label className="block text-sm font-semibold text-primary mb-2">
                          {item.label}
                        </label>
                        <Textarea
                          value={item.value}
                          onChange={(e) =>
                            handleContentChange(item.id, e.target.value)
                          }
                          rows={4}
                          className="bg-background"
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Image Content Section */}
              <div>
                <h3 className="text-xl font-sans font-bold text-primary mb-4 pb-2 border-b-2 border-sage">
                  Images
                </h3>
                <div className="space-y-6 grid md:grid-cols-2 gap-6">
                  {content
                    .filter((item) => item.type === "image")
                    .map((item) => (
                      <div key={item.id} className="border border-sage/20 p-4 rounded-lg">
                        <label className="block text-sm font-semibold text-primary mb-4">
                          {item.label}
                        </label>
                        <div className="space-y-2">
                          {item.value && (
                            <div className="mb-4">
                              <img
                                src={item.value}
                                alt={item.label}
                                className="max-w-full max-h-48 rounded-lg object-cover w-full"
                              />
                            </div>
                          )}
                          <label className="flex items-center gap-2 px-4 py-2 bg-sage hover:bg-sage/90 text-white rounded-lg cursor-pointer transition-colors justify-center">
                            {uploadingImageId === item.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            {uploadingImageId === item.id ? "Uploading..." : "Upload Image"}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(item.id, e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button onClick={handleSave} className="bg-sage hover:bg-sage/90 text-white gap-2 flex-1" disabled={saving}>
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? "Saving..." : "Save All Changes"}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1"
              >
                View Site
              </Button>
            </div>
          </div>

          {/* Password Management Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h3 className="text-xl font-sans font-bold text-primary mb-4">
              Security
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Current admin password: <code className="bg-gray-100 px-2 py-1 rounded">{adminPassword}</code>
            </p>
            <p className="text-xs text-muted-foreground">
              Note: To change the password, edit the adminPassword state in Admin.tsx
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
