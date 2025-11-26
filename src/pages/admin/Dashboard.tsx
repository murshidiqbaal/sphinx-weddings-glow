import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Image as ImageIcon, Type } from "lucide-react";

const Dashboard = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-500 mt-2">Welcome to your content management system.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Text Sections</CardTitle>
                        <Type className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Manage</div>
                        <p className="text-xs text-muted-foreground">
                            Edit website content
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Site Images</CardTitle>
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Update</div>
                        <p className="text-xs text-muted-foreground">
                            Change static images
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Galleries</CardTitle>
                        <Camera className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Curate</div>
                        <p className="text-xs text-muted-foreground">
                            Manage photo collections
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Quick action buttons can go here */}
                    <p className="text-sm text-gray-500">Select a category from the sidebar to start editing.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
