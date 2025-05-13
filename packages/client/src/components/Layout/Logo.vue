<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div
    :onclick="
      () => {
        router.push('/');
      }
    "
    class="font-fancy flex cursor-pointer flex-row text-3xl font-bold sm:text-4xl">
    <p class="text-pink-500">9</p>
    <p>6</p>
  </div>
</template>
