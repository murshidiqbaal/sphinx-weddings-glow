import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import {
    Camera,
    Image as ImageIcon,
    LayoutDashboard,
    LogOut,
    Menu,
    Type,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        document.body.classList.add("admin-mode");
        return () => document.body.classList.remove("admin-mode");
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem("sphinx_admin_auth");
        navigate("/admin/login");
    };

    const navItems = [
        { path: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { path: "/admin/texts", label: "Text Content", icon: <Type size={20} /> },
        { path: "/admin/images", label: "Site Images", icon: <ImageIcon size={20} /> },
        { path: "/admin/gallery", label: "Gallery Manager", icon: <Camera size={20} /> },
        { path: "/admin/recent-works", label: "Recent Works", icon: <LayoutDashboard size={20} /> },
        { path: "/admin/wedding-section", label: "Wedding Section", icon: <LayoutDashboard size={20} /> },
        { path: "/admin/testimonials", label: "Testimonials", icon: <LayoutDashboard size={20} /> },
        { path: "/admin/team", label: "Team Manager", icon: <LayoutDashboard size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                    <h1 className="text-xl font-sans font-bold text-primary">Admin Panel</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                ? "bg-sage/10 text-sage font-medium"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout}
                    >
                        <LogOut size={20} />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-4 font-sans font-bold text-primary">Admin Panel</span>
                </header>

                <div className="flex-1 overflow-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
