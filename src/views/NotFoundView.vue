<template>
  <div class="not-found-container">
    <h1>404</h1>
    <p>{{ $t('errors.not_found') }}</p>
    <router-link to="/" class="home-link">{{ $t('common.welcome') }}</router-link>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 6rem;
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

p {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.home-link {
  color: var(--accent-primary);
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.2s ease;
}

.home-link:hover {
  color: var(--accent-secondary);
  text-decoration: underline;
}
</style>
