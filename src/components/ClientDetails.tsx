import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SupabaseClient } from '@supabase/supabase-js';
import { User, Mail, Phone, MapPin, Edit, Save } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  image_url: string;
}

interface ClientDetailsProps {
  supabase: SupabaseClient;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ supabase }) => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      fetchClientDetails(parseInt(id));
    }
  }, [id]);

  const fetchClientDetails = async (clientId: number) => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .single();

    if (error) {
      console.error('Error fetching client details:', error);
    } else {
      setClient(data);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (client) {
      const { error } = await supabase
        .from('clients')
        .update(client)
        .eq('id', client.id);

      if (error) {
        console.error('Error updating client:', error);
      } else {
        setIsEditing(false);
      }
    }
  };

  if (!client) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Dettagli Cliente</h2>
        {isEditing ? (
          <button onClick={handleSave} className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full flex items-center hover-lift button-shine">
            <Save className="mr-2" size={20} />
            Salva
          </button>
        ) : (
          <button onClick={handleEdit} className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full flex items-center hover-lift button-shine">
            <Edit className="mr-2" size={20} />
            Modifica
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full overflow-hidden shadow-lg">
            {client.image_url ? (
              <img src={client.image_url} alt={client.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={64} className="text-white opacity-50" />
              </div>
            )}
          </div>
        </div>
        <div className="md:w-2/3 md:pl-8">
          <ClientField
            label="Nome"
            value={client.name}
            isEditing={isEditing}
            onChange={(value) => setClient({ ...client, name: value })}
            icon={<User className="text-gray-400" size={20} />}
          />
          <ClientField
            label="Email"
            value={client.email}
            isEditing={isEditing}
            onChange={(value) => setClient({ ...client, email: value })}
            icon={<Mail className="text-gray-400" size={20} />}
          />
          <ClientField
            label="Telefono"
            value={client.phone}
            isEditing={isEditing}
            onChange={(value) => setClient({ ...client, phone: value })}
            icon={<Phone className="text-gray-400" size={20} />}
          />
          <ClientField
            label="Indirizzo"
            value={client.address}
            isEditing={isEditing}
            onChange={(value) => setClient({ ...client, address: value })}
            icon={<MapPin className="text-gray-400" size={20} />}
          />
        </div>
      </div>
    </div>
  );
};

interface ClientFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  icon: React.ReactNode;
}

const ClientField: React.FC<ClientFieldProps> = ({ label, value, isEditing, onChange, icon }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
      <span className="px-3 py-2 bg-gray-100">{icon}</span>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="w-full px-3 py-2 text-gray-800">{value}</p>
      )}
    </div>
  </div>
);

export default ClientDetails;