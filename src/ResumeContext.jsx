import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from './data/resumeData';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('resumeData');
    if (!savedData) return initialData;
    
    try {
      const parsed = JSON.parse(savedData);
      
      // Ensure all top-level sections exist
      const mergedData = { ...initialData };
      Object.keys(parsed).forEach(key => {
        if (Array.isArray(parsed[key])) {
          mergedData[key] = parsed[key];
        } else if (typeof parsed[key] === 'object' && parsed[key] !== null) {
          mergedData[key] = { ...mergedData[key], ...parsed[key] };
        } else {
          mergedData[key] = parsed[key];
        }
      });

      // Special handling for nested visibility
      if (parsed.personalInfo && parsed.personalInfo.visibility) {
        mergedData.personalInfo.visibility = {
          ...initialData.personalInfo.visibility,
          ...parsed.personalInfo.visibility
        };
      }

      return mergedData;
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