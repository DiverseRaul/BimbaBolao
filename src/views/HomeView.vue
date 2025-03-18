<template>
  <div class="home-container">
    <section class="hero">
      <h1>Welcome to Bimba Bolão</h1>
      <p class="hero-subtitle">Soccer Prediction Platform</p>
      
      <div class="auth-buttons">
        <router-link to="/login" class="btn btn-primary">Login</router-link>
        <router-link to="/register" class="btn btn-outline">Sign Up</router-link>
      </div>
    </section>
    
    <section class="features">
      <div class="feature-card">
        <h3>Predict Matches</h3>
        <p>Make predictions for upcoming soccer matches</p>
      </div>
      
      <div class="feature-card">
        <h3>Leaderboard</h3>
        <p>Compete with friends and check your ranking</p>
      </div>
      
      <div class="feature-card">
        <h3>Join Groups</h3>
        <p>Create or join groups with friends</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Simplified script for GitHub Pages deployment
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

.auth-buttons {
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
