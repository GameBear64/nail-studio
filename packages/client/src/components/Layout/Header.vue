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
    action: () => router.push({ name: 'artists' }),
    mobileHide: true,
    requiredRole: UserRoles.ADMIN,
  },
  {
    icon: 'person',
    name: 'Profile',
    requiredRole: UserRoles.USER,
  },
  {
    icon: 'calendar_today',
    name: 'Appointments',
    requiredRole: UserRoles.USER,
  },
  {
    icon: 'language',
    name: 'Language',
    requiredRole: UserRoles.USER,
    action: () => bgEnToggle(),
  },
  {
    icon: 'settings',
    name: 'Settings',
    requiredRole: UserRoles.USER,
  },
  {
    icon: 'logout',
    name: 'Logout',
    requiredRole: UserRoles.USER,
    action: () => {
      useFetch({ url: 'user/logout', method: 'GET' }).then(() => {
        removeUserData();
        router.push('/login');
      });
    },
  },
];

const adminActions = [
  {
    icon: 'badge',
    name: 'Artists',
    action: () => router.push({ name: 'artists' }),
  },
  {
    icon: 'photo_library',
    name: 'Galleries',
    action: () => router.push({ name: 'galleries' }),
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
    :actions="actions"
    :admin-actions="adminActions"
  />
  <DesktopNavigation
    :navigations="navigations"
    :options="actions"
  />
</template>
