import Navbar from "@/../../src/components/Navbar";
import Sidebar from "@/../../src/components/Sidebar";
import { Toaster } from "@/src/components/ui/sonner";

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <main className="w-full pt-16">
          {children}
          <Toaster richColors />
        </main>
      </div>
    </>
  );
};

export default LayoutDashboard;
