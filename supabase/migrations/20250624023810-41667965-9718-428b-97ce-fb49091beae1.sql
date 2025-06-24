
-- Criar tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'mentor' CHECK (role IN ('admin', 'mentor', 'student')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de alunos
CREATE TABLE public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  instagram TEXT,
  status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'sob-revisao', 'com-pendencia', 'finalizado')),
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  group_name TEXT,
  tags TEXT[],
  tasks_completed INTEGER DEFAULT 0,
  total_tasks INTEGER DEFAULT 10,
  favorite BOOLEAN DEFAULT FALSE,
  
  -- Dados Financeiros
  payment_status TEXT DEFAULT 'em-dia' CHECK (payment_status IN ('em-dia', 'pendente', 'atrasado', 'inadimplente')),
  monthly_value DECIMAL(10,2) DEFAULT 497.00,
  due_date DATE,
  last_payment_date DATE,
  
  -- Gamificação
  level TEXT DEFAULT 'iniciante' CHECK (level IN ('iniciante', 'intermediario', 'avancado', 'expert')),
  points INTEGER DEFAULT 0,
  engagement_score INTEGER DEFAULT 50,
  churn_risk TEXT DEFAULT 'medio' CHECK (churn_risk IN ('baixo', 'medio', 'alto')),
  lifetime_value DECIMAL(10,2) DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de mentorias/calls
CREATE TABLE public.mentoring_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  type TEXT DEFAULT '1:1' CHECK (type IN ('1:1', 'grupo')),
  topics TEXT NOT NULL,
  actions TEXT,
  recording_url TEXT,
  status TEXT DEFAULT 'agendada' CHECK (status IN ('agendada', 'completa', 'em-andamento', 'precisa-revisao')),
  tags TEXT[],
  session_link TEXT,
  satisfaction_score INTEGER CHECK (satisfaction_score >= 1 AND satisfaction_score <= 10),
  follow_up_required BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de itens de ação
CREATE TABLE public.action_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'em-progresso', 'concluido')),
  due_date DATE,
  priority TEXT DEFAULT 'media' CHECK (priority IN ('baixa', 'media', 'alta')),
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de follow-up
CREATE TABLE public.follow_up_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  priority TEXT DEFAULT 'media' CHECK (priority IN ('baixa', 'media', 'alta')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de histórico de pagamentos
CREATE TABLE public.payment_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  status TEXT DEFAULT 'pago' CHECK (status IN ('pago', 'pendente', 'atrasado')),
  method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de badges
CREATE TABLE public.badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  earned_date DATE DEFAULT CURRENT_DATE,
  category TEXT DEFAULT 'progresso' CHECK (category IN ('progresso', 'engagement', 'pagamento', 'milestone')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentoring_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.action_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_up_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para mentores (acesso total aos dados dos alunos)
CREATE POLICY "Mentors can view all students" ON public.students FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor'))
);
CREATE POLICY "Mentors can manage students" ON public.students FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor'))
);

-- Políticas similares para outras tabelas
CREATE POLICY "Mentors can view all sessions" ON public.mentoring_sessions FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor'))
);
CREATE POLICY "Mentors can manage sessions" ON public.mentoring_sessions FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor'))
);

CREATE POLICY "Mentors can view all action items" ON public.action_items FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor'))
);
CREATE POLICY "Mentors can manage action items" ON public.action_items FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor'))
);

CREATE POLICY "Mentors can view all follow-ups" ON public.follow_up_items FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor'))
);
CREATE POLICY "Mentors can manage follow-ups" ON public.follow_up_items FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor'))
);

CREATE POLICY "Mentors can view payment history" ON public.payment_history FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor'))
);
CREATE POLICY "Mentors can manage payment history" ON public.payment_history FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor'))
);

CREATE POLICY "Mentors can view badges" ON public.badges FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor'))
);
CREATE POLICY "Mentors can manage badges" ON public.badges FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor'))
);

-- Trigger para criar perfil automaticamente quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    'mentor'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR each ROW EXECUTE FUNCTION public.handle_new_user();

-- Inserir dados iniciais dos alunos
INSERT INTO public.students (name, whatsapp, instagram, status, entry_date, group_name, tags, tasks_completed, total_tasks, favorite, payment_status, monthly_value, due_date, last_payment_date, level, points, engagement_score, churn_risk, lifetime_value) VALUES
('Ana Silva', '+55 11 99999-9999', '@ana.silva', 'ativo', '2024-01-15', 'Turma A', ARRAY['trafego', 'copy'], 8, 12, true, 'em-dia', 497.00, '2024-02-15', '2024-01-15', 'intermediario', 850, 85, 'baixo', 2485.00),
('Carlos Santos', '+55 11 88888-8888', '@carlos.santos', 'com-pendencia', '2024-01-10', 'Turma A', ARRAY['mentalidade', 'funil'], 3, 10, false, 'atrasado', 497.00, '2024-02-10', '2024-01-10', 'iniciante', 320, 45, 'alto', 997.00),
('Maria Oliveira', '+55 11 77777-7777', '@maria.oliveira', 'sob-revisao', '2023-12-01', 'Turma B', ARRAY['copy'], 15, 15, false, 'em-dia', 497.00, '2024-02-01', '2024-01-01', 'avancado', 1250, 95, 'baixo', 3482.00);
