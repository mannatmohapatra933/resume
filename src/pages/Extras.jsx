import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../ResumeContext';
import { Plus, Trash2, Trophy, Heart, X } from 'lucide-react';

const Extras = () => {
  const { data, updatePersonalInfo } = useResume();
  const [hobbies, setHobbies] = useState(data.hobbies || []);
  const [achievements, setAchievements] = useState(data.achievements || []);

  const handleUpdateHobbies = (newList) => {
    setHobbies(newList);
    updatePersonalInfo({ ...data.personalInfo, hobbies: newList });
  };

  const handleUpdateAchievements = (newList) => {
    setAchievements(newList);
    updatePersonalInfo({ ...data.personalInfo, achievements: newList });
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      {/* Achievements Section */}
      <section className="space-y-8 p-8 bg-slate-900 text-white rounded-[3rem] shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white">
              <Trophy size={20} />
            </div>
            <h2 className="text-xs font-black uppercase tracking-widest">Achievements</h2>
          </div>
          <button 
            onClick={() => handleUpdateAchievements([...achievements, ''])}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {achievements.map((ach, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-3 items-center group"
              >
                <input 
                  type="text"
                  value={ach}
                  onChange={(e) => {
                    const newList = [...achievements];
                    newList[index] = e.target.value;
                    handleUpdateAchievements(newList);
                  }}
                  placeholder="e.g. Winner of Hackathon 2024"
                  className="flex-1 bg-white/5 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary outline-none"
                />
                <button onClick={() => handleUpdateAchievements(achievements.filter((_, i) => i !== index))} className="p-2 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="space-y-8 p-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-pink-500">
              <Heart size={20} />
            </div>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Interests & Hobbies</h2>
          </div>
          <button 
            onClick={() => handleUpdateHobbies([...hobbies, ''])}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <AnimatePresence mode="popLayout">
            {hobbies.map((hobby, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 group shadow-sm"
              >
                <input 
                  type="text"
                  value={hobby}
                  onChange={(e) => {
                    const newList = [...hobbies];
                    newList[index] = e.target.value;
                    handleUpdateHobbies(newList);
                  }}
                  className="bg-transparent border-none p-0 text-sm font-black uppercase tracking-tighter text-slate-600 dark:text-slate-300 outline-none w-24"
                />
                <button onClick={() => handleUpdateHobbies(hobbies.filter((_, i) => i !== index))} className="text-slate-300 hover:text-red-500 transition-colors">
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Extras;