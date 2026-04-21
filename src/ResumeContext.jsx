import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from './data/resumeData';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('resumeData');
    if (!savedData) return initialData;
    
    try {
      const parsed = JSON.parse(savedData);
      // Deep merge with initialData to ensure new sections exist
      return {
        ...initialData,
        ...parsed,
        personalInfo: { ...initialData.personalInfo, ...(parsed.personalInfo || {}) },
        expertise: { ...initialData.expertise, ...(parsed.expertise || {}) },
        // Fallbacks for arrays
        experience: parsed.experience || initialData.experience,
        education: parsed.education || initialData.education,
        projects: parsed.projects || initialData.projects,
        skills: parsed.skills || initialData.skills,
        socials: parsed.socials || initialData.socials,
        certificates: parsed.certificates || initialData.certificates,
        achievements: parsed.achievements || initialData.achievements,
        hobbies: parsed.hobbies || initialData.hobbies,
      };
    } catch (e) {
      console.error("Failed to parse resumeData:", e);
      return initialData;
    }
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

  const updateSection = (section, newValue) => {
    setData(prev => ({
      ...prev,
      [section]: newValue
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addItem = (section, item) => {
    setData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), item]
    }));
  };

  const removeItem = (section, id) => {
    setData(prev => ({
      ...prev,
      [section]: (prev[section] || []).filter(item => item.id !== id)
    }));
  };

  const updateItem = (section, id, updatedItem) => {
    setData(prev => ({
      ...prev,
      [section]: (prev[section] || []).map(item => item.id === id ? updatedItem : item)
    }));
  };

  const resetData = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      setData(initialData);
    }
  };

  return (
    <ResumeContext.Provider value={{
      data,
      updateSection,
      updatePersonalInfo,
      addItem,
      removeItem,
      updateItem,
      resetData
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within a ResumeProvider");
  return context;
};