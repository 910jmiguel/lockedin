import Link from "next/link";
import Todo from "./widgets/Todo";

const QuickDashboard = () => {
  return (
    <div className="flex flex-col gap-2 mt-6">

      <h2 className="font-bold text-2xl">Quick Dashboard</h2>
      <Link
        href="/dashboard/courses"
        className="bg-zinc-700 p-2 text-sm rounded-sm w-1/3 hover:bg-zinc-600 transition-colors font-semibold mt-1"
      >
        Courses
      </Link>
      <Link
        href="/dashboard/contacts"
        className="bg-zinc-700 p-2 text-sm rounded-sm w-1/3 hover:bg-zinc-600 transition-colors font-semibold"
      >
        Contacts
      </Link>
      <Link
        href="/dashboard/extra-notes"
        className="bg-zinc-700 p-2 text-sm rounded-sm w-1/3 hover:bg-zinc-600 transition-colors font-semibold"
      >
        Extra Notes
      </Link>
      <Link
        href="/dashboard/settings"
        className="bg-zinc-700 p-2 text-sm rounded-sm w-1/3 hover:bg-zinc-600 transition-colors font-semibold"
      >
        Settings
      </Link>

      <div>
        <Todo />
      </div>

    </div>
  );
};

export default QuickDashboard;
