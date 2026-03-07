import { useAuth } from "../contexts/useAuth.js";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold hover:text-gray-300">
              Task Tracker
            </Link>
            
            {/* Mobile menu button - could be expanded for more options */}
            <div className="sm:hidden">
              <span className="text-sm text-gray-300">{user?.name}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
            <span className="text-sm text-gray-300 hidden sm:inline">
              Welcome, {user?.name}
            </span>
            
            <div className="flex flex-wrap items-center gap-2">
              {user?.role === "admin" && (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-gray-700">
                    Admin Panel
                  </Button>
                </Link>
              )}
              
              <Button 
                variant="danger" 
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;