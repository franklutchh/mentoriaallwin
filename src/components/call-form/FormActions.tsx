
import React from 'react';
import { Save } from 'lucide-react';

interface FormActionsProps {
  onCancel: () => void;
  isFormValid: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isFormValid
}) => {
  return (
    <div className="flex gap-4 pt-8 border-t border-border/30">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 px-6 py-4 border border-border/30 text-muted-foreground rounded-xl hover:bg-muted transition-all hover:scale-[1.02]"
      >
        Cancelar
      </button>
      <button
        type="submit"
        disabled={!isFormValid}
        className="flex-1 bg-gradient-to-r from-brand-purple to-brand-purple-medium hover:from-brand-purple-medium hover:to-brand-purple-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-apple-lg font-semibold"
      >
        <Save className="w-5 h-5" />
        Salvar Call
      </button>
    </div>
  );
};
