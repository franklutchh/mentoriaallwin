
import React from 'react';
import { Users } from 'lucide-react';
import { Student } from '../../types/student';

interface StudentSelectionProps {
  students: Student[];
  selectedStudentIds: string[];
  onStudentChange: (studentId: string, checked: boolean) => void;
}

export const StudentSelection: React.FC<StudentSelectionProps> = ({
  students,
  selectedStudentIds,
  onStudentChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-brand-purple" />
        <label className="text-lg font-semibold text-foreground">
          Aluno(s) * 
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ({selectedStudentIds.length} selecionado{selectedStudentIds.length !== 1 ? 's' : ''})
          </span>
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students.filter(s => s.status === 'ativo').map((student) => (
          <label 
            key={student.id} 
            className="group flex items-center gap-4 p-4 bg-card rounded-xl border border-border/30 hover:border-brand-purple/50 hover:bg-brand-purple/5 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-apple"
          >
            <input
              type="checkbox"
              checked={selectedStudentIds.includes(student.id)}
              onChange={(e) => onStudentChange(student.id, e.target.checked)}
              className="w-5 h-5 text-brand-purple rounded-md border-2 border-border focus:ring-brand-purple focus:ring-2"
            />
            <div className="flex-1">
              <span className="font-semibold text-foreground group-hover:text-brand-purple-medium transition-colors">
                {student.name}
              </span>
              <p className="text-sm text-muted-foreground">{student.group}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
