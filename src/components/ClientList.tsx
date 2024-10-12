import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SupabaseClient } from '@supabase/supabase-js';
import { User, UserPlus } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  email: string;
  image_url: string;
}

interface ClientListProps {
  supabase: SupabaseClient;
}

const ClientList: React.FC<ClientListProps> = ({ supabase }) => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching clients:', error);
    } else {
      setClients(data || []);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Lista Clienti</h2>
        <Link 
          to="/clients/new" 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full flex items-center hover-lift button-shine"
        >
          <UserPlus className="mr-2" size={20} />
          Nuovo Cliente
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {clients.map((client) => (
          <Link 
            key={client.id} 
            to={`/clients/${client.id}`} 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ease-in-out"
          >
            <div className="h-48 bg-gradient-to-br from-purple-400 to-indigo-500">
              {client.image_url ? (
                <img src={client.image_url} alt={client.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={64} className="text-white opacity-50" />
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg mb-1 text-gray-800">{client.name}</h3>
              <p className="text-gray-600 text-sm">{client.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClientList;