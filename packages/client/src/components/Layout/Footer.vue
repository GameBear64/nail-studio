<script setup>
import { useRouter } from 'vue-router';

import { navigations } from '../../toolbox/consts';
const router = useRouter();
</script>

<template>
  <div
    class="bg-base text-txtPrimary max-h-82 flex w-screen flex-col items-center gap-6 border-t-0 border-pink-200 px-2 py-8 sm:justify-between md:flex-row md:px-10 md:py-20 lg:px-52"
  >
    <div class="flex flex-row items-center divide-x md:w-auto">
      <p
        v-i18n
        class="font-fancy pr-5 text-4xl md:pr-8 md:text-7xl"
      >
        Studio 96
      </p>

      <div class="md:text-md flex flex-col gap-2 pl-5 text-sm md:pl-8">
        <p
          v-for="navigation in navigations"
          :key="navigation.name"
          v-i18n
          :onclick="() => router.push(navigation.location)"
          class="text-txtAccent cursor-pointer"
        >
          {{ navigation.name }}
        </p>
      </div>
    </div>
    <div class="flex flex-col items-center gap-2">
      <div class="row flex gap-4 text-xl md:text-3xl">
        <a
          href="https://x.com/"
          class="si si-x text-txtPrimary"
        />
        <a
          href="https://www.instagram.com/"
          class="si si-instagram si--color"
        />
        <a
          href="https://www.facebook.com/"
          class="si si-facebook si--color"
        />
        <a
          href="https://www.viber.com/en/"
          class="si si-viber si--color"
        />
      </div>
      <p
        v-i18n
        class="text-sm md:text-sm"
      >
        For more contacts - look for outlets
      </p>
    </div>
  </div>
</template>
