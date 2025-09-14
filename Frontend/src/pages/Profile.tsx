import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Store, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Shield,
  Edit3,
  Camera,
  Settings
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "राजेश कुमार",
    shopName: "कुमार किराना स्टोर",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@vyapaar.com",
    gstin: "27AABCU9603R1ZV",
    address: "मुख्य बाजार, नई दिल्ली - 110001",
    businessType: "Grocery Store",
    yearEstablished: "2015"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white dark:bg-card border-b border-border p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Profile</h1>
                  <p className="text-muted-foreground">Manage your account and business information</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-success-muted text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Verified
              </Badge>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                          {profileData.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8">
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <CardTitle className="text-xl">{profileData.name}</CardTitle>
                      <CardDescription className="text-lg">{profileData.shopName}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{profileData.businessType}</Badge>
                        <Badge variant="secondary">Since {profileData.yearEstablished}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={isEditing ? "success" : "outline"} 
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    className="gap-2"
                  >
                    {isEditing ? (
                      <>
                        <Shield className="w-4 h-4" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm bg-muted p-3 rounded-md">{profileData.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      ) : (
                        <p className="text-sm">{profileData.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      ) : (
                        <p className="text-sm">{profileData.email}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="w-5 h-5" />
                    Business Information
                  </CardTitle>
                  <CardDescription>Your shop and business details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shopName">Shop Name</Label>
                    {isEditing ? (
                      <Input
                        id="shopName"
                        value={profileData.shopName}
                        onChange={(e) => handleInputChange('shopName', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm bg-muted p-3 rounded-md">{profileData.shopName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gstin">GSTIN</Label>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          id="gstin"
                          value={profileData.gstin}
                          onChange={(e) => handleInputChange('gstin', e.target.value)}
                        />
                      ) : (
                        <p className="text-sm font-mono">{profileData.gstin}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Shop Address</Label>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                      {isEditing ? (
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                      ) : (
                        <p className="text-sm">{profileData.address}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Settings & Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Preferences & Settings
                </CardTitle>
                <CardDescription>Manage your app preferences and notification settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Language</h4>
                    <p className="text-sm text-muted-foreground mb-3">Choose your preferred language</p>
                    <Badge variant="outline">Hindi + English</Badge>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Notifications</h4>
                    <p className="text-sm text-muted-foreground mb-3">WhatsApp & SMS alerts</p>
                    <Badge variant="outline" className="bg-success-muted text-success">Enabled</Badge>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Voice Commands</h4>
                    <p className="text-sm text-muted-foreground mb-3">Voice-to-text features</p>
                    <Badge variant="outline" className="bg-primary-muted text-primary">Active</Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">Export Data</Button>
                  <Button variant="outline">Download Backup</Button>
                  <Button variant="outline">Privacy Settings</Button>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Profile;