import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Activity, 
  AlertTriangle, 
  ArrowLeft, 
  Calendar, 
  ChevronDown, 
  Clock, 
  Cog, 
  Download, 
  Edit, 
  FileText, 
  Map, 
  MessageSquare, 
  Plus, 
  Ship, 
  User, 
  Users 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AnimatedCard from "@/components/shared/AnimatedCard";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample project data
const projects = [
  {
    id: "1",
    name: "Sulawesi Offshore Mapping",
    client: "PT Pertamina",
    status: "In Progress",
    priority: "High",
    startDate: "2023-09-15",
    endDate: "2023-11-25",
    progress: 65,
    budget: 125000,
    team: 12,
    description: "Comprehensive seabed mapping and bathymetric survey for offshore oil platform deployment in North Sulawesi.",
    manager: "Ahmad Rizal",
    details: "This project involves detailed seafloor mapping using multibeam echo sounders and sub-bottom profilers to identify suitable locations for new offshore oil platform installations. The survey area covers approximately 250 square kilometers in the waters north of Sulawesi. Data collection includes bathymetry, seafloor composition, and subsurface geological structures.",
    updates: [
      { id: "1", date: "2023-10-28", author: "Ahmad Rizal", content: "Completed the eastern sector mapping ahead of schedule. Data quality is excellent with high-resolution bathymetric models now available for analysis." },
      { id: "2", date: "2023-10-20", author: "Dewi Putri", content: "Preliminary analysis of seafloor samples indicates suitable foundation conditions in zones B and C. Forwarded findings to engineering team for review." },
      { id: "3", date: "2023-10-12", author: "Joko Widodo", content: "Weather conditions caused 2-day delay in western sector. Adjusted schedule accordingly, still on track for completion by end of November." },
      { id: "4", date: "2023-10-05", author: "Siti Aminah", content: "Equipment calibration completed successfully. Survey vessel PT Pageo Explorer deployed to site as scheduled." },
      { id: "5", date: "2023-09-15", author: "Ahmad Rizal", content: "Project kickoff meeting held with client representatives. Survey plan and methodology approved." }
    ],
    risks: [
      { id: "1", title: "Weather Disruptions", severity: "Medium", status: "Mitigated", description: "Monsoon season may cause delays in field operations.", mitigation: "Built buffer time into project schedule and identified optimal weather windows." },
      { id: "2", title: "Equipment Malfunction", severity: "High", status: "Active", description: "Critical survey equipment could fail during operations.", mitigation: "Pre-deployment testing protocols and backup equipment readied." },
      { id: "3", title: "Data Quality Issues", severity: "Medium", status: "Monitored", description: "Environmental factors could impact data quality.", mitigation: "Daily data quality checks and calibration procedures implemented." }
    ],
    sites: [
      { id: "1", name: "Sulawesi Offshore Platform Alpha", location: "North Sulawesi", status: "Active", personnel: 8 },
      { id: "2", name: "Shore Base Operations", location: "Manado", status: "Active", personnel: 4 }
    ],
    milestones: [
      { id: "1", name: "Project Kickoff", date: "2023-09-15", status: "Completed" },
      { id: "2", name: "Equipment Deployment", date: "2023-09-20", status: "Completed" },
      { id: "3", name: "Eastern Sector Survey", date: "2023-10-30", status: "Completed" },
      { id: "4", name: "Western Sector Survey", date: "2023-11-15", status: "In Progress" },
      { id: "5", name: "Data Analysis & Report", date: "2023-11-25", status: "Pending" }
    ],
    documents: [
      { id: "1", name: "Survey Methodology", type: "PDF", size: "2.4 MB", date: "2023-09-10", author: "Ahmad Rizal" },
      { id: "2", name: "Equipment Specifications", type: "DOCX", size: "1.8 MB", date: "2023-09-12", author: "Budi Santoso" },
      { id: "3", name: "Health & Safety Plan", type: "PDF", size: "3.5 MB", date: "2023-09-14", author: "Siti Aminah" },
      { id: "4", name: "Eastern Sector Preliminary Data", type: "ZIP", size: "456 MB", date: "2023-10-28", author: "Dewi Putri" }
    ],
    teamMembers: [
      { id: "1", name: "Ahmad Rizal", role: "Project Manager", avatar: "" },
      { id: "2", name: "Dewi Putri", role: "Data Analyst", avatar: "" },
      { id: "3", name: "Joko Widodo", role: "Marine Biologist", avatar: "" },
      { id: "4", name: "Siti Aminah", role: "Safety Officer", avatar: "" },
      { id: "5", name: "Budi Santoso", role: "Survey Engineer", avatar: "" }
    ],
    progressData: [
      { date: "2023-09-15", planned: 0, actual: 0 },
      { date: "2023-09-30", planned: 10, actual: 8 },
      { date: "2023-10-15", planned: 30, actual: 25 },
      { date: "2023-10-30", planned: 50, actual: 65 },
      { date: "2023-11-15", planned: 80, actual: 65 },
      { date: "2023-11-25", planned: 100, actual: null }
    ]
  },
  // Other projects would be defined here but omitted for brevity
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [newUpdate, setNewUpdate] = useState("");
  
  // Find the project by ID
  const project = projects.find(p => p.id === id);
  
  // If project not found, show error
  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center animate-fadeIn">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/projects")}>Return to Projects</Button>
      </div>
    );
  }

  // Format date from ISO to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format short date
  const formatShortDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Handle posting new update
  const handlePostUpdate = () => {
    if (newUpdate.trim()) {
      toast.success("Update posted successfully");
      setNewUpdate("");
      setIsUpdateDialogOpen(false);
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-marine-100 text-marine-800 dark:bg-marine-900/30 dark:text-marine-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Planned":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "Pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 dark:text-red-400";
      case "Medium":
        return "text-amber-600 dark:text-amber-400";
      case "Low":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  // Get risk severity color
  const getRiskSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "Medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Get risk status color
  const getRiskStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "Mitigated":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Monitored":
        return "bg-marine-100 text-marine-800 dark:bg-marine-900/30 dark:text-marine-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "DOCX":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "ZIP":
        return <FileText className="h-4 w-4 text-amber-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="page-transition space-y-6 pb-10">
      {/* Back button and project header */}
      <div className="flex flex-col space-y-4">
        <Button 
          variant="ghost" 
          className="w-fit" 
          onClick={() => navigate("/projects")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status === "In Progress" && (
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-marine-500"></span>
                )}
                {project.status}
              </span>
              <span className={`ml-2 text-sm font-medium ${getPriorityColor(project.priority)}`}>
                {project.priority} Priority
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{project.name}</h1>
            <p className="text-muted-foreground mt-1">Client: {project.client}</p>
          </div>
          
          <div className="flex space-x-2">
            <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-hover">
                  <Plus className="mr-2 h-4 w-4" />
                  Post Update
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Post Project Update</DialogTitle>
                  <DialogDescription>
                    Share progress, changes, or important information with the team.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="update">Update</Label>
                    <Textarea
                      id="update"
                      rows={5}
                      value={newUpdate}
                      onChange={(e) => setNewUpdate(e.target.value)}
                      placeholder="Enter your project update..."
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handlePostUpdate} disabled={!newUpdate.trim()}>
                    Post Update
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="btn-hover" onClick={() => toast.info("Project editing will be available in the next update.")}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
            
            <Button variant="outline" className="btn-hover p-2 h-10 w-10" onClick={() => toast.info("Project settings will be available in the next update.")}>
              <Cog className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Project information cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="animate-fadeIn">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{formatDate(project.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{formatDate(project.endDate)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fadeIn animate-delay-75">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Budget & Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="font-medium">{formatCurrency(project.budget)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Team Size</p>
                <p className="font-medium">{project.team} members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fadeIn animate-delay-150">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{project.progress}% Complete</span>
                <span className="text-sm text-muted-foreground">
                  {
                    project.status === "Completed" ? "Completed" :
                    project.progress < 25 ? "Early Stage" :
                    project.progress < 50 ? "Initial Progress" :
                    project.progress < 75 ? "Advanced Progress" :
                    "Final Stage"
                  }
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2.5">
                <div 
                  className="bg-marine-500 h-2.5 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project tabs */}
      <Tabs defaultValue="overview" className="w-full animate-fadeIn" onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full justify-start space-x-2 overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="sites">Sites & Operations</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
        </TabsList>
        
        {/* Overview tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AnimatedCard title="Project Description" animate="fadeIn">
                <div className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  <p>{project.details}</p>
                </div>
              </AnimatedCard>
              
              <AnimatedCard title="Progress Tracking" animate="fadeIn" delay="0.1s">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={project.progressData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis 
                        dataKey="date" 
                        stroke="rgba(0,0,0,0.5)" 
                        fontSize={12}
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getDate()}/${date.getMonth() + 1}`;
                        }}
                      />
                      <YAxis stroke="rgba(0,0,0,0.5)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ background: 'white', borderRadius: '8px', border: '1px solid #eee' }}
                        formatter={(value: any) => [`${value}%`, '']}
                        labelFormatter={(value) => {
                          return formatShortDate(value);
                        }}
                      />
                      <Area 
                        type="monotone" 
                        name="Planned Progress"
                        dataKey="planned" 
                        stroke="#64748b" 
                        strokeDasharray="5 5"
                        fill="url(#colorPlanned)" 
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        name="Actual Progress"
                        dataKey="actual" 
                        stroke="#0ea5e9" 
                        fill="url(#colorActual)" 
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#64748b" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </AnimatedCard>
              
              <AnimatedCard title="Recent Updates" animate="fadeIn" delay="0.2s" footer={
                <Button 
                  variant="link" 
                  className="ml-auto" 
                  onClick={() => setActiveTab("updates")}
                >
                  View All Updates
                </Button>
              }>
                <div className="space-y-4">
                  {project.updates.slice(0, 3).map((update) => (
                    <div key={update.id} className="border-b border-gray-100 dark:border-navy-700 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 rounded-full bg-marine-100 dark:bg-marine-900/20 flex items-center justify-center text-marine-800 dark:text-marine-200 mr-2">
                          {update.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{update.author}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(update.date)}</p>
                        </div>
                      </div>
                      <p className="text-sm">{update.content}</p>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            </div>
            
            <div className="space-y-6">
              <AnimatedCard title="Project Manager" animate="fadeIn" delay="0.15s">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarFallback className="bg-marine-100 text-marine-800 dark:bg-marine-900/20 dark:text-marine-200">
                      {project.manager.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{project.manager}</p>
                    <p className="text-sm text-muted-foreground">Project Manager</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Manager
                </Button>
              </AnimatedCard>
              
              <AnimatedCard title="Key Milestones" animate="fadeIn" delay="0.25s">
                <div className="space-y-4">
                  {project.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center">
                      <div className={`h-4 w-4 rounded-full mr-3 flex-shrink-0 ${
                        milestone.status === "Completed" ? "bg-green-500" :
                        milestone.status === "In Progress" ? "bg-marine-500" :
                        "bg-gray-300 dark:bg-gray-600"
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{milestone.name}</p>
                        <p className="text-xs text-muted-foreground">{formatShortDate(milestone.date)}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
              
              <AnimatedCard title="Project Sites" animate="fadeIn" delay="0.35s" footer={
                <Button 
                  variant="link" 
                  className="ml-auto" 
                  onClick={() => setActiveTab("sites")}
                >
                  View All Sites
                </Button>
              }>
                <div className="space-y-3">
                  {project.sites.map((site) => (
                    <div key={site.id} className="flex justify-between items-center border-b border-gray-100 dark:border-navy-700 pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium">{site.name}</p>
                        <p className="text-xs text-muted-foreground">{site.location}</p>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm">{site.personnel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            </div>
          </div>
        </TabsContent>
        
        {/* Updates tab */}
        <TabsContent value="updates" className="space-y-6">
          <AnimatedCard title="Project Updates" animate="fadeIn" hover={false}>
            <div className="space-y-6">
              {project.updates.map((update) => (
                <div key={update.id} className="border-b border-gray-100 dark:border-navy-700 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-marine-100 dark:bg-marine-900/20 flex items-center justify-center text-marine-800 dark:text-marine-200 mr-3">
                      {update.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{update.author}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(update.date)}</p>
                    </div>
                  </div>
                  <p>{update.content}</p>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </TabsContent>
        
        {/* Team tab */}
        <TabsContent value="team" className="space-y-6">
          <AnimatedCard title="Project Team" animate="fadeIn" hover={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.teamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden card-hover">
                  <CardContent className="p-0">
                    <div className="h-24 bg-gradient-to-r from-marine-500 to-marine-600 flex items-center justify-center">
                      <Avatar className="h-16 w-16 border-4 border-white dark:border-navy-800">
                        <AvatarFallback className="bg-white text-marine-800 text-2xl">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-medium text-lg">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      
                      <div className="mt-4 flex justify-center space-x-2">
                        <Button size="sm" variant="outline" className="h-8 px-3">
                          <MessageSquare className="h-3.5 w-3.5 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 px-3">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed border-2 flex items-center justify-center h-full min-h-[16rem] card-hover cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center text-center p-6">
                  <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-navy-800 flex items-center justify-center mb-3">
                    <Plus className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="font-medium">Add Team Member</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Assign new personnel to this project
                  </p>
                </CardContent>
              </Card>
            </div>
          </AnimatedCard>
          
          <AnimatedCard title="Team Roles & Responsibilities" animate="fadeIn" delay="0.1s" hover={false}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="project-management">
                <AccordionTrigger>Project Management Team</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-4">
                    <div>
                      <h4 className="font-medium">Project Manager - {project.manager}</h4>
                      <p className="text-sm text-muted-foreground">Overall project oversight, client communication, and team coordination.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Safety Officer - Siti Aminah</h4>
                      <p className="text-sm text-muted-foreground">Ensuring all operations follow safety protocols and regulations.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="field-operations">
                <AccordionTrigger>Field Operations Team</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-4">
                    <div>
                      <h4 className="font-medium">Survey Engineer - Budi Santoso</h4>
                      <p className="text-sm text-muted-foreground">Leading field survey operations and equipment calibration.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Marine Biologist - Joko Widodo</h4>
                      <p className="text-sm text-muted-foreground">Environmental assessment and marine life monitoring.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Equipment Specialists</h4>
                      <p className="text-sm text-muted-foreground">3 specialists responsible for operating and maintaining survey equipment.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Vessel Crew</h4>
                      <p className="text-sm text-muted-foreground">5 crew members for vessel operations.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="data-team">
                <AccordionTrigger>Data Processing Team</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-4">
                    <div>
                      <h4 className="font-medium">Data Analyst - Dewi Putri</h4>
                      <p className="text-sm text-muted-foreground">Processing and analyzing survey data, preparing preliminary reports.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">GIS Specialists</h4>
                      <p className="text-sm text-muted-foreground">2 specialists creating maps and spatial visualizations of collected data.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AnimatedCard>
        </TabsContent>
        
        {/* Sites tab */}
        <TabsContent value="sites" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedCard title="Survey Sites" animate="fadeIn" hover={false}>
              <div className="space-y-4">
                {project.sites.map((site) => (
                  <Card key={site.id} className="overflow-hidden card-hover">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="inline-flex items-center mb-1">
                            <span className={`h-2 w-2 rounded-full ${site.status === "Active" ? "bg-green-500" : "bg-gray-400"} mr-1.5`}></span>
                            <span className="text-xs text-muted-foreground">{site.status}</span>
                          </div>
                          <CardTitle className="text-lg">{site.name}</CardTitle>
                          <CardDescription>{site.location}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Personnel</p>
                          <div className="flex items-center mt-1">
                            <Users className="h-4 w-4 text-gray-400 mr-1.5" />
                            <span>{site.personnel} members</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Equipment</p>
                          <div className="flex items-center mt-1">
                            <Activity className="h-4 w-4 text-gray-400 mr-1.5" />
                            <span>3 systems</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button className="text-marine-600 dark:text-marine-300" variant="link">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AnimatedCard>
            
            <AnimatedCard title="Vessels" animate="fadeIn" delay="0.1s" hover={false}>
              <div className="space-y-4">
                <Card className="overflow-hidden card-hover">
                  <div className="h-40 bg-marine-100 dark:bg-marine-900/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Ship className="h-16 w-16 text-marine-500/50" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900/60 to-transparent">
                      <h3 className="text-white font-semibold">PT Pageo Explorer</h3>
                      <p className="text-white/80 text-sm">Survey Vessel</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Site</p>
                        <p className="font-medium">Sulawesi Offshore Platform Alpha</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Personnel Capacity</p>
                        <p className="font-medium">15 members</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Equipment</p>
                        <ul className="text-sm mt-1 space-y-1">
                          <li>• Multibeam Echo Sounder</li>
                          <li>• Sub-bottom Profiler</li>
                          <li>• Side Scan Sonar</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mt-1">
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                          Deployed
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden card-hover">
                  <div className="h-40 bg-marine-100 dark:bg-marine-900/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Ship className="h-16 w-16 text-marine-500/50" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900/60 to-transparent">
                      <h3 className="text-white font-semibold">PT Pageo Coastal 2</h3>
                      <p className="text-white/80 text-sm">Support Vessel</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Site</p>
                        <p className="font-medium">Shore Base Operations</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Personnel Capacity</p>
                        <p className="font-medium">8 members</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Equipment</p>
                        <ul className="text-sm mt-1 space-y-1">
                          <li>• Sample Collection Tools</li>
                          <li>• Supply Transport</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mt-1">
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                          Deployed
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </AnimatedCard>
          </div>
          
          <AnimatedCard title="Survey Area Map" animate="fadeIn" delay="0.2s" hover={false}>
            <div className="h-96 bg-marine-50 dark:bg-marine-900/10 rounded-md flex items-center justify-center">
              <div className="text-center">
                <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Interactive Map</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mt-1">
                  Interactive mapping feature will be available in the next update.
                </p>
                <Button className="mt-4" onClick={() => toast.info("Map feature will be available in the next update.")}>
                  View Static Map
                </Button>
              </div>
            </div>
          </AnimatedCard>
        </TabsContent>
        
        {/* Documents tab */}
        <TabsContent value="documents" className="space-y-6">
          <AnimatedCard title="Project Documents" animate="fadeIn" hover={false}>
            <div className="space-y-4">
              {project.documents.map((document) => (
                <div key={document.id} className="flex items-center justify-between border-b border-gray-100 dark:border-navy-700 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-navy-800 flex items-center justify-center mr-3">
                      {getDocumentIcon(document.type)}
                    </div>
                    <div>
                      <p className="font-medium">{document.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="after:content-['•'] after:mx-1">{document.type}</span>
                        <span className="after:content-['•'] after:mx-1">{document.size}</span>
                        <span>Uploaded on {formatShortDate(document.date)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-marine-600 dark:text-marine-300 mr-2">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <Button onClick={() => toast.info("Document upload will be available in the next update.")}>
                <Plus className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              
              <span className="text-sm text-muted-foreground">
                {project.documents.length} documents
              </span>
            </div>
          </AnimatedCard>
          
          <AnimatedCard title="Document Categories" animate="fadeIn" delay="0.1s" hover={false}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-marine-100 dark:bg-marine-900/20 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-marine-600 dark:text-marine-300" />
                  </div>
                  <h3 className="font-medium">Project Plans</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Project methodology and planning documents
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-300" />
                  </div>
                  <h3 className="font-medium">Safety Records</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Health, safety, and environmental documentation
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                    <Activity className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                  <h3 className="font-medium">Field Data</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Raw and processed survey data
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                  </div>
                  <h3 className="font-medium">Reports</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Progress and final deliverable reports
                  </p>
                </CardContent>
              </Card>
            </div>
          </AnimatedCard>
        </TabsContent>
        
        {/* Risks tab */}
        <TabsContent value="risks" className="space-y-6">
          <AnimatedCard title="Project Risks & Mitigation" animate="fadeIn" hover={false}>
            <div className="space-y-6">
              {project.risks.map((risk) => (
                <div key={risk.id} className="border-b border-gray-100 dark:border-navy-700 pb-6 last:border-0 last:pb-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <h3 className="font-medium text-lg">{risk.title}</h3>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskSeverityColor(risk.severity)}`}>
                        {risk.severity} Severity
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskStatusColor(risk.status)}`}>
                        {risk.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{risk.description}</p>
                  
                  <div className="bg-gray-50 dark:bg-navy-800/50 rounded-md p-3">
                    <p className="text-sm font-medium mb-1">Mitigation Strategy:</p>
                    <p className="text-sm">{risk.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Button onClick={() => toast.info("Risk management features will be expanded in the next update.")}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Risk
              </Button>
            </div>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
