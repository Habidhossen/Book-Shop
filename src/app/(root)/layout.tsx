import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default DashboardLayout;
