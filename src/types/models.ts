// User model
export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Match model
export interface Match {
  id: number;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  match_date: string;
  location: string;
  competition: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

// Prediction model
export interface Prediction {
  id: number;
  user_id: string;
  match_id: number;
  home_score: number;
  away_score: number;
  points_earned: number | null;
  created_at: string;
  updated_at: string;
}

// Group model
export interface Group {
  id: number;
  name: string;
  description: string;
  join_code: string;
  admin_id: string;
  created_at: string;
  updated_at: string;
}

// GroupMember model
export interface GroupMember {
  id: number;
  group_id: number;
  user_id: string;
  joined_at: string;
}

// Leaderboard entry
export interface LeaderboardEntry {
  user_id: string;
  username: string;
  avatar_url?: string;
  total_points: number;
  predictions_count: number;
  correct_score_count: number;
  correct_outcome_count: number;
  accuracy_percentage: number;
}
