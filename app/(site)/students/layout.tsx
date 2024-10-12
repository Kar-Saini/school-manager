const StudentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-col m-4 p-4 gap-y-4">
      <h1 className="text-2xl font-semibold">Student Dashboard</h1>
      {children}
    </div>
  );
};

export default StudentLayout;
