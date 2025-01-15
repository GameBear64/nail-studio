<script setup>
const props = defineProps(['data']);
</script>

<template>
  <div>
    <div class="flex flex-col items-center gap-2">
      <div class="size-44 rounded-lg p-2 shadow-[inset_0px_0px_37px_50px_rgba(236,_72,_153,_0.15)] sm:size-52">
        <img
          :src="props.data?.image"
          alt="image"
          class="size-40 rounded object-cover sm:size-full"
        >
      </div>
      <div class="flex flex-col items-center gap-2 px-4">
        <div class="text-center">
          <p class="text-lg font-semibold">
            {{ props.data?.name }}
          </p>
          <p class="text-sm text-gray-500">
            5 years of experience
          </p>
        </div>
        <p class="sm:text-md line-clamp-[3] max-h-28 text-center text-sm">
          {{ props.data?.description }}
        </p>
      </div>
    </div>
    <div class="my-2 flex flex-row justify-center gap-6">
      <button class="btn-outlined sm:text-md text-sm">
        Book me
      </button>
      <button class="btn-outlined sm:text-md text-sm">
        See more
      </button>
    </div>
  </div>
</template>
