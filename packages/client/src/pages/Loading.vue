<script setup></script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="text-primary mr-3 inline-block size-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span
        v-i18n
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >
        Loading...
      </span>
    </div>
    <h1 v-i18n>
      Loading...
    </h1>
  </div>
</template>
