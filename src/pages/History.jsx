import React from 'react';
import { motion } from 'framer-motion';
import { useResume } from '../ResumeContext';
import { Briefcase, GraduationCap, MapPin, Calendar, Circle } from 'lucide-react';

const History = () => {
  const { data } = useResume();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="space-y-12"
    >
      {/* Experience Section */}
      <section>
        <h2 className="section-title"><Briefcase /> Professional Experience</h2>
        <div className="space-y-8 relative before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-[2px] before:bg-outline-variant/30">
          {(data.experience || []).map((exp, index) => (
            <motion.div 
              key={exp.id || index} 
              variants={itemVariants}
              className="relative pl-10"
            >
              <div className="absolute left-0 top-1.5 w-6 h-6 bg-background border-2 border-primary rounded-full flex items-center justify-center z-10 shadow-sm shadow-primary/20">
                <Circle size={10} fill="currentColor" className="text-primary" />
              </div>
              
              <div className="glass-card p-6 rounded-3xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-on-surface">{exp.title}</h3>
                    <p className="font-display font-bold text-primary flex items-center gap-2">
                      {exp.company} <span className="text-on-surface-variant/40 font-normal">|</span> <span className="text-sm">{exp.location}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary rounded-full border border-primary/10 text-xs font-bold uppercase tracking-wider h-fit">
                    <Calendar size={14} /> {exp.period}
                  </div>
                </div>
                
                <p className="text-on-surface-variant font-semibold mb-4 leading-relaxed italic opacity-80">
                  {exp.desc}
                </p>
                
                <ul className="space-y-2.5">
                  {(exp.points || []).map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm font-medium text-on-surface-variant leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-primary/40 rounded-full mt-2 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section>
        <h2 className="section-title"><GraduationCap /> Academic Foundation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(data.education || []).map((edu, index) => (
            <motion.div 
              key={edu.id || index} 
              variants={itemVariants}
              className="glass-card p-6 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                <GraduationCap size={64} />
              </div>
              
              <div className="relative z-10">
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-bold uppercase tracking-widest border border-secondary/20">
                  {edu.period}
                </span>
                <h3 className="font-display font-extrabold text-lg text-on-surface mt-3">{edu.degree}</h3>
                <p className="font-display font-bold text-primary mt-1">{edu.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default History;