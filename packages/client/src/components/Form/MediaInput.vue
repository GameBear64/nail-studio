<script setup></script>

<script setup>
import { ref, useId } from 'vue';

import { readFile } from '@tools/utils';

const props = defineProps({
  errors: String,
  preview: { type: Boolean, default: true },
  initialImage: String,
});
const emit = defineEmits(['update']);
const id = useId();
const imgPreview = ref(props.initialImage);

const processFile = (event) => {
  if (!event.target.files?.[0]) {
    imgPreview.value = props.initialImage;
    return;
  }

  imgPreview.value = URL.createObjectURL(event.target.files[0]);
  readFile(event.target.files[0]).then((img) => emit('update', img));
};
</script>

<template>
  <div class="flex flex-col items-center">
    <label :for="id">
      <img
        v-if="imgPreview && preview"
        :src="imgPreview"
        class="my-2 max-h-60 max-w-72 rounded-sm"
      >
    </label>
    <input
      :id="id"
      v-bind="$attrs"
      type="file"
      class="bg-base-m text-txtPrimary border-base-s w-full cursor-pointer rounded-sm border text-sm font-medium file:mr-4 file:cursor-pointer file:border-0 file:bg-pink-500 file:px-4 file:py-2 file:text-white focus:border-pink-500 focus:outline-hidden"
      @change="processFile"
    >
    <p class="mt-1 h-4 text-sm font-medium leading-none text-red-600">
      {{ props.errors }}
    </p>
  </div>
</template>
