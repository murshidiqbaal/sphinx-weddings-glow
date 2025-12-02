import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Camera, Image as ImageIcon, LayoutDashboard, Loader2, Type } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [stats, setStats] = useState({
        galleryCount: 0,
        recentWorksCount: 0,
        weddingMomentsCount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { count: galleryCount } = await supabase
                    .from("gallery_images")
                    .select("*", { count: "exact", head: true });

                const { count: recentWorksCount } = await supabase
                    .from("recent_works")
                    .select("*", { count: "exact", head: true });

                const { count: weddingMomentsCount } = await supabase
                    .from("wedding_moments")
                    .select("*", { count: "exact", head: true });

                setStats({
                    galleryCount: galleryCount || 0,
                    recentWorksCount: recentWorksCount || 0,
                    weddingMomentsCount: weddingMomentsCount || 0,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const quickActions = [
        {
            title: "Manage Gallery",
            icon: <Camera className="w-4 h-4" />,
            path: "/admin/gallery",
            description: "Add or remove photos from the main gallery",
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Recent Works",
            icon: <LayoutDashboard className="w-4 h-4" />,
            path: "/admin/recent-works",
            description: "Update the recent works carousel",
            color: "bg-purple-50 text-purple-600",
        },
        {
            title: "Wedding Section",
            icon: <LayoutDashboard className="w-4 h-4" />,
            path: "/admin/wedding-section",
            description: "Edit the 'We're getting married' marquee",
            color: "bg-pink-50 text-pink-600",
        },
        {
            title: "Text Content",
            icon: <Type className="w-4 h-4" />,
            path: "/admin/texts",
            description: "Edit website titles and descriptions",
            color: "bg-green-50 text-green-600",
        },
        {
            title: "Site Images",
            icon: <ImageIcon className="w-4 h-4" />,
            path: "/admin/images",
            description: "Update static site images",
            color: "bg-orange-50 text-orange-600",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-sans font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-500 mt-2">Welcome to your content management system.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Gallery Images</CardTitle>
                        <Camera className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : stats.galleryCount}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Photos across all categories
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recent Works</CardTitle>
                        <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : stats.recentWorksCount}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Projects in the carousel
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Wedding Moments</CardTitle>
                        <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : stats.weddingMomentsCount}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Images in the marquee
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {quickActions.map((action) => (
                        <Link key={action.path} to={action.path}>
                            <div className="group flex items-start gap-4 p-4 rounded-lg border hover:border-sage/50 hover:bg-sage/5 transition-all cursor-pointer h-full">
                                <div className={`p-2 rounded-md ${action.color}`}>
                                    {action.icon}
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 group-hover:text-sage transition-colors">
                                        {action.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {action.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
