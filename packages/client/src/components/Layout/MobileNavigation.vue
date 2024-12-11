<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import Icon from '../Icon.vue';
import Logo from '../Logo.vue';

const router = useRouter();
const props = defineProps(['navigations', 'options']);
const openMobile = ref(false);

const openIcon = computed(() => (openMobile.value ? 'close' : 'menu'));
</script>

<template>
  <div class="sm:hidden h-full">
    <div class="mb-auto flex w-full items-center justify-between bg-white px-3 py-2 shadow-md">
      <Logo />
      <Icon :icon="openIcon" :clickable="true" @click="() => (openMobile = !openMobile)" />
    </div>
    <div :class="openMobile && 'bg-black/30 backdrop-blur-sm w-screen absolute h-screen'">
      <div v-if="openMobile" class="z-50 mb-auto absolute right-0 flex-col py-2 px-1 gap-5 flex w-52 bg-white shadow-md h-screen">
        <div class="px-2">
          <p class="font-medium">Directives</p>
          <div
            v-for="navigation in navigations"
            class="flex cursor-pointer flex-row items-center gap-2 py-2 px-1 rounded hover:bg-pink-100 hover:text-pink-600">
            <Icon :icon="navigation.icon" />
            <p :onclick="router.push(navigation.location)">
              {{ navigation.name }}
            </p>
          </div>
        </div>
        <div class="px-2">
          <p class="font-medium">Actions</p>
          <div
            class="flex cursor-pointer flex-row rounded items-center gap-2 py-2 px-1 hover:bg-pink-100 hover:text-pink-600"
            v-for="option in options">
            <Icon :icon="option.icon" />
            <p :onclick="option?.action">{{ option.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
