<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { onClickOutside } from '@vueuse/core';

import Dropdown from '../Dropdown.vue';
import Icon from '../Icon.vue';
import Logo from '../Logo.vue';

const router = useRouter();

const props = defineProps(['navigations', 'options']);
const open = ref(false);
const openRef = ref(false);

onClickOutside(openRef, () => (open.value = false));
const arrow = computed(() => (open.value ? 'keyboard_arrow_up' : 'keyboard_arrow_down'));
</script>

<template>
  <div class="sticky z-50 hidden w-screen items-center justify-between bg-white px-3 py-2 shadow-md sm:flex">
    <Logo />
    <div class="flex flex-row gap-20 text-lg text-gray-600">
      <div
        v-for="navigation in props.navigations"
        :key="navigation.name"
        class="flex cursor-pointer flex-row items-center gap-2 rounded-xl p-2 hover:bg-pink-100 hover:text-pink-600"
      >
        <Icon
          clickable="true"
          :icon="navigation.icon"
        />
        <p :onclick="router.push(navigation.location)">
          {{ navigation.name }}
        </p>
      </div>
    </div>
    <div
      ref="openRef"
      class="flex flex-row items-end"
    >
      <Icon
        icon="person"
        :clickable="true"
        class="rounded bg-pink-400 p-1 text-white"
        @click="() => (open = !open)"
      />
      <div

        class="relative flex justify-end"
      >
        <Icon
          :icon="arrow"
          :clickable="true"
          @click="() => (open = !open)"
        />
        <Dropdown
          v-if="open"
          class="-right-1 top-11"
          :options="options"
        />
      </div>
    </div>
  </div>
</template>
