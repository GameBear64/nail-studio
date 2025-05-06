<script setup>
import { useRouter } from 'vue-router';

const props = defineProps(['data']);

const router = useRouter();
</script>

<template>
  <div class="flex flex-col justify-between gap-2 rounded-lg bg-white py-5">
    <div class="flex flex-col items-center gap-2">
      <div class="size-44 rounded-lg p-2 shadow-[inset_0px_0px_37px_50px_rgba(236,_72,_153,_0.15)] sm:size-52">
        <img
          :src="'/api/resource/' + props.data?.picture"
          alt="image"
          class="size-40 rounded object-cover sm:size-full"
        >
      </div>
      <div class="flex flex-col items-center gap-2 px-4">
        <div class="text-center">
          <p
            v-i18n
            class="text-lg font-semibold"
          >
            {{ props.data?.name }}
          </p>
          <p
            v-i18n
            class="text-sm text-gray-500"
          >
            {{ props.data.yearsExperience }} years of experience
          </p>
        </div>
        <p
          v-i18n
          class="sm:text-md line-clamp-[3] max-h-28 text-center text-sm"
        >
          {{ props.data?.biography }}
        </p>
      </div>
    </div>
    <slot name="buttons">
      <div class="my-2 flex flex-row justify-center gap-6">
        <button
          v-i18n
          class="btn-outlined sm:text-md text-sm"
          @click="router.push({ name: 'book' })"
        >
          Book me
        </button>
        <button
          v-i18n
          class="btn-outlined sm:text-md text-sm"
          @click="router.push({ name: 'artist', params: { id: props.data._id } })"
        >
          See more
        </button>
      </div>
    </slot>
  </div>
</template>
