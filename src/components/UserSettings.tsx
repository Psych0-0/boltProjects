import React, { useState, useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { User, Mail, Lock } from 'lucide-react';

interface UserSettingsProps {
  supabase: SupabaseClient;
}

const UserSettings: React.FC<UserSettingsProps> = ({ supabase }) => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setName(user.user_metadata.name || '');
      setEmail(user.email || '');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({
      email: email,
      password: password,
      data: { name: name }
    });

    if (error) {
      console.error('Error updating profile:', error);
    } else {
      alert('Profilo aggiornato con successo!');
      setPassword('');
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Impostazioni Utente</h2>
      <form onSubmit={handleUpdateProfile}>
        <InputField
          id="name"
          label="Nome"
          type="text"
          value={name}
          onChange={setName}
          icon={<User className="text-gray-400" size={20} />}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          icon={<Mail className="text-gray-400" size={20} />}
        />
        <InputField
          id="password"
          label="Nuova Password (lascia vuoto per non modificare)"
          type="password"
          value={password}
          onChange={setPassword}
          icon={<Lock className="text-gray-400" size={20} />}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-full hover-lift button-shine mt-6"
        >
          Aggiorna Profilo
        </button>
      </form>
    </div>
  );
};

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange, icon }) => (
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
      <span className="px-3 py-2 bg-gray-100">{icon}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required={type !== 'password'}
      />
    </div>
  </div>
);

export default UserSettings;