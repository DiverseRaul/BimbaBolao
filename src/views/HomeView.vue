<template>
  <div class="home-container">
    <section class="hero">
      <h1>{{ $t('common.welcome') }}</h1>
      <p class="hero-subtitle">{{ $t('app_name') }}</p>
      
      <div class="auth-buttons" v-if="!isAuthenticated">
        <router-link to="/login" class="btn btn-primary">{{ $t('common.login') }}</router-link>
        <router-link to="/register" class="btn btn-outline">{{ $t('common.signup') }}</router-link>
      </div>
      
      <div class="dashboard-buttons" v-else>
        <router-link to="/matches" class="btn btn-primary">{{ $t('matches.upcoming') }}</router-link>
        <router-link to="/predictions" class="btn btn-outline">{{ $t('predictions.your_predictions') }}</router-link>
      </div>
    </section>
    
    <section class="features">
      <div class="feature-card">
        <h3>{{ $t('matches.predict') }}</h3>
        <p>{{ $t('predictions.make_prediction') }}</p>
      </div>
      
      <div class="feature-card">
        <h3>{{ $t('leaderboard.title') }}</h3>
        <p>{{ $t('leaderboard.rank') }}</p>
      </div>
      
      <div class="feature-card">
        <h3>{{ $t('groups.your_groups') }}</h3>
        <p>{{ $t('groups.create_group') }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 1rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--accent-primary);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: var(--text-secondary);
}

.auth-buttons, .dashboard-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--accent-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--accent-secondary);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--accent-primary);
  color: var(--accent-primary);
}

.btn-outline:hover {
  background-color: var(--accent-primary);
  color: white;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
}

.feature-card {
  background-color: var(--bg-secondary);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.feature-card p {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
