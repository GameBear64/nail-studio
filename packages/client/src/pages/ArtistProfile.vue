<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Icon from '@components/Icon.vue';

import { loadImage } from '../api/artists';
import GalleryUploadRow from '../components/Admin/GalleryUploadRow.vue';
import { UserRoles } from '../toolbox/consts';
import { userStore } from '../toolbox/stores/userStore';
import useFetch from '../toolbox/useFetch';

const route = useRoute();
const router = useRouter();

const artist = ref();
const gallery = ref([]);
const edit = ref(false);
const loading = ref(false);

onMounted(() => {
  useFetch({ url: '/artist/' + route.params.id }).then((res) => {
    artist.value = res;
    gallery.value = res.gallery;
  });
});

const handleUpload = (image) => {
  loading.value = true;
  useFetch({ url: 'resource', method: 'POST', body: { data: image } }).then((id) => {
    loading.value = false;
    gallery.value.push(id);
    useFetch({
      url: '/artist/' + artist.value._id,
      method: 'PATCH',
      body: { gallery: gallery.value },
    });
  });
};

const deleteImage = (image) => {
  useFetch({ url: 'resource/' + image, method: 'DELETE' }).then(() => {
    gallery.value = gallery.value.filter((id) => id != image);
  });
};
</script>

<template>
  <div class="flex size-full flex-col items-center gap-28 overflow-auto bg-gradient-to-t from-pink-100 px-10 py-14 md:px-40">
    <div class="flex max-w-[50rem] flex-col gap-2 rounded bg-white/90 px-5 py-3 shadow-sm">
      <div class="flex w-full flex-col items-center gap-2 sm:flex-row">
        <img
          class="h-32 w-40 rounded bg-cover object-cover"
          :src="loadImage(artist?.picture)"
          alt="artistPfp"
        >
        <div class="flex w-full flex-col justify-between sm:flex-row">
          <div class="font-medium">
            <div class="flex flex-row items-center gap-2">
              <Icon
                icon="person"
                class="font-light"
              />
              <p v-i18n>
                {{ artist?.name }}
              </p>
            </div>
            <div class="flex flex-row items-center gap-2">
              <Icon
                icon="mail"
                class="font-light"
              />
              <p>
                {{ artist?.email }}
              </p>
            </div>
          </div>
          <button
            v-i18n
            class="btn-outlined sm:text-md mt-5 text-sm"
            @click="router.push({ name: 'book' })"
          >
            Book me
          </button>
        </div>
      </div>

      <p
        v-i18n
        class="flex-wrap"
      >
        {{ artist?.biography }}
      </p>
    </div>
    <div class="flex flex-col items-center justify-center gap-5">
      <div class="flex flex-row items-center justify-center gap-4">
        <p
          v-i18n
          class="flex-start font-fancy text-5xl"
        >
          Gallery
        </p>
        <Icon
          v-if="userStore.id === artist?._id || userStore.role === UserRoles.ADMIN"
          v-i18n
          icon="edit"
          class="btn-outlined text-md cursor-pointer rounded-full sm:text-xl"
          @click="() => (edit = !edit)"
        />
      </div>
      <GalleryUploadRow
        v-if="edit"
        class="flex w-full flex-row flex-wrap items-center justify-center gap-5"
        :images="gallery"
        :loading="loading"
        @upload="handleUpload($event)"
        @delete="deleteImage($event)"
      />
      <div
        v-if="gallery?.length >= 1 && !edit"
        class="flex w-full flex-row flex-wrap items-center justify-center gap-5"
      >
        <img
          v-for="image in gallery"
          :key="image"
          :src="'/api/resource/' + image"
          class="size-96 rounded bg-cover object-cover"
        >
      </div>
      <p
        v-else-if="!edit"
        v-i18n
        class="text-center"
      >
        This artist doesn't have any images to show
      </p>
    </div>
  </div>
</template>
