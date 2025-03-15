const Header = ()=>{
    return <>
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            // onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Main Station Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">John Doe</span>
            <img
              className="w-10 h-10 rounded-full"
              src="https://via.placeholder.com/40"
              alt="User avatar"
            />
          </div>
        </header>
    </>
};
export default Header;