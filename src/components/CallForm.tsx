
import React, { useState } from 'react';
import { ArrowLeft, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallsContext } from '../contexts/CallsContext';
import { Call } from '../types/student';
import { StudentSelection } from './call-form/StudentSelection';
import { CallFormFields } from './call-form/CallFormFields';
import { TagSelector } from './call-form/TagSelector';
import { FormActions } from './call-form/FormActions';

export const CallForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { students, addCall } = useCallsContext();
  const preSelectedStudentId = location.state?.studentId;

  const [formData, setFormData] = useState({
    studentIds: preSelectedStudentId ? [preSelectedStudentId] : [],
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    type: '1:1' as '1:1' | 'grupo',
    topics: '',
    actions: '',
    recordingUrl: '',
    sessionLink: '',
    tags: [] as string[],
    status: 'em-andamento' as 'completa' | 'em-andamento' | 'precisa-revisao'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    formData.studentIds.forEach((studentId, index) => {
      const call: Call = {
        id: `${Date.now()}-${index}`,
        studentId,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        topics: formData.topics,
        actions: formData.actions,
        recordingUrl: formData.recordingUrl,
        sessionLink: formData.sessionLink,
        status: formData.status,
        tags: formData.tags
      };
      
      addCall(call);
    });

    console.log('Calls salvos com sucesso!');
    navigate('/');
  };

  const handleStudentChange = (studentId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      studentIds: checked 
        ? [...prev.studentIds, studentId]
        : prev.studentIds.filter(id => id !== studentId)
    }));
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const isFormValid = formData.studentIds.length > 0 && formData.topics && formData.actions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-purple/5">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors hover:scale-105 transform duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Voltar</span>
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-purple-medium flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Nova Call</h1>
              <p className="text-muted-foreground mt-1">Registre sua sessão de mentoria</p>
            </div>
          </div>
        </div>

        <div className="bg-card/60 backdrop-blur-xl rounded-2xl shadow-apple-xl border border-border/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <StudentSelection
              students={students}
              selectedStudentIds={formData.studentIds}
              onStudentChange={handleStudentChange}
            />

            <CallFormFields
              formData={formData}
              onChange={handleFieldChange}
            />

            <TagSelector
              selectedTags={formData.tags}
              onTagAdd={addTag}
              onTagRemove={removeTag}
            />

            <FormActions
              onCancel={() => navigate(-1)}
              isFormValid={isFormValid}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
