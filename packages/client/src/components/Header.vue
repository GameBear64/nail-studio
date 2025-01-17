<script setup>
import { useRouter } from 'vue-router';

import useFetch from '@tools/useFetch';
import { setUserId } from '@store/userStore';

import DesktopNavigation from './Layout/DesktopNavigation.vue';
import MobileNavigation from './Layout/MobileNavigation.vue';

const router = useRouter();

const options = [
  // {
  //   icon: 'person',
  //   name: 'Profile',
  // },
  {
    icon: 'supervisor_account',
    name: 'Admin Panel',
    action: ()=>{router.push("/admin")}
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
    action: () => {
      useFetch({ url: 'user/logout', method: 'GET' }).then(() => {
        setUserId().then(() => router.push('/login'));
      });
    },
  },
];

const navigations = [
  { name: 'Home', icon: 'cottage', location: '/' },
  { name: 'Artists', icon: 'groups', location: '' },
  { name: 'Book', icon: 'checkbook', location: '' },
];
</script>

<template>
  <MobileNavigation
    :navigations="navigations"
    :options="options"
  />
  <DesktopNavigation
    :navigations="navigations"
    :options="options"
  />
</template>
