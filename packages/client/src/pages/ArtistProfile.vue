<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import Icon from '@components/Icon.vue';
import Swiper from '@components/Swiper.vue';

import useFetch from '../toolbox/useFetch';

const artist = ref();
const route = useRoute();
onMounted(() => {
  useFetch({ url: '/artist/' + route.params.id }).then((res) => {
    artist.value = res;
    console.log(res);
  });
});
</script>

<template>
  <div class="flex size-full flex-col gap-28 overflow-auto bg-gradient-to-t from-pink-100 px-40 py-14">
    <div class="flex items-center justify-center">
      <div class="flex w-[50rem] flex-col gap-2 rounded bg-white/90 px-5 py-3 shadow-sm">
        <div class="flex w-full flex-row justify-between">
          <div class="flex flex-row items-center gap-2">
            <img
              class="size-32 rounded bg-cover"
              :src="'/api/resource/' + artist?.picture"
              alt="artistPfp"
            >
            <div class="flex flex-col gap-2">
              <div class="font-medium ">
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

        <p class="flex-wrap">
          {{ artist?.biography }}
        </p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-5">
      {{ console.log(artist?.gallery) }}
      <p class="flex-start text-xl font-semibold">
        Gallery
      </p>
      <div class="flex w-full flex-row flex-wrap items-center justify-center gap-5">
        <img
          v-for="image in artist?.gallery"
          :key="image"
          class="size-96 rounded bg-cover"
          :src="'/api/resource/' + image"
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
