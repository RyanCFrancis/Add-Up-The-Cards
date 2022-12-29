export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			Scores: {
				Row: {
					id: number;
					created_at: string | null;
					user_made_by: string | null;
					score: number | null;
					combo_one: number | null;
					combo_two: number | null;
					combo_three: number | null;
				};
				Insert: {
					id?: number;
					created_at?: string | null;
					user_made_by?: string | null;
					score?: number | null;
					combo_one?: number | null;
					combo_two?: number | null;
					combo_three?: number | null;
				};
				Update: {
					id?: number;
					created_at?: string | null;
					user_made_by?: string | null;
					score?: number | null;
					combo_one?: number | null;
					combo_two?: number | null;
					combo_three?: number | null;
				};
			};
			Users: {
				Row: {
					id: number;
					created_at: string | null;
					google_uuid: string | null;
					Name: string | null;
				};
				Insert: {
					id?: number;
					created_at?: string | null;
					google_uuid?: string | null;
					Name?: string | null;
				};
				Update: {
					id?: number;
					created_at?: string | null;
					google_uuid?: string | null;
					Name?: string | null;
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
			[_ in never]: never;
		};
	};
}
