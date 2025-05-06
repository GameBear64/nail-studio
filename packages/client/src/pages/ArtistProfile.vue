<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Icon from '@components/Icon.vue';

import { loadImage } from '../api/artists';
import useFetch from '../toolbox/useFetch';

const artist = ref();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  useFetch({ url: '/artist/' + route.params.id }).then((res) => {
    artist.value = res;
  });
});
</script>

<template>
  <div class="flex size-full flex-col gap-28 overflow-auto bg-gradient-to-t from-pink-100 px-10 py-14 md:px-40">
    <div class="flex items-center justify-center">
      <div class="flex w-[50rem] flex-col gap-2 rounded bg-white/90 px-5 py-3 shadow-sm">
        <div class="flex w-full flex-row justify-between">
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
                  <p>
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

              <div>
                <button
                  v-i18n
                  class="btn-outlined sm:text-md mt-5 text-sm"
                  @click="router.push({ name: 'book' })"
                >
                  Book me
                </button>
              </div>
            </div>
          </div>
        </div>

        <p class="flex-wrap">
          {{ artist?.biography }}
        </p>
      </div>
    </div>
    <div
      v-if="artist?.gallery.length >= 1"
      class="flex flex-col items-center justify-center gap-5"
    >
      <p class="flex-start text-xl font-semibold">
        Gallery
      </p>
      <div class="flex w-full flex-row flex-wrap items-center justify-center gap-5">
        <img
          v-for="image in artist?.gallery"
          :key="image"
          class="size-96 rounded bg-cover object-cover"
          :src="'/api/resource/' + image"
        >
      </div>
    </div>
    <p
      v-else
      class="text-center"
    >
      This artist doesn't have any images to show
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
