<script setup>
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

const props = defineProps(['data']);
</script>

<template>
  <div class="flex w-screen flex-col gap-7 py-10! sm:gap-8">
    <Swiper
      class="px-12! sm:px-32!"
      thumbs-swiper=".my-thumbs"
      :loop="true"
      :modules="[Pagination, Navigation]"
      navigation
      :breakpoints="{
        500: { slidesPerView: 1 },
        800: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
        1600: { slidesPerView: 4 },
      }"
      space-between="120"
      :pagination="{
        clickable: true,
      }"
    >
      <SwiperSlide
        v-for="el in props.data"
        :key="el"
        class="bg-transparent!"
      >
        <slot :data="el" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
