import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RegistrationForm } from './components/RegistrationForm';

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background font-display text-text-main selection:bg-primary selection:text-white">
      <Header />
      <main className="flex flex-col items-center w-full grow bg-background">
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
