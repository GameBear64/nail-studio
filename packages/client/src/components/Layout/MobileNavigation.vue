<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';

import Icon from '../Icon.vue';
import Logo from '../Logo.vue';

const router = useRouter();
const props = defineProps(['navigations', 'options']);
const openMobile = ref(false);
const openMobileRef = ref(false);

onClickOutside(openMobileRef, () => (openMobile.value = false));

const openIcon = computed(() => (openMobile.value ? 'close' : 'menu'));
</script>

<template>
  <div class="h-full sm:hidden w-screen">
    <div ref="openMobileRef" class="mb-auto flex w-full items-center justify-between bg-white px-3 py-2 shadow-md">
      <Logo />
      <Icon :icon="openIcon" :clickable="true" @click="() => (openMobile = !openMobile)" />
    </div>
    <div :class="openMobile && 'absolute bg-black/30 backdrop-blur-sm h-full w-screen'">
      <div v-if="openMobile" class="absolute right-0 z-50 mb-auto flex h-full w-52 flex-col gap-5 bg-white px-1 py-2 shadow-md">
        <div class="px-2">
          <p class="font-medium">Directives</p>
          <div
            v-for="navigation in navigations"
            class="flex cursor-pointer flex-row items-center gap-2 rounded px-1 py-2 hover:bg-pink-100 hover:text-pink-600">
            <Icon :icon="navigation.icon" />
            <p :onclick="router.push(navigation.location)">
              {{ navigation.name }}
            </p>
          </div>
        </div>
        <div class="px-2">
          <p class="font-medium">Actions</p>
          <div
            v-for="option in options"
            class="flex cursor-pointer flex-row items-center gap-2 rounded px-1 py-2 hover:bg-pink-100 hover:text-pink-600">
            <Icon :icon="option.icon" />
            <p :onclick="option?.action">
              {{ option.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
