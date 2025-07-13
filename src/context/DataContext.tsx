import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Submission {
  tracking_id: string;
  type: 'Feedback' | 'Complaint';
  category: string;
  title: string;
  description: string;
  urgency: 'Low' | 'Medium' | 'High';
  identity_type: 'Student' | 'Parent';
  identity_value: string;
  file_path?: string;
  file_name?: string;
  status: 'Pending' | 'In Review' | 'Resolved';
  admin_reply?: string;
  admin_notes: AdminNote[];
  timestamp: string;
}

export interface AdminNote {
  note: string;
  timestamp: string;
  admin: string;
}

interface DataContextType {
  submissions: Submission[];
  addSubmission: (submission: Omit<Submission, 'tracking_id' | 'timestamp' | 'status' | 'admin_notes'>) => string;
  getSubmission: (trackingId: string) => Submission | undefined;
  updateSubmission: (trackingId: string, updates: Partial<Submission>) => void;
  addAdminNote: (trackingId: string, note: string, admin: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('sose-submissions');
    if (savedData) {
      setSubmissions(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sose-submissions', JSON.stringify(submissions));
  }, [submissions]);

  const generateTrackingId = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const addSubmission = (submissionData: Omit<Submission, 'tracking_id' | 'timestamp' | 'status' | 'admin_notes'>): string => {
    const trackingId = generateTrackingId();
    const newSubmission: Submission = {
      ...submissionData,
      tracking_id: trackingId,
      timestamp: new Date().toISOString(),
      status: 'Pending',
      admin_notes: []
    };
    
    setSubmissions(prev => [...prev, newSubmission]);
    return trackingId;
  };

  const getSubmission = (trackingId: string): Submission | undefined => {
    return submissions.find(sub => sub.tracking_id === trackingId);
  };

  const updateSubmission = (trackingId: string, updates: Partial<Submission>): void => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.tracking_id === trackingId ? { ...sub, ...updates } : sub
      )
    );
  };

  const addAdminNote = (trackingId: string, note: string, admin: string): void => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.tracking_id === trackingId 
          ? { 
              ...sub, 
              admin_notes: [...sub.admin_notes, { 
                note, 
                timestamp: new Date().toISOString(), 
                admin 
              }] 
            }
          : sub
      )
    );
  };

  return (
    <DataContext.Provider value={{
      submissions,
      addSubmission,
      getSubmission,
      updateSubmission,
      addAdminNote
    }}>
      {children}
    </DataContext.Provider>
  );
};