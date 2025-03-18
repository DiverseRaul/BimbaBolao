import { defineStore } from 'pinia';
import supabase from '@/services/supabase';
import type { Match, Prediction } from '@/types/models';

interface MatchesState {
  MATCHES: Match[];
  USER_PREDICTIONS: Prediction[];
  IS_LOADING: boolean;
  ERROR: string | null;
}

export const useMatchesStore = defineStore('matches', {
  state: (): MatchesState => ({
    MATCHES: [],
    USER_PREDICTIONS: [],
    IS_LOADING: false,
    ERROR: null
  }),
  
  getters: {
    upcomingMatches: (state) => {
      const now = new Date();
      return state.MATCHES.filter(match => new Date(match.match_date) > now)
        .sort((a, b) => new Date(a.match_date).getTime() - new Date(b.match_date).getTime());
    },
    
    pastMatches: (state) => {
      const now = new Date();
      return state.MATCHES.filter(match => new Date(match.match_date) < now)
        .sort((a, b) => new Date(b.match_date).getTime() - new Date(a.match_date).getTime());
    },
    
    getPredictionForMatch: (state) => (matchId: number) => {
      return state.USER_PREDICTIONS.find(prediction => prediction.match_id === matchId);
    }
  },
  
  actions: {
    async fetchMatches() {
      this.IS_LOADING = true;
      this.ERROR = null;
      
      try {
        const { data, error } = await supabase
          .from('matches')
          .select('*')
          .order('match_date', { ascending: true });
        
        if (error) {
          this.ERROR = error.message;
        } else {
          this.MATCHES = data;
        }
      } catch (error) {
        this.ERROR = error instanceof Error ? error.message : 'Unknown error occurred';
      } finally {
        this.IS_LOADING = false;
      }
    },
    
    async fetchUserPredictions(userId: string) {
      this.IS_LOADING = true;
      this.ERROR = null;
      
      try {
        const { data, error } = await supabase
          .from('predictions')
          .select('*')
          .eq('user_id', userId);
        
        if (error) {
          this.ERROR = error.message;
        } else {
          this.USER_PREDICTIONS = data;
        }
      } catch (error) {
        this.ERROR = error instanceof Error ? error.message : 'Unknown error occurred';
      } finally {
        this.IS_LOADING = false;
      }
    },
    
    async savePrediction(prediction: Omit<Prediction, 'id' | 'created_at'>) {
      this.IS_LOADING = true;
      this.ERROR = null;
      
      try {
        // Check if prediction already exists
        const existingPrediction = this.USER_PREDICTIONS.find(
          p => p.match_id === prediction.match_id && p.user_id === prediction.user_id
        );
        
        let response;
        
        if (existingPrediction) {
          // Update existing prediction
          response = await supabase
            .from('predictions')
            .update({
              home_score: prediction.home_score,
              away_score: prediction.away_score,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingPrediction.id)
            .select();
        } else {
          // Create new prediction
          response = await supabase
            .from('predictions')
            .insert({
              ...prediction,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select();
        }
        
        if (response.error) {
          this.ERROR = response.error.message;
        } else {
          // Refresh predictions
          await this.fetchUserPredictions(prediction.user_id);
        }
        
        return response;
      } catch (error) {
        this.ERROR = error instanceof Error ? error.message : 'Unknown error occurred';
        throw error;
      } finally {
        this.IS_LOADING = false;
      }
    }
  }
});
