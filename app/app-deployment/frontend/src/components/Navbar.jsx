const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
      <div className="flex items-center gap-3">
        <span className="text-gray-600 text-sm">Welcome</span>
        <img
          src="https://avatars.githubusercontent.com/u/9919?v=4"
          alt="profile"
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Navbar;
