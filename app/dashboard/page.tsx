import { Logout } from "../components/logout";
import QuickDashboard from "../components/QuickDashboard";
import Todo from "../components/widgets/Todo";

export default function Dashboard() {
  return (
    <div className="min-h-screen text-white font-inter mx-30 mt-20">
      <div className="container mx-auto px-6 py-8">

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold">My Student Dashboard</h1>
          </div>
          <Logout />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <QuickDashboard />
          </div>
          <div className="lg:col-span-1">
            <Todo />
          </div>
        </div>

      </div>
    </div>
  );
}
