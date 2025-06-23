
import React, { useState } from 'react';
import { WeeklyPriorities } from './WeeklyPriorities';
import { ProductivityCards } from './dashboard/ProductivityCards';
import { PerformanceSummary } from './dashboard/PerformanceSummary';
import { AdvancedFilters } from './dashboard/AdvancedFilters';
import { StudentsGrid } from './dashboard/StudentsGrid';
import { useMentoringContext } from '../contexts/MentoringContext';

export const Dashboard: React.FC = () => {
  const { students, mentorias } = useMentoringContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ativo' | 'inativo' | 'sob-revisao' | 'com-pendencia' | 'finalizado'>('all');
  const [groupFilter, setGroupFilter] = useState<string>('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesGroup = groupFilter === 'all' || student.group === groupFilter;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const activeStudents = students.filter(s => s.status === 'ativo').length;
  const totalStudents = students.length;
  const pendingStudents = students.filter(s => s.status === 'com-pendencia').length;
  const studentsWithDelayedTasks = students.filter(s => s.tasksCompleted! < s.totalTasks! * 0.7).length;
  const totalSessions = mentorias.length;
  const completedSessions = mentorias.filter(m => m.status === 'completa').length;
  const trafficSessions = mentorias.filter(m => m.tags.includes('trafego')).length;

  const groups = ['all', ...Array.from(new Set(students.map(s => s.group).filter(Boolean)))];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Produtividade</h1>
        <p className="text-gray-600">Visão estratégica da operação de mentoria</p>
      </div>

      <ProductivityCards
        totalStudents={totalStudents}
        activeStudents={activeStudents}
        totalSessions={totalSessions}
        completedSessions={completedSessions}
        pendingStudents={pendingStudents}
        studentsWithDelayedTasks={studentsWithDelayedTasks}
      />

      <WeeklyPriorities />

      <AdvancedFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        groupFilter={groupFilter}
        setGroupFilter={setGroupFilter}
        groups={groups}
      />

      <PerformanceSummary
        activeStudents={activeStudents}
        totalStudents={totalStudents}
        completedSessions={completedSessions}
        totalSessions={totalSessions}
        trafficSessions={trafficSessions}
      />

      <StudentsGrid students={filteredStudents} />
    </div>
  );
};
