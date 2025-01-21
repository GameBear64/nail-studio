<script setup>
import { useRouter } from 'vue-router';

import Icon from '@components/Icon.vue';

const router = useRouter();
</script>

<template>
  <div class="relative flex flex-row overflow-hidden">
    <div class="hidden h-full w-56 flex-col divide-y rounded-b bg-white p-2 text-gray-600 shadow-sm shadow-gray-400 sm:flex">
      <div
        :onclick="() => router.push({ name: 'artists' })"
        class="flex cursor-pointer flex-row items-center gap-2 rounded px-2 py-3 text-center hover:bg-gray-100"
      >
        <Icon icon="badge" />
        <p>Artists</p>
      </div>
      <div
        :onclick="() => router.push({ name: 'galleries' })"
        class="flex cursor-pointer flex-row items-center gap-2 rounded px-2 py-3 text-center hover:bg-gray-100"
      >
        <Icon icon="photo_library" />
        <p>Galleries</p>
      </div>
    </div>
    <div class="absolute left-0 flex w-screen flex-col items-center">
      <div class="h-1 w-full rounded-l-full bg-pink-400" />
      <p class="rounded-b-md bg-pink-400 px-2 pb-0.5 text-[11px] font-bold text-white">
        ADMIN
      </p>
    </div>
    <div class="w-full p-3">
      <router-view />
    </div>
  </div>
</template>
