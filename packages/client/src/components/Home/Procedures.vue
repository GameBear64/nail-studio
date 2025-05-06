<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import useFetch from '../../toolbox/useFetch';

const router = useRouter();
const procedures = ref([]);

useFetch({ url: '/procedures', method: 'GET' }).then((res) => (procedures.value = res));
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="flex w-full flex-row flex-wrap justify-center gap-7 px-5 py-10">
      <div
        v-for="procedure in procedures"
        :key="procedure._id"
        class="relative flex w-96 flex-col items-center rounded border-2 border-pink-200 px-10 py-12 shadow-sm"
      >
        <p class="text-xl font-semibold uppercase text-gray-700">
          {{ procedure.name }}
        </p>
        <p class="font-semibold text-pink-400">
          {{ procedure.price }}lv
        </p>
        <p class="text-center">
          {{ procedure.description }}
        </p>
        <button
          class="absolute bottom-0 border border-b-0 border-pink-200 bg-pink-100 p-2 text-sm font-semibold text-pink-600 shadow-sm"
          @click="() => router.push('/book')"
        >
          Book Now
        </button>
      </div>
    </div>
    <button
      class="font-semibold text-gray-900"
      @click="() => router.push('/procedures')"
    >
      See more...
    </button>
  </div>
</template>
