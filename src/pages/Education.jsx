import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../ResumeContext';
import { Plus, Trash2, GraduationCap, Calendar, MapPin, PlusCircle } from 'lucide-react';

const Education = () => {
  const { data, updateSection, addItem, removeItem, updateItem } = useResume();
  const eduList = data.education || [];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800 pb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Education</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Academic foundation & certifications</p>
        </div>
        <button 
          onClick={() => addItem('education', { school: '', degree: '', period: '', location: '', desc: '' })}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={16} /> Add Record
        </button>
      </div>

      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {eduList.map((edu, index) => (
            <motion.div 
              key={edu.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all relative group"
            >
              <button 
                onClick={() => removeItem('education', index)}
                className="absolute top-8 right-8 p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
              >
                <Trash2 size={18} />
              </button>

              <div className="flex flex-col md:flex-row gap-10">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 shadow-inner">
                  <GraduationCap size={32} />
                </div>
                
                <div className="flex-1 space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">School / University</label>
                      <input 
                        type="text" 
                        value={edu.school}
                        onChange={(e) => updateItem('education', index, { school: e.target.value })}
                        placeholder="e.g. Harvard University"
                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 rounded-2xl p-4 text-sm font-bold focus:bg-white dark:focus:bg-slate-950 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Degree / Certification</label>
                      <input 
                        type="text" 
                        value={edu.degree}
                        onChange={(e) => updateItem('education', index, { degree: e.target.value })}
                        placeholder="e.g. Master of Computer Science"
                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 rounded-2xl p-4 text-sm font-bold focus:bg-white dark:focus:bg-slate-950 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Timeline</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={edu.period}
                          onChange={(e) => updateItem('education', index, { period: e.target.value })}
                          placeholder="2018 - 2022"
                          className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 rounded-2xl p-4 pl-12 text-sm font-bold focus:bg-white dark:focus:bg-slate-950 outline-none transition-all"
                        />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={edu.location}
                          onChange={(e) => updateItem('education', index, { location: e.target.value })}
                          placeholder="Cambridge, MA"
                          className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 rounded-2xl p-4 pl-12 text-sm font-bold focus:bg-white dark:focus:bg-slate-950 outline-none transition-all"
                        />
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {eduList.length === 0 && (
          <div className="text-center py-20 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] space-y-4">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <GraduationCap size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No education records added yet</p>
            <button 
              onClick={() => addItem('education', { school: '', degree: '', period: '', location: '', desc: '' })}
              className="text-primary font-black uppercase text-[10px] tracking-[0.2em] hover:underline"
            >
              Add your first record
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;