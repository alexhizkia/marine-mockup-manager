
import { useState } from "react";
import { 
  AlertTriangle, 
  Calendar, 
  CheckCircle, 
  MapPin, 
  MoreVertical, 
  Plus, 
  Ship, 
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/shared/PageHeader";
import AnimatedCard from "@/components/shared/AnimatedCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import EmptyState from "@/components/shared/EmptyState";

// Sample sites data
const sites = [
  {
    id: "1",
    name: "Sulawesi Offshore Platform Alpha",
    location: "North Sulawesi",
    coordinates: "-1.4836, 124.8456",
    type: "Offshore",
    status: "Active",
    personnel: 8,
    vessel: "PT Pageo Explorer",
    startDate: "2023-09-15",
    endDate: "2023-11-25",
    weather: "Sunny, 30°C, 10kn winds",
    project: "Sulawesi Offshore Mapping",
    safety: "Green"
  },
  {
    id: "2",
    name: "Makassar Coastal Survey",
    location: "South Sulawesi",
    coordinates: "-5.1477, 119.4275",
    type: "Coastal",
    status: "Active",
    personnel: 6,
    vessel: "PT Pageo Coastal 2",
    startDate: "2023-10-05",
    endDate: "2023-11-15",
    weather: "Partly cloudy, 32°C, 15kn winds",
    project: "Makassar Shoreline Assessment",
    safety: "Yellow"
  },
  {
    id: "3",
    name: "Raja Ampat Seabed Mapping",
    location: "Papua",
    coordinates: "-0.5000, 130.5000",
    type: "Offshore",
    status: "Active",
    personnel: 12,
    vessel: "PT Pageo Surveyor",
    startDate: "2023-09-20",
    endDate: "2023-12-10",
    weather: "Rain, 27°C, 20kn winds",
    project: "Raja Ampat Comprehensive Mapping",
    safety: "Green"
  },
  {
    id: "4",
    name: "Bali Marine Sanctuary",
    location: "Bali",
    coordinates: "-8.3405, 115.0920",
    type: "Nearshore",
    status: "Planned",
    personnel: 0,
    vessel: "",
    startDate: "2023-11-25",
    endDate: "2024-01-15",
    weather: "",
    project: "Bali Marine Protected Areas",
    safety: ""
  },
  {
    id: "5",
    name: "Jakarta Bay Assessment",
    location: "DKI Jakarta",
    coordinates: "-6.0815, 106.7613",
    type: "Nearshore",
    status: "Completed",
    personnel: 0,
    vessel: "PT Pageo Jakarta 1",
    startDate: "2023-08-10",
    endDate: "2023-09-30",
    weather: "",
    project: "Jakarta Bay Environmental Report",
    safety: "Green"
  },
  {
    id: "6",
    name: "Timor Sea Oil Platform Survey",
    location: "East Nusa Tenggara",
    coordinates: "-9.5000, 125.5000",
    type: "Offshore",
    status: "Active",
    personnel: 10,
    vessel: "PT Pageo Marine Explorer",
    startDate: "2023-09-01",
    endDate: "2023-11-30",
    weather: "Clear, 31°C, 12kn winds",
    project: "Timor Sea Platform Assessment",
    safety: "Red"
  }
];

// Sample personnel data
const personnel = [
  { id: "1", name: "Ahmad Yusof", role: "Site Engineer", site: "Sulawesi Offshore Platform Alpha", status: "On-Site", daysOnSite: 32 },
  { id: "2", name: "Siti Aisha", role: "Marine Surveyor", site: "Sulawesi Offshore Platform Alpha", status: "On-Site", daysOnSite: 32 },
  { id: "3", name: "Raj Kumar", role: "Data Analyst", site: "Sulawesi Offshore Platform Alpha", status: "On-Site", daysOnSite: 18 },
  { id: "4", name: "Lee Wei", role: "Diver", site: "Sulawesi Offshore Platform Alpha", status: "On-Site", daysOnSite: 32 },
  { id: "5", name: "Maria Santos", role: "Project Lead", site: "Makassar Coastal Survey", status: "On-Site", daysOnSite: 21 },
  { id: "6", name: "Dimas Purnomo", role: "Safety Officer", site: "Makassar Coastal Survey", status: "On-Site", daysOnSite: 21 },
  { id: "7", name: "Rina Wati", role: "Marine Biologist", site: "Makassar Coastal Survey", status: "On-Site", daysOnSite: 21 },
  { id: "8", name: "Taufik Rahman", role: "Equipment Specialist", site: "Raja Ampat Seabed Mapping", status: "On-Site", daysOnSite: 27 },
  { id: "9", name: "Nurul Hidayah", role: "Data Analyst", site: "Raja Ampat Seabed Mapping", status: "On-Site", daysOnSite: 27 },
  { id: "10", name: "Michael Tran", role: "Surveyor", site: "Raja Ampat Seabed Mapping", status: "On-Site", daysOnSite: 15 },
  { id: "11", name: "John Smith", role: "Supervisor", site: "Timor Sea Oil Platform Survey", status: "On-Site", daysOnSite: 42 },
  { id: "12", name: "Li Mei", role: "Marine Scientist", site: "Timor Sea Oil Platform Survey", status: "On-Site", daysOnSite: 42 },
];

// Sample vessels data
const vessels = [
  { id: "1", name: "PT Pageo Explorer", type: "Survey Vessel", capacity: 15, currentSite: "Sulawesi Offshore Platform Alpha", status: "Deployed" },
  { id: "2", name: "PT Pageo Coastal 2", type: "Coastal Surveyor", capacity: 8, currentSite: "Makassar Coastal Survey", status: "Deployed" },
  { id: "3", name: "PT Pageo Surveyor", type: "Research Vessel", capacity: 20, currentSite: "Raja Ampat Seabed Mapping", status: "Deployed" },
  { id: "4", name: "PT Pageo Jakarta 1", type: "Coastal Surveyor", capacity: 10, currentSite: "", status: "Available" },
  { id: "5", name: "PT Pageo Marine Explorer", type: "Offshore Platform", capacity: 25, currentSite: "Timor Sea Oil Platform Survey", status: "Deployed" },
  { id: "6", name: "PT Pageo Diver 1", type: "Diving Support", capacity: 12, currentSite: "", status: "Maintenance" },
];

const OnSite = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sites");
  const [isSiteDialogOpen, setIsSiteDialogOpen] = useState(false);
  const [isPersonnelDialogOpen, setIsPersonnelDialogOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<any>(null);
  
  // New site form state
  const [newSite, setNewSite] = useState({
    name: "",
    location: "",
    coordinates: "",
    type: "Offshore",
    startDate: "",
    endDate: "",
    project: ""
  });

  // Handle site form input change
  const handleSiteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSite({ ...newSite, [name]: value });
  };

  // Handle site form submission
  const handleSiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("New site created successfully");
    setIsSiteDialogOpen(false);
    setNewSite({
      name: "",
      location: "",
      coordinates: "",
      type: "Offshore",
      startDate: "",
      endDate: "",
      project: ""
    });
  };

  // View site details
  const handleViewSite = (site: any) => {
    setSelectedSite(site);
  };

  // Format date from ISO to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="page-transition space-y-6">
      <PageHeader 
        title="Field Operations" 
        subtitle="Monitor and manage onsite survey operations"
      >
        <div className="flex space-x-2">
          <Dialog open={isSiteDialogOpen} onOpenChange={setIsSiteDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-hover">
                <Plus className="mr-2 h-4 w-4" /> New Site
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <form onSubmit={handleSiteSubmit}>
                <DialogHeader>
                  <DialogTitle>Register New Survey Site</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new survey site.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Site Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newSite.name}
                      onChange={handleSiteInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={newSite.location}
                        onChange={handleSiteInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coordinates">Coordinates</Label>
                      <Input
                        id="coordinates"
                        name="coordinates"
                        value={newSite.coordinates}
                        placeholder="Lat, Long"
                        onChange={handleSiteInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Site Type</Label>
                    <Select 
                      value={newSite.type} 
                      onValueChange={(value) => setNewSite({ ...newSite, type: value })}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select site type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Offshore">Offshore</SelectItem>
                        <SelectItem value="Nearshore">Nearshore</SelectItem>
                        <SelectItem value="Coastal">Coastal</SelectItem>
                        <SelectItem value="Inland">Inland</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={newSite.startDate}
                        onChange={handleSiteInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={newSite.endDate}
                        onChange={handleSiteInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="project">Associated Project</Label>
                    <Input
                      id="project"
                      name="project"
                      value={newSite.project}
                      onChange={handleSiteInputChange}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsSiteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Site</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isPersonnelDialogOpen} onOpenChange={setIsPersonnelDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="btn-hover">
                <User className="mr-2 h-4 w-4" /> Deploy Personnel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Deploy Personnel to Site</DialogTitle>
                <DialogDescription>
                  Assign team members to a field operation site.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="siteDeploy">Deployment Site</Label>
                  <Select defaultValue="">
                    <SelectTrigger id="siteDeploy">
                      <SelectValue placeholder="Select site" />
                    </SelectTrigger>
                    <SelectContent>
                      {sites.filter(site => site.status === "Active" || site.status === "Planned").map(site => (
                        <SelectItem key={site.id} value={site.id}>{site.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="personnelDeploy">Personnel</Label>
                  <Select defaultValue="">
                    <SelectTrigger id="personnelDeploy">
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user1">Ahmad Rizal - Survey Engineer</SelectItem>
                      <SelectItem value="user2">Dewi Putri - Data Analyst</SelectItem>
                      <SelectItem value="user3">Budi Santoso - Diver</SelectItem>
                      <SelectItem value="user4">Siti Aminah - Safety Officer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deployDate">Deployment Date</Label>
                    <Input id="deployDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="returnDate">Expected Return</Label>
                    <Input id="returnDate" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role at Site</Label>
                  <Input id="role" placeholder="e.g. Lead Surveyor, Diver, Analyst" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsPersonnelDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast.success("Personnel deployment scheduled successfully");
                  setIsPersonnelDialogOpen(false);
                }}>
                  Deploy
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </PageHeader>

      <Tabs defaultValue="sites" className="w-full animate-fadeIn" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="sites">Survey Sites</TabsTrigger>
          <TabsTrigger value="personnel">Field Personnel</TabsTrigger>
          <TabsTrigger value="vessels">Vessels & Equipment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sites" className="space-y-6">
          {/* Display survey sites */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sites.map((site) => (
              <AnimatedCard 
                key={site.id} 
                className="h-full"
                animate="fadeIn"
                delay={`${parseInt(site.id) * 0.1}s`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        site.status === "Active" ? "bg-green-500" :
                        site.status === "Planned" ? "bg-amber-500" :
                        "bg-gray-400"
                      }`} />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{site.status}</span>
                    </div>
                    <h3 className="text-lg font-semibold mt-1">{site.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" /> {site.location}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewSite(site)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Site</DropdownMenuItem>
                      <DropdownMenuItem>Safety Report</DropdownMenuItem>
                      <DropdownMenuItem>Set Inactive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="mt-4 space-y-3">
                  {site.vessel && (
                    <div className="flex items-center text-sm">
                      <Ship className="h-4 w-4 mr-2 text-marine-500" />
                      <span>{site.vessel}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-marine-500" />
                    <span>{formatDate(site.startDate)} - {formatDate(site.endDate)}</span>
                  </div>
                  
                  {site.safety && (
                    <div className="flex items-center text-sm">
                      <AlertTriangle className={`h-4 w-4 mr-2 ${
                        site.safety === "Green" ? "text-green-500" :
                        site.safety === "Yellow" ? "text-amber-500" :
                        "text-red-500"
                      }`} />
                      <span>Safety Status: {site.safety}</span>
                    </div>
                  )}
                  
                  {site.personnel > 0 && (
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-2 text-marine-500" />
                      <span>{site.personnel} personnel on site</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-navy-700">
                  <p className="text-sm text-muted-foreground">Project: {site.project}</p>
                  
                  {site.weather && (
                    <div className="mt-2 p-2 rounded-md bg-gray-50 dark:bg-navy-700/50 text-xs">
                      <p>Current conditions: {site.weather}</p>
                    </div>
                  )}
                </div>
                
                {site.status === "Active" && (
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" /> Check-in
                    </Button>
                  </div>
                )}
              </AnimatedCard>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="personnel" className="space-y-6">
          {/* Display field personnel */}
          <AnimatedCard animate="fadeIn" hover={false}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Personnel</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Role</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Assigned Site</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Days On-Site</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-navy-700">
                  {personnel.map((person) => (
                    <tr key={person.id} className="hover:bg-gray-50 dark:hover:bg-navy-700/50">
                      <td className="px-3 py-4 text-sm">
                        <div className="flex items-center">
                          <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center mr-3">
                            {person.name.charAt(0)}
                          </div>
                          <div className="font-medium">{person.name}</div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-100">
                        {person.role}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {person.site}
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {person.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {person.daysOnSite}
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-marine-600 dark:text-marine-300">
                          Contact
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedCard>
        </TabsContent>
        
        <TabsContent value="vessels" className="space-y-6">
          {/* Display vessels & equipment */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {vessels.map((vessel) => (
              <AnimatedCard 
                key={vessel.id} 
                className="overflow-hidden"
                animate="slideUp"
                delay={`${parseInt(vessel.id) * 0.1}s`}
              >
                <div className="relative h-40 bg-marine-100 dark:bg-marine-900/20 mb-4 rounded-md overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Ship className="h-16 w-16 text-marine-500/50" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900/60 to-transparent">
                    <h3 className="text-white font-semibold">{vessel.name}</h3>
                    <p className="text-white/80 text-sm">{vessel.type}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Capacity</span>
                    <span className="text-sm font-medium">{vessel.capacity} personnel</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                    <span className={`text-sm font-medium ${
                      vessel.status === "Deployed" ? "text-green-600 dark:text-green-400" :
                      vessel.status === "Available" ? "text-marine-600 dark:text-marine-400" :
                      "text-amber-600 dark:text-amber-400"
                    }`}>
                      {vessel.status}
                    </span>
                  </div>
                  
                  {vessel.currentSite && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Current Site</span>
                      <span className="text-sm font-medium">{vessel.currentSite}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Details
                  </Button>
                  {vessel.status === "Available" && (
                    <Button size="sm" className="flex-1">
                      Deploy
                    </Button>
                  )}
                </div>
              </AnimatedCard>
            ))}
          </div>
          
          <EmptyState 
            title="Equipment Tracking"
            description="Equipment tracking functionality will be available in the next update."
            icon={<AlertTriangle className="h-10 w-10" />}
            actionLabel="Request Update"
            onAction={() => toast.info("Feature request submitted.")}
          />
        </TabsContent>
      </Tabs>

      {/* Site details dialog */}
      {selectedSite && (
        <Dialog open={!!selectedSite} onOpenChange={() => setSelectedSite(null)}>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>{selectedSite.name}</DialogTitle>
              <DialogDescription>
                {selectedSite.location} • {selectedSite.type} Site
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Coordinates</p>
                <p className="text-sm">{selectedSite.coordinates}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm flex items-center">
                  <span className={`h-2.5 w-2.5 rounded-full mr-2 ${
                    selectedSite.status === "Active" ? "bg-green-500" :
                    selectedSite.status === "Planned" ? "bg-amber-500" :
                    "bg-gray-400"
                  }`} />
                  {selectedSite.status}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Timeline</p>
                <p className="text-sm">{formatDate(selectedSite.startDate)} - {formatDate(selectedSite.endDate)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Personnel</p>
                <p className="text-sm">{selectedSite.personnel} team members on site</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Vessel</p>
                <p className="text-sm">{selectedSite.vessel || "None assigned"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Project</p>
                <p className="text-sm">{selectedSite.project}</p>
              </div>
              <div className="col-span-2 space-y-1">
                <p className="text-sm font-medium">Current Weather</p>
                <p className="text-sm">{selectedSite.weather || "No weather data available"}</p>
              </div>
              <div className="col-span-2 space-y-1">
                <p className="text-sm font-medium">Safety Status</p>
                <div className={`p-2 rounded-md ${
                  selectedSite.safety === "Green" ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300" :
                  selectedSite.safety === "Yellow" ? "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300" :
                  selectedSite.safety === "Red" ? "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300" :
                  "bg-gray-50 text-gray-800 dark:bg-navy-700/50 dark:text-gray-300"
                }`}>
                  {selectedSite.safety === "Green" ? (
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>All safety protocols normal</span>
                    </div>
                  ) : selectedSite.safety === "Yellow" ? (
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <span>Minor safety concerns noted, monitoring in progress</span>
                    </div>
                  ) : selectedSite.safety === "Red" ? (
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <span>Critical safety issues, immediate action required</span>
                    </div>
                  ) : (
                    <span>No safety data available</span>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedSite(null)}>
                Close
              </Button>
              <Button onClick={() => navigate("/projects/" + selectedSite.project.replace(/\s+/g, '-').toLowerCase())}>
                Go to Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OnSite;
