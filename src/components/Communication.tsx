import React from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';

const Communication: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Comunicazione con i Clienti</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CommunicationCard
          title="Gmail"
          description="Invia email ai tuoi clienti direttamente dall'app."
          icon={<Mail size={32} />}
          color="blue"
        />
        <CommunicationCard
          title="WhatsApp"
          description="Invia messaggi WhatsApp ai tuoi clienti."
          icon={<MessageCircle size={32} />}
          color="green"
        />
        <CommunicationCard
          title="Telegram"
          description="Invia messaggi Telegram ai tuoi clienti."
          icon={<Send size={32} />}
          color="blue"
        />
      </div>
      <p className="mt-8 text-center text-gray-600">
        Nota: L'integrazione con le API di Gmail, WhatsApp e Telegram è in fase di sviluppo. 
        Presto sarai in grado di comunicare con i tuoi clienti direttamente da questa interfaccia.
      </p>
    </div>
  );
};

interface CommunicationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'green';
}

const CommunicationCard: React.FC<CommunicationCardProps> = ({ title, description, icon, color }) => {
  const gradientClass = color === 'blue' 
    ? 'from-blue-400 to-indigo-600'
    : 'from-green-400 to-emerald-600';

  return (
    <div className={`bg-gradient-to-br ${gradientClass} p-6 rounded-xl text-white shadow-lg hover-lift`}>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3">{title}</h3>
      </div>
      <p className="mb-6">{description}</p>
      <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors duration-300">
        Configura {title}
      </button>
    </div>
  );
};

export default Communication;