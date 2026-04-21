import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../ResumeContext';
import { Plus, Trash2, FolderKanban, Link as LinkIcon, ExternalLink } from 'lucide-react';

const Projects = () => {
  const { data, addItem, removeItem, updateItem } = useResume();
  const projects = data.projects || [];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800 pb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Projects</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Featured work and portfolio highlights</p>
        </div>
        <button 
          onClick={() => addItem('projects', { title: '', desc: '', url: '', tech: [] })}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {projects.map((proj, index) => (
            <motion.div 
              key={proj.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all relative group"
            >
              <button 
                onClick={() => removeItem('projects', index)}
                className="absolute top-8 right-8 p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
              >
                <Trash2 size={18} />
              </button>

              <div className="flex flex-col md:flex-row gap-10">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <FolderKanban size={32} />
                </div>
                
                <div className="flex-1 space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Project Title</label>
                      <input 
                        type="text" 
                        value={proj.title}
                        onChange={(e) => updateItem('projects', index, { title: e.target.value })}
                        placeholder="e.g. AI SaaS Platform"
                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 rounded-2xl p-4 text-sm font-bold focus:bg-white dark:focus:bg-slate-950 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Live Link / Repository</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={proj.url}
                          onChange={(e) => updateItem('projects', index, { url: e.target.value })}
                          placeholder="https://..."
                          className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 rounded-2xl p-4 pl-12 text-sm font-bold focus:bg-white dark:focus:bg-slate-950 outline-none transition-all"
                        />
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
                    <textarea 
                      value={proj.desc}
                      onChange={(e) => updateItem('projects', index, { desc: e.target.value })}
                      placeholder="What problem did you solve? What technologies did you use?"
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 rounded-3xl p-6 text-sm font-bold focus:bg-white dark:focus:bg-slate-950 outline-none transition-all min-h-[140px] resize-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;