<script setup>
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper,SwiperSlide } from 'swiper/vue';

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
  thumbs-swiper=".my-thumbs "
  :navigation="true"
    :breakpoints="{500:{slidesPerView:1}, 800:{slidesPerView:2, spaceBetween:60}, 1200:{slidesPerView:3}, 1600:{slidesPerView:4}}"
    :space-between="120"
    :pagination="{
      clickable: true,
    }"
    :modules="[Pagination, Navigation]"
    class="flex sm:min-h-[35rem] min-h-[30rem] flex-row bg-gradient-to-l from-pink-300  to-pink-50 !px-12 !py-10 sm:!px-32"
  >
    <SwiperSlide
      v-for="artist in artists"
      :key="artist"
      class="!flex max-h-[26rem] flex-col !justify-between rounded-lg border border-pink-200 bg-white py-5 sm:max-h-[30rem]"
    >
      <div class="flex flex-col items-center gap-2">
        <div class="size-44 rounded-lg p-2 shadow-[inset_0px_0px_37px_50px_rgba(236,_72,_153,_0.15)] sm:size-52">
          <img
            :src="artist.image"
            alt="image"
            class="size-40 rounded object-cover sm:size-full"
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
          <p class="sm:text-md pb-2 text-center text-sm">
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
  </Swiper>
  <div class="min-h-1 w-screen bg-gradient-to-r from-pink-300  to-pink-50" />
</template>

