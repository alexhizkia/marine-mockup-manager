
import { useState } from "react";
import { 
  Calendar, 
  Edit, 
  FileText, 
  Key, 
  Mail, 
  MapPin, 
  Phone, 
  Save, 
  Shield, 
  User 
} from "lucide-react";
import { useUser } from "@/App";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import AnimatedCard from "@/components/shared/AnimatedCard";

const Profile = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  
  // User profile data
  const [profileData, setProfileData] = useState({
    name: "Alex Morgan",
    email: "alex.morgan@ptpageo.com",
    phone: "+62 812 3456 7890",
    role: "Survey Engineer",
    department: "Field Operations",
    location: "Jakarta, Indonesia",
    bio: "Marine survey specialist with 5 years of experience in bathymetric mapping and offshore data collection. Certified in advanced underwater surveying techniques."
  });
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  
  // Handle save profile
  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };
  
  // Sample project history
  const projectHistory = [
    { id: "1", name: "Sulawesi Offshore Mapping", role: "Lead Surveyor", period: "Sep 2023 - Present" },
    { id: "2", name: "Jakarta Bay Environmental Report", role: "Data Analyst", period: "Aug 2023 - Sep 2023" },
    { id: "3", name: "Bali Coastal Erosion Study", role: "Field Technician", period: "May 2023 - Jul 2023" },
    { id: "4", name: "Kalimantan Seabed Assessment", role: "Survey Engineer", period: "Feb 2023 - Apr 2023" }
  ];
  
  // Sample certifications
  const certifications = [
    { id: "1", name: "Advanced Marine Surveying", issuer: "International Marine Survey Association", date: "2022", expires: "2025" },
    { id: "2", name: "Offshore Safety Certification", issuer: "Global Maritime Safety Council", date: "2021", expires: "2024" },
    { id: "3", name: "Bathymetric Data Processing", issuer: "Ocean Data Institute", date: "2020", expires: "2023" }
  ];
  
  // Sample skills
  const skills = [
    "Bathymetric Mapping",
    "Multibeam Sonar",
    "Data Analysis",
    "GIS Software",
    "Underwater Surveying",
    "Technical Documentation",
    "Project Coordination",
    "Field Operations"
  ];

  return (
    <div className="page-transition space-y-6 pb-10">
      {/* Profile header */}
      <Card className="border-none shadow-none bg-marine-50 dark:bg-marine-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-marine-100 to-marine-50 dark:from-marine-900/40 dark:to-marine-900/10 z-0"></div>
        <CardContent className="p-6 md:p-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24 border-4 border-white dark:border-navy-800 shadow-md">
              <AvatarImage src={user?.avatar} alt={profileData.name} />
              <AvatarFallback className="text-2xl bg-marine-100 text-marine-800 dark:bg-marine-900/30 dark:text-marine-200">
                {profileData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{profileData.name}</h1>
                  <p className="text-muted-foreground">{profileData.role} • {profileData.department}</p>
                </div>
                <div className="mt-4 md:mt-0 flex justify-center md:justify-end">
                  {isEditing ? (
                    <Button className="btn-hover" onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  ) : (
                    <Button variant="outline" className="btn-hover" onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{profileData.location}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile tabs */}
      <Tabs defaultValue="overview" className="w-full animate-fadeIn">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        {/* Overview tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AnimatedCard title="About Me" animate="fadeIn">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={profileData.location}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          name="role"
                          value={profileData.role}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          name="department"
                          value={profileData.department}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">{profileData.bio}</p>
                )}
              </AnimatedCard>
              
              <AnimatedCard title="Project History" animate="fadeIn" delay="0.1s">
                <div className="space-y-4">
                  {projectHistory.map((project) => (
                    <div key={project.id} className="border-b border-gray-100 dark:border-navy-700 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.role}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {project.period}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            </div>
            
            <div className="space-y-6">
              <AnimatedCard title="Skills & Expertise" animate="fadeIn" delay="0.15s">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className="bg-marine-50 text-marine-800 dark:bg-marine-900/20 dark:text-marine-200 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                
                {isEditing && (
                  <Button variant="outline" className="w-full mt-4" onClick={() => toast.info("Skill management will be available in the next update.")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill
                  </Button>
                )}
              </AnimatedCard>
              
              <AnimatedCard title="Availability" animate="fadeIn" delay="0.25s">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      Available
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Upcoming Leave</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Dec 24 - Dec 31, 2023</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Project Allocation</span>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sulawesi Offshore Mapping</span>
                        <span className="font-medium">80%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-marine-500 rounded-full" 
                          style={{ width: '80%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between text-sm">
                        <span>Training & Development</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full" 
                          style={{ width: '20%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </TabsContent>
        
        {/* Projects tab */}
        <TabsContent value="projects" className="space-y-6">
          <AnimatedCard title="Current Projects" animate="fadeIn" hover={false}>
            <div className="space-y-6">
              <Card className="overflow-hidden card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Sulawesi Offshore Mapping</CardTitle>
                      <CardDescription>Lead Surveyor • Sep 2023 - Present</CardDescription>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-marine-100 text-marine-800 dark:bg-marine-900/30 dark:text-marine-300">
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-marine-500"></span>
                      In Progress
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive seabed mapping and bathymetric survey for offshore oil platform deployment in North Sulawesi.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-marine-500 rounded-full" 
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 dark:border-navy-700">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback className="text-xs bg-marine-100 text-marine-800 dark:bg-marine-900/20 dark:text-marine-200">
                          AR
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">Ahmad Rizal (Manager)</span>
                    </div>
                    <Button size="sm">
                      View Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden card-hover opacity-60">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Jakarta Bay Environmental Report</CardTitle>
                      <CardDescription>Data Analyst • Aug 2023 - Sep 2023</CardDescription>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Completed
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive environmental assessment of Jakarta Bay, including water quality, sediment analysis, and marine life survey.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 dark:border-navy-700">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback className="text-xs bg-marine-100 text-marine-800 dark:bg-marine-900/20 dark:text-marine-200">
                          BS
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">Budi Santoso (Manager)</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedCard>
          
          <AnimatedCard title="Historical Project Performance" animate="fadeIn" delay="0.1s" hover={false}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Projects Completed</p>
                        <p className="text-2xl font-semibold">12</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-marine-100 dark:bg-marine-900/20 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-marine-600 dark:text-marine-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">On-Time Completion</p>
                        <p className="text-2xl font-semibold">92%</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-green-600 dark:text-green-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                        <p className="text-2xl font-semibold">4.8/5</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l border-gray-200 dark:border-navy-700 space-y-6">
                    {projectHistory.map((project, index) => (
                      <div key={project.id} className="relative">
                        <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-marine-100 border-2 border-marine-500 dark:bg-marine-900/30"></div>
                        <div className={`${index === 0 ? "text-marine-600 dark:text-marine-300 font-medium" : "text-muted-foreground"}`}>
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm">{project.role}</p>
                          <p className="text-xs">{project.period}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedCard>
        </TabsContent>
        
        {/* Qualifications tab */}
        <TabsContent value="qualifications" className="space-y-6">
          <AnimatedCard title="Certifications" animate="fadeIn" hover={false}>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <Card key={cert.id} className="overflow-hidden card-hover">
                  <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-medium">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                      <div className="flex items-center mt-1">
                        <p className="text-xs text-muted-foreground">Issued: {cert.date}</p>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">Expires: {cert.expires}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6">
              <Button variant="outline" onClick={() => toast.info("Certificate upload will be available in the next update.")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </div>
          </AnimatedCard>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedCard title="Education" animate="fadeIn" delay="0.1s" hover={false}>
              <div className="space-y-4">
                <div className="border-b border-gray-100 dark:border-navy-700 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium">Bachelor of Engineering, Marine Technology</h3>
                  <p className="text-sm text-muted-foreground">University of Indonesia</p>
                  <p className="text-xs text-muted-foreground">2014 - 2018</p>
                </div>
                
                <div className="border-b border-gray-100 dark:border-navy-700 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium">Advanced Diploma, Hydrographic Surveying</h3>
                  <p className="text-sm text-muted-foreground">Jakarta Maritime Institute</p>
                  <p className="text-xs text-muted-foreground">2018 - 2019</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" onClick={() => toast.info("Education management will be available in the next update.")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </div>
            </AnimatedCard>
            
            <AnimatedCard title="Training" animate="fadeIn" delay="0.2s" hover={false}>
              <div className="space-y-4">
                <div className="border-b border-gray-100 dark:border-navy-700 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium">Advanced Multibeam Sonar Operation</h3>
                  <p className="text-sm text-muted-foreground">Maritime Technology Solutions</p>
                  <p className="text-xs text-muted-foreground">January 2023</p>
                </div>
                
                <div className="border-b border-gray-100 dark:border-navy-700 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium">Marine Environmental Assessment</h3>
                  <p className="text-sm text-muted-foreground">Indonesian Environmental Agency</p>
                  <p className="text-xs text-muted-foreground">July 2022</p>
                </div>
                
                <div className="border-b border-gray-100 dark:border-navy-700 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium">Offshore Safety and Survival Training</h3>
                  <p className="text-sm text-muted-foreground">Global Maritime Safety Institute</p>
                  <p className="text-xs text-muted-foreground">March 2022</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" onClick={() => toast.info("Training management will be available in the next update.")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Training
                </Button>
              </div>
            </AnimatedCard>
          </div>
        </TabsContent>
        
        {/* Settings tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <AnimatedCard title="Account Settings" animate="fadeIn" hover={false}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="settings-email">Email Address</Label>
                      <Input id="settings-email" value={profileData.email} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="settings-phone">Phone Number</Label>
                      <Input id="settings-phone" value={profileData.phone} readOnly />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="settings-name">Full Name</Label>
                    <Input id="settings-name" value={profileData.name} readOnly />
                  </div>
                  
                  <div className="pt-2">
                    <Button onClick={() => toast.info("Account settings management will be available in the next update.")}>
                      Update Account Settings
                    </Button>
                  </div>
                </div>
              </AnimatedCard>
              
              <AnimatedCard title="Security" animate="fadeIn" delay="0.1s" hover={false}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="Enter current password" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button onClick={() => toast.info("Password management will be available in the next update.")}>
                      <Key className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </div>
                </div>
              </AnimatedCard>
              
              <AnimatedCard title="Notifications" animate="fadeIn" delay="0.2s" hover={false}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive project updates via email</p>
                    </div>
                    <input type="checkbox" className="toggle bg-gray-200 checked:bg-marine-600" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Mobile Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive alerts on your phone</p>
                    </div>
                    <input type="checkbox" className="toggle bg-gray-200 checked:bg-marine-600" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Weekly Digest</h3>
                      <p className="text-sm text-muted-foreground">Receive weekly summary of activities</p>
                    </div>
                    <input type="checkbox" className="toggle bg-gray-200 checked:bg-marine-600" />
                  </div>
                </div>
              </AnimatedCard>
            </div>
            
            <div className="space-y-6">
              <AnimatedCard title="Privacy" animate="fadeIn" delay="0.15s" hover={false}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Profile Visibility</h3>
                      <p className="text-sm text-muted-foreground">Who can see your profile</p>
                    </div>
                    <select className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors">
                      <option value="team">Team Only</option>
                      <option value="company">Company</option>
                      <option value="public">Public</option>
                    </select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Data Sharing</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                        <label className="text-sm">Share project history with team members</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                        <label className="text-sm">Share contact information with project managers</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                        <label className="text-sm">Allow data to be used for analytics</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" className="w-full" onClick={() => toast.info("Privacy settings will be available in the next update.")}>
                      <Shield className="mr-2 h-4 w-4" />
                      Update Privacy Settings
                    </Button>
                  </div>
                </div>
              </AnimatedCard>
              
              <AnimatedCard title="Account Actions" animate="fadeIn" delay="0.25s" hover={false}>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full" onClick={() => toast.info("Account export will be available in the next update.")}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Your Data
                  </Button>
                  
                  <Button variant="destructive" className="w-full" onClick={() => toast.error("This action cannot be undone. For account deactivation, please contact HR.")}>
                    Deactivate Account
                  </Button>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
