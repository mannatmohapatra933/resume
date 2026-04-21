import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sun, Moon, Download, Settings, X, Save, RotateCcw,
  Plus, Trash2, User, Briefcase, GraduationCap, Terminal, FolderKanban,
  Globe, Sparkles, Lightbulb, CheckCircle2, Zap, Heart, Trophy, Medal,
  Link as LinkIcon, Palette, Minimize2, FileText
} from 'lucide-react';
import { useResume } from '../ResumeContext';

const Layout = ({ children }) => {
  const {
    data, updatePersonalInfo, updateSection, resetData,
    addItem, removeItem, updateItem
  } = useResume();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const info = data.personalInfo;

  // Apply dynamic theme color
  useEffect(() => {
    if (info.themeColor) {
      document.documentElement.style.setProperty('--color-primary', info.themeColor);
      // Generate a slightly darker version for containers
      // This is a simple hex-to-rgb-to-hex for darkening
      const darken = (hex) => {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        r = Math.floor(r * 0.8);
        g = Math.floor(g * 0.8);
        b = Math.floor(b * 0.8);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      };
      document.documentElement.style.setProperty('--color-primary-container', darken(info.themeColor));
    }
  }, [info.themeColor]);

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'skills', label: 'Skills', icon: Terminal },
    { id: 'socials', label: 'Socials', icon: Globe },
    { id: 'extras', label: 'Extras', icon: Trophy },
    { id: 'certificates', label: 'Certificates', icon: Medal },
    { id: 'ai', label: 'AI Assistant', icon: Sparkles },
  ];

  const handleVisibilityToggle = (section) => {
    const newVisibility = { ...info.visibility, [section]: !info.visibility[section] };
    updatePersonalInfo('visibility', newVisibility);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 z-40 px-4 flex items-center justify-between no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
            <Zap size={20} />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight">Master Builder</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold opacity-60">Pro Edition</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handlePrint} className="p-2 hover:bg-surface-container rounded-full transition-colors text-primary" title="Export PDF">
            <Download size={22} />
          </button>
          <button onClick={() => setIsSettingsOpen(true)} className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-full transition-all active:scale-95">
            <Settings size={22} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 pb-24 px-4 max-w-4xl mx-auto">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-container/90 backdrop-blur-xl border border-outline-variant/20 rounded-2xl shadow-2xl z-40 px-2 py-2 flex items-center gap-1 no-print">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center p-3 rounded-xl transition-all ${isActive ? 'bg-primary text-on-primary shadow-lg shadow-primary/30' : 'text-on-surface-variant hover:bg-surface-variant'}`}>
          <User size={20} />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Profile</span>
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `flex flex-col items-center p-3 rounded-xl transition-all ${isActive ? 'bg-primary text-on-primary shadow-lg shadow-primary/30' : 'text-on-surface-variant hover:bg-surface-variant'}`}>
          <Briefcase size={20} />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Experience</span>
        </NavLink>
        <NavLink to="/expertise" className={({ isActive }) => `flex flex-col items-center p-3 rounded-xl transition-all ${isActive ? 'bg-primary text-on-primary shadow-lg shadow-primary/30' : 'text-on-surface-variant hover:bg-surface-variant'}`}>
          <Terminal size={20} />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Skills</span>
        </NavLink>
        <NavLink to="/resume" className={({ isActive }) => `flex flex-col items-center p-3 rounded-xl transition-all ${isActive ? 'bg-primary text-on-primary shadow-lg shadow-primary/30' : 'text-on-surface-variant hover:bg-surface-variant'}`}>
          <Download size={20} />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Resume</span>
        </NavLink>
      </nav>

      {/* Settings Drawer */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end no-print">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)} />
          <div className="relative w-full max-w-lg bg-surface shadow-2xl h-full overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="text-primary" />
                <h2 className="font-display font-bold text-xl">Editor Panel</h2>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-surface-variant rounded-full transition-colors">
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex">
              {/* Vertical Tabs */}
              <div className="w-16 border-r border-outline-variant/20 flex flex-col gap-2 p-2 bg-surface-container-low">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${activeTab === tab.id ? 'bg-primary text-on-primary shadow-md shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-variant'}`}
                    title={tab.label}
                  >
                    <tab.icon size={20} />
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-surface-container-lowest">
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <h3 className="font-display font-bold text-lg text-primary">Identity & Layout</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Full Name</label>
                          <input
                            value={info.name}
                            onChange={(e) => updatePersonalInfo('name', e.target.value)}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Professional Title</label>
                          <input
                            value={info.title}
                            onChange={(e) => updatePersonalInfo('title', e.target.value)}
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Location</label>
                          <input
                            value={info.location}
                            onChange={(e) => updatePersonalInfo('location', e.target.value)}
                            className="input-field"
                            placeholder="e.g. New York, NY"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Relocation</label>
                          <button
                            onClick={() => updatePersonalInfo('relocation', !info.relocation)}
                            className={`flex items-center justify-between w-full p-2.5 rounded-xl border transition-all ${info.relocation ? 'border-primary/30 bg-primary/5 text-primary' : 'border-outline-variant/30 text-on-surface-variant'}`}
                          >
                            <span className="text-xs font-bold">Ready to Relocate</span>
                            <div className={`w-8 h-4 rounded-full relative transition-all ${info.relocation ? 'bg-primary' : 'bg-outline-variant'}`}>
                              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${info.relocation ? 'left-4.5' : 'left-0.5'}`} />
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Email</label>
                          <input
                            value={info.email}
                            onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            className="input-field"
                            placeholder="email@example.com"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Phone</label>
                          <input
                            value={info.phone}
                            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            className="input-field"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Website</label>
                        <input
                          value={info.website}
                          onChange={(e) => updatePersonalInfo('website', e.target.value)}
                          className="input-field"
                          placeholder="portfolio.com"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Professional Summary</label>
                        <textarea
                          value={info.summary}
                          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                          className="input-field min-h-[120px] py-3 resize-none"
                          placeholder="Write a brief professional overview..."
                        />
                      </div>

                      <div className="p-4 bg-surface-container rounded-2xl border border-outline-variant/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center overflow-hidden">
                              {info.photoUrl ? (
                                <img src={info.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                              ) : (
                                <User size={20} />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-bold">Profile Photo</p>
                              <p className="text-[10px] opacity-60">Visibility & URL</p>
                            </div>
                          </div>
                          <button
                            onClick={() => updatePersonalInfo('showPhoto', !info.showPhoto)}
                            className={`w-10 h-6 rounded-full relative transition-all ${info.showPhoto ? 'bg-primary' : 'bg-outline-variant'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${info.showPhoto ? 'left-5' : 'left-1'}`} />
                          </button>
                        </div>

                        {info.showPhoto && (
                          <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase ml-1">Photo URL</label>
                            <input
                              value={info.photoUrl}
                              onChange={(e) => updatePersonalInfo('photoUrl', e.target.value)}
                              className="input-field mt-1 text-xs py-2 h-9"
                              placeholder="https://images.unsplash.com/..."
                            />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Theme Color</label>
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="color"
                              value={info.themeColor || '#004349'}
                              onChange={(e) => updatePersonalInfo('themeColor', e.target.value)}
                              className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                            />
                            <span className="text-xs font-mono opacity-60 uppercase">{info.themeColor}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Compact Mode</label>
                          <button
                            onClick={() => updatePersonalInfo('compactMode', !info.compactMode)}
                            className={`flex items-center justify-between w-full p-2.5 rounded-xl border mt-1 transition-all ${info.compactMode ? 'border-primary/30 bg-primary/5 text-primary' : 'border-outline-variant/30 text-on-surface-variant'}`}
                          >
                            <span className="text-xs font-bold">Minimize Gaps</span>
                            <Minimize2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">A4 Fit Mode</label>
                        <button
                          onClick={() => updatePersonalInfo('isATS', !info.isATS)}
                          className={`flex items-center justify-between w-full p-3 rounded-xl border mt-1 transition-all ${info.isATS ? 'border-primary/30 bg-primary/5 text-primary' : 'border-outline-variant/30 text-on-surface-variant'}`}
                        >
                          <div className="flex items-center gap-2">
                            <FileText size={18} />
                            <div className="text-left">
                              <p className="text-sm font-bold">One Column (ATS)</p>
                              <p className="text-[10px] opacity-60">Best for single page & machine parsing</p>
                            </div>
                          </div>
                          <div className={`w-8 h-4 rounded-full relative transition-all ${info.isATS ? 'bg-primary' : 'bg-outline-variant'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${info.isATS ? 'left-4.5' : 'left-0.5'}`} />
                          </div>
                        </button>
                      </div>

                      <div className="pt-4 space-y-3">
                        <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Visibility Controls</label>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.keys(info.visibility).map(section => (
                            <button
                              key={section}
                              onClick={() => handleVisibilityToggle(section)}
                              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${info.visibility[section] ? 'border-primary/30 bg-primary/5 text-primary' : 'border-outline-variant/30 text-on-surface-variant'}`}
                            >
                              <span className="capitalize text-sm font-semibold">{section}</span>
                              <div className={`w-8 h-4 rounded-full relative transition-all ${info.visibility[section] ? 'bg-primary' : 'bg-outline-variant'}`}>
                                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${info.visibility[section] ? 'left-4.5' : 'left-0.5'}`} />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Font Scaling (Shrink to fit)</label>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6'].map(scale => (
                            <button
                              key={scale}
                              onClick={() => updatePersonalInfo('fontScale', scale)}
                              className={`w-10 h-10 rounded-lg font-bold text-xs transition-all ${info.fontScale === scale ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-variant'}`}
                            >
                              {scale}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'experience' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-lg text-primary">Work History</h3>
                      <button onClick={() => addItem('experience', { id: Date.now(), title: 'New Role', company: 'Company', period: '2023 - Present', points: [], desc: '' })} className="p-2 bg-primary text-on-primary rounded-full shadow-md active:scale-95 transition-all">
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {data.experience.map(exp => (
                        <div key={exp.id} className="p-4 border border-outline-variant/20 rounded-2xl bg-surface-container-low space-y-3 relative group">
                          <button onClick={() => removeItem('experience', exp.id)} className="absolute top-4 right-4 p-2 text-error opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error/10 rounded-full">
                            <Trash2 size={16} />
                          </button>
                          <input className="bg-transparent font-bold text-lg w-full outline-none" value={exp.title} placeholder="Job Title" onChange={(e) => updateItem('experience', exp.id, { ...exp, title: e.target.value })} />
                          <div className="grid grid-cols-2 gap-2">
                            <input className="bg-transparent text-sm font-semibold opacity-70 w-full outline-none" placeholder="Company" value={exp.company} onChange={(e) => updateItem('experience', exp.id, { ...exp, company: e.target.value })} />
                            <input className="bg-transparent text-sm font-semibold opacity-70 text-right w-full outline-none" placeholder="Period" value={exp.period} onChange={(e) => updateItem('experience', exp.id, { ...exp, period: e.target.value })} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other tabs remain similar but implemented... (I'll keep the ones I implemented in previous turn) */}
                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-lg text-primary">Skills</h3>
                      <button onClick={() => addItem('skills', 'New Skill')} className="p-2 bg-primary text-on-primary rounded-full shadow-md active:scale-95 transition-all">
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-lg border border-outline-variant/20 group">
                          <input
                            className="bg-transparent text-sm font-semibold outline-none min-w-[80px]"
                            value={skill}
                            onChange={(e) => {
                              const newSkills = [...data.skills];
                              newSkills[i] = e.target.value;
                              updateSection('skills', newSkills);
                            }}
                          />
                          <button onClick={() => {
                            const newSkills = data.skills.filter((_, idx) => idx !== i);
                            updateSection('skills', newSkills);
                          }} className="text-error opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'education' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-lg text-primary">Education</h3>
                      <button onClick={() => addItem('education', { id: Date.now(), school: 'University', degree: 'Degree', period: '2020 - 2024' })} className="p-2 bg-primary text-on-primary rounded-full shadow-md active:scale-95 transition-all">
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {(data.education || []).map(edu => (
                        <div key={edu.id} className="p-4 border border-outline-variant/20 rounded-2xl bg-surface-container-low space-y-3 relative group">
                          <button onClick={() => removeItem('education', edu.id)} className="absolute top-4 right-4 p-2 text-error opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error/10 rounded-full">
                            <Trash2 size={16} />
                          </button>
                          <input className="bg-transparent font-bold text-base w-full outline-none" placeholder="School/University" value={edu.school} onChange={(e) => updateItem('education', edu.id, { ...edu, school: e.target.value })} />
                          <input className="bg-transparent text-sm font-semibold opacity-70 w-full outline-none" placeholder="Degree" value={edu.degree} onChange={(e) => updateItem('education', edu.id, { ...edu, degree: e.target.value })} />
                          <input className="bg-transparent text-xs font-medium opacity-50 w-full outline-none" placeholder="Period" value={edu.period} onChange={(e) => updateItem('education', edu.id, { ...edu, period: e.target.value })} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-lg text-primary">Projects</h3>
                      <button onClick={() => addItem('projects', { id: Date.now(), title: 'New Project', desc: 'Project description', url: '' })} className="p-2 bg-primary text-on-primary rounded-full shadow-md active:scale-95 transition-all">
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {(data.projects || []).map(project => (
                        <div key={project.id} className="p-4 border border-outline-variant/20 rounded-2xl bg-surface-container-low space-y-3 relative group">
                          <button onClick={() => removeItem('projects', project.id)} className="absolute top-4 right-4 p-2 text-error opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error/10 rounded-full">
                            <Trash2 size={16} />
                          </button>
                          <input className="bg-transparent font-bold text-base w-full outline-none" placeholder="Project Title" value={project.title} onChange={(e) => updateItem('projects', project.id, { ...project, title: e.target.value })} />
                          <textarea className="bg-transparent text-sm w-full outline-none resize-none" rows={2} placeholder="Description" value={project.desc} onChange={(e) => updateItem('projects', project.id, { ...project, desc: e.target.value })} />
                          <div className="flex items-center gap-2 text-xs opacity-60">
                            <LinkIcon size={12} />
                            <input className="bg-transparent w-full outline-none" placeholder="Project URL" value={project.url} onChange={(e) => updateItem('projects', project.id, { ...project, url: e.target.value })} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'socials' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-lg text-primary">Social Links</h3>
                      <button onClick={() => addItem('socials', { platform: 'LinkedIn', url: '', icon: 'Linkedin' })} className="p-2 bg-primary text-on-primary rounded-full shadow-md active:scale-95 transition-all">
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {(data.socials || []).map((social, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/10">
                          <div className="text-primary opacity-60">
                            {social.icon === 'Linkedin' && <Linkedin size={16} />}
                            {social.icon === 'Github' && <Github size={16} />}
                            {social.icon === 'Twitter' && <LinkIcon size={16} />}
                            {social.icon === 'Instagram' && <LinkIcon size={16} />}
                            {social.icon === 'Globe' && <Globe size={16} />}
                            {!['Linkedin', 'Github', 'Twitter', 'Instagram', 'Globe'].includes(social.icon) && <Globe size={16} />}
                          </div>
                          <select
                            className="bg-transparent text-sm font-bold outline-none"
                            value={social.platform}
                            onChange={(e) => {
                              const newSocials = [...data.socials];
                              const platform = e.target.value;
                              let icon = 'Globe';
                              if (platform === 'LinkedIn') icon = 'Linkedin';
                              else if (platform === 'GitHub') icon = 'Github';
                              else if (platform === 'Twitter') icon = 'Twitter';
                              else if (platform === 'Instagram') icon = 'Instagram';
                              else if (platform === 'Portfolio') icon = 'Globe';

                              newSocials[i] = { ...social, platform, icon };
                              updateSection('socials', newSocials);
                            }}
                          >
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="GitHub">GitHub</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Portfolio">Portfolio</option>
                          </select>
                          <input
                            className="flex-1 bg-transparent text-xs outline-none opacity-70"
                            placeholder="URL"
                            value={social.url}
                            onChange={(e) => {
                              const newSocials = [...data.socials];
                              newSocials[i] = { ...social, url: e.target.value };
                              updateSection('socials', newSocials);
                            }}
                          />
                          <button onClick={() => {
                            const newSocials = data.socials.filter((_, idx) => idx !== i);
                            updateSection('socials', newSocials);
                          }} className="text-error hover:bg-error/10 p-1 rounded-full">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'extras' && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                          <Trophy size={18} /> Achievements
                        </h3>
                        <button onClick={() => addItem('achievements', 'New Achievement')} className="p-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20">
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(data.achievements || []).map((ach, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-surface-container-low rounded-lg group">
                            <input
                              className="flex-1 bg-transparent text-sm outline-none"
                              value={ach}
                              onChange={(e) => {
                                const newAch = [...data.achievements];
                                newAch[i] = e.target.value;
                                updateSection('achievements', newAch);
                              }}
                            />
                            <button onClick={() => {
                              const newAch = data.achievements.filter((_, idx) => idx !== i);
                              updateSection('achievements', newAch);
                            }} className="text-error opacity-0 group-hover:opacity-100">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-lg text-secondary flex items-center gap-2">
                          <Heart size={18} /> Hobbies
                        </h3>
                        <button onClick={() => addItem('hobbies', 'New Hobby')} className="p-1.5 bg-secondary/10 text-secondary rounded-full hover:bg-secondary/20">
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(data.hobbies || []).map((hobby, i) => (
                          <div key={i} className="flex items-center gap-2 px-3 py-1 bg-secondary/5 text-secondary rounded-full border border-secondary/20 group">
                            <input
                              className="bg-transparent text-xs font-bold outline-none min-w-[60px]"
                              value={hobby}
                              onChange={(e) => {
                                const newHobbies = [...data.hobbies];
                                newHobbies[i] = e.target.value;
                                updateSection('hobbies', newHobbies);
                              }}
                            />
                            <button onClick={() => {
                              const newHobbies = data.hobbies.filter((_, idx) => idx !== i);
                              updateSection('hobbies', newHobbies);
                            }} className="opacity-0 group-hover:opacity-100">
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'certificates' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-lg text-primary">Certificates</h3>
                      <button onClick={() => addItem('certificates', { id: Date.now(), title: 'Certificate', issuer: 'Issuer', url: '' })} className="p-2 bg-primary text-on-primary rounded-full shadow-md active:scale-95 transition-all">
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {(data.certificates || []).map(cert => (
                        <div key={cert.id} className="p-4 border border-outline-variant/20 rounded-2xl bg-surface-container-low space-y-3 relative group">
                          <button onClick={() => removeItem('certificates', cert.id)} className="absolute top-4 right-4 p-2 text-error opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error/10 rounded-full">
                            <Trash2 size={16} />
                          </button>
                          <input className="bg-transparent font-bold text-base w-full outline-none" placeholder="Certificate Name" value={cert.title} onChange={(e) => updateItem('certificates', cert.id, { ...cert, title: e.target.value })} />
                          <input className="bg-transparent text-sm font-semibold opacity-70 w-full outline-none" placeholder="Issuer" value={cert.issuer} onChange={(e) => updateItem('certificates', cert.id, { ...cert, issuer: e.target.value })} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="space-y-6">
                    <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                      <Sparkles size={20} /> AI Assistant
                    </h3>
                    <div className="p-5 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
                          <Lightbulb size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary">Pro Tip: One-Page Fit</p>
                          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                            Use **Compact Mode** and **Font Scale A4/A5** to force your resume onto a single page. It's much cleaner for recruiters!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant/20 flex items-center gap-3">
              <button onClick={resetData} className="flex-1 flex items-center justify-center gap-2 p-3 text-error font-bold uppercase text-xs hover:bg-error/5 rounded-xl transition-colors">
                <RotateCcw size={16} /> Reset
              </button>
              <button onClick={() => setIsSettingsOpen(false)} className="flex-[2] btn-primary flex items-center justify-center gap-2">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Linkedin = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const Github = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default Layout;