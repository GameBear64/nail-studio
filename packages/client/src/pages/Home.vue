<script setup>

import Shape from '../components/Shape.vue';
</script>

<template>
  <div class="flex h-[90vh] flex-row justify-between p-2">
    <div class="relative flex flex-col justify-center gap-4 px-5">
      <Shape
        class="animate-fall  ease-[cubic-bezier(0.4, 0.05, 0.8, 0.95)] absolute -top-16 left-0 z-0 blur-sm "
        size="30"
      />  <Shape
        class="animate-fall1  ease-[cubic-bezier(0.4, 0.05, 0.8, 0.95)] absolute -top-16 right-44 z-0 blur-sm "
        size="50"
      />
      <Shape
        class="animate-fall  ease-[cubic-bezier(0.4, 0.05, 0.8, 0.95)] absolute -top-16 right-60 z-0 blur-sm"
        size="30"
      /> <Shape
        class="animate-fall2  ease-[cubic-bezier(0.4, 0.05, 0.8, 0.95)] right-50 absolute -top-16 z-0 blur-sm"
        size="20"
      />
      <Shape
        class="animate-fall1  ease-[cubic-bezier(0.4, 0.05, 0.8, 0.95)] absolute -top-16 right-0 z-0 blur-sm"
        size="70"
      />
      <Shape
        class="animate-fall1  ease-[cubic-bezier(0.4, 0.05, 0.8, 0.95)] absolute -top-16 left-20 z-0 blur-sm"
        size="40"
      />
      <div class="z-50 flex flex-col gap-3">
        <p class="font-rouge text-8xl">
          Nail Studio
        </p>
        <p class="italic">
          Discover the perfect blend of style, relaxation, and precision. Whether you're here for a bold design, timeless
          elegance, or a moment of self-care, we’re dedicated to making every visit extraordinary. Let us pamper you—your nails
          deserve it!
        </p>
      </div>
      <div class="z-50 flex flex-row gap-4">
        <button class="btn-secondary">
          Artists
        </button>
        <button class="btn-secondary">
          Book
        </button>
      </div>
    </div>
    <img
      src="../../banner.jpg"
      alt="flowers picture"
      class="z-30 h-auto rounded-md object-cover"
    >
  </div>
</template>
