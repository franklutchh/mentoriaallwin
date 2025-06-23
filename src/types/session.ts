
export interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  type: '1:1' | 'grupo';
  discordLink?: string;
  objective: string;
  students: string[];
}
