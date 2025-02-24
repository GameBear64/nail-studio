<script setup>
import { ref } from 'vue';

import useFetch from '@tools/useFetch';

const props = defineProps(['group']);

const images = ref([]);

useFetch({ url: 'gallery/' + props.group }).then(imgs => { images.value = imgs })

</script>

<template>
  <div class="m-4 flex flex-wrap justify-around gap-10">
    <img
      v-for="image in images"
      :key="image"
      :src="`/api/resource/${image}?size=300`"
      class="max-h-60 max-w-72 rounded"
    >
  </div>
</template>