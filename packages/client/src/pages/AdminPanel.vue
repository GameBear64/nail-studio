<script setup>
import Icon from '../components/Icon.vue';
import router from '../router';

</script>

<template>
    <div class="flex flex-row relative">
            <div class="flex flex-col bg-white shadow-sm divide-y shadow-gray-400 h-[90vh] w-56 rounded-b p-2 text-gray-600">
              <div :onclick="()=>router.push({name:'artists'})" class="flex flex-row gap-2 cursor-pointer rounded px-2 py-3 hover:bg-gray-100 items-center text-center">
                  <Icon icon="badge"/>
                  <p>Artists</p>
              </div>
              <div  :onclick="()=>router.push({name:'galleries'})" class="flex flex-row gap-2 cursor-pointer rounded px-2 py-3 hover:bg-gray-100 items-center text-center">
                <Icon icon="photo_library"/>
                <p>Galleries</p>
              </div>
            </div>
            <div class="flex flex-col w-screen absolute left-0 items-center">
                <div class="h-1 w-full bg-pink-400 rounded-l-full"></div>
                <p class="text-[11px] text-white font-bold bg-pink-400 rounded-b-md px-2 pb-0.5">ADMIN</p>
            </div>
        <div class="p-3">
            <router-view></router-view>
        </div>
    </div>
</template>


