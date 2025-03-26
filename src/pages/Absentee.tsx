
import { useState } from "react";
import { 
  AlertTriangle, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Download, 
  Filter, 
  Plus, 
  Search, 
  X,
  AlarmClock
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import AnimatedCard from "@/components/shared/AnimatedCard";
import StatCard from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import EarlyMorningAbsenceForm from "@/components/absentee/EarlyMorningAbsenceForm";

// Sample data for absentees
const absences = [
  {
    id: "1",
    name: "Budi Santoso",
    role: "Diver",
    reason: "Sick Leave",
    startDate: "2023-10-12",
    endDate: "2023-10-14",
    status: "Approved",
    details: "Flu symptoms, confirmed by doctor",
    type: "Sick Leave"
  },
  {
    id: "2",
    name: "Dewi Putri",
    role: "Data Analyst",
    reason: "Personal Leave",
    startDate: "2023-10-15",
    endDate: "2023-10-15",
    status: "Pending",
    details: "Family event",
    type: "Personal Leave"
  },
  {
    id: "3",
    name: "Ahmad Rizal",
    role: "Survey Engineer",
    reason: "Annual Leave",
    startDate: "2023-10-20",
    endDate: "2023-10-27",
    status: "Approved",
    details: "Planned vacation",
    type: "Annual Leave"
  },
  {
    id: "4",
    name: "Siti Aminah",
    role: "Project Manager",
    reason: "Conference",
    startDate: "2023-11-05",
    endDate: "2023-11-08",
    status: "Approved",
    details: "Southeast Asia Marine Survey Conference in Singapore",
    type: "Business Travel"
  },
  {
    id: "5",
    name: "Joko Widodo",
    role: "Marine Biologist",
    reason: "Sick Leave",
    startDate: "2023-10-10",
    endDate: "2023-10-11",
    status: "Completed",
    details: "Food poisoning",
    type: "Sick Leave"
  },
  {
    id: "6",
    name: "Dian Sastro",
    role: "Safety Officer",
    reason: "Training",
    startDate: "2023-10-30",
    endDate: "2023-11-03",
    status: "Pending",
    details: "Advanced safety certification in Jakarta",
    type: "Training"
  },
];

// Leave type statistics
const leaveStats = [
  { id: 1, type: "Sick Leave", count: 14, icon: <AlertTriangle className="h-5 w-5" /> },
  { id: 2, type: "Annual Leave", count: 28, icon: <Calendar className="h-5 w-5" /> },
  { id: 3, type: "Personal Leave", count: 8, icon: <Clock className="h-5 w-5" /> },
  { id: 4, type: "Business Travel", count: 12, icon: <CheckCircle className="h-5 w-5" /> },
];

const Absentee = () => {
  const { user, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAbsenceDialogOpen, setIsAbsenceDialogOpen] = useState(false);
  const [isEarlyMorningDialogOpen, setIsEarlyMorningDialogOpen] = useState(false);
  const [newAbsence, setNewAbsence] = useState({
    name: "",
    role: "",
    reason: "",
    startDate: "",
    endDate: "",
    details: "",
    type: "Sick Leave"
  });

  // Filter absences based on search term and status
  const filteredAbsences = absences.filter(absence => {
    const matchesSearch = 
      absence.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      absence.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      absence.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "all" || 
      absence.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAbsence({ ...newAbsence, [name]: value });
  };

  // Handle radio button change
  const handleTypeChange = (value: string) => {
    setNewAbsence({ ...newAbsence, type: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Leave request submitted successfully");
    setIsAbsenceDialogOpen(false);
    setNewAbsence({
      name: "",
      role: "",
      reason: "",
      startDate: "",
      endDate: "",
      details: "",
      type: "Sick Leave"
    });
  };

  return (
    <div className="page-transition space-y-6">
      <PageHeader 
        title="Absence Management" 
        subtitle="Track and manage team absences"
        requiredRole={["admin", "manager"]}
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={isEarlyMorningDialogOpen} onOpenChange={setIsEarlyMorningDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-hover">
                <AlarmClock className="mr-2 h-4 w-4" /> Early Morning Absence
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Early Morning Absence Request</DialogTitle>
                <DialogDescription>
                  Submit absence details for early morning (before 7 AM)
                </DialogDescription>
              </DialogHeader>
              <EarlyMorningAbsenceForm onClose={() => setIsEarlyMorningDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          
          {hasPermission(['admin', 'manager']) && (
            <Dialog open={isAbsenceDialogOpen} onOpenChange={setIsAbsenceDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-hover" variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Record Absence
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Record New Absence</DialogTitle>
                    <DialogDescription>
                      Submit absence details. All fields are required.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Employee Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={newAbsence.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Position/Role</Label>
                        <Input
                          id="role"
                          name="role"
                          value={newAbsence.role}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Absence Type</Label>
                      <RadioGroup 
                        value={newAbsence.type} 
                        onValueChange={handleTypeChange}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Sick Leave" id="sick" />
                          <Label htmlFor="sick">Sick Leave</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Annual Leave" id="annual" />
                          <Label htmlFor="annual">Annual Leave</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Personal Leave" id="personal" />
                          <Label htmlFor="personal">Personal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Business Travel" id="business" />
                          <Label htmlFor="business">Business</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason</Label>
                      <Input
                        id="reason"
                        name="reason"
                        value={newAbsence.reason}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          name="startDate"
                          type="date"
                          value={newAbsence.startDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          name="endDate"
                          type="date"
                          value={newAbsence.endDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="details">Additional Details</Label>
                      <Textarea
                        id="details"
                        name="details"
                        value={newAbsence.details}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAbsenceDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit Request</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {leaveStats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.type}
            value={stat.count}
            icon={stat.icon}
            description="Total days this year"
            variant={stat.id === 1 ? "warning" : stat.id === 2 ? "primary" : stat.id === 3 ? "info" : "success"}
          />
        ))}
      </div>

      <Tabs defaultValue="all" className="w-full animate-fadeIn">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
          <TabsList>
            <TabsTrigger value="all">All Absences</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search" 
                placeholder="Search employees..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[160px]">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>{filterStatus === "all" ? "All Statuses" : filterStatus}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all">
          <AnimatedCard animate="fadeIn" hover={false}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Employee</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Type</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Reason</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Duration</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-navy-700">
                  {filteredAbsences.length > 0 ? (
                    filteredAbsences.map((absence) => {
                      // Format dates
                      const startDate = new Date(absence.startDate).toLocaleDateString();
                      const endDate = new Date(absence.endDate).toLocaleDateString();
                      const sameDayAbsence = absence.startDate === absence.endDate;
                      
                      return (
                        <tr key={absence.id} className="hover:bg-gray-50 dark:hover:bg-navy-700/50">
                          <td className="px-3 py-4 text-sm">
                            <div className="flex items-center">
                              <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center mr-3">
                                {absence.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{absence.name}</div>
                                <div className="text-gray-500 dark:text-gray-400">{absence.role}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-100">
                            {absence.type}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {absence.reason}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {sameDayAbsence ? startDate : `${startDate} - ${endDate}`}
                          </td>
                          <td className="px-3 py-4 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              absence.status === "Approved" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                                : absence.status === "Pending"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                  : absence.status === "Completed"
                                    ? "bg-pageo-blue/20 text-pageo-blue dark:bg-pageo-blue/30 dark:text-pageo-blue"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            }`}>
                              {absence.status}
                            </span>
                          </td>
                          <td className="px-3 py-4 text-sm">
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-pageo-blue dark:text-pageo-blue">
                              Details
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-3 py-4 text-sm text-center text-gray-500 dark:text-gray-400">
                        No absences found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </AnimatedCard>
          
          {hasPermission(['admin', 'manager']) && (
            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline" className="text-sm flex items-center space-x-1">
                <Download className="h-4 w-4 mr-1" />
                Export Report
              </Button>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredAbsences.length} of {absences.length} absences
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending">
          <AnimatedCard animate="fadeIn">
            {/* Similar table but filtered for pending approvals */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Employee</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Type</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Reason</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Duration</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-navy-700">
                  {absences.filter(a => a.status === "Pending").map((absence) => {
                    // Format dates
                    const startDate = new Date(absence.startDate).toLocaleDateString();
                    const endDate = new Date(absence.endDate).toLocaleDateString();
                    const sameDayAbsence = absence.startDate === absence.endDate;
                    
                    return (
                      <tr key={absence.id} className="hover:bg-gray-50 dark:hover:bg-navy-700/50">
                        <td className="px-3 py-4 text-sm">
                          <div className="flex items-center">
                            <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center mr-3">
                              {absence.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{absence.name}</div>
                              <div className="text-gray-500 dark:text-gray-400">{absence.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-100">
                          {absence.type}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {absence.reason}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {sameDayAbsence ? startDate : `${startDate} - ${endDate}`}
                        </td>
                        <td className="px-3 py-4 text-sm flex space-x-2">
                          {hasPermission(['admin', 'manager']) ? (
                            <>
                              <Button size="sm" className="h-8 px-3 bg-green-600 hover:bg-green-700 text-white">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 px-3 border-red-200 text-red-600 hover:bg-red-50">
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          ) : (
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-pageo-blue dark:text-pageo-blue">
                              Details
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </AnimatedCard>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <AnimatedCard animate="fadeIn">
            {/* Calendar view for upcoming absences */}
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Calendar view for upcoming absences will be implemented in the next phase.
            </div>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Absentee;
