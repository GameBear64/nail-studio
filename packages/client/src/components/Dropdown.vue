<script setup>
import Icon from './Icon.vue';

const props = defineProps(['options']);
</script>

<template>
  <ul class="font-medium shadow-sm w-[10rem] rounded bg-white divide-y shadow-gray-400 text-white absolute flex flex-col">
    <div
      v-for="option in options"
      class="flex gap-2 flex-row py-2 rounded px-2 text-gray-600 cursor-pointer hover:bg-gray-100 items-center">
      <Icon class="text-xl" :icon="option.icon" />
      <li :onclick="option?.action" class="w-full">{{ option.name }}</li>
    </div>
  </ul>
</template>
