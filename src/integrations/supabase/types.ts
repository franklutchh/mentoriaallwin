export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      action_items: {
        Row: {
          created_at: string | null
          description: string
          due_date: string | null
          id: string
          points: number | null
          priority: string | null
          status: string | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          due_date?: string | null
          id?: string
          points?: number | null
          priority?: string | null
          status?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          due_date?: string | null
          id?: string
          points?: number | null
          priority?: string | null
          status?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "action_items_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          earned_date: string | null
          icon: string | null
          id: string
          name: string
          student_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          earned_date?: string | null
          icon?: string | null
          id?: string
          name: string
          student_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          earned_date?: string | null
          icon?: string | null
          id?: string
          name?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "badges_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      follow_up_items: {
        Row: {
          completed: boolean | null
          created_at: string | null
          description: string
          id: string
          priority: string | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          description: string
          id?: string
          priority?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          description?: string
          id?: string
          priority?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "follow_up_items_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      mentoring_sessions: {
        Row: {
          actions: string | null
          created_at: string | null
          date: string
          follow_up_required: boolean | null
          id: string
          recording_url: string | null
          satisfaction_score: number | null
          session_link: string | null
          status: string | null
          student_id: string | null
          tags: string[] | null
          time: string
          topics: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          actions?: string | null
          created_at?: string | null
          date: string
          follow_up_required?: boolean | null
          id?: string
          recording_url?: string | null
          satisfaction_score?: number | null
          session_link?: string | null
          status?: string | null
          student_id?: string | null
          tags?: string[] | null
          time: string
          topics: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          actions?: string | null
          created_at?: string | null
          date?: string
          follow_up_required?: boolean | null
          id?: string
          recording_url?: string | null
          satisfaction_score?: number | null
          session_link?: string | null
          status?: string | null
          student_id?: string | null
          tags?: string[] | null
          time?: string
          topics?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentoring_sessions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_history: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          method: string | null
          payment_date: string
          status: string | null
          student_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          method?: string | null
          payment_date: string
          status?: string | null
          student_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          method?: string | null
          payment_date?: string
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_history_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          churn_risk: string | null
          created_at: string | null
          due_date: string | null
          end_date: string | null
          engagement_score: number | null
          entry_date: string
          favorite: boolean | null
          group_name: string | null
          id: string
          instagram: string | null
          last_payment_date: string | null
          level: string | null
          lifetime_value: number | null
          monthly_value: number | null
          name: string
          payment_status: string | null
          points: number | null
          status: string | null
          tags: string[] | null
          tasks_completed: number | null
          total_tasks: number | null
          updated_at: string | null
          whatsapp: string
        }
        Insert: {
          churn_risk?: string | null
          created_at?: string | null
          due_date?: string | null
          end_date?: string | null
          engagement_score?: number | null
          entry_date?: string
          favorite?: boolean | null
          group_name?: string | null
          id?: string
          instagram?: string | null
          last_payment_date?: string | null
          level?: string | null
          lifetime_value?: number | null
          monthly_value?: number | null
          name: string
          payment_status?: string | null
          points?: number | null
          status?: string | null
          tags?: string[] | null
          tasks_completed?: number | null
          total_tasks?: number | null
          updated_at?: string | null
          whatsapp: string
        }
        Update: {
          churn_risk?: string | null
          created_at?: string | null
          due_date?: string | null
          end_date?: string | null
          engagement_score?: number | null
          entry_date?: string
          favorite?: boolean | null
          group_name?: string | null
          id?: string
          instagram?: string | null
          last_payment_date?: string | null
          level?: string | null
          lifetime_value?: number | null
          monthly_value?: number | null
          name?: string
          payment_status?: string | null
          points?: number | null
          status?: string | null
          tags?: string[] | null
          tasks_completed?: number | null
          total_tasks?: number | null
          updated_at?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
