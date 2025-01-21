<script setup></script>

<template>
  <div class="w-full">
    <table class="w-full">
      <tr class="rounded bg-gray-100  text-left">
        <th class="">
          Name
        </th>
        <th>Phone</th>
        <th>Email</th>
        <th>Password</th>
        <th>Actions</th>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
      </tr>
    </table> 
  </div>
</template>

<style lang="css" scoped>


th{
    @apply font-light !min-w-32 px-2 py-3 uppercase
}
</style>