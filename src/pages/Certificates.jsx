import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../ResumeContext';
import { Plus, Trash2, Award, ExternalLink } from 'lucide-react';

const Certificates = () => {
  const { data, updateCertificates } = useResume();
  const [certs, setCerts] = useState(data.certificates || []);

  const handleAdd = () => {
    const newCerts = [...certs, { title: '', issuer: '', url: '', date: '' }];
    setCerts(newCerts);
    updateCertificates(newCerts);
  };

  const handleChange = (index, field, value) => {
    const newCerts = [...certs];
    newCerts[index][field] = value;
    setCerts(newCerts);
    updateCertificates(newCerts);
  };

  const handleRemove = (index) => {
    const newCerts = certs.filter((_, i) => i !== index);
    setCerts(newCerts);
    updateCertificates(newCerts);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Academic & Professional Certifications</h2>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all">
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {certs.map((cert, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all relative group"
            >
              <button onClick={() => handleRemove(index)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <Award size={32} />
                </div>
                <div className="flex-1 grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Certificate Name</label>
                    <input 
                      type="text" 
                      value={cert.title}
                      onChange={(e) => handleChange(index, 'title', e.target.value)}
                      placeholder="e.g. AWS Certified Solutions Architect"
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Issuing Organization</label>
                    <input 
                      type="text" 
                      value={cert.issuer}
                      onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                      placeholder="e.g. Amazon Web Services"
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verification URL / ID</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={cert.url}
                        onChange={(e) => handleChange(index, 'url', e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                      <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    </div>
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

export default Certificates;