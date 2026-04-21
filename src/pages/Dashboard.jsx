import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../ResumeContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data } = useResume();

  const navCards = [
    { 
      id: 'profile', 
      title: 'Personal Info', 
      subtitle: 'Hero & Summary', 
      icon: 'person', 
      path: '/profile',
      color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300'
    },
    { 
      id: 'history', 
      title: 'Experience', 
      subtitle: 'Work & Timeline', 
      icon: 'work', 
      path: '/experience',
      color: 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
    },
    { 
      id: 'expertise', 
      title: 'Skills & Stack', 
      subtitle: 'Tech Proficiency', 
      icon: 'terminal', 
      path: '/expertise',
      color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300'
    },
    { 
      id: 'contact', 
      title: 'Communication', 
      subtitle: 'Social & Links', 
      icon: 'alternate_email', 
      path: '/contact',
      color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-teal-800 dark:text-teal-400">
          Welcome back, {data.personalInfo?.name?.split(' ')[0] || 'User'}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Manage your professional identity and resume configuration.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {navCards.map((card) => (
          <button
            key={card.id}
            onClick={() => navigate(card.path)}
            className={`flex items-start gap-4 p-6 rounded-3xl border border-transparent hover:border-teal-200 dark:hover:border-teal-800 hover:shadow-xl transition-all duration-300 group text-left ${card.color}`}
          >
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-950 shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">{card.icon}</span>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-bold text-xl">{card.title}</h3>
              <p className="text-sm opacity-80">{card.subtitle}</p>
            </div>
            <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
          </button>
        ))}
      </div>

      <section className="p-6 rounded-3xl bg-surface-variant text-on-surface-variant space-y-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">info</span>
          <h2 className="font-bold text-lg">Quick Tip</h2>
        </div>
        <p className="text-sm font-medium leading-relaxed">
          Toggle <b>ATS Mode</b> in settings to instantly strip graphics for machine readability, or use <b>Fresher Mode</b> to automatically adjust the layout for entry-level applications.
        </p>
      </section>
    </div>
  );
};

export default Dashboard;