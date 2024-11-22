<script setup></script>

<template>
  <template>
    <h1 class="bg-black text-red-700">Hello App!</h1>
    <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/register">Go to register</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </template>
</template>
