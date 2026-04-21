import React from 'react';
import { useResume } from '../ResumeContext';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

const FullResume = () => {
  const { data } = useResume();
  const info = data.personalInfo || {};
  const isATS = info.isATS;
  const compact = info.compactMode;
  const fontScale = info.fontScale || 'A2';

  // Map font scales to Tailwind classes
  const scaleMap = {
    'A0': 'text-[16px]',
    'A1': 'text-[15px]',
    'A2': 'text-[14px]',
    'A3': 'text-[13px]',
    'A4': 'text-[12px]',
    'A5': 'text-[11px]',
    'A6': 'text-[10px]',
  };

  const baseFontSize = scaleMap[fontScale];

  const visibility = info.visibility || {
    experience: true,
    education: true,
    projects: true,
    skills: true,
    socials: true,
    extras: true,
    certificates: true
  };

  return (
    <div className={`bg-white shadow-2xl mx-auto my-8 print:my-0 print:shadow-none transition-all duration-500 overflow-hidden ${isATS ? 'max-w-[800px]' : 'max-w-[210mm] min-h-[297mm]'} ${baseFontSize}`}>
      <div className={`flex flex-col md:flex-row h-full min-h-[297mm] ${isATS ? 'bg-white' : ''}`}>

        {/* Sidebar */}
        {!isATS && (
          <aside className={`w-full md:w-72 bg-surface-container-low border-r border-outline-variant/10 flex flex-col print:bg-slate-50 ${compact ? 'p-6 gap-6' : 'p-8 gap-10'}`}>
            {/* Profile Photo */}
            {info.showPhoto && (
              <div className={`${compact ? 'w-24 h-24' : 'w-32 h-32'} bg-primary/10 rounded-3xl mx-auto flex items-center justify-center text-primary border-2 border-primary/20 overflow-hidden`}>
                {info.photoUrl ? (
                  <img src={info.photoUrl} alt={info.name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={compact ? 48 : 64} />
                )}
              </div>
            )}

            {/* Contact Info */}
            <section className={compact ? 'space-y-3' : 'space-y-4'}>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-primary border-b border-primary/20 pb-2">Contact</h3>
              <div className={`${compact ? 'space-y-1.5' : 'space-y-2.5'} text-on-surface-variant font-medium`}>
                <div className="flex items-start gap-3">
                  <Mail size={14} className="mt-0.5 text-primary" />
                  <span className="break-all">{info.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={14} className="mt-0.5 text-primary" />
                  <span>{info.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="mt-0.5 text-primary" />
                  <span>{info.location}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Globe size={14} className="mt-0.5 text-primary" />
                  <span className="break-all">{info.website}</span>
                </div>
              </div>
            </section>

            {/* Socials */}
            {visibility.socials && (
              <section className={compact ? 'space-y-3' : 'space-y-4'}>
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-primary border-b border-primary/20 pb-2">Social Profiles</h3>
                <div className={compact ? 'space-y-1.5' : 'space-y-2.5'}>
                  {(data.socials || []).map((social, i) => (
                    <div key={i} className="flex items-center gap-3 text-on-surface-variant font-medium">
                      {social.icon === 'Linkedin' ? <Linkedin size={14} className="text-primary" /> : <Github size={14} className="text-primary" />}
                      <span className="truncate">{social.url.replace('https://', '')}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {visibility.skills && (
              <section className={compact ? 'space-y-3' : 'space-y-4'}>
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-primary border-b border-primary/20 pb-2">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {(data.skills || []).map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white border border-outline-variant/30 rounded text-[10px] font-bold text-on-surface">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Certificates */}
            {visibility.certificates && (
              <section className={compact ? 'space-y-3' : 'space-y-4'}>
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-primary border-b border-primary/20 pb-2">Certifications</h3>
                <div className={compact ? 'space-y-2' : 'space-y-3'}>
                  {(data.certificates || []).map((cert, i) => (
                    <div key={i}>
                      <p className="text-[11px] font-bold text-on-surface leading-tight">{cert.title}</p>
                      <p className="text-[9px] font-bold text-primary uppercase tracking-tighter opacity-70">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 ${compact ? 'p-8 md:p-10' : 'p-10 md:p-14'} ${isATS ? 'p-16' : ''}`}>
          {/* Header */}
          <header className={compact ? 'mb-6' : 'mb-10'}>
            <h1 className={`${compact ? 'text-3xl' : 'text-4xl'} font-extrabold text-on-surface tracking-tight mb-1 uppercase`}>{info.name}</h1>
            <p className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-primary tracking-wide uppercase opacity-90`}>{info.title}</p>

            {isATS && (
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-on-surface-variant">
                <span className="flex items-center gap-1"><Mail size={12} /> {info.email}</span>
                <span className="flex items-center gap-1"><Phone size={12} /> {info.phone}</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {info.location}</span>
                <span className="flex items-center gap-1"><Globe size={12} /> {info.website}</span>
              </div>
            )}
          </header>

          <div className={compact ? 'space-y-6' : 'space-y-10'}>
            {/* Summary */}
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary mb-3 border-b-2 border-primary/10 pb-1 w-full">
                Professional Profile
              </h2>
              <p className="text-on-surface-variant leading-relaxed font-medium">
                {info.summary}
              </p>
            </section>

            {/* Experience */}
            {visibility.experience && (
              <section>
                <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary mb-5 border-b-2 border-primary/10 pb-1 w-full">
                  Employment History
                </h2>
                <div className={compact ? 'space-y-5' : 'space-y-8'}>
                  {(data.experience || []).map((exp, i) => (
                    <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-[1px] before:bg-primary/20">
                      <div className="absolute left-[-3px] top-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                      <div className="flex flex-col md:flex-row justify-between mb-1">
                        <div>
                          <h3 className="text-base font-bold text-on-surface uppercase tracking-tight">{exp.title}</h3>
                          <p className="text-sm font-bold text-primary">{exp.company}</p>
                        </div>
                        <span className="text-xs font-bold text-on-surface-variant opacity-60 uppercase">{exp.period}</span>
                      </div>
                      <ul className={`${compact ? 'mt-1.5 space-y-0.5' : 'mt-3 space-y-1.5'} list-disc list-inside marker:text-primary/50`}>
                        {(exp.points || []).map((point, idx) => (
                          <li key={idx} className="text-on-surface-variant font-medium leading-relaxed">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {visibility.education && (
              <section>
                <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary mb-5 border-b-2 border-primary/10 pb-1 w-full">
                  Education
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {(data.education || []).map((edu, i) => (
                    <div key={i}>
                      <h3 className="text-[13px] font-bold text-on-surface uppercase tracking-tight">{edu.degree}</h3>
                      <p className="text-xs font-bold text-primary">{edu.school}</p>
                      <p className="text-[10px] font-bold text-on-surface-variant opacity-50 uppercase">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {visibility.projects && (
              <section>
                <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary mb-5 border-b-2 border-primary/10 pb-1 w-full">
                  Strategic Projects
                </h2>
                <div className={compact ? 'space-y-3' : 'space-y-4'}>
                  {(data.projects || []).map((project, i) => (
                    <div key={i} className="flex flex-col gap-1 group">
                      <h3 className="text-sm font-bold text-on-surface uppercase tracking-tight flex items-center gap-2">
                        {project.title}
                        {project.url !== "#" && project.url && (
                          <a href={project.url} target="_blank" className="print:hidden">
                            <ExternalLink size={12} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        )}
                      </h3>
                      <p className="text-xs font-medium text-on-surface-variant leading-relaxed">{project.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ATS Sections at bottom */}
            {isATS && (
              <div className={compact ? 'space-y-6' : 'space-y-10'}>
                {visibility.skills && (
                  <section>
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary mb-3 border-b-2 border-primary/10 pb-1 w-full">
                      Skills
                    </h2>
                    <p className="text-on-surface-variant font-medium leading-relaxed">
                      {(data.skills || []).join(" • ")}
                    </p>
                  </section>
                )}

                {visibility.certificates && (
                  <section>
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary mb-3 border-b-2 border-primary/10 pb-1 w-full">
                      Certifications
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {(data.certificates || []).map((cert, i) => (
                        <div key={i}>
                          <p className="text-sm font-bold text-on-surface">{cert.title}</p>
                          <p className="text-xs font-bold text-primary opacity-70">{cert.issuer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const UserIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

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

export default FullResume;