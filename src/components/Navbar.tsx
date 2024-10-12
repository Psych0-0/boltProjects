import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Settings, Utensils, MessageSquare } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">ClienteApp</Link>
        <div className="flex space-x-6">
          <NavLink to="/clients" icon={<Users size={20} />} text="Clienti" />
          <NavLink to="/diet" icon={<Utensils size={20} />} text="Diete" />
          <NavLink to="/communication" icon={<MessageSquare size={20} />} text="Comunicazione" />
          <NavLink to="/settings" icon={<Settings size={20} />} text="Impostazioni" />
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string }> = ({ to, icon, text }) => (
  <Link 
    to={to} 
    className="flex items-center hover:text-white transition-colors duration-300 ease-in-out group"
  >
    <span className="mr-2 transform group-hover:scale-110 transition-transform duration-300 ease-in-out">
      {icon}
    </span>
    <span className="font-medium">{text}</span>
  </Link>
);

export default Navbar;