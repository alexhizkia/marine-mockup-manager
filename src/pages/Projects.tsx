
import { useState } from "react";
import { 
  Activity, 
  Calendar, 
  Clock, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Ship, 
  User 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/shared/PageHeader";
import AnimatedCard from "@/components/shared/AnimatedCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Sample projects data
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
    manager: "Ahmad Rizal"
  },
  {
    id: "2",
    name: "Makassar Shoreline Assessment",
    client: "Ministry of Maritime Affairs",
    status: "In Progress",
    priority: "Medium",
    startDate: "2023-10-05",
    endDate: "2023-11-15",
    progress: 40,
    budget: 85000,
    team: 8,
    description: "Coastal erosion study and environmental impact assessment for the Makassar shoreline development project.",
    manager: "Siti Aminah"
  },
  {
    id: "3",
    name: "Raja Ampat Comprehensive Mapping",
    client: "World Wildlife Fund",
    status: "In Progress",
    priority: "Medium",
    startDate: "2023-09-20",
    endDate: "2023-12-10",
    progress: 30,
    budget: 180000,
    team: 14,
    description: "Marine sanctuary mapping and coral reef survey to support conservation efforts in Raja Ampat.",
    manager: "Joko Widodo"
  },
  {
    id: "4",
    name: "Bali Marine Protected Areas",
    client: "Bali Provincial Government",
    status: "Planned",
    priority: "Medium",
    startDate: "2023-11-25",
    endDate: "2024-01-15",
    progress: 0,
    budget: 95000,
    team: 10,
    description: "Survey and mapping of proposed marine protected areas around Bali to support sustainable tourism and conservation.",
    manager: "Dewi Putri"
  },
  {
    id: "5",
    name: "Jakarta Bay Environmental Report",
    client: "Ministry of Environment",
    status: "Completed",
    priority: "High",
    startDate: "2023-08-10",
    endDate: "2023-09-30",
    progress: 100,
    budget: 110000,
    team: 9,
    description: "Comprehensive environmental assessment of Jakarta Bay, including water quality, sediment analysis, and marine life survey.",
    manager: "Budi Santoso"
  },
  {
    id: "6",
    name: "Timor Sea Platform Assessment",
    client: "PT Energi Mega Persada",
    status: "In Progress",
    priority: "High",
    startDate: "2023-09-01",
    endDate: "2023-11-30",
    progress: 75,
    budget: 145000,
    team: 11,
    description: "Structural integrity assessment and environmental impact study for existing oil platforms in the Timor Sea.",
    manager: "Michael Tan"
  },
  {
    id: "7",
    name: "Lombok Tsunami Preparedness",
    client: "National Disaster Management Agency",
    status: "Planned",
    priority: "High",
    startDate: "2023-12-01",
    endDate: "2024-02-28",
    progress: 0,
    budget: 120000,
    team: 12,
    description: "Coastal survey and bathymetric mapping to support tsunami preparedness and early warning system development in Lombok.",
    manager: "Lisa Chen"
  },
  {
    id: "8",
    name: "Sumatra Deep Sea Research",
    client: "Indonesian Institute of Sciences",
    status: "Pending Approval",
    priority: "Medium",
    startDate: "2024-01-15",
    endDate: "2024-05-30",
    progress: 0,
    budget: 230000,
    team: 15,
    description: "Deep sea exploration and research project off the west coast of Sumatra to study marine biodiversity and geological features.",
    manager: "Dr. Wilson"
  }
];

// Sample team members
const teamMembers = [
  { id: "1", name: "Ahmad Rizal", role: "Project Manager", projects: 2, availability: "Partial" },
  { id: "2", name: "Siti Aminah", role: "Project Manager", projects: 1, availability: "Full" },
  { id: "3", name: "Joko Widodo", role: "Marine Biologist", projects: 2, availability: "Partial" },
  { id: "4", name: "Dewi Putri", role: "Data Analyst", projects: 3, availability: "Limited" },
  { id: "5", name: "Budi Santoso", role: "Survey Engineer", projects: 1, availability: "Full" },
  { id: "6", name: "Michael Tan", role: "Project Manager", projects: 1, availability: "Full" },
  { id: "7", name: "Lisa Chen", role: "Safety Officer", projects: 1, availability: "Full" },
  { id: "8", name: "Dr. Wilson", role: "Research Director", projects: 2, availability: "Limited" }
];

const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  
  // New project form state
  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    startDate: "",
    endDate: "",
    priority: "Medium",
    description: "",
    budget: "",
    manager: ""
  });

  // Filter projects based on search term and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.manager.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "all" || 
      project.status.toLowerCase().replace(/\s+/g, '-') === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Handle project form input change
  const handleProjectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  // Handle project form submission
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("New project created successfully");
    setIsNewProjectDialogOpen(false);
    setNewProject({
      name: "",
      client: "",
      startDate: "",
      endDate: "",
      priority: "Medium",
      description: "",
      budget: "",
      manager: ""
    });
  };

  // Format date from ISO to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
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
      case "Pending Approval":
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

  return (
    <div className="page-transition space-y-6">
      <PageHeader 
        title="Project Management" 
        subtitle="Track and manage marine survey projects"
      >
        <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-hover">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <form onSubmit={handleProjectSubmit}>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Enter the details for the new marine survey project.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newProject.name}
                      onChange={handleProjectInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      name="client"
                      value={newProject.client}
                      onChange={handleProjectInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={newProject.startDate}
                      onChange={handleProjectInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={newProject.endDate}
                      onChange={handleProjectInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={newProject.priority} 
                      onValueChange={(value) => setNewProject({ ...newProject, priority: value })}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (USD)</Label>
                    <Input
                      id="budget"
                      name="budget"
                      type="number"
                      placeholder="e.g. 100000"
                      value={newProject.budget}
                      onChange={handleProjectInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="manager">Project Manager</Label>
                  <Select 
                    value={newProject.manager} 
                    onValueChange={(value) => setNewProject({ ...newProject, manager: value })}
                  >
                    <SelectTrigger id="manager">
                      <SelectValue placeholder="Select project manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.filter(member => member.role === "Project Manager").map(manager => (
                        <SelectItem key={manager.id} value={manager.name}>{manager.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={newProject.description}
                    onChange={handleProjectInputChange}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewProjectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Project</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <Tabs defaultValue="all" className="w-full animate-fadeIn">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search" 
                placeholder="Search projects..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter Status</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending-approval">Pending Approval</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-6">
          <AnimatedCard animate="fadeIn" hover={false}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Project</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Client</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Timeline</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Progress</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Team</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-navy-700">
                  {filteredProjects.map((project) => (
                    <tr 
                      key={project.id} 
                      className="hover:bg-gray-50 dark:hover:bg-navy-700/50 cursor-pointer"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <td className="px-3 py-4 text-sm">
                        <div className="flex flex-col">
                          <div className="font-medium">{project.name}</div>
                          <div className={`text-xs font-medium ${getPriorityColor(project.priority)}`}>
                            {project.priority} Priority
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {project.client}
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status === "In Progress" && (
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-marine-500"></span>
                          )}
                          {project.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 dark:bg-navy-700 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-marine-500 h-2.5 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{project.team}</span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/projects/${project.id}`);
                            }}>View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit Project</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Generate Report</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedCard>
        </TabsContent>
        
        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.filter(p => p.status === "In Progress").map((project) => (
              <AnimatedCard 
                key={project.id}
                className="h-full cursor-pointer card-hover"
                animate="fadeIn"
                delay={`${parseInt(project.id) * 0.1}s`}
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-marine-100 text-marine-800 dark:bg-marine-900/30 dark:text-marine-300 mb-2">
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-marine-500"></span>
                      In Progress
                    </div>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.client}</p>
                  </div>
                  <div className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </div>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2.5">
                    <div 
                      className="bg-marine-500 h-2.5 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="pt-2 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{formatDate(project.endDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{project.team} Team Members</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-navy-700 flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Manager: {project.manager}
                  </div>
                  <div className="text-sm font-medium">
                    {formatCurrency(project.budget)}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-6">
          <AnimatedCard animate="fadeIn" hover={false}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Project</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Client</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Timeline</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Budget</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Team Size</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-navy-700">
                  {projects.filter(p => p.status === "Planned" || p.status === "Pending Approval").map((project) => (
                    <tr 
                      key={project.id} 
                      className="hover:bg-gray-50 dark:hover:bg-navy-700/50 cursor-pointer"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <td className="px-3 py-4 text-sm">
                        <div className="flex flex-col">
                          <div className="font-medium">{project.name}</div>
                          <div className={`text-xs font-medium ${getPriorityColor(project.priority)}`}>
                            {project.priority} Priority
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {project.client}
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium">
                        {formatCurrency(project.budget)}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {project.team} members
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/projects/${project.id}`);
                            }}>View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit Project</DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              toast.success(`Project ${project.name} activated`);
                            }}>Activate Project</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedCard>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          <AnimatedCard animate="fadeIn" hover={false}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Project</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Client</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Completion Date</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Duration</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Budget</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Manager</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-navy-700">
                  {projects.filter(p => p.status === "Completed").map((project) => {
                    // Calculate project duration in days
                    const startDate = new Date(project.startDate);
                    const endDate = new Date(project.endDate);
                    const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
                    
                    return (
                      <tr 
                        key={project.id} 
                        className="hover:bg-gray-50 dark:hover:bg-navy-700/50 cursor-pointer"
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        <td className="px-3 py-4 text-sm">
                          <div className="font-medium">{project.name}</div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {project.client}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(project.endDate)}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {durationDays} days
                        </td>
                        <td className="px-3 py-4 text-sm font-medium">
                          {formatCurrency(project.budget)}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {project.manager}
                        </td>
                        <td className="px-3 py-4 text-sm">
                          <Button variant="outline" size="sm" className="h-8 px-3" onClick={(e) => {
                            e.stopPropagation();
                            toast.success(`Report for ${project.name} downloaded`);
                          }}>
                            <Activity className="h-4 w-4 mr-1" />
                            Report
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </AnimatedCard>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <AnimatedCard title="Project Team Members" animate="slideUp">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
              <thead>
                <tr>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Team Member</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Role</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Active Projects</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Availability</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-navy-700">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-navy-700/50">
                    <td className="px-3 py-4 text-sm">
                      <div className="flex items-center">
                        <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center mr-3">
                          {member.name.charAt(0)}
                        </div>
                        <div className="font-medium">{member.name}</div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {member.role}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {member.projects} projects
                    </td>
                    <td className="px-3 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.availability === "Full" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                          : member.availability === "Partial"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }`}>
                        {member.availability}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-marine-600 dark:text-marine-300">
                        View Schedule
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default Projects;
