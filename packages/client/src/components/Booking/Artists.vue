<script setup>
import { computed } from 'vue';

import Select from '@components/Select.vue';

import { data } from '@api/artists';

const artistOptions = computed(() =>
  data.value?.map((artist) => ({ label: artist.name, picture: artist.picture, value: artist._id })),
);

const selectedOption = defineModel()
</script>

<template>
  <Select
    v-model="selectedOption"
    :options="artistOptions"
  >
    <template #selected="{ selected }">
      <div class="flex items-center">
        <span
          v-if="selected"
          class="flex cursor-pointer items-center gap-4"
        >
          <img
            :src="'/api/resource/' + selected.picture + '?size=50'"
            alt="image"
            class="size-10! rounded-sm object-cover sm:size-full"
          >
          <span>{{ selected.label }}</span>
        </span>
        <span
          v-else
          class="flex h-10 items-center"
        > 
          Select an option
        </span>
      </div>
    </template>
    <template #options="{ options, select }">
      <div
        v-for="option in options"
        :key="option.value"
        class="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-gray-200"
        @click="select(option)"
      >
        <img
          :src="'/api/resource/' + option.picture + '?size=50'"
          alt="image"
          class="size-10! rounded-sm object-cover sm:size-full"
        >
        <span>{{ option.label }}</span>
      </div>
    </template>
  </Select>
</template>
