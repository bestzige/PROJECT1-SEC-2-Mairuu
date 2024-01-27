<script setup>
  import { computed, defineProps } from 'vue'

  const props = defineProps(['progress', 'max', 'height', 'color'])

  const containerClasses = [
    'relative',
    'w-full',
    'overflow-hidden',
    'shadow-inner',
    'transition-all',
    'duration-500',
    'border-2',
    'rounded-full',
  ]

  const containerStyle = computed(() => ({
    width: '100%',
    height: props.height || '1rem',
    padding: '0.5rem',
  }))

  const progressBarStyle = computed(() => ({
    width: `${(props.progress / props.max) * 100}%`,
    backgroundColor: props.color,
  }))
</script>

<template>
  <div :style="containerStyle" :class="containerClasses">
    <div
      class="absolute top-0 left-0 h-full transition-all duration-500"
      :style="progressBarStyle"
    />
    <div
      class="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white font-semibold"
    >
      {{ props.progress }}
    </div>
  </div>
</template>
