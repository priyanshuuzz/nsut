export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'worker' | 'officer' | 'district_authority' | 'citizen';
export type WasteType = 'organic' | 'plastic' | 'mixed' | 'other';
export type ComplaintType = 'missed_pickup' | 'overflow' | 'cleanliness' | 'other';
export type FeedbackStatus = 'pending' | 'assigned' | 'resolved' | 'closed';
export type ReportType = 'daily' | 'weekly' | 'monthly';
export type PredictionType = 'route_optimization' | 'waste_volume' | 'seasonal_pattern';

export interface Database {
  public: {
    Tables: {
      panchayats: {
        Row: {
          id: string;
          name: string;
          district: string;
          state: string;
          contact_email: string | null;
          contact_phone: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          district: string;
          state: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          district?: string;
          state?: string;
          contact_email?: string | null;
          contact_phone?: string | null;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          full_name: string;
          phone: string | null;
          panchayat_id: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: UserRole;
          full_name: string;
          phone?: string | null;
          panchayat_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: UserRole;
          full_name?: string;
          phone?: string | null;
          panchayat_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      routes: {
        Row: {
          id: string;
          panchayat_id: string;
          name: string;
          description: string | null;
          path_data: Json | null;
          estimated_duration: number | null;
          estimated_distance: number | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          panchayat_id: string;
          name: string;
          description?: string | null;
          path_data?: Json | null;
          estimated_duration?: number | null;
          estimated_distance?: number | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          panchayat_id?: string;
          name?: string;
          description?: string | null;
          path_data?: Json | null;
          estimated_duration?: number | null;
          estimated_distance?: number | null;
          is_active?: boolean;
          created_at?: string;
        };
      };
      waste_logs: {
        Row: {
          id: string;
          worker_id: string;
          route_id: string | null;
          panchayat_id: string;
          waste_type: WasteType;
          weight_kg: number;
          location: string | null;
          photo_urls: string[];
          notes: string | null;
          collected_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          worker_id: string;
          route_id?: string | null;
          panchayat_id: string;
          waste_type: WasteType;
          weight_kg: number;
          location?: string | null;
          photo_urls?: string[];
          notes?: string | null;
          collected_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          worker_id?: string;
          route_id?: string | null;
          panchayat_id?: string;
          waste_type?: WasteType;
          weight_kg?: number;
          location?: string | null;
          photo_urls?: string[];
          notes?: string | null;
          collected_at?: string;
          created_at?: string;
        };
      };
      attendance: {
        Row: {
          id: string;
          worker_id: string;
          panchayat_id: string;
          check_in_time: string;
          check_in_location: string | null;
          check_out_time: string | null;
          check_out_location: string | null;
          total_hours: number | null;
          areas_covered: string[];
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          worker_id: string;
          panchayat_id: string;
          check_in_time?: string;
          check_in_location?: string | null;
          check_out_time?: string | null;
          check_out_location?: string | null;
          total_hours?: number | null;
          areas_covered?: string[];
          date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          worker_id?: string;
          panchayat_id?: string;
          check_in_time?: string;
          check_in_location?: string | null;
          check_out_time?: string | null;
          check_out_location?: string | null;
          total_hours?: number | null;
          areas_covered?: string[];
          date?: string;
          created_at?: string;
        };
      };
      route_tracking: {
        Row: {
          id: string;
          worker_id: string;
          route_id: string | null;
          attendance_id: string | null;
          location: string;
          timestamp: string;
          speed: number | null;
          accuracy: number | null;
        };
        Insert: {
          id?: string;
          worker_id: string;
          route_id?: string | null;
          attendance_id?: string | null;
          location: string;
          timestamp?: string;
          speed?: number | null;
          accuracy?: number | null;
        };
        Update: {
          id?: string;
          worker_id?: string;
          route_id?: string | null;
          attendance_id?: string | null;
          location?: string;
          timestamp?: string;
          speed?: number | null;
          accuracy?: number | null;
        };
      };
      citizen_feedback: {
        Row: {
          id: string;
          panchayat_id: string;
          citizen_name: string | null;
          citizen_phone: string | null;
          complaint_type: ComplaintType;
          description: string;
          location: string | null;
          location_name: string | null;
          photo_urls: string[];
          status: FeedbackStatus;
          assigned_to: string | null;
          resolved_at: string | null;
          resolution_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          panchayat_id: string;
          citizen_name?: string | null;
          citizen_phone?: string | null;
          complaint_type: ComplaintType;
          description: string;
          location?: string | null;
          location_name?: string | null;
          photo_urls?: string[];
          status?: FeedbackStatus;
          assigned_to?: string | null;
          resolved_at?: string | null;
          resolution_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          panchayat_id?: string;
          citizen_name?: string | null;
          citizen_phone?: string | null;
          complaint_type?: ComplaintType;
          description?: string;
          location?: string | null;
          location_name?: string | null;
          photo_urls?: string[];
          status?: FeedbackStatus;
          assigned_to?: string | null;
          resolved_at?: string | null;
          resolution_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          panchayat_id: string;
          report_type: ReportType;
          period_start: string;
          period_end: string;
          total_waste_kg: number;
          areas_covered: number;
          workers_count: number;
          complaints_resolved: number;
          summary_data: Json;
          file_url: string | null;
          generated_at: string;
        };
        Insert: {
          id?: string;
          panchayat_id: string;
          report_type: ReportType;
          period_start: string;
          period_end: string;
          total_waste_kg?: number;
          areas_covered?: number;
          workers_count?: number;
          complaints_resolved?: number;
          summary_data?: Json;
          file_url?: string | null;
          generated_at?: string;
        };
        Update: {
          id?: string;
          panchayat_id?: string;
          report_type?: ReportType;
          period_start?: string;
          period_end?: string;
          total_waste_kg?: number;
          areas_covered?: number;
          workers_count?: number;
          complaints_resolved?: number;
          summary_data?: Json;
          file_url?: string | null;
          generated_at?: string;
        };
      };
      ai_predictions: {
        Row: {
          id: string;
          panchayat_id: string;
          prediction_type: PredictionType;
          target_date: string;
          prediction_data: Json;
          confidence_score: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          panchayat_id: string;
          prediction_type: PredictionType;
          target_date: string;
          prediction_data: Json;
          confidence_score?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          panchayat_id?: string;
          prediction_type?: PredictionType;
          target_date?: string;
          prediction_data?: Json;
          confidence_score?: number | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
      waste_type: WasteType;
      complaint_type: ComplaintType;
      feedback_status: FeedbackStatus;
      report_type: ReportType;
      prediction_type: PredictionType;
    };
  };
}
