import React from 'react';
import { Utensils, Calendar, ClipboardList } from 'lucide-react';

const DietCreation: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Creazione Dieta</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <FeatureCard
          icon={<Utensils size={32} />}
          title="Pianificazione Pasti"
          description="Crea piani alimentari personalizzati per i tuoi clienti."
        />
        <FeatureCard
          icon={<Calendar size={32} />}
          title="Programmazione Settimanale"
          description="Organizza le diete su base settimanale o mensile."
        />
        <FeatureCard
          icon={<ClipboardList size={32} />}
          title="Monitoraggio Progressi"
          description="Tieni traccia dei progressi e adatta le diete nel tempo."
        />
      </div>
      <p className="text-center text-gray-600">
        Questa sezione è in fase di sviluppo. Presto potrai creare e gestire le diete per i tuoi clienti direttamente da qui.
      </p>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-gradient-to-br from-purple-400 to-indigo-600 p-6 rounded-xl text-white shadow-lg hover-lift">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p>{description}</p>
  </div>
);

export default DietCreation;