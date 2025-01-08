<script setup>
import { ref } from 'vue';
import { FreeMode, Navigation,Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide,useSwiper } from 'swiper/vue';

import artist3 from "../public/aiony-haust-3TLl_97HNJo-unsplash.jpg"
import artist2 from "../public/angelina-litvin-52R7t7x8CPI-unsplash.jpg"
import artist4 from "../public/luke-braswell-oYFv-_JKsVk-unsplash.jpg"
import artist1 from "../public/swapnil-dwivedi-N2IJ31xZ_ks-unsplash.jpg"

import Icon from './Icon.vue';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
const slider = ref(null);
    const swiper= useSwiper()
   console.log(swiper)
        const onSwiper = (swiper) => {
          slider.value=swiper.value
          console.log(slider);
        };
        const onSlideChange = (e) => {
          // console.log(e, swiper);
        };
 

const artists = [{
  image:artist3,
  name:"Aiony Brat",
  describtion:"An amazing artist and listener, giving you the prettiest nails and see you leaving with a smilling face is my proprity!"
},
{
  image:artist2,
  name:"Angelina Litvin",
  describtion:"With years of experience, wrinckes, and doing my wife's manicure for years, i am sure that we can give your nails the care they deserve. Trust me."
},{
  image:artist4,
  name:"Like Branswell",
  describtion:"Mona Lisa can eat a fat cake! I am here to bring the life in your nails, and make sure you leave happy."
},{
  image:artist1,
  name:"Swapnil Dwivedi",
  describtion:"My soul is black just like my skin. Happy ending included 😉"
},
]

    </script>
<template>
  <div class="min-h-1 w-screen bg-gradient-to-l from-pink-300  to-pink-50" />
  <Swiper
    :slides-per-view="3"
    :space-between="20"
    :free-mode="true"
    :pagination="{
      clickable: true,
    }"
    :modules="[FreeMode, Pagination, Navigation]"
    class="w-screen bg-black"
  >
    <SwiperSlide
      v-for="artist in artists"
      :key="artist"
    >
      <div class="flex min-h-full w-80 flex-col justify-between rounded-lg border border-pink-200 bg-white py-2">
        <div class="flex flex-col items-center gap-2">
          <div class="size-52 rounded-lg p-2 shadow-[inset_0px_0px_37px_50px_rgba(236,_72,_153,_0.15)]">
            <img
              :src="artist.image"
              alt="image"
              class="size-full rounded object-cover"
            >
          </div>
          <div class="flex flex-col items-center gap-2 px-4">
            <div class="text-center">
              <p class="text-lg font-semibold">
                {{ artist.name }}
              </p> <p class="text-sm text-gray-500">
                1-5 years of experience
              </p>
            </div>
            <p class="pb-2 text-center">
              {{ artist.describtion }}
            </p>
          </div>
        </div>
        <div class="my-2 flex flex-row justify-center gap-6">
          <button class="btn-outlined">
            Book me
          </button>
          <button class="btn-outlined">
            See more
          </button>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
  <!-- </div> -->
  <div class="min-h-1 w-screen bg-gradient-to-r from-pink-300  to-pink-50" />
</template>

  


