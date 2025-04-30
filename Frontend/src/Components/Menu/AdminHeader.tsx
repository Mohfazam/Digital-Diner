import { Utensils, Lock } from 'lucide-react';

interface AdminHeaderProps {
  isAdmin: boolean;
  toggleAdminMode: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ isAdmin, toggleAdminMode }) => (
  <div className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Utensils className="text-amber-600" />
        The Digital Diner
      </h1>
      <button
        onClick={toggleAdminMode}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          isAdmin 
            ? 'bg-amber-600 text-white shadow-md hover:bg-amber-700' 
            : 'bg-white text-gray-600 shadow-sm hover:shadow-md hover:-translate-y-0.5'
        }`}
      >
        <Lock className="w-4 h-4" />
        <span className="text-sm font-medium">
          {isAdmin ? 'Admin Mode' : 'Enable Admin'}
        </span>
      </button>
    </div>
  </div>
);

export default AdminHeader;