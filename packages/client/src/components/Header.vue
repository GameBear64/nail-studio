<script setup>
import { useRouter } from 'vue-router';

import useFetch from '@tools/useFetch';
import { setUserData } from '@store/userStore';

import DesktopNavigation from './Layout/DesktopNavigation.vue';
import MobileNavigation from './Layout/MobileNavigation.vue';

const router = useRouter();

const actions = [
{
    icon: 'badge',
    name: 'Admin Panel',
    action: ()=>router.push({name:'artists'}),
    mobileHide: true,
    requiredRole:'admin'
  },
  {
    icon: 'person',
    name: 'Profile',
    requiredRole:'user'
  },
  {
    icon: 'calendar_today',
    name: 'Appointments',
    requiredRole:'user'

  }, 
  {
    icon: 'settings',
    name: 'Settings',
    requiredRole:'user'
  },
  {
    icon: 'logout',
    name: 'Logout',
    requiredRole:'user',
    action: () => {
      useFetch({ url: 'user/logout', method: 'GET' }).then(() => {
        setUserData().then(() => router.push('/login'));
      });
    },
  },
];

const adminActions=[ {
    icon: 'badge',
    name: 'Artists',
    action: ()=>router.push({name:'artists'})
  },
  {
    icon: 'photo_library',
    name: 'Galleries',
    action: ()=>router.push({name:'galleries'})
  },]

const navigations = [
  { name: 'Home', icon: 'cottage', location: '/' },
  { name: 'Artists', icon: 'groups', location: '' },
  { name: 'Book', icon: 'checkbook', location: '' },
];
</script>

<template>
  <MobileNavigation
    :navigations="navigations"
    :actions="actions"
    :admin-actions="adminActions"
  />
  <DesktopNavigation
    :navigations="navigations"
    :options="actions"
  />
</template>
