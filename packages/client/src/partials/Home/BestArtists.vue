<script setup>
import ArtistCart from '@components/ArtistCard.vue';
import Swiper from '@components/Swiper.vue';

const artists = [
  {
    image: 'aiony-haust',
    name: 'Aiony Brat',
    description:
      'An amazing artist and listener, giving you the prettiest nails and see you leaving with a smilling face is my proprity!',
  },
  {
    image: 'angelina-litvin',
    name: 'Angelina Litvin',
    description:
      "With years of experience, wrinckes, and doing my wife's manicure for years, i am sure that we can give your nails the care they deserve. Trust me.",
  },
  {
    image: 'luke-braswell',
    name: 'Like Branswell',
    description: 'Your nails are my priority! I am here to bring the life in your nails, and make sure you leave happy.',
  },
  {
    image: 'swapnil-dwivedi',
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
        <p
          v-i18n
          class="font-fancy text-5xl sm:text-7xl"
        >
          Our best artists
        </p>
        <p
          v-i18n
          class="sm:text-md max-w-[21rem] text-sm italic sm:max-w-md"
        >
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
