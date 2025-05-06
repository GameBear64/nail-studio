<script setup>
import { useRoute } from 'vue-router';

import Loading from '@pages/Loading.vue';

import Header from '@components/Layout/Header.vue';

import { themes } from '@store/themeStore';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const route = useRoute();
</script>

<template>
  <div :class="`theme-${themes.theme}`" class="bg-base text-primaryText flex h-screen flex-col">
    <div id="teleport-target" class="z-50" />
    <Header v-if="route.path !== '/login' && route.path !== '/register'" />
    <RouterView id="router-view" v-slot="{ Component }" class="flex-1 overflow-x-auto">
      <template v-if="Component">
        <Suspense timeout="0">
          <component :is="Component" />
          <template #fallback>
            <Loading />
          </template>
        </Suspense>
      </template>
    </RouterView>
  </div>
</template>

<style scoped></style>
