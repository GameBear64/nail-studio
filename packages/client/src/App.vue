<script setup>
import Loading from "@pages/Loading.vue";
import { themes } from "@store/themeStore";
</script>

<template>
  <div
    :class="`theme-${themes.theme} theme-${themes.accent}`"
    class="flex flex-col h-screen bg-base text-primaryText"
  >
    <div class="flex-1">
      <RouterView v-slot="{ Component }">
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
