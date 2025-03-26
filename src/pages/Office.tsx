
import { useState } from "react";
import { 
  CheckCircle, 
  Clock, 
  Coffee, 
  Download, 
  Home, 
  Laptop, 
  Plus, 
  Search, 
  User, 
  UserMinus,
  UserPlus
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import AnimatedCard from "@/components/shared/AnimatedCard";
import StatCard from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Sample office attendance data
const employees = [
  { 
    id: "1", 
    name: "Budi Santoso", 
    role: "HR Manager", 
    status: "In Office", 
    checkInTime: "08:15", 
    department: "Human Resources",
    location: "Jakarta HQ - Floor 3"
  },
  { 
    id: "2", 
    name: "Dewi Putri", 
    role: "Data Analyst", 
    status: "In Office", 
    checkInTime: "09:02", 
    department: "Data Processing",
    location: "Jakarta HQ - Floor 2"
  },
  { 
    id: "3", 
    name: "Ahmad Rizal", 
    role: "Survey Engineer", 
    status: "On Site", 
    checkInTime: "", 
    department: "Field Operations",
    location: "Sulawesi Platform Alpha"
  },
  { 
    id: "4", 
    name: "Siti Aminah", 
    role: "Project Manager", 
    status: "Remote", 
    checkInTime: "08:45", 
    department: "Project Management",
    location: "Working from Home"
  },
  { 
    id: "5", 
    name: "Joko Widodo", 
    role: "Marine Biologist", 
    status: "In Office", 
    checkInTime: "07:59", 
    department: "Research",
    location: "Jakarta HQ - Floor 1 (Lab)"
  },
  { 
    id: "6", 
    name: "Dian Sastro", 
    role: "Safety Officer", 
    status: "On Leave", 
    checkInTime: "", 
    department: "Safety & Compliance",
    location: ""
  },
  { 
    id: "7", 
    name: "Michael Tan", 
    role: "Finance Director", 
    status: "In Office", 
    checkInTime: "08:30", 
    department: "Finance",
    location: "Jakarta HQ - Floor 4"
  },
  { 
    id: "8", 
    name: "Rina Wati", 
    role: "Administrative Assistant", 
    status: "In Office", 
    checkInTime: "08:20", 
    department: "Administration",
    location: "Jakarta HQ - Floor 3"
  },
  { 
    id: "9", 
    name: "Agus Suryadi", 
    role: "IT Support", 
    status: "Remote", 
    checkInTime: "09:15", 
    department: "Information Technology",
    location: "Working from Home"
  },
  { 
    id: "10", 
    name: "Lisa Chen", 
    role: "Accountant", 
    status: "In Office", 
    checkInTime: "08:05", 
    department: "Finance",
    location: "Jakarta HQ - Floor 4"
  },
];

// Sample departments
const departments = [
  { id: "1", name: "Human Resources", employeeCount: 3, manager: "Budi Santoso", floor: "3" },
  { id: "2", name: "Data Processing", employeeCount: 5, manager: "Sarah Johnson", floor: "2" },
  { id: "3", name: "Field Operations", employeeCount: 12, manager: "John Smith", floor: "1" },
  { id: "4", name: "Project Management", employeeCount: 4, manager: "Siti Aminah", floor: "3" },
  { id: "5", name: "Research", employeeCount: 7, manager: "Dr. Wilson", floor: "1" },
  { id: "6", name: "Safety & Compliance", employeeCount: 3, manager: "Dian Sastro", floor: "2" },
  { id: "7", name: "Finance", employeeCount: 6, manager: "Michael Tan", floor: "4" },
  { id: "8", name: "Administration", employeeCount: 4, manager: "Anna Lee", floor: "3" },
  { id: "9", name: "Information Technology", employeeCount: 5, manager: "Ravi Kumar", floor: "2" },
];

// Calculate statistics
const totalEmployees = employees.length;
const inOffice = employees.filter(emp => emp.status === "In Office").length;
const remote = employees.filter(emp => emp.status === "Remote").length;
const onSite = employees.filter(emp => emp.status === "On Site").length;
const onLeave = employees.filter(emp => emp.status === "On Leave").length;

const Office = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  
  // Filter employees based on search term and status
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "all" || 
      employee.status.toLowerCase().replace(/\s+/g, '-') === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Handle check-in
  const handleCheckIn = () => {
    const now = new Date();
    const formattedTime = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
    
    toast.success("Check-in successful at " + formattedTime);
    setIsCheckInDialogOpen(false);
  };

  return (
    <div className="page-transition space-y-6">
      <PageHeader 
        title="Office Attendance" 
        subtitle="Track and manage in-office personnel"
      >
        <div className="flex space-x-2">
          <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-hover">
                <Clock className="mr-2 h-4 w-4" /> Check In
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Office Check-In</DialogTitle>
                <DialogDescription>
                  Register your attendance for today.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Work Location</Label>
                  <Select defaultValue="office">
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">In Office (Jakarta HQ)</SelectItem>
                      <SelectItem value="remote">Remote Work</SelectItem>
                      <SelectItem value="site">On Site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="floor">Office Floor</Label>
                  <Select defaultValue="3">
                    <SelectTrigger id="floor">
                      <SelectValue placeholder="Select floor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Floor 1</SelectItem>
                      <SelectItem value="2">Floor 2</SelectItem>
                      <SelectItem value="3">Floor 3</SelectItem>
                      <SelectItem value="4">Floor 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input id="notes" placeholder="Any additional information" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCheckInDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCheckIn}>Check In</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="btn-hover">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="In Office"
          value={inOffice}
          icon={<Home className="h-5 w-5" />}
          description={`${Math.round((inOffice/totalEmployees)*100)}% of team present`}
          variant="primary"
        />
        <StatCard 
          title="Remote Work"
          value={remote}
          icon={<Laptop className="h-5 w-5" />}
          description="Working from home"
          variant="info"
        />
        <StatCard 
          title="On Site"
          value={onSite}
          icon={<User className="h-5 w-5" />}
          description="Deployed to field locations"
          variant="warning"
        />
        <StatCard 
          title="On Leave"
          value={onLeave}
          icon={<Coffee className="h-5 w-5" />}
          description="Absent today"
          variant="secondary"
        />
      </div>

      <Tabs defaultValue="attendance" className="w-full animate-fadeIn">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
          <TabsList>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
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
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="in-office">In Office</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="on-site">On Site</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="attendance">
          <AnimatedCard animate="fadeIn" hover={false}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Employee</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Department</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Location</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Check-In Time</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-navy-700">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-navy-700/50">
                        <td className="px-3 py-4 text-sm">
                          <div className="flex items-center">
                            <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center mr-3">
                              {employee.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-gray-500 dark:text-gray-400">{employee.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {employee.department}
                        </td>
                        <td className="px-3 py-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            employee.status === "In Office" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                              : employee.status === "Remote"
                                ? "bg-marine-100 text-marine-800 dark:bg-marine-900/30 dark:text-marine-300"
                                : employee.status === "On Site"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          }`}>
                            <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                              employee.status === "In Office" 
                                ? "bg-green-500" 
                                : employee.status === "Remote"
                                  ? "bg-marine-500"
                                  : employee.status === "On Site"
                                    ? "bg-amber-500"
                                    : "bg-gray-500"
                            }`} />
                            {employee.status}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {employee.location || "—"}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {employee.checkInTime || "—"}
                        </td>
                        <td className="px-3 py-4 text-sm">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2 text-marine-600 dark:text-marine-300"
                            disabled={employee.status === "On Leave" || employee.status === "On Site"}
                          >
                            {employee.status === "In Office" ? "Check Out" : "Edit Status"}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-3 py-4 text-sm text-center text-gray-500 dark:text-gray-400">
                        No employees found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </AnimatedCard>
          
          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" className="text-sm flex items-center space-x-1">
              <Download className="h-4 w-4 mr-1" />
              Export Attendance
            </Button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredEmployees.length} of {employees.length} employees
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="departments">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <AnimatedCard 
                key={dept.id} 
                title={dept.name}
                description={`Floor ${dept.floor} • ${dept.employeeCount} Employees`}
                animate="fadeIn"
                delay={`${parseInt(dept.id) * 0.1}s`}
                footer={
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Manager: {dept.manager}</span>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-marine-600 dark:text-marine-300">
                      View Details
                    </Button>
                  </div>
                }
              >
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <UserPlus className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{Math.round(inOffice/totalEmployees * dept.employeeCount)} Present</span>
                    </div>
                    <div className="flex items-center">
                      <UserMinus className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm">{dept.employeeCount - Math.round(inOffice/totalEmployees * dept.employeeCount)} Absent</span>
                    </div>
                  </div>
                  
                  <div className="relative h-14 w-14">
                    <div className="absolute inset-0 rounded-full bg-marine-100 dark:bg-marine-900/20 flex items-center justify-center">
                      <span className="text-lg font-semibold text-marine-600 dark:text-marine-300">
                        {Math.round((inOffice/totalEmployees) * 100)}%
                      </span>
                    </div>
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        className="text-marine-200 dark:text-marine-800/30" 
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        strokeDasharray={`${Math.round((inOffice/totalEmployees) * 251.2)} 251.2`} 
                        strokeDashoffset="0" 
                        className="text-marine-500 dark:text-marine-400" 
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)" 
                      />
                    </svg>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedCard title="Daily Attendance Report" animate="slideUp">
              <div className="space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generate and download attendance reports
                </p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportDepartment">Department</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="reportDepartment">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end pt-2">
                  <Button className="btn-hover" onClick={() => toast.success("Report generated successfully")}>
                    <Download className="mr-2 h-4 w-4" /> Generate Report
                  </Button>
                </div>
              </div>
            </AnimatedCard>
            
            <AnimatedCard title="Attendance Metrics" animate="slideUp" delay="0.1s">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Attendance Rate</span>
                    <span className="font-medium">{Math.round((inOffice/totalEmployees)*100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-marine-500 rounded-full" 
                      style={{ width: `${Math.round((inOffice/totalEmployees)*100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Remote Work Rate</span>
                    <span className="font-medium">{Math.round((remote/totalEmployees)*100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${Math.round((remote/totalEmployees)*100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Field Deployment Rate</span>
                    <span className="font-medium">{Math.round((onSite/totalEmployees)*100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full" 
                      style={{ width: `${Math.round((onSite/totalEmployees)*100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Absence Rate</span>
                    <span className="font-medium">{Math.round((onLeave/totalEmployees)*100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gray-500 rounded-full" 
                      style={{ width: `${Math.round((onLeave/totalEmployees)*100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full btn-hover">
                    <CheckCircle className="mr-2 h-4 w-4" /> View Detailed Metrics
                  </Button>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Office;
