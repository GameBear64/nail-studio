
<script setup>
const props= defineProps(['size'])
</script>

<template>
  <svg
    class="absolute w-full blur-sm"
    viewBox="0 0 200 200"
    :class="props.size"
  >
    <defs>
      <linearGradient
        id="grad1"
        x1="0%"
        x2="100%"
        y1="0%"
        y2="0%"
      >
        <stop
          offset="0%"
          stop-color="#db7093"
        />
        <stop
          offset="100%"
          stop-color="pink"
        />
      </linearGradient>
    </defs>
    <path
      fill="url(#grad1)"
      d="M8.475 78.884C27.008 22.9 70.833 4.108 89.905 1.464c110.239-15.283 132.313 92.87 90.046 148.772-36.448 48.204-100.638 57.186-139.16 44.676C6.86 183.894-11.983 140.686 8.475 78.884z"
    />
  </svg>
</template>


