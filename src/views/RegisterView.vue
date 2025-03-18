<template>
  <div class="register-container">
    <div class="register-card">
      <h1>{{ $t('app_name') }}</h1>
      <h2>{{ $t('common.signup') }}</h2>
      
      <form @submit.prevent="handleRegister" class="register-form">
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
          <label for="username">{{ $t('common.profile') }}</label>
          <input 
            type="text" 
            id="username" 
            v-model="USERNAME" 
            required 
            :placeholder="$t('common.profile')"
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
        
        <div class="form-group">
          <label for="confirmPassword">{{ $t('auth.confirm_password') }}</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="CONFIRM_PASSWORD" 
            required 
            :placeholder="$t('auth.confirm_password')"
          />
        </div>
        
        <div v-if="PASSWORD_MISMATCH" class="error-message">
          {{ $t('errors.validation') }}: {{ $t('auth.confirm_password') }}
        </div>
        
        <div v-if="AUTH_ERROR" class="error-message">
          {{ AUTH_ERROR }}
        </div>
        
        <button type="submit" class="register-button" :disabled="IS_LOADING || PASSWORD_MISMATCH">
          <span v-if="IS_LOADING">{{ $t('common.loading') }}</span>
          <span v-else>{{ $t('common.signup') }}</span>
        </button>
        
        <div class="form-footer">
          <router-link to="/login">{{ $t('common.login') }}</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import supabase from '@/services/supabase';

const router = useRouter();
const authStore = useAuthStore();

// Form state
const EMAIL = ref('');
const USERNAME = ref('');
const PASSWORD = ref('');
const CONFIRM_PASSWORD = ref('');
const REGISTRATION_SUCCESS = ref(false);

// Computed properties
const IS_LOADING = computed(() => authStore.IS_LOADING);
const AUTH_ERROR = computed(() => authStore.AUTH_ERROR);
const PASSWORD_MISMATCH = computed(() => {
  if (PASSWORD.value && CONFIRM_PASSWORD.value) {
    return PASSWORD.value !== CONFIRM_PASSWORD.value;
  }
  return false;
});

// Handle registration submission
const handleRegister = async () => {
  if (PASSWORD_MISMATCH.value) {
    return;
  }
  
  try {
    const { data, error } = await authStore.registerWithEmail(EMAIL.value, PASSWORD.value);
    
    if (!error && data.user) {
      // Create user profile in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          username: USERNAME.value,
          email: EMAIL.value,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (profileError) {
        console.error('Error creating user profile:', profileError);
      } else {
        REGISTRATION_SUCCESS.value = true;
        // Redirect to login page after successful registration
        router.push('/login');
      }
    }
  } catch (error) {
    console.error('Registration error:', error);
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.register-card {
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

.register-form {
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

.register-button {
  background-color: var(--accent-primary);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.register-button:hover:not(:disabled) {
  background-color: var(--accent-secondary);
}

.register-button:disabled {
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
  justify-content: center;
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
