import React from 'react';
import { motion } from 'framer-motion';
import { useResume } from '../ResumeContext';
import { 
  Terminal, Medal, FolderKanban, ExternalLink, 
  CheckCircle2, Star, Award, Zap
} from 'lucide-react';

const Expertise = () => {
  const { data } = useResume();
  const expertise = data.expertise || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="space-y-12"
    >
      {/* Overview */}
      <motion.section variants={itemVariants} className="glass-panel p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-secondary/5">
        <h2 className="section-title text-primary"><Zap /> Expertise Overview</h2>
        <p className="text-xl font-medium text-on-surface-variant leading-relaxed italic">
          "{expertise.desc || "Operational leadership centered on efficiency and scale."}"
        </p>
      </motion.section>

      {/* Skills Grid */}
      <section>
        <h2 className="section-title text-secondary"><Terminal /> Core Proficiencies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(data.skills || []).map((skill, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center gap-3 text-center group"
            >
              <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                <Star size={18} />
              </div>
              <span className="font-bold text-sm text-on-surface">{skill}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title text-primary"><FolderKanban /> Strategic Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(data.projects || []).map((project, index) => (
            <motion.div 
              key={project.id || index} 
              variants={itemVariants}
              className="glass-card p-6 rounded-3xl group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                  <FolderKanban size={24} />
                </div>
                <a href={project.url} target="_blank" className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
                  <ExternalLink size={20} />
                </a>
              </div>
              <h3 className="font-display font-extrabold text-lg text-on-surface group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-sm font-medium text-on-surface-variant mt-2 leading-relaxed">
                {project.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="section-title text-secondary"><Medal /> Professional Certifications</h2>
        <div className="space-y-4">
          {(data.certificates || []).map((cert, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="glass-card p-4 rounded-2xl flex items-center justify-between border-l-4 border-l-secondary"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">{cert.title}</h4>
                  <p className="text-xs font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">{cert.issuer}</p>
                </div>
              </div>
              <a href={cert.url} target="_blank" className="text-[10px] font-extrabold uppercase tracking-widest text-secondary hover:underline cursor-pointer">
                Verify Credential
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Expertise;