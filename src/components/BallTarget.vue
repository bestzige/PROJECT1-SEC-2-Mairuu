<script setup>
  import { computed, defineProps } from 'vue'

  const props = defineProps(['color', 'size'])

  const containerClasses = [
    'flex',
    'justify-center',
    'items-center',
    'rounded-full',
    'overflow-hidden',
    'transition-all',
    'duration-500',
  ]

  const containerStyle = computed(() => ({
    width: props.size,
    height: props.size,
    backgroundColor: props.color,
  }))
</script>

<template>
  <div :style="containerStyle" :class="containerClasses" />
</template>
