<script setup>
import { Misc } from 'coolshapes-vue';
</script>

<template>
  <div class="flex flex-row justify-between p-2 h-full">
    <div class="flex flex-col justify-center px-5 gap-4 relative">
      <Misc class="absolute -top-10 z-0 left-0 blur-md" :index="9" :size="120" :noise="false" />
      <Misc color="#000" class="absolute bottom-0 z-0 right-5 blur-md" :index="9" :size="200" :noise="false" />
      <div class="flex flex-col gap-3">
        <p class="font-rouge text-8xl">Nail Studio</p>
        <p class="italic">
          Discover the perfect blend of style, relaxation, and precision. Whether you're here for a bold design, timeless
          elegance, or a moment of self-care, we’re dedicated to making every visit extraordinary. Let us pamper you—your nails
          deserve it!
        </p>
      </div>
      <div class="flex flex-row gap-4">
        <button class="btn-secondary">Artists</button>
        <button class="btn-secondary">Book</button>
      </div>
    </div>
    <img src="../../banner.jpg" alt="flowers picture" class="rounded-md h-[32.5rem]" />
  </div>
</template>
