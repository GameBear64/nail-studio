<script setup>
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router';

import DesktopNavigation from '@components/Layout/DesktopNavigation.vue';
import MobileNavigation from '@components/Layout/MobileNavigation.vue';

import { UserRoles } from '@tools/consts';
import useFetch from '@tools/useFetch';
import { bgEnToggle } from '@store/translationStore';
import { removeUserData } from '@store/userStore';

const isOpen = ref(false)

provide('isOpen', isOpen)

const router = useRouter();

const actions = [
  {
    icon: 'badge',
    name: 'Admin Panel',
    action: () => {
      router.push({ name: 'admin/artists' })
      isOpen.value = false
    },
    mobileHide: true,
    requiredRole: UserRoles.ADMIN,
  },
  {
    icon: 'person',
    name: 'Profile',
    action: () => {
      isOpen.value = false
    },
    requiredRole: UserRoles.ARTIST,
  },
  {
    icon: 'calendar_today',
    name: 'Appointments',
    action: () => {
      router.push({ name: 'appointments' })
      isOpen.value = false
    },
    requiredRole: UserRoles.USER,
  },
  {
    icon: 'language',
    name: 'Language',
    requiredRole: UserRoles.USER,
    action: () => bgEnToggle(),
  },
  // {
  //   icon: 'settings',
  //   name: 'Settings',
  //   action: () => {
  //     isOpen.value = false
  //   },
  //   requiredRole: UserRoles.USER,
  // },
  {
    icon: 'logout',
    name: 'Logout',
    requiredRole: UserRoles.USER,
    action: () => {
      useFetch({ url: 'user/logout', method: 'GET' }).then(() => {
        removeUserData();
        router.push('/login');
      });
      isOpen.value = false
    },
  },
];

const adminActions = [
  {
    icon: 'badge',
    name: 'Artists',
    action: () => {
      router.push({ name: 'admin/artists' })
      isOpen.value = false
    },
  },
  {
    icon: 'badge',
    name: 'Procedure',
    action: () => {
      router.push({ name: 'admin/procedures' })
      isOpen.value = false
    },
  },
];

const navigations = [
  { name: 'Home', icon: 'cottage', location: '/' },
  { name: 'Artists', icon: 'groups', location: '/artists' },
  { name: 'Book', icon: 'checkbook', location: '/book' },
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
