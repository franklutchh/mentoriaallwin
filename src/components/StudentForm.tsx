import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Student } from '../types/student';
import { useMentoringContext } from '../contexts/MentoringContext';
import { useToast } from '@/hooks/use-toast';

export const StudentForm: React.FC = () => {
  const navigate = useNavigate();
  const { addStudent } = useMentoringContext();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    instagram: '',
    entryDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const studentData: Student = {
      id: Date.now().toString(),
      ...formData,
      instagram: formData.instagram ? (formData.instagram.startsWith('@') ? formData.instagram : `@${formData.instagram}`) : '',
      
      // Valores padrão para campos obrigatórios
      status: 'ativo',
      tags: [],
      tasksCompleted: 0,
      totalTasks: 10,
      favorite: false,
      
      // Dados Financeiros - valores padrão
      paymentStatus: 'em-dia',
      monthlyValue: 497,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastPaymentDate: new Date().toISOString().split('T')[0],
      paymentHistory: [],
      
      // Gamificação - valores iniciais
      level: 'iniciante',
      points: 0,
      badges: [],
      engagementScore: 50,
      churnRisk: 'medio',
      lifetimeValue: 0
    };

    addStudent(studentData);
    
    toast({
      title: "Aluno adicionado com sucesso!",
      description: `${formData.name} foi adicionado ao sistema.`,
    });
    
    navigate(`/students/${studentData.id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/students')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Alunos
          </button>
          <h1 className="text-3xl font-bold text-foreground">Adicionar Novo Aluno</h1>
          <p className="text-muted-foreground mt-2">Dados essenciais para iniciar o acompanhamento</p>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                  placeholder="Digite o nome completo do aluno"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground mb-2">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                  placeholder="+55 11 99999-9999"
                />
              </div>

              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-foreground mb-2">
                  Instagram (opcional)
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                  placeholder="usuario (sem @)"
                />
              </div>

              <div>
                <label htmlFor="entryDate" className="block text-sm font-medium text-foreground mb-2">
                  Data de Entrada *
                </label>
                <input
                  type="date"
                  id="entryDate"
                  name="entryDate"
                  required
                  value={formData.entryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => navigate('/students')}
                className="flex-1 px-6 py-3 border border-input text-foreground rounded-lg hover:bg-accent transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                Adicionar Aluno
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};