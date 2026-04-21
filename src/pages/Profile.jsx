import React from 'react';
import { motion } from 'framer-motion';
import { useResume } from '../ResumeContext';
import { 
  Mail, Phone, MapPin, Globe,
  Trophy, Heart, Briefcase, GraduationCap 
} from 'lucide-react';

const Profile = () => {
  const { data } = useResume();
  const info = data.personalInfo;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Hero Header */}
      <motion.section variants={itemVariants} className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-primary-container p-1 shadow-xl shadow-primary/20">
            <div className="w-full h-full bg-surface rounded-[1.4rem] flex items-center justify-center text-primary overflow-hidden">
              {info.photoUrl ? (
                <img src={info.photoUrl} alt={info.name} className="w-full h-full object-cover" />
              ) : (
                <User size={64} strokeWidth={1.5} />
              )}
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight leading-tight">
              {info.name}
            </h1>
            <p className="font-display font-semibold text-xl text-primary mt-2 flex items-center justify-center md:justify-start gap-2">
              {info.title}
              {info.relocation && (
                <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full border border-secondary/20 font-bold uppercase tracking-widest">
                  Ready to Relocate
                </span>
              )}
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 text-sm font-semibold text-on-surface-variant">
              <span className="flex items-center gap-1.5"><MapPin size={16} /> {info.location}</span>
              <span className="flex items-center gap-1.5"><Mail size={16} /> {info.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={16} /> {info.phone}</span>
              <a href={`https://${info.website}`} target="_blank" className="flex items-center gap-1.5 text-primary hover:underline cursor-pointer">
                <Globe size={16} /> {info.website}
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Summary Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.section variants={itemVariants} className="md:col-span-2 glass-card p-6 rounded-3xl">
          <h2 className="section-title"><Briefcase /> Professional Summary</h2>
          <p className="text-on-surface-variant leading-relaxed text-lg">
            {info.summary}
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="glass-card p-6 rounded-3xl bg-secondary/5">
          <h2 className="section-title text-secondary"><Globe /> Social Links</h2>
          <div className="flex flex-col gap-3">
            {data.socials.map((social, i) => (
              <a key={i} href={social.url} target="_blank" className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-white hover:bg-white transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 text-secondary rounded-lg group-hover:bg-secondary group-hover:text-white transition-colors">
                    {social.icon === 'Linkedin' ? <Linkedin size={18} /> : <Github size={18} />}
                  </div>
                  <span className="font-bold text-sm">{social.platform}</span>
                </div>
                <span className="text-xs text-on-surface-variant group-hover:text-primary transition-colors font-bold">Visit</span>
              </a>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.section variants={itemVariants} className="glass-card p-6 rounded-3xl">
          <h2 className="section-title text-primary"><Trophy /> Key Achievements</h2>
          <ul className="space-y-3">
            {(data.achievements || []).map((ach, i) => (
              <li key={i} className="flex items-start gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/10 text-sm font-semibold">
                <div className="mt-1"><Medal size={16} className="text-primary" /></div>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} className="glass-card p-6 rounded-3xl">
          <h2 className="section-title text-secondary"><Heart /> Interests & Hobbies</h2>
          <div className="flex flex-wrap gap-2">
            {(data.hobbies || []).map((hobby, i) => (
              <span key={i} className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-bold border border-secondary/20">
                {hobby}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

const User = ({ size, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const Medal = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11"/><circle cx="12" cy="9" r="7"/>
  </svg>
);

const Linkedin = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const Github = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default Profile;