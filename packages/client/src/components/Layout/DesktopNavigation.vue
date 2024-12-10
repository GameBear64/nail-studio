<script setup>
import Logo from '../Logo.vue';
import useFetch from '../../toolbox/useFetch';
import Dropdown from '../Dropdown.vue';
import Icon from '../Icon.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(['navigations', 'options']);
const router = useRouter();
const open = ref(false);
const openRef = ref(false);

const arrow = computed(() => (open.value ? 'keyboard_arrow_up' : 'keyboard_arrow_down'));
</script>
<template>
  <div class="hidden sm:flex mb-auto w-full items-center justify-between bg-white px-3 py-2 shadow-md">
    <Logo />
    <div class="flex flex-row gap-20 text-lg text-gray-600">
      <div
        v-for="navigation in navigations"
        class="flex cursor-pointer flex-row items-center gap-2 rounded-xl p-2 hover:bg-pink-100 hover:text-pink-600">
        <Icon :icon="navigation.icon" />
        <p
          :onclick="
            () => {
              useFetch({ url: 'user/logout', method: 'GET' }).then((res) => router.push('/login  '));
            }
          ">
          {{ navigation.name }}
        </p>
      </div>
    </div>
    <div class="flex flex-row items-end">
      <p class="rounded bg-blue-700 px-3 py-1 font-medium text-white">C</p>
      <div ref="openRef" class="relative flex justify-end">
        <Icon :icon="arrow" :clickable="true" @click="() => (open = !open)" />
        <Dropdown v-if="open" class="-right-1 top-11" :options="options" />
      </div>
    </div>
  </div>
</template>
