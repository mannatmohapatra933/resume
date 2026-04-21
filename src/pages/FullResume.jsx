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
    <div className={`bg-white shadow-2xl mx-auto my-8 print:my-0 print:shadow-none transition-all duration-500 overflow-hidden ${isATS ? 'max-w-[210mm] min-h-[297mm]' : 'max-w-[210mm] min-h-[297mm]'} ${baseFontSize}`}>
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
        <main className={`flex-1 ${compact ? 'p-6 md:p-8' : 'p-8 md:p-12'} ${isATS ? 'p-8 md:p-10' : ''}`}>
          {/* Header */}
          <header className={isATS ? 'mb-4 text-center border-b-2 border-black pb-3' : (compact ? 'mb-4' : 'mb-8')}>
            <h1 className={`${compact || isATS ? 'text-2xl' : 'text-4xl'} font-extrabold text-on-surface tracking-tight mb-0.5 uppercase`}>{info.name}</h1>
            <p className={`${compact || isATS ? 'text-base' : 'text-xl'} font-bold text-primary tracking-wide uppercase opacity-90`}>{info.title}</p>

            {isATS && (
              <div className="mt-3 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[12px] font-bold text-on-surface">
                <span className="flex items-center gap-1.5">
                  <GmailIcon size={14} /> {info.email}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Phone size={12} className="text-blue-600" /> {info.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-red-500" /> {info.location}
                </span>
                {info.website && (
                  <>
                    <span className="text-gray-300">|</span>
                    <a href={info.website.startsWith('http') ? info.website : `https://${info.website}`} target="_blank" className="flex items-center gap-1.5 hover:underline">
                      <Globe size={12} className="text-teal-500" />
                      <span>Portfolio</span>
                    </a>
                  </>
                )}
                {visibility.socials && (data.socials || []).map((social, i) => (
                  <React.Fragment key={i}>
                    <span className="text-gray-300">|</span>
                    <a href={social.url.startsWith('http') ? social.url : `https://${social.url}`} target="_blank" className="flex items-center gap-1.5 hover:underline">
                      {social.icon === 'Linkedin' ? <LinkedinColor size={14} /> : <GithubColor size={14} />}
                      <span>{social.platform}</span>
                    </a>
                  </React.Fragment>
                ))}
              </div>
            )}
          </header>

          <div className={compact || isATS ? 'space-y-3.5' : 'space-y-8'}>
            {/* Summary */}
            <section>
              <h2 className={`text-xs font-extrabold uppercase tracking-[0.1em] text-primary mb-1.5 border-b border-primary/20 pb-0.5 w-full ${isATS ? 'text-[13px] text-black border-black/40' : ''}`}>
                Professional Summary
              </h2>
              <p className="text-on-surface-variant leading-tight font-medium text-[13px]">
                {info.summary}
              </p>
            </section>

            {/* Experience */}
            {visibility.experience && (
              <section>
                <h2 className={`text-xs font-extrabold uppercase tracking-[0.1em] text-primary mb-2.5 border-b border-primary/20 pb-0.5 w-full ${isATS ? 'text-[13px] text-black border-black/40' : ''}`}>
                  Work Experience
                </h2>
                <div className={compact || isATS ? 'space-y-3' : 'space-y-6'}>
                  {(data.experience || []).map((exp, i) => (
                    <div key={i} className={isATS ? '' : 'relative pl-5 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-[1px] before:bg-primary/20'}>
                      {!isATS && <div className="absolute left-[-3px] top-1.5 w-1.5 h-1.5 rounded-full bg-primary" />}
                      <div className="flex flex-col md:flex-row justify-between mb-0">
                        <div>
                          <h3 className="text-[13px] font-bold text-on-surface uppercase tracking-tight">{exp.title}</h3>
                          <p className="text-[12px] font-bold text-primary">{exp.company}</p>
                        </div>
                        <span className="text-[10px] font-bold text-on-surface-variant opacity-70 uppercase">{exp.period}</span>
                      </div>
                      <ul className={`mt-0.5 space-y-0 list-disc list-inside marker:text-primary/40 text-[12px]`}>
                        {(exp.points || []).map((point, idx) => (
                          <li key={idx} className="text-on-surface-variant font-medium leading-tight">
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
                <h2 className={`text-xs font-extrabold uppercase tracking-[0.1em] text-primary mb-2 border-b border-primary/20 pb-0.5 w-full ${isATS ? 'text-[13px] text-black border-black/40' : ''}`}>
                  Education
                </h2>
                <div className={`grid grid-cols-1 ${isATS ? 'gap-y-1.5' : 'md:grid-cols-2 gap-x-6 gap-y-3'}`}>
                  {(data.education || []).map((edu, i) => (
                    <div key={i} className={isATS ? 'flex justify-between items-start' : ''}>
                      <div>
                        <h3 className="text-[12px] font-bold text-on-surface uppercase tracking-tight">{edu.degree}</h3>
                        <p className="text-[11px] font-bold text-primary">{edu.school}</p>
                      </div>
                      <p className="text-[9px] font-bold text-on-surface-variant opacity-60 uppercase">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {visibility.projects && (
              <section>
                <h2 className={`text-xs font-extrabold uppercase tracking-[0.1em] text-primary mb-2 border-b border-primary/20 pb-0.5 w-full ${isATS ? 'text-[13px] text-black border-black/40' : ''}`}>
                  Projects
                </h2>
                <div className={compact || isATS ? 'space-y-2' : 'space-y-4'}>
                  {(data.projects || []).map((project, i) => (
                    <div key={i} className="flex flex-col gap-0 group">
                      <div className="flex justify-between items-center">
                        <h3 className="text-[12px] font-bold text-on-surface uppercase tracking-tight flex items-center gap-2">
                          {project.title}
                          {project.url !== "#" && project.url && (
                            <a href={project.url} target="_blank" className="print:hidden">
                              <ExternalLink size={10} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          )}
                        </h3>
                        {isATS && project.url !== "#" && project.url && (
                          <span className="text-[9px] text-on-surface-variant opacity-40">{project.url.replace('https://', '')}</span>
                        )}
                      </div>
                      <p className="text-[11px] font-medium text-on-surface-variant leading-tight">{project.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements/Extras */}
            {visibility.extras && (
              <section>
                <h2 className={`text-xs font-extrabold uppercase tracking-[0.1em] text-primary mb-2 border-b border-primary/20 pb-0.5 w-full ${isATS ? 'text-[13px] text-black border-black/40' : ''}`}>
                  Achievements & Hobbies
                </h2>
                <div className="space-y-2">
                  {(data.achievements || []).length > 0 && (
                    <ul className={`mt-0.5 space-y-0 list-disc list-inside marker:text-primary/40 text-[12px]`}>
                      {(data.achievements || []).map((achievement, i) => (
                        <li key={i} className="text-on-surface-variant font-medium leading-tight">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                  {isATS && (data.hobbies || []).length > 0 && (
                    <p className="text-on-surface-variant font-medium text-[12px] mt-1">
                      <span className="font-bold text-primary">Interests:</span> {(data.hobbies || []).join(", ")}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* ATS Sections at bottom */}
            {isATS && (
              <div className="space-y-3.5">
                {visibility.skills && (
                  <section>
                    <h2 className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-black mb-1.5 border-b border-black/40 pb-0.5 w-full">
                      Technical Skills
                    </h2>
                    <p className="text-on-surface-variant font-medium leading-tight text-[12px]">
                      {(data.skills || []).join(" • ")}
                    </p>
                  </section>
                )}

                {visibility.certificates && (
                  <section>
                    <h2 className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-black mb-1.5 border-b border-black/40 pb-0.5 w-full">
                      Certifications
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                      {(data.certificates || []).map((cert, i) => (
                        <div key={i} className="flex justify-between items-center border-l border-primary/10 pl-2">
                          <div>
                            <p className="text-[12px] font-bold text-on-surface">{cert.title}</p>
                            <p className="text-[10px] font-bold text-primary opacity-70">{cert.issuer}</p>
                          </div>
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

const GmailIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z" fill="#EA4335"/>
  </svg>
);

const LinkedinColor = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const GithubColor = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#181717">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export default FullResume;