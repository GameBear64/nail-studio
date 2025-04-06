<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import useFetch from '@tools/useFetch';

const route = useRoute()

const user = ref({})

const refetch = () => {
  useFetch({url: `artist/${route.params?.id}`}).then((data) => {
    user.value = data;
  })
}

onMounted(() => refetch());

watch(() => route.path.id, refetch)
</script>

<template>
  <div class="flex flex-col overflow-x-hidden">
    hello {{ user }}
  </div>
</template>
