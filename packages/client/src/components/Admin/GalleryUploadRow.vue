<script setup>
import MediaButton from '@components/Form/MediaButton.vue';
import Icon from '@components/Icon.vue';

const emit = defineEmits(['upload', 'delete']);
const props = defineProps(['images', 'loading']);
</script>

<template>
  <div class="flex items-center gap-2 overflow-x-auto">
    <MediaButton @update="emit('upload', $event)" />

    <div v-if="props.loading">
      <div class="flex h-60 w-72 items-center justify-center">
        <div
          class="text-primary solid mr-3 inline-block size-8 animate-spin rounded-full border-4 border-pink-500 border-r-transparent"
          role="status"
        />
      </div>
    </div>

    <div
      v-for="image in props?.images?.slice()?.reverse()"
      :key="image"
      class="relative"
    >
      <img
        :src="`/api/resource/${image}?size=300`"
        class="max-h-60 max-w-72 rounded"
      >
      <div
        class="absolute right-1 top-1 flex size-10 cursor-pointer items-center justify-center rounded border border-red-300 bg-red-500"
        @click="emit('delete', image)"
      >
        <Icon
          icon="delete"
          class="text-white"
        />
      </div>
    </div>
  </div>
</template>
