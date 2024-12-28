<script setup>
import Shape from '../components/Shape.vue';
import { leaves } from '../toolbox/consts/consts';

</script>

<template>
  <div class="z-40 flex h-[90vh] flex-row justify-between gap-2 bg-white p-2">
    <div class="bg-base-x relative flex flex-col justify-center gap-4 overflow-hidden rounded-md px-5">
      <div class="absolute size-full">
        <template
          v-for="leave in leaves"
          :key="leave"
        >
          <Shape
            :class="`animate-${leave.animation} ${leave.position} ${leave?.delay&&leave.delay}`"
            :size="leave.size"
          />
        </template>
      </div>

      <div class="z-50 flex flex-col gap-3">
        <div class="font-rouge flex flex-row gap-0">
          <p class="text-7xl sm:text-8xl">
            Studio 96 
          </p>
        </div>
        <p class="italic">
          Discover the perfect blend of style, relaxation, and precision. Whether you're here for a bold design, timeless
          elegance, or a moment of self-care, we’re dedicated to making every visit extraordinary. Let us pamper you—your nails
          deserve it!
        </p>
      </div>
      <div class="z-50 flex flex-row gap-4">
        <button class="btn-outlined">
          Artists
        </button>
        <button class="btn-outlined">
          Book
        </button>
      </div>
    </div>
    <img
      src="../public/banner.jpg"
      alt="flowers picture"
      class="z-30 hidden h-auto w-full rounded-md object-cover sm:flex"
    >
  </div>
</template>

<style scoped>
.animate-1 {
  offset-path: path('M 100 0 Q 150 150 250 150 Q 360 179 400 290 L 423 354 Q 450 500 558 503 Q 650 500 760 678 ');
  animation-name: rotating;
  animation-duration: 12s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.animate-2 {
  offset-path: path(
    'M 100 0 Q 131 183 224 211 Q 307 282 255 348 C 234 384 230 406 249 429 C 275 471 355 508 407 577 Q 445 695 487 721 C 647 769 643 793 757 872'
  );
  animation-name: rotating;
  animation-duration: 14s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.animate-3 {
  offset-path: path(
    'M 100 0 Q 150 150 220 292 Q 280 388 334 434 L 389 473 Q 441 517 566 588 Q 664 640 779 684 C 857.3333 708.6667 935.6667 733.3333 1014 758'
  );
  animation-name: rotating;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.animate-4 {
  offset-path: path(
    'M 100 0 Q 154 151 223 282 C 265 339 279 340 300 335 C 317 330 288 277 271 319 Q 286 410 470 397 L 603 400 Q 710 404 815 501 Q 896 639 1459 807'
  );
  animation-name: rotating;
  animation-duration: 14s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes rotating {
  from{
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    offset-distance: 100%;
  }
}

</style>