<template>
  <div class="profile-container">
    <div class="profile-card">
      <h2>{{ $t('common.profile') }}</h2>
      
      <div v-if="IS_LOADING" class="loading">
        {{ $t('common.loading') }}
      </div>
      
      <form v-else @submit.prevent="updateProfile" class="profile-form">
        <div class="form-group">
          <label for="username">{{ $t('common.profile') }}</label>
          <input 
            type="text" 
            id="username" 
            v-model="PROFILE.username" 
            required 
          />
        </div>
        
        <div class="form-group">
          <label for="email">{{ $t('auth.email') }}</label>
          <input 
            type="email" 
            id="email" 
            v-model="PROFILE.email" 
            disabled 
          />
        </div>
        
        <div v-if="ERROR" class="error-message">
          {{ ERROR }}
        </div>
        
        <div v-if="SUCCESS_MESSAGE" class="success-message">
          {{ SUCCESS_MESSAGE }}
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="IS_LOADING">
            {{ $t('common.save') }}
          </button>
        </div>
      </form>
      
      <div class="stats-section">
        <h3>{{ $t('predictions.your_predictions') }}</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">{{ STATS.total_predictions || 0 }}</span>
            <span class="stat-label">{{ $t('predictions.make_prediction') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ STATS.correct_predictions || 0 }}</span>
            <span class="stat-label">{{ $t('predictions.correct_score') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ STATS.points || 0 }}</span>
            <span class="stat-label">{{ $t('predictions.points_earned') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/store/authStore';
import supabase from '@/services/supabase';

const authStore = useAuthStore();
const userId = computed(() => authStore.USER?.id);

const IS_LOADING = ref(false);
const ERROR = ref('');
const SUCCESS_MESSAGE = ref('');

const PROFILE = ref({
  username: '',
  email: '',
});

const STATS = ref({
  total_predictions: 0,
  correct_predictions: 0,
  points: 0,
});

onMounted(async () => {
  if (userId.value) {
    await fetchProfile();
    await fetchStats();
  }
});

const fetchProfile = async () => {
  IS_LOADING.value = true;
  ERROR.value = '';
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId.value)
      .single();
    
    if (error) {
      ERROR.value = error.message;
    } else if (data) {
      PROFILE.value = {
        username: data.username,
        email: data.email,
      };
    }
  } catch (error) {
    ERROR.value = error instanceof Error ? error.message : 'Unknown error occurred';
  } finally {
    IS_LOADING.value = false;
  }
};

const fetchStats = async () => {
  try {
    // Get total predictions
    const { count: totalCount } = await supabase
      .from('predictions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId.value);
    
    // Get correct predictions
    const { count: correctCount } = await supabase
      .from('predictions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId.value)
      .gt('points_earned', 0);
    
    // Get total points
    const { data: pointsData } = await supabase
      .from('predictions')
      .select('points_earned')
      .eq('user_id', userId.value);
    
    const totalPoints = pointsData?.reduce((sum, prediction) => sum + (prediction.points_earned || 0), 0) || 0;
    
    STATS.value = {
      total_predictions: totalCount || 0,
      correct_predictions: correctCount || 0,
      points: totalPoints,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
};

const updateProfile = async () => {
  IS_LOADING.value = true;
  ERROR.value = '';
  SUCCESS_MESSAGE.value = '';
  
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        username: PROFILE.value.username,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId.value);
    
    if (error) {
      ERROR.value = error.message;
    } else {
      SUCCESS_MESSAGE.value = 'Profile updated successfully';
    }
  } catch (error) {
    ERROR.value = error instanceof Error ? error.message : 'Unknown error occurred';
  } finally {
    IS_LOADING.value = false;
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.profile-card {
  background-color: var(--bg-secondary);
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: center;
}

.loading {
  text-align: center;
  padding: 2rem 0;
  color: var(--text-secondary);
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

input {
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--text-secondary);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: var(--accent-primary);
}

input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-primary {
  background-color: var(--accent-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--accent-secondary);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: var(--error);
  font-size: 0.9rem;
}

.success-message {
  color: var(--success);
  font-size: 0.9rem;
}

.stats-section {
  margin-top: 2rem;
  border-top: 1px solid var(--text-secondary);
  padding-top: 2rem;
}

.stats-section h3 {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--accent-primary);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
