<template>
  <div class="app-container">
    <header>
      <nav>
        <router-link to="/" class="logo">Bimba Bolão</router-link>
        <div class="nav-links">
          <router-link to="/matches">Matches</router-link>
          <router-link to="/predictions">Predictions</router-link>
          <router-link to="/leaderboard">Leaderboard</router-link>
          <router-link to="/profile">Profile</router-link>
          <router-link to="/login">Login</router-link>
        </div>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; {{ currentYear }} Bimba Bolão</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style>
:root {
  /* Dark mode colors (default) */
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --accent-primary: #4caf50;
  --accent-secondary: #2e7d32;
  --error: #f44336;
  --success: #4caf50;
  --warning: #ff9800;
  --info: #2196f3;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: var(--bg-secondary);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--accent-primary);
}

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: var(--bg-secondary);
  padding: 1rem;
  text-align: center;
  color: var(--text-secondary);
}
</style>
