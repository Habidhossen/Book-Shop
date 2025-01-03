const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>Dashboard Navbar</div>
      {children}
      <div>Dashboard Footer</div>
    </>
  );
};

export default DashboardLayout;
