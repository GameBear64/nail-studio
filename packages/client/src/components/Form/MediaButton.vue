<script setup>
  import { ref, useId } from 'vue';

  import Icon from '@components/Icon.vue';

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
    <div class="flex h-60 w-72 items-center justify-center rounded-sm border-2 border-dashed border-pink-500">
      <label :for="id">
        <div class="flex size-20 cursor-pointer items-center justify-center rounded-full bg-pink-500">
          <Icon
            icon="add"
            class="text-5xl text-white"
          />
        </div>
      </label>
    </div>
    <input
      :id="id"
      type="file"
      class="hidden"
      @change="processFile"
    >
  </div>
</template>