
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallsContext } from '../contexts/CallsContext';
import { Call } from '../types/student';
import { CallFormFields } from './call-form/CallFormFields';
import { StudentSelection } from './call-form/StudentSelection';
import { TagSelector } from './call-form/TagSelector';
import { FormActions } from './call-form/FormActions';
import { ArrowLeft, Phone } from 'lucide-react';

export const CallForm: React.FC = () => {
  const navigate = useNavigate();
  const { students, addCall } = useCallsContext();
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    type: '1:1' as '1:1' | 'grupo',
    topics: '',
    actions: '',
    status: 'agendada' as 'agendada' | 'completa' | 'em-andamento' | 'precisa-revisao',
    recordingUrl: '',
    sessionLink: ''
  });
  
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStudentChange = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedStudents.length === 0) {
      alert('Selecione pelo menos um aluno');
      return;
    }

    // Create a call for each selected student
    selectedStudents.forEach(studentId => {
      const newCall: Call = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        studentId,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        topics: formData.topics,
        actions: formData.actions,
        status: formData.status,
        recordingUrl: formData.recordingUrl || undefined,
        sessionLink: formData.sessionLink || undefined,
        tags
      };
      addCall(newCall);
    });

    navigate('/calls');
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/calls')}
            className="p-2 hover:bg-muted rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-purple-medium flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Nova Call</h1>
              <p className="text-muted-foreground mt-1">Agende ou registre uma nova call</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-card/60 backdrop-blur-xl rounded-2xl shadow-apple-lg border border-border/50 p-8">
            <CallFormFields 
              formData={formData} 
              onInputChange={handleInputChange} 
            />
          </div>

          <div className="bg-card/60 backdrop-blur-xl rounded-2xl shadow-apple-lg border border-border/50 p-8">
            <StudentSelection 
              students={students}
              selectedStudents={selectedStudents}
              onStudentChange={handleStudentChange}
            />
          </div>

          <div className="bg-card/60 backdrop-blur-xl rounded-2xl shadow-apple-lg border border-border/50 p-8">
            <TagSelector 
              tags={tags} 
              onTagsChange={setTags} 
            />
          </div>

          <FormActions onCancel={() => navigate('/calls')} />
        </form>
      </div>
    </div>
  );
};
