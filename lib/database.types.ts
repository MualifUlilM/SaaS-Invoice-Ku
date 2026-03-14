export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";
export type InvoiceDiscountType = "fixed" | "percentage";
export type ContactMessageStatus = "new" | "in_review" | "resolved";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          onboarding_completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          onboarding_completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          onboarding_completed_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      businesses: {
        Row: {
          id: string;
          owner_user_id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          email: string | null;
          phone: string | null;
          address: string | null;
          city: string | null;
          province: string | null;
          postal_code: string | null;
          country: string;
          currency_code: string;
          invoice_prefix: string;
          next_invoice_number: number;
          bank_name: string | null;
          bank_account_number: string | null;
          bank_account_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_user_id: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          province?: string | null;
          postal_code?: string | null;
          country?: string;
          currency_code?: string;
          invoice_prefix?: string;
          next_invoice_number?: number;
          bank_name?: string | null;
          bank_account_number?: string | null;
          bank_account_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          logo_url?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          province?: string | null;
          postal_code?: string | null;
          country?: string;
          currency_code?: string;
          invoice_prefix?: string;
          next_invoice_number?: number;
          bank_name?: string | null;
          bank_account_number?: string | null;
          bank_account_name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      clients: {
        Row: {
          id: string;
          business_id: string;
          name: string;
          company_name: string | null;
          email: string | null;
          phone: string | null;
          address: string | null;
          notes: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          name: string;
          company_name?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          notes?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          company_name?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          notes?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      invoices: {
        Row: {
          id: string;
          business_id: string;
          client_id: string;
          invoice_number: string;
          status: InvoiceStatus;
          issue_date: string;
          due_date: string;
          currency_code: string;
          discount_type: InvoiceDiscountType;
          discount_value: number;
          subtotal_amount: number;
          discount_amount: number;
          tax_amount: number;
          total_amount: number;
          amount_paid: number;
          notes: string | null;
          payment_instructions: string | null;
          sent_at: string | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          client_id: string;
          invoice_number?: string;
          status?: InvoiceStatus;
          issue_date: string;
          due_date: string;
          currency_code?: string;
          discount_type?: InvoiceDiscountType;
          discount_value?: number;
          subtotal_amount?: number;
          discount_amount?: number;
          tax_amount?: number;
          total_amount?: number;
          amount_paid?: number;
          notes?: string | null;
          payment_instructions?: string | null;
          sent_at?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          client_id?: string;
          invoice_number?: string;
          status?: InvoiceStatus;
          issue_date?: string;
          due_date?: string;
          currency_code?: string;
          discount_type?: InvoiceDiscountType;
          discount_value?: number;
          subtotal_amount?: number;
          discount_amount?: number;
          tax_amount?: number;
          total_amount?: number;
          amount_paid?: number;
          notes?: string | null;
          payment_instructions?: string | null;
          sent_at?: string | null;
          paid_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      invoice_items: {
        Row: {
          id: string;
          invoice_id: string;
          sort_order: number;
          description: string;
          quantity: number;
          unit_price_amount: number;
          line_total_amount: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          sort_order?: number;
          description: string;
          quantity: number;
          unit_price_amount: number;
          line_total_amount: number;
          created_at?: string;
        };
        Update: {
          sort_order?: number;
          description?: string;
          quantity?: number;
          unit_price_amount?: number;
          line_total_amount?: number;
        };
        Relationships: [];
      };
      invoice_status_history: {
        Row: {
          id: string;
          invoice_id: string;
          from_status: InvoiceStatus | null;
          to_status: InvoiceStatus;
          changed_by_user_id: string | null;
          note: string | null;
          changed_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          from_status?: InvoiceStatus | null;
          to_status: InvoiceStatus;
          changed_by_user_id?: string | null;
          note?: string | null;
          changed_at?: string;
        };
        Update: {
          note?: string | null;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          email: string;
          topic: string;
          message: string;
          status: ContactMessageStatus;
          source: string;
          submitted_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          email: string;
          topic: string;
          message: string;
          status?: ContactMessageStatus;
          source?: string;
          submitted_at?: string;
        };
        Update: {
          status?: ContactMessageStatus;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      invoice_status: InvoiceStatus;
      contact_message_status: ContactMessageStatus;
      invoice_discount_type: InvoiceDiscountType;
    };
    CompositeTypes: Record<string, never>;
  };
}

export type PublicSchema = Database["public"];
export type UserRow = Database["public"]["Tables"]["users"]["Row"];
export type BusinessRow = Database["public"]["Tables"]["businesses"]["Row"];
export type ClientRow = Database["public"]["Tables"]["clients"]["Row"];
export type InvoiceRow = Database["public"]["Tables"]["invoices"]["Row"];
export type InvoiceItemRow = Database["public"]["Tables"]["invoice_items"]["Row"];
export type InvoiceStatusHistoryRow =
  Database["public"]["Tables"]["invoice_status_history"]["Row"];
export type ContactMessageRow =
  Database["public"]["Tables"]["contact_messages"]["Row"];
