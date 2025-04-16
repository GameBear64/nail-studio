<script setup>
import Icon from '@components/Icon.vue';

const props = defineProps(['options']);
</script>

<template>
  <ul class="absolute flex w-40 flex-col divide-y rounded-sm bg-white font-medium text-white shadow-xs shadow-gray-400">
    <div
      v-for="option in props.options"
      :key="option.name"
      class="flex cursor-pointer flex-row items-center gap-2 rounded-sm p-2 text-gray-600 hover:bg-gray-100"
      :onclick="option?.action"
    >
      <Icon
        class="text-xl"
        :icon="option.icon"
      />
      <li
        v-i18n
        class="w-full"
      >
        {{ option.name }}
      </li>
    </div>
  </ul>
</template>
