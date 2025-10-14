import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Menu } from "lucide-react";

const DashboardLayout = ({ links, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className={`fixed inset-y-0 left-0 z-40 transform bg-white shadow-lg transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:w-64`}
      >
        <Sidebar links={links} />
      </div>

      <div className="flex flex-col flex-1 min-h-screen">
        <Navbar />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden absolute top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg"
        >
          <Menu size={20} />
        </button>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
