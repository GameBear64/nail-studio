<script setup>
import Icon from "./Icon.vue";
import Dropdown from "./Dropdown.vue";
import { computed, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const options = [
  {
    icon: "person",
    name: "Profile",
  },
  {
    icon: "calendar_today",
    name: "Appointments",
  },
  {
    icon: "settings",
    name: "Settings",
  },
  {
    icon: "logout",
    name: "Logout",
  },
];

const navigations = [
  { name: "Home", icon: "cottage", location: "" },
  { name: "Artists", icon: "groups", location: "" },
  { name: "Book", icon: "checkbook", location: "" },
];

const open = ref(false);
const openRef = ref(false);

const arrow = computed(() =>
  open.value ? "keyboard_arrow_up" : "keyboard_arrow_down"
);

onClickOutside(openRef, () => (open.value = false));
</script>

<template>
  <div
    class="bg-white shadow-md w-full mb-auto px-3 py-2 flex justify-between items-center"
  >
    <div class="font-bold italic text-2xl flex flex-row">
      <p>N</p>
      <p class="text-pink-500">S</p>
    </div>
    <div class="flex flex-row gap-20 text-gray-600 text-lg">
      <div
        v-for="navigation in navigations"
        class="flex hover:text-pink-600 hover:bg-pink-100 rounded-xl p-2 flex-row gap-2 items-center cursor-pointer"
      >
        <Icon :icon="navigation.icon" />
        <p class="">{{ navigation.name }}</p>
      </div>
    </div>
    <div class="flex flex-row items-end">
      <p class="px-3 rounded py-1 bg-blue-700 text-white font-medium">C</p>
      <div ref="openRef" class="flex justify-end relative">
        <Icon @click="() => (open = !open)" :icon="arrow" :clickable="true" />
        <Dropdown v-if="open" class="top-11 -right-1" :options="options" />
      </div>
    </div>
  </div>
</template>
