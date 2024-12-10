<script setup>
import { ref } from 'vue';
import Icon from '../Icon.vue';
import useFetch from '../../toolbox/useFetch';
import Logo from '../Logo.vue';

const props = defineProps(['navigations', 'options']);
const openMobile = ref(false);
</script>

<template>
  <div class="sm:hidden h-full">
    <div
      :onclick="() => (openMobile = !openMobile)"
      class="mb-auto flex w-full items-center justify-between bg-white px-3 py-2 shadow-md">
      <Logo />
      <Icon :icon="openMobile ? 'close' : 'menu'" />
    </div>
    <div :class="openMobile && 'bg-black/30 backdrop-blur-sm w-screen absolute h-screen'">
      <div v-if="openMobile" class="z-50 mb-auto absolute right-0 flex-col py-2 px-1 gap-5 flex w-52 bg-white shadow-md h-screen">
        <div class="px-2">
          <p class="font-medium">Directives</p>
          <div
            v-for="navigation in navigations"
            class="flex cursor-pointer flex-row items-center gap-2 py-2 px-1 rounded hover:bg-pink-100 hover:text-pink-600">
            <Icon :icon="navigation.icon" />
            <p
              :onclick="
                () => {
                  useFetch({ url: 'user/logout', method: 'GET' }).then((res) => console.log(res));
                }
              ">
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
            <p>{{ option.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
