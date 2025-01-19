<script setup>
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

const props = defineProps(['data']);
</script>

<template>
  <div class="flex min-h-[40rem] w-screen flex-col gap-7 !py-10 sm:min-h-[47rem] sm:gap-8">
    <Swiper
      class="!px-12 sm:!px-32"
      thumbs-swiper=".my-thumbs "
      :loop="true"
      :modules="[Pagination, Navigation]"
      navigation
      :breakpoints="{
        500: { slidesPerView: 1 },
        800: { slidesPerView: 2, spaceBetween: 60 },
        1200: { slidesPerView: 3 },
        1600: { slidesPerView: 4 },
      }"
      :space-between="120"
      :pagination="{
        clickable: true,
      }"
    >
      <SwiperSlide
        v-for="el in props.data"
        :key="el"
        class="!flex max-h-[26rem] flex-col !justify-between gap-2 rounded-lg border border-pink-200 bg-white py-5 sm:max-h-[30rem]"
      >
        <slot :data="el" />
      </SwiperSlide>
    </Swiper>
  </div>
  <div class="min-h-1 w-screen bg-gradient-to-r from-pink-300 to-pink-50" />
</template>
