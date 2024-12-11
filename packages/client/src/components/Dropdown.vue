<script setup>
import Icon from './Icon.vue';

const props = defineProps(['options']);
</script>

<template>
  <ul class="absolute flex w-40 flex-col divide-y rounded bg-white font-medium text-white shadow-sm shadow-gray-400">
    <div
      v-for="option in options"
      class="flex cursor-pointer flex-row items-center gap-2 rounded p-2 text-gray-600 hover:bg-gray-100"
    >
      <Icon
        class="text-xl"
        :icon="option.icon"
      />
      <li
        :onclick="option?.action"
        class="w-full"
      >
        {{ option.name }}
      </li>
    </div>
  </ul>
</template>
