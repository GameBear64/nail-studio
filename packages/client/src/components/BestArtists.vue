<script setup>
import ArtistCart from './ArtistCard.vue';
import Swiper from '@components/Swiper.vue';

import artist3 from '../public/aiony-haust-3TLl_97HNJo-unsplash.jpg';
import artist2 from '../public/angelina-litvin-52R7t7x8CPI-unsplash.jpg';
import artist4 from '../public/luke-braswell-oYFv-_JKsVk-unsplash.jpg';
import artist1 from '../public/swapnil-dwivedi-N2IJ31xZ_ks-unsplash.jpg';

const artists = [
  {
    image: artist3,
    name: 'Aiony Brat',
    description:
      'An amazing artist and listener, giving you the prettiest nails and see you leaving with a smilling face is my proprity!',
  },
  {
    image: artist2,
    name: 'Angelina Litvin',
    description:
      "With years of experience, wrinckes, and doing my wife's manicure for years, i am sure that we can give your nails the care they deserve. Trust me.",
  },
  {
    image: artist4,
    name: 'Like Branswell',
    description: 'Your nails are my priority! I am here to bring the life in your nails, and make sure you leave happy.',
  },
  {
    image: artist1,
    name: 'Swapnil Dwivedi',
    description: 'Always here to give you a professional service',
  },
];
</script>

<template>
  <div class="min-h-1 bg-gradient-to-r from-pink-200 to-pink-50" />
  <div
    class="flex min-h-[40rem] w-screen flex-col gap-1 bg-gradient-to-t from-pink-200 to-white !py-10 sm:min-h-[47rem] sm:gap-8"
  >
  <div>

    <div class="flex flex-col items-center justify-center gap-1 text-center">
      <p class="font-rouge text-5xl sm:text-7xl">
        Our best artists
      </p>
      <p class="sm:text-md max-w-[21rem] text-sm italic sm:max-w-md">
        With years of experience and happy clients, we can proudly suggest one of our best artists.
      </p>
    </div>
  </div>
    <Swiper
      v-slot="slotProps"
      :data="artists"
    >
      <ArtistCart :data="slotProps.data" />
    </Swiper>
  </div>
  <div class="min-h-1 w-screen bg-gradient-to-r from-pink-300 to-pink-50" />
</template>
