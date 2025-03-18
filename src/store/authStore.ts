import { defineStore } from 'pinia';
import supabase from '@/services/supabase';
import type { User, AuthResponse } from '@supabase/supabase-js';

interface AuthState {
  USER: User | null;
  IS_LOADING: boolean;
  AUTH_ERROR: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    USER: null,
    IS_LOADING: false,
    AUTH_ERROR: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.USER,
    userEmail: (state) => state.USER?.email
  },
  
  actions: {
    async initialize() {
      const { data } = await supabase.auth.getSession();
      this.USER = data.session?.user || null;
      
      // Set up auth state change listener
      supabase.auth.onAuthStateChange((event, session) => {
        this.USER = session?.user || null;
      });
    },
    
    async loginWithEmail(email: string, password: string): Promise<AuthResponse> {
      this.IS_LOADING = true;
      this.AUTH_ERROR = null;
      
      try {
        const response = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (response.error) {
          this.AUTH_ERROR = response.error.message;
        } else {
          this.USER = response.data.user;
        }
        
        return response;
      } catch (error) {
        this.AUTH_ERROR = error instanceof Error ? error.message : 'Unknown error occurred';
        throw error;
      } finally {
        this.IS_LOADING = false;
      }
    },
    
    async registerWithEmail(email: string, password: string): Promise<AuthResponse> {
      this.IS_LOADING = true;
      this.AUTH_ERROR = null;
      
      try {
        const response = await supabase.auth.signUp({
          email,
          password
        });
        
        if (response.error) {
          this.AUTH_ERROR = response.error.message;
        }
        
        return response;
      } catch (error) {
        this.AUTH_ERROR = error instanceof Error ? error.message : 'Unknown error occurred';
        throw error;
      } finally {
        this.IS_LOADING = false;
      }
    },
    
    async logout() {
      this.IS_LOADING = true;
      this.AUTH_ERROR = null;
      
      try {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          this.AUTH_ERROR = error.message;
        } else {
          this.USER = null;
        }
      } catch (error) {
        this.AUTH_ERROR = error instanceof Error ? error.message : 'Unknown error occurred';
        throw error;
      } finally {
        this.IS_LOADING = false;
      }
    },
    
    async resetPassword(email: string) {
      this.IS_LOADING = true;
      this.AUTH_ERROR = null;
      
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        
        if (error) {
          this.AUTH_ERROR = error.message;
        }
      } catch (error) {
        this.AUTH_ERROR = error instanceof Error ? error.message : 'Unknown error occurred';
        throw error;
      } finally {
        this.IS_LOADING = false;
      }
    }
  }
});
