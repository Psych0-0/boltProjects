import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { SupabaseClient } from '@supabase/supabase-js';

interface LoginProps {
  supabase: SupabaseClient;
}

const Login: React.FC<LoginProps> = ({ supabase }) => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Accedi o Registrati</h2>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'facebook']}
      />
    </div>
  );
};

export default Login;