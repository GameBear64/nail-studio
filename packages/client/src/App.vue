<script setup>
import { useRoute } from 'vue-router';

import Loading from '@pages/Loading.vue';

import Header from '@components/Header.vue';

import { themes } from '@store/themeStore';

const route = useRoute();
</script>

<template>
  <div
    :class="`theme-${themes.theme} theme-${themes.accent}`"
    class="bg-base text-primaryText flex h-screen flex-col"
  >
    <div class="flex-1">
      <RouterView v-slot="{ Component }">
        <Header v-if="!route.meta.guestRoute" />
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
  </div>
</template>

<style scoped></style>
