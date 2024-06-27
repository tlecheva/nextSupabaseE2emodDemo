export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  e2emod_dev: {
    Tables: {
      change: {
        Row: {
          ca_wp: string | null
          change_id: string | null
          cr_context: string | null
          created_by: string | null
          creation_date: string
          id: number
          impacts: string | null
          mod: string | null
          modification_date: string
          mp: string | null
          origin: string | null
          phase: string | null
          poe_conf: string | null
          review_week: string | null
          send_rom_status: string | null
          status: string | null
          step_istep: string | null
          title: string | null
          type: string | null
          version_or_std: string | null
        }
        Insert: {
          ca_wp?: string | null
          change_id?: string | null
          cr_context?: string | null
          created_by?: string | null
          creation_date?: string
          id?: number
          impacts?: string | null
          mod?: string | null
          modification_date?: string
          mp?: string | null
          origin?: string | null
          phase?: string | null
          poe_conf?: string | null
          review_week?: string | null
          send_rom_status?: string | null
          status?: string | null
          step_istep?: string | null
          title?: string | null
          type?: string | null
          version_or_std?: string | null
        }
        Update: {
          ca_wp?: string | null
          change_id?: string | null
          cr_context?: string | null
          created_by?: string | null
          creation_date?: string
          id?: number
          impacts?: string | null
          mod?: string | null
          modification_date?: string
          mp?: string | null
          origin?: string | null
          phase?: string | null
          poe_conf?: string | null
          review_week?: string | null
          send_rom_status?: string | null
          status?: string | null
          step_istep?: string | null
          title?: string | null
          type?: string | null
          version_or_std?: string | null
        }
        Relationships: []
      }
      dict_attribute: {
        Row: {
          attribute: string | null
          category: string | null
          creation_date: string
          db_column: string | null
          db_table: string | null
          display_tooltip: string | null
          edit_change_order: string | null
          entity: string | null
          format: string | null
          id: number
          input_type: string | null
          label: string | null
          length: string | null
          list_of_changes_order: number | null
          modification_date: string
          nullable: string | null
          ref_source: string | null
          related_to_id: number | null
          source: string | null
          unique_id: string | null
        }
        Insert: {
          attribute?: string | null
          category?: string | null
          creation_date?: string
          db_column?: string | null
          db_table?: string | null
          display_tooltip?: string | null
          edit_change_order?: string | null
          entity?: string | null
          format?: string | null
          id?: number
          input_type?: string | null
          label?: string | null
          length?: string | null
          list_of_changes_order?: string | null
          modification_date?: string
          nullable?: string | null
          ref_source?: string | null
          related_to_id?: number | null
          source?: string | null
          unique_id?: string | null
        }
        Update: {
          attribute?: string | null
          category?: string | null
          creation_date?: string
          db_column?: string | null
          db_table?: string | null
          display_tooltip?: string | null
          edit_change_order?: string | null
          entity?: string | null
          format?: string | null
          id?: number
          input_type?: string | null
          label?: string | null
          length?: string | null
          list_of_changes_order?: string | null
          modification_date?: string
          nullable?: string | null
          ref_source?: string | null
          related_to_id?: number | null
          source?: string | null
          unique_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_parent_attribute"
            columns: ["related_to_id"]
            isOneToOne: false
            referencedRelation: "dict_attribute"
            referencedColumns: ["id"]
          },
        ]
      }
      ref: {
        Row: {
          creation_date: string
          id: number
          modification_date: string
          name: string | null
        }
        Insert: {
          creation_date?: string
          id?: number
          modification_date?: string
          name?: string | null
        }
        Update: {
          creation_date?: string
          id?: number
          modification_date?: string
          name?: string | null
        }
        Relationships: []
      }
      ref_data: {
        Row: {
          code: string | null
          creation_date: string
          id: number
          index: number | null
          label: string | null
          modification_date: string
          ref_id: number
          short_label: string | null
        }
        Insert: {
          code?: string | null
          creation_date?: string
          id?: number
          index?: number | null
          label?: string | null
          modification_date?: string
          ref_id: number
          short_label?: string | null
        }
        Update: {
          code?: string | null
          creation_date?: string
          id?: number
          index?: number | null
          label?: string | null
          modification_date?: string
          ref_id?: number
          short_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_data_ref"
            columns: ["ref_id"]
            isOneToOne: false
            referencedRelation: "ref"
            referencedColumns: ["id"]
          },
        ]
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
