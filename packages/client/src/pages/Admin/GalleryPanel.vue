<script setup>
import { ref } from 'vue';

import GalleryUploadRow from '@components/Admin/GalleryUploadRow.vue';

import useFetch from '@tools/useFetch';

const images = ref(null);
const loading = ref(false);

useFetch({ url: 'gallery' }).then(imgs => {
  images.value = imgs
  
})

const handleUpload = (image, group) => {
  useFetch({ url: 'resource', method: 'POST', body: { data: image } })
  .then(async id => {
    loading.value = group
    await new Promise(resolve => setTimeout(() => resolve(), 2000))
    return id
  })
  .then(id => {    
    loading.value = false
    
    images.value[group].push(id)
    useFetch({ url: 'gallery/' + group, method: 'PATCH', body: {images: images.value[group]} })
  })
}

const deleteImage = (image, group) => {
  useFetch({ url: 'resource/' + image, method: 'DELETE' })
  .then(() => {    
    images.value[group] = images.value[group].filter(id => id != image)
    useFetch({ url: 'gallery/' + group, method: 'PATCH', body: {images: images.value[group]} })
  })
}

</script>

<template>
  <div class="">
    <h2>Studio</h2>

    <GalleryUploadRow
      :images="images?.['studio']"
      :loading="loading == 'studio'"
      @upload="handleUpload($event, 'studio')"
      @delete="deleteImage($event, 'studio')"
    />

    <h2>Nails</h2>

    <GalleryUploadRow
      :images="images?.['nails']"
      :loading="loading == 'nails'"
      @upload="handleUpload($event, 'nails')"
      @delete="deleteImage($event, 'nails')"
    />
  </div>
</template>
