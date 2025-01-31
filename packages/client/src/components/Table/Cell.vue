    <script setup>

const props = defineProps(["type", 'value'])

const loadImage = ()=>
 new URL(`../../../../server/storage/images/${props.value}`, import.meta.url).href


</script>

<template>
  <td>
    <p
      v-if="props.type==='string'"
    >
      {{ props.value }}
    </p>
    <img
      v-if="props.type==='image'"
      class="size-10 rounded-sm object-cover"
      :src="loadImage() "
      alt="image"
    >
  </td>
</template>


<style lang="scss" scoped>

</style>