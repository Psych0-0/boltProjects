import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Login from './components/Login';
import ClientList from './components/ClientList';
import ClientDetails from './components/ClientDetails';
import UserSettings from './components/UserSettings';
import DietCreation from './components/DietCreation';
import Communication from './components/Communication';
import Navbar from './components/Navbar';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Login supabase={supabase} />} />
            <Route path="/clients" element={<ClientList supabase={supabase} />} />
            <Route path="/clients/:id" element={<ClientDetails supabase={supabase} />} />
            <Route path="/settings" element={<UserSettings supabase={supabase} />} />
            <Route path="/diet" element={<DietCreation />} />
            <Route path="/communication" element={<Communication />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;