<script setup>
  import { ref, useId } from 'vue';

  import { readFile } from '@tools/utils';

  defineProps({
    errors: String,
    preview: { type: Boolean, default: true },
  });
  const emit = defineEmits(['update'])
  const id = useId()

  const imgPreview = ref(null)

  const processFile = (event) => {
    if (!event.target.files?.[0]) {
      imgPreview.value = null
      return;
    }

    imgPreview.value = URL.createObjectURL(event.target.files[0])
    readFile(event.target.files[0]).then(img => emit('update', img))
  }

</script>

<template>
  <div class="flex flex-col items-center">
    <label :for="id">
      <img
        v-if="imgPreview && preview"
        :src="imgPreview"
        class=" my-2 max-h-60 max-w-72 rounded"
      >
    </label>
    <input
      :id="id"
      type="file"
      class="bg-base-m text-txtPrimary border-base-s w-full cursor-pointer rounded border text-sm font-medium file:mr-4 file:cursor-pointer file:border-0 file:bg-pink-500 file:px-4 file:py-2 file:text-white focus:border-pink-500 focus:outline-none"
      @change="processFile"
    >
  </div>
</template>