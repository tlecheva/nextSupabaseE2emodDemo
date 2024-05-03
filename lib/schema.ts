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
      airbus_sa_changes: {
        Row: {
          ca: string | null
          costing_osw: string | null
          cr_context_airbus: string | null
          crLocked: boolean | null
          crLockedDate: string | null
          date_to_send_rom: string | null
          description: string | null
          displayCRLockedBy: string | null
          id: number
          impacts: string | null
          implementation_scenario: string | null
          industrial_calendar: string | null
          input_data_maturity: string | null
          issue: string | null
          mod_airbus: string | null
          mod_closure_stage_0: string | null
          mod_closure_stage_3: string | null
          mod_validities: string | null
          mp_airbus: string | null
          number: string | null
          official_customer_need: string | null
          origin: string | null
          osw_impacts: string | null
          otp_vds: string | null
          pa_number: string | null
          poe: string | null
          priority: string | null
          qualification_needed: string | null
          retrofit: string | null
          scope: string | null
          send_rom_status: string | null
          std_ac: string | null
          step_istep: string | null
          stress_dossier_impacted: string | null
          supplier_change_request_number: string | null
          t0_implementation: string | null
          target_date_to_send_rom: string | null
          title: string | null
          type_of_mod: string | null
          update_iterations: string | null
          version: string | null
          version_std: string | null
          weight_impact: string | null
          WFPhase: string | null
          WFStatus: string | null
        }
        Insert: {
          ca?: string | null
          costing_osw?: string | null
          cr_context_airbus?: string | null
          crLocked?: boolean | null
          crLockedDate?: string | null
          date_to_send_rom?: string | null
          description?: string | null
          displayCRLockedBy?: string | null
          id: number
          impacts?: string | null
          implementation_scenario?: string | null
          industrial_calendar?: string | null
          input_data_maturity?: string | null
          issue?: string | null
          mod_airbus?: string | null
          mod_closure_stage_0?: string | null
          mod_closure_stage_3?: string | null
          mod_validities?: string | null
          mp_airbus?: string | null
          number?: string | null
          official_customer_need?: string | null
          origin?: string | null
          osw_impacts?: string | null
          otp_vds?: string | null
          pa_number?: string | null
          poe?: string | null
          priority?: string | null
          qualification_needed?: string | null
          retrofit?: string | null
          scope?: string | null
          send_rom_status?: string | null
          std_ac?: string | null
          step_istep?: string | null
          stress_dossier_impacted?: string | null
          supplier_change_request_number?: string | null
          t0_implementation?: string | null
          target_date_to_send_rom?: string | null
          title?: string | null
          type_of_mod?: string | null
          update_iterations?: string | null
          version?: string | null
          version_std?: string | null
          weight_impact?: string | null
          WFPhase?: string | null
          WFStatus?: string | null
        }
        Update: {
          ca?: string | null
          costing_osw?: string | null
          cr_context_airbus?: string | null
          crLocked?: boolean | null
          crLockedDate?: string | null
          date_to_send_rom?: string | null
          description?: string | null
          displayCRLockedBy?: string | null
          id?: number
          impacts?: string | null
          implementation_scenario?: string | null
          industrial_calendar?: string | null
          input_data_maturity?: string | null
          issue?: string | null
          mod_airbus?: string | null
          mod_closure_stage_0?: string | null
          mod_closure_stage_3?: string | null
          mod_validities?: string | null
          mp_airbus?: string | null
          number?: string | null
          official_customer_need?: string | null
          origin?: string | null
          osw_impacts?: string | null
          otp_vds?: string | null
          pa_number?: string | null
          poe?: string | null
          priority?: string | null
          qualification_needed?: string | null
          retrofit?: string | null
          scope?: string | null
          send_rom_status?: string | null
          std_ac?: string | null
          step_istep?: string | null
          stress_dossier_impacted?: string | null
          supplier_change_request_number?: string | null
          t0_implementation?: string | null
          target_date_to_send_rom?: string | null
          title?: string | null
          type_of_mod?: string | null
          update_iterations?: string | null
          version?: string | null
          version_std?: string | null
          weight_impact?: string | null
          WFPhase?: string | null
          WFStatus?: string | null
        }
        Relationships: []
      }
      channels: {
        Row: {
          created_by: string
          id: number
          inserted_at: string
          slug: string
        }
        Insert: {
          created_by: string
          id?: number
          inserted_at?: string
          slug: string
        }
        Update: {
          created_by?: string
          id?: number
          inserted_at?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          channel_id: number
          id: number
          inserted_at: string
          message: string | null
          user_id: string
        }
        Insert: {
          channel_id: number
          id?: number
          inserted_at?: string
          message?: string | null
          user_id: string
        }
        Update: {
          channel_id?: number
          id?: number
          inserted_at?: string
          message?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      todos: {
        Row: {
          id: number
          inserted_at: string
          is_complete: boolean | null
          task: string | null
          user_id: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id: string
        }
        Update: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "todos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          id: string
          status: Database["public"]["Enums"]["user_status"] | null
          username: string | null
        }
        Insert: {
          id: string
          status?: Database["public"]["Enums"]["user_status"] | null
          username?: string | null
        }
        Update: {
          id?: string
          status?: Database["public"]["Enums"]["user_status"] | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_permission: "channels.delete" | "messages.delete"
      app_role: "admin" | "moderator"
      user_status: "ONLINE" | "OFFLINE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
