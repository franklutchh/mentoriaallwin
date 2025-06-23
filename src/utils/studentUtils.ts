
import { ActionItem } from '../types/student';

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const getStatusColor = (status: ActionItem['status']) => {
  switch (status) {
    case 'concluido': return 'bg-green-100 text-green-800';
    case 'em-progresso': return 'bg-yellow-100 text-yellow-800';
    case 'pendente': return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityColor = (priority: ActionItem['priority']) => {
  switch (priority) {
    case 'alta': return 'bg-red-100 text-red-800';
    case 'media': return 'bg-yellow-100 text-yellow-800';
    case 'baixa': return 'bg-green-100 text-green-800';
  }
};

export const getStatusLabel = (status: ActionItem['status']) => {
  switch (status) {
    case 'concluido': return 'Concluído';
    case 'em-progresso': return 'Em Progresso';
    case 'pendente': return 'Pendente';
  }
};
