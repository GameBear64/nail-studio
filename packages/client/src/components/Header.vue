<script setup>
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import useFetch from '@tools/useFetch';

import Logo from './Logo.vue';
import Dropdown from './Dropdown.vue';
import Icon from './Icon.vue';
import { useRouter } from 'vue-router';
import DesktopNavigation from './Layout/DesktopNavigation.vue';
import MobileNavigation from './Layout/MobileNavigation.vue';

const router = useRouter();

const options = [
  {
    icon: 'person',
    name: 'Profile',
  },
  {
    icon: 'calendar_today',
    name: 'Appointments',
  },
  {
    icon: 'settings',
    name: 'Settings',
  },
  {
    icon: 'logout',
    name: 'Logout',
  },
];

const navigations = [
  { name: 'Home', icon: 'cottage', location: '' },
  { name: 'Artists', icon: 'groups', location: '' },
  { name: 'Book', icon: 'checkbook', location: '' },
];

const open = ref(false);
const openRef = ref(false);

onClickOutside(openRef, () => (open.value = false));
</script>

<template>
  <MobileNavigation :navigations="navigations" :options="options" />
  <DesktopNavigation :navigations="navigations" :options="options" />
</template>
