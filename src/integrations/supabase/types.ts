export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      kategori: {
        Row: {
          deskripsi_kategori: string | null
          id: number
          nama_kategori: string | null
        }
        Insert: {
          deskripsi_kategori?: string | null
          id?: number
          nama_kategori?: string | null
        }
        Update: {
          deskripsi_kategori?: string | null
          id?: number
          nama_kategori?: string | null
        }
        Relationships: []
      }
      login: {
        Row: {
          email: string
          id: number
          password: string | null
        }
        Insert: {
          email: string
          id?: number
          password?: string | null
        }
        Update: {
          email?: string
          id?: number
          password?: string | null
        }
        Relationships: []
      }
      pelanggan: {
        Row: {
          email: string | null
          id: number
          nama_pelanggan: string | null
          status: string | null
          telepon: string | null
        }
        Insert: {
          email?: string | null
          id?: number
          nama_pelanggan?: string | null
          status?: string | null
          telepon?: string | null
        }
        Update: {
          email?: string | null
          id?: number
          nama_pelanggan?: string | null
          status?: string | null
          telepon?: string | null
        }
        Relationships: []
      }
      produk: {
        Row: {
          deskripsi: string | null
          harga: number | null
          id: number
          image: string | null
          kategori_id: number | null
          nama_produk: string | null
          stok: number | null
        }
        Insert: {
          deskripsi?: string | null
          harga?: number | null
          id?: number
          image?: string | null
          kategori_id?: number | null
          nama_produk?: string | null
          stok?: number | null
        }
        Update: {
          deskripsi?: string | null
          harga?: number | null
          id?: number
          image?: string | null
          kategori_id?: number | null
          nama_produk?: string | null
          stok?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_produk_kategori"
            columns: ["kategori_id"]
            isOneToOne: false
            referencedRelation: "kategori"
            referencedColumns: ["id"]
          },
        ]
      }
      transaksi: {
        Row: {
          aksi: string | null
          id: number
          Jumlah: number | null
          pelanggan_id: number | null
          produk_id: number | null
          subtotal: number | null
          tanggal: string | null
        }
        Insert: {
          aksi?: string | null
          id?: number
          Jumlah?: number | null
          pelanggan_id?: number | null
          produk_id?: number | null
          subtotal?: number | null
          tanggal?: string | null
        }
        Update: {
          aksi?: string | null
          id?: number
          Jumlah?: number | null
          pelanggan_id?: number | null
          produk_id?: number | null
          subtotal?: number | null
          tanggal?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_transaksi_pelanggan"
            columns: ["pelanggan_id"]
            isOneToOne: false
            referencedRelation: "pelanggan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_transaksi_pelanggan"
            columns: ["pelanggan_id"]
            isOneToOne: false
            referencedRelation: "v_pelanggan_total"
            referencedColumns: ["pelanggan_id"]
          },
          {
            foreignKeyName: "transaksi_produk_id_fkey"
            columns: ["produk_id"]
            isOneToOne: false
            referencedRelation: "produk"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaksi_produk_id_fkey"
            columns: ["produk_id"]
            isOneToOne: false
            referencedRelation: "v_produk_stok"
            referencedColumns: ["produk_id"]
          },
        ]
      }
      transaksi_items: {
        Row: {
          harga: number
          id: number
          jumlah: number
          produk_id: number | null
          subtotal: number | null
          transaksi_id: number | null
        }
        Insert: {
          harga: number
          id?: number
          jumlah: number
          produk_id?: number | null
          subtotal?: number | null
          transaksi_id?: number | null
        }
        Update: {
          harga?: number
          id?: number
          jumlah?: number
          produk_id?: number | null
          subtotal?: number | null
          transaksi_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transaksi_items_produk_id_fkey"
            columns: ["produk_id"]
            isOneToOne: false
            referencedRelation: "produk"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaksi_items_produk_id_fkey"
            columns: ["produk_id"]
            isOneToOne: false
            referencedRelation: "v_produk_stok"
            referencedColumns: ["produk_id"]
          },
          {
            foreignKeyName: "transaksi_items_transaksi_id_fkey"
            columns: ["transaksi_id"]
            isOneToOne: false
            referencedRelation: "transaksi"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaksi_items_transaksi_id_fkey"
            columns: ["transaksi_id"]
            isOneToOne: false
            referencedRelation: "v_ringkasan"
            referencedColumns: ["transaksi_id"]
          },
          {
            foreignKeyName: "transaksi_items_transaksi_id_fkey"
            columns: ["transaksi_id"]
            isOneToOne: false
            referencedRelation: "v_transaksi_detail"
            referencedColumns: ["transaksi_id"]
          },
          {
            foreignKeyName: "transaksi_items_transaksi_id_fkey"
            columns: ["transaksi_id"]
            isOneToOne: false
            referencedRelation: "v_transaksi_lengkap"
            referencedColumns: ["transaksi_id"]
          },
          {
            foreignKeyName: "transaksi_items_transaksi_id_fkey"
            columns: ["transaksi_id"]
            isOneToOne: false
            referencedRelation: "v_transaksi_total"
            referencedColumns: ["transaksi_id"]
          },
        ]
      }
    }
    Views: {
      v_pelanggan_total: {
        Row: {
          nama_pelanggan: string | null
          pelanggan_id: number | null
          total_belanja: number | null
        }
        Relationships: []
      }
      v_produk_stok: {
        Row: {
          harga: number | null
          nama_kategori: string | null
          nama_produk: string | null
          produk_id: number | null
          stok: number | null
          stok_sisa: number | null
          total_terjual: number | null
        }
        Relationships: []
      }
      v_ringkasan: {
        Row: {
          aksi: string | null
          nama_pelanggan: string | null
          produk_dibeli: string | null
          tanggal: string | null
          total_belanja: number | null
          transaksi_id: number | null
        }
        Relationships: []
      }
      v_transaksi_detail: {
        Row: {
          aksi: string | null
          harga: number | null
          jumlah: number | null
          nama_pelanggan: string | null
          nama_produk: string | null
          subtotal: number | null
          tanggal: string | null
          transaksi_id: number | null
        }
        Relationships: []
      }
      v_transaksi_lengkap: {
        Row: {
          aksi: string | null
          harga: number | null
          jumlah: number | null
          nama_pelanggan: string | null
          nama_produk: string | null
          subtotal: number | null
          tanggal: string | null
          transaksi_id: number | null
        }
        Relationships: []
      }
      v_transaksi_total: {
        Row: {
          aksi: string | null
          nama_pelanggan: string | null
          tanggal: string | null
          total_belanja: number | null
          transaksi_id: number | null
        }
        Relationships: []
      }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
