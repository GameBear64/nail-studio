<script setup>
import { Navigation,Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide,useSwiper } from 'swiper/vue';

import artist3 from "../public/aiony-haust-3TLl_97HNJo-unsplash.jpg"
import artist2 from "../public/angelina-litvin-52R7t7x8CPI-unsplash.jpg"
import artist4 from "../public/luke-braswell-oYFv-_JKsVk-unsplash.jpg"
import artist1 from "../public/swapnil-dwivedi-N2IJ31xZ_ks-unsplash.jpg"

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
   
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

const limitedCharacters = (text)=>{
let characters = text
if(characters.length>120){
characters=characters.split("").slice(0,120).join("") +'...'
}
return characters
}

    </script>
<template>
  <Swiper
    :breakpoints="{500:{slidesPerView:1}, 800:{slidesPerView:2, spaceBetween:60}, 1200:{slidesPerView:3}, 1600:{slidesPerView:4}}"
    :space-between="120"
    nextButton= '.swiper-button-next'
    :navigation="true"
    prevButton='.swiper-button-prev'
    :pagination="{
      clickable: true,
    }"
    :modules="[Pagination, Navigation]"
    class="min-h-[35rem] !w-screen bg-gradient-to-l flex flex-row from-pink-300  to-pink-50 !px-10 !py-10 md:!px-14"
  >
 
    <SwiperSlide
      v-for="artist in artists"
      :key="artist"
      class="!flex sm:max-h-[30rem] max-h-[26rem] flex-col !justify-between rounded-lg border border-pink-200 bg-white py-5"
    >
      <div class="flex flex-col items-center gap-2">
        <div class="sm:size-52 size-44 rounded-lg p-2 shadow-[inset_0px_0px_37px_50px_rgba(236,_72,_153,_0.15)]">
          <img
            :src="artist.image"
            alt="image"
            class="sm:size-full rounded object-cover size-40"
          >
        </div>
        <div class="flex flex-col items-center gap-2 px-4">
          <div class="text-center">
            <p class="text-lg font-semibold">
              {{ artist.name }}
            </p> 
            <p class="text-sm text-gray-500">
              5 years of experience
            </p>
          </div>
          <p class="sm:text-md text-sm pb-2 text-center">
            {{ limitedCharacters(artist.describtion) }}
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
    </SwiperSlide>
    <div class="swiper-button-prev swiper-button"></div>
    <div class="swiper-button-next swiper-button"></div>
  </Swiper>
  <div class="min-h-1 w-screen bg-gradient-to-r from-pink-300  to-pink-50" />
</template>


<style lang="css" scoped>
.swiper-button{
  @apply bg-pink-200 rounded-full !text-pink-400 !fill-pink-400 !text-sm py-4 px-5 font-bold
}
</style>
