<script setup>
  /* Vue */
  import { ref } from 'vue'

  /* Components */
  import BellIcon from '@/components/icons/BellIcon.vue'
  import HomeIcon from '@/components/icons/HomeIcon.vue'

  /* Composables */
  import { useLocalStorage } from '@/composables/useLocalStorage.js'
  import { usePageTitle } from '@/composables/usePageTitle'

  /* Data */
  import themes from '@/data/themes.json'

  /* Settings */
  const { data: theme, setData: setTheme } = useLocalStorage('settings.theme', themes[0])

  /* Page Title */
  const pageTitle = ref('Mairuu Aim')
  usePageTitle(pageTitle)
</script>

<template>
  <div id="container" class="flex flex-col items-center w-full min-h-screen">
    <header class="w-full">
      <div class="flex flex-row justify-between w-full p-4 bg-black">
        <h1 class="text-xl text-white uppercase tracking-widest font-semibold">Mairuu Aim</h1>
        <div class="flex flex-row justify-between items-center gap-4">
          <BellIcon class="w-5 h-5 text-gray-500 cursor-pointer" />
          <HomeIcon class="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
      </div>
      <hr :style="{ backgroundColor: theme.color }" class="h-1 border-none" />
    </header>
    <main class="flex flex-col justify-center items-center w-full my-4">
      <section id="themes" class="flex flex-wrap justify-center items-center">
        <button
          v-for="t in themes"
          class="w-10 h-10 cursor-pointer rounded-full justify-center overflow-hidden p-1"
          :class="theme.id === t.id ? 'border-2 border-gray-500' : ''"
          @click="setTheme(t)"
        >
          <div class="w-full h-full rounded-full" :style="{ backgroundColor: t.color }" />
        </button>
      </section>
    </main>
    <footer class="w-full"></footer>
  </div>
</template>

<style scoped></style>
