<script setup>
import Icon from "./Icon.vue";
import Dropdown from "./Dropdown.vue";
import { computed, ref } from "vue";

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

const open = ref(false);

const arrow = computed(() =>
  open ? "keyboard_arrow_down" : "keyboard_arrow_up"
);
</script>

<template>
  <div
    class="bg-white shadow-md w-full items-end mb-auto p-3 flex justify-between"
  >
    <div class="font-bold text-xl flex flex-row">
      <p>N</p>
      <p class="text-pink-500">S</p>
    </div>
    <div class="flex flex-row font-medium text-gray-600 divide-x">
      <p>Artists</p>
      <p>Schedule appointment</p>
    </div>
    <div class="flex flex-row">
      <p class="px-3 rounded py-1 bg-blue-700 text-white font-medium">C</p>
      <div class="relative">
        <Icon
          class="relative"
          :onclick="() => (open = !open)"
          :icon="arrow"
          :clickable="true"
        />
        <Dropdown v-if="open" :options="options" />
      </div>
    </div>
  </div>
</template>
