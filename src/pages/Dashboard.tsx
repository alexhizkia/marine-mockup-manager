
import { useState } from "react";
import { 
  Activity, 
  AlertTriangle, 
  Calendar, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Ship, 
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/shared/PageHeader";
import AnimatedCard from "@/components/shared/AnimatedCard";
import StatCard from "@/components/shared/StatCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data for charts
const performanceData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 280 },
  { name: "May", value: 590 },
  { name: "Jun", value: 800 },
  { name: "Jul", value: 950 },
  { name: "Aug", value: 870 },
  { name: "Sep", value: 910 },
  { name: "Oct", value: 1050 },
  { name: "Nov", value: 980 },
  { name: "Dec", value: 850 },
];

// Sample upcoming projects
const upcomingProjects = [
  {
    id: "1",
    name: "Offshore Mapping - Sulawesi",
    status: "In Progress",
    date: "Oct 15 - Nov 28",
    progress: 45,
    priority: "High",
    team: 8,
  },
  {
    id: "2",
    name: "Bathymetric Survey - Makassar",
    status: "Planned",
    date: "Nov 5 - Dec 20",
    progress: 0,
    priority: "Medium",
    team: 5,
  },
  {
    id: "3",
    name: "Environmental Assessment - Bali",
    status: "In Progress",
    date: "Oct 1 - Oct 30",
    progress: 78,
    priority: "Medium",
    team: 4,
  },
  {
    id: "4",
    name: "Coastal Mapping - Papua",
    status: "Planned",
    date: "Dec 10 - Jan 25",
    progress: 0,
    priority: "High",
    team: 7,
  },
];

// Sample recent absentees
const recentAbsentees = [
  {
    id: "1",
    name: "Budi Santoso",
    role: "Diver",
    reason: "Sick Leave",
    date: "Oct 12 - Oct 14",
    status: "Approved",
  },
  {
    id: "2",
    name: "Dewi Putri",
    role: "Data Analyst",
    reason: "Personal Leave",
    date: "Oct 15",
    status: "Pending",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Get current date in a nice format
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="page-transition space-y-6">
      <PageHeader 
        title="Dashboard" 
        subtitle={`Today is ${currentDate}`}
      >
        <Button className="btn-hover" onClick={() => navigate("/projects")}>
          <Calendar className="mr-2 h-4 w-4" /> View Schedule
        </Button>
      </PageHeader>

      <Tabs defaultValue="overview" className="w-full animate-fadeIn" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Active Projects"
              value="12"
              icon={<Activity className="h-5 w-5" />}
              description="2 projects due this month"
              change="+3"
              changeType="increase"
              variant="primary"
            />
            <StatCard 
              title="Team Members"
              value="34"
              icon={<Users className="h-5 w-5" />}
              description="8 on leave today"
              change="-2"
              changeType="decrease"
              variant="info"
            />
            <StatCard 
              title="Vessels Deployed"
              value="5"
              icon={<Ship className="h-5 w-5" />}
              description="2 ready for deployment"
              variant="warning"
            />
            <StatCard 
              title="Sites Active"
              value="7"
              icon={<MapPin className="h-5 w-5" />}
              description="Across 4 provinces"
              variant="success"
            />
          </div>

          {/* Charts and upcoming */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnimatedCard 
              title="Performance Overview" 
              className="lg:col-span-2"
              animate="slideUp"
              hover={false}
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(0,0,0,0.5)" fontSize={12} />
                    <YAxis stroke="rgba(0,0,0,0.5)" fontSize={12} />
                    <Tooltip contentStyle={{ background: 'white', borderRadius: '8px', border: '1px solid #eee' }} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0ea5e9" 
                      fill="url(#colorValue)" 
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </AnimatedCard>
            
            <AnimatedCard 
              title="Upcoming Deadlines" 
              description="Next 7 days" 
              animate="slideUp"
              delay="0.1s"
            >
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Bathymetric Report</p>
                    <p className="text-xs text-muted-foreground">Due in 2 days</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30">
                  <Clock className="h-5 w-5 text-red-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Equipment Maintenance</p>
                    <p className="text-xs text-muted-foreground">Overdue by 1 day</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-marine-50 dark:bg-marine-900/20 rounded-lg border border-marine-100 dark:border-marine-800/30">
                  <Calendar className="h-5 w-5 text-marine-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Team Briefing</p>
                    <p className="text-xs text-muted-foreground">Tomorrow at 09:00</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View All Deadlines
                </Button>
              </div>
            </AnimatedCard>
          </div>

          {/* Recent absentees */}
          <AnimatedCard 
            title="Recent Absentees" 
            description="Last 7 days"
            animate="slideUp"
            delay="0.2s"
            footer={
              <Button variant="link" className="ml-auto" onClick={() => navigate("/absentee")}>
                View All Absences
              </Button>
            }
          >
            <div className="space-y-4">
              {recentAbsentees.map((absentee) => (
                <div 
                  key={absentee.id}
                  className="flex items-center justify-between border-b border-gray-100 dark:border-navy-700 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-navy-700">
                      {absentee.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{absentee.name}</p>
                      <p className="text-xs text-muted-foreground">{absentee.role} • {absentee.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground mr-3">{absentee.date}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      absentee.status === "Approved" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                    }`}>
                      {absentee.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-6">
          <AnimatedCard title="Active Projects" animate="fadeIn">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Project</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Timeline</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Progress</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Team</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-navy-700">
                  {upcomingProjects.map((project) => (
                    <tr 
                      key={project.id} 
                      className="hover:bg-gray-50 dark:hover:bg-navy-700/50 cursor-pointer"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <td className="px-3 py-4 text-sm">
                        <div className="font-medium">{project.name}</div>
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === "In Progress" 
                            ? "bg-marine-100 text-marine-800 dark:bg-marine-900/30 dark:text-marine-300" 
                            : "bg-gray-100 text-gray-800 dark:bg-navy-700 dark:text-gray-300"
                        }`}>
                          {project.status === "In Progress" && (
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-marine-500"></span>
                          )}
                          {project.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {project.date}
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
                      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {project.team} members
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.priority === "High" 
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                        }`}>
                          {project.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pt-4 flex justify-center">
              <Button onClick={() => navigate("/projects")}>
                View All Projects
              </Button>
            </div>
          </AnimatedCard>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="On Site"
              value="16"
              icon={<MapPin className="h-5 w-5" />}
              description="Currently deployed personnel"
              variant="primary"
            />
            <StatCard 
              title="In Office"
              value="10"
              icon={<CheckCircle className="h-5 w-5" />}
              description="Present at headquarters"
              variant="success"
            />
            <StatCard 
              title="Absent"
              value="8"
              icon={<AlertTriangle className="h-5 w-5" />}
              description="On leave or sick"
              variant="warning"
            />
          </div>
          
          <AnimatedCard 
            title="Team Management" 
            description="Quick actions for team coordination"
            animate="slideUp"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center space-y-2 btn-hover"
                onClick={() => navigate("/absentee")}
              >
                <AlertTriangle className="h-6 w-6" />
                <span>Track Absences</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center space-y-2 btn-hover"
                onClick={() => navigate("/onsite")}
              >
                <MapPin className="h-6 w-6" />
                <span>Field Teams</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center space-y-2 btn-hover"
                onClick={() => navigate("/office")}
              >
                <CheckCircle className="h-6 w-6" />
                <span>Office Attendance</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center space-y-2 btn-hover"
                onClick={() => navigate("/projects")}
              >
                <Calendar className="h-6 w-6" />
                <span>Schedule</span>
              </Button>
            </div>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
