
-- Criar tabela para documentos da biblioteca de conhecimento
CREATE TABLE public.knowledge_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.knowledge_documents ENABLE ROW LEVEL SECURITY;

-- Política para mentores visualizarem todos os documentos
CREATE POLICY "Mentors can view all documents" 
  ON public.knowledge_documents 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'mentor')
  ));

-- Política para mentores gerenciarem documentos
CREATE POLICY "Mentors can manage documents" 
  ON public.knowledge_documents 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'mentor')
  ));

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_knowledge_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_knowledge_documents_updated_at
  BEFORE UPDATE ON public.knowledge_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_knowledge_documents_updated_at();
