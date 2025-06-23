
import React, { useState } from 'react';
import { useCallsContext } from '../contexts/CallsContext';
import { CallsHeader } from './calls/CallsHeader';
import { CallsFilters } from './calls/CallsFilters';
import { CallCard } from './calls/CallCard';
import { EmptyCallsState } from './calls/EmptyCallsState';

export const Calls: React.FC = () => {
  const { calls, students } = useCallsContext();
  const [statusFilter, setStatusFilter] = useState<'all' | 'agendada' | 'completa' | 'em-andamento' | 'cancelada'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | '1:1' | 'grupo'>('all');
  const [studentFilter, setStudentFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student?.name || 'Desconhecido';
  };

  const filteredCalls = calls.filter(call => {
    const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
    const matchesType = typeFilter === 'all' || call.type === typeFilter;
    const matchesStudent = studentFilter === 'all' || call.studentId === studentFilter;
    const matchesSearch = searchTerm === '' || 
      getStudentName(call.studentId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.topics.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesType && matchesStudent && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <CallsHeader />

      <CallsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        studentFilter={studentFilter}
        setStudentFilter={setStudentFilter}
        students={students}
        filteredCallsCount={filteredCalls.length}
      />

      {filteredCalls.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCalls.map((call) => (
            <CallCard
              key={call.id}
              call={call}
              getStudentName={getStudentName}
            />
          ))}
        </div>
      ) : (
        <EmptyCallsState />
      )}
    </div>
  );
};
