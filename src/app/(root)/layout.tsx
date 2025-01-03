const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>Navbar</div>
      {children}
      <div>Footer</div>
    </>
  );
};

export default DashboardLayout;
