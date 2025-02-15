<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { UserRoles } from '@tools/consts';
import { userStore } from '@store/userStore';

import Icon from '../Icon.vue';
import Logo from '../Logo.vue';

const router = useRouter();
const props = defineProps(['navigations', 'actions', 'adminActions']);
const openMobile = ref(false);

const openIcon = computed(() => (openMobile.value ? 'close' : 'menu'));
</script>

<template>
  <div class="z-50 w-screen sm:hidden">
    <div class="sticky top-0 mb-auto flex w-full items-center justify-between bg-white px-3 py-2 shadow-md">
      <Logo />
      <Icon
        :icon="openIcon"
        clickable
        @click="() => (openMobile = !openMobile)"
      />
    </div>
    <div
      :class="{ 'absolute h-full w-screen bg-black/30 backdrop-blur-sm': openMobile }"
      @click.self="() => (openMobile = false)"
    >
      <div
        v-if="openMobile"
        class="absolute right-0 mb-auto flex h-full w-52 flex-col gap-5 bg-white px-1 py-2 shadow-md"
      >
        <div class="px-2">
          <p
            v-i18n
            class="font-medium"
          >
            Directives
          </p>
          <div
            v-for="navigation in props.navigations"
            :key="navigation.name"
            class="flex cursor-pointer flex-row items-center gap-2 rounded px-1 py-2 hover:bg-pink-100 hover:text-pink-600"
          >
            <Icon :icon="navigation.icon" />
            <p
              v-i18n
              :onclick="() => router.push(navigation.location)"
            >
              {{ navigation.name }}
            </p>
          </div>
        </div>
        <div class="px-2">
          <p
            v-i18n
            class="font-medium"
          >
            Actions
          </p>
          <div
            v-for="option in props.actions"
            :key="option.name"
            :class="option.mobileHide ? 'hidden' : 'flex'"
            :onclick="option?.action"
            class="cursor-pointer flex-row items-center gap-2 rounded px-1 py-2 hover:bg-pink-100 hover:text-pink-600"
          >
            <Icon :icon="option.icon" />
            <p v-i18n>
              {{ option.name }}
            </p>
          </div>
        </div>
        <div
          v-if="userStore.role === UserRoles.ADMIN"
          class="px-2"
        >
          <p
            v-i18n
            class="font-medium"
          >
            Admin Panel
          </p>
          <div
            v-for="option in props.adminActions"
            :key="option.name"
            :onclick="option?.action"
            class="flex cursor-pointer flex-row items-center gap-2 rounded px-1 py-2 hover:bg-pink-100 hover:text-pink-600"
          >
            <Icon :icon="option.icon" />
            <p v-i18n>
              {{ option.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
