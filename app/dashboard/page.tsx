import { Logout } from "../components/logout";
import QuickDashboard from "../components/QuickDashboard";

export default function Dashboard() {
    return (
        <div className="font-inter mx-30 mt-20">
            <Logout />

            {/* Main title of dashboard */}
            <div>
                <h1 className="text-4xl font-bold">Student Dashboard</h1>
                <QuickDashboard />
            </div>
        </div>
    )
}