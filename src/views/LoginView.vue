<template>
  <div class="login-container">
    <div class="login-card">
      <h1>{{ $t('app_name') }}</h1>
      <h2>{{ $t('common.login') }}</h2>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">{{ $t('auth.email') }}</label>
          <input 
            type="email" 
            id="email" 
            v-model="EMAIL" 
            required 
            :placeholder="$t('auth.email')"
          />
        </div>
        
        <div class="form-group">
          <label for="password">{{ $t('auth.password') }}</label>
          <input 
            type="password" 
            id="password" 
            v-model="PASSWORD" 
            required 
            :placeholder="$t('auth.password')"
          />
        </div>
        
        <div v-if="AUTH_ERROR" class="error-message">
          {{ AUTH_ERROR }}
        </div>
        
        <button type="submit" class="login-button" :disabled="IS_LOADING">
          <span v-if="IS_LOADING">{{ $t('common.loading') }}</span>
          <span v-else>{{ $t('common.login') }}</span>
        </button>
        
        <div class="form-footer">
          <router-link to="/register">{{ $t('common.signup') }}</router-link>
          <router-link to="/forgot-password">{{ $t('auth.forgot_password') }}</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/store/authStore';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Form state
const EMAIL = ref('');
const PASSWORD = ref('');

// Computed properties from store
const IS_LOADING = computed(() => authStore.IS_LOADING);
const AUTH_ERROR = computed(() => authStore.AUTH_ERROR);

// Handle login submission
const handleLogin = async () => {
  try {
    const { error } = await authStore.loginWithEmail(EMAIL.value, PASSWORD.value);
    
    if (!error) {
      // Redirect to the intended page or home
      const redirectPath = route.query.redirect as string || '/';
      router.push(redirectPath);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.login-card {
  background-color: var(--bg-secondary);
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: var(--accent-primary);
  text-align: center;
  margin-bottom: 0.5rem;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

.login-button {
  background-color: var(--accent-primary);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.login-button:hover:not(:disabled) {
  background-color: var(--accent-secondary);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: var(--error);
  font-size: 0.9rem;
  text-align: center;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.form-footer a {
  color: var(--accent-primary);
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}
</style>
