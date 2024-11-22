<script setup>
import { Suspense } from "vue";
import { RouterView } from "vue-router";
import Loading from "./pages/Loading.vue";
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Suspense timeout="0">
      <component :is="{ Component }" />
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </RouterView>
</template>

<style scoped></style>
