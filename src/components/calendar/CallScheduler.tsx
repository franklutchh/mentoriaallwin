
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, Clock, User } from 'lucide-react';
import { Student } from '../../types/student';

interface CallSchedulerProps {
  onClose: () => void;
  students: Student[];
  initialDate: Date;
}

export const CallScheduler: React.FC<CallSchedulerProps> = ({
  onClose,
  students,
  initialDate
}) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    initialDate.toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [callType, setCallType] = useState<'1:1' | 'grupo'>('1:1');

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const activeStudents = students.filter(s => s.status === 'ativo');

  const handleQuickSchedule = () => {
    const params = new URLSearchParams({
      date: selectedDate,
      time: selectedTime,
      type: callType,
      ...(selectedStudent && { studentId: selectedStudent })
    });
    
    navigate(`/calls/new?${params.toString()}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Agendamento Rápido</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Data
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Horário
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTime === time
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Call Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Call
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCallType('1:1')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  callType === '1:1'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Individual (1:1)
              </button>
              <button
                onClick={() => setCallType('grupo')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  callType === 'grupo'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Grupo
              </button>
            </div>
          </div>

          {/* Student Selection (for 1:1) */}
          {callType === '1:1' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Aluno (Opcional)
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione um aluno...</option>
                {activeStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleQuickSchedule}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Agendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
