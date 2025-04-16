<script setup>
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

import { onClickOutside } from '@vueuse/core';

import Icon from '@components/Icon.vue';
import Dropdown from '@components/Layout/Dropdown.vue';
import Logo from '@components/Layout/Logo.vue';

import { userStore } from '@store/userStore';

const router = useRouter();

const props = defineProps(['navigations', 'options']);
const openRef = ref(false);
const isOpen = inject('isOpen')

const allowedOptions = computed(() =>
  props.options.filter((option) => option.requiredRole === userStore.role || option.requiredRole === 'user'),
);

const arrow = computed(() => (isOpen.value ? 'keyboard_arrow_up' : 'keyboard_arrow_down'));

onClickOutside(openRef, () => (isOpen.value = false));
</script>

<template>
  <div class="sticky z-50 hidden w-screen items-center justify-between bg-white px-3 py-2 shadow-md sm:flex">
    <Logo />
    <div class="flex flex-row gap-20 text-lg text-gray-600">
      <div
        v-for="navigation in props.navigations"
        :key="navigation.name"
        class="flex cursor-pointer flex-row items-center gap-2 rounded-xl p-2 hover:bg-pink-100 hover:text-pink-600"
        :onclick="() => router.push(navigation.location)"
      >
        <Icon
          clickable
          :icon="navigation.icon"
        />
        <p v-i18n>
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
        clickable
        class="rounded-sm bg-pink-400 p-1 text-white"
        @click="() => (isOpen = !isOpen)"
      />
      <div class="relative flex justify-end">
        <Icon
          :icon="arrow"
          clickable
          @click="() => (isOpen = !isOpen)"
        />
        <Dropdown
          v-if="isOpen"
          class="-right-1 top-11"
          :options="allowedOptions"
        />
      </div>
    </div>
  </div>
</template>
