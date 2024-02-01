<script setup>
  /* Components */
  import BellIcon from '@/components/icons/BellIcon.vue'
  import HomeIcon from '@/components/icons/HomeIcon.vue'

  /* Composables */
  import { useRouter } from '@/composables/useRouter'
  import { useSetting } from '@/composables/useSetting'
  import { useMatchHistory } from '@/composables/useMatchHistory'

  /* Settings */
  const { themes, theme, setTheme } = useSetting()

  /* Router */
  const { isRoute, push } = useRouter()

  /*history page*/
  const fontColor = win => {
    return win ? 'text-emerald-400' : 'text-rose-600'
  }
  const WinOrLose = status => {
    return status ? 'win' : 'lose'
  }
  const testWin = {
    scores: 100,
    missed: 13,
    kills: 10,
    win: true,
  }
  const testLose = {
    scores: 100,
    missed: 13,
    kills: 10,
    win: false,
  }
  const { matchHistory, addMatch, removeMatch, clearMatchHistory } = useMatchHistory()
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
      <section v-if="isRoute('home')" id="homePage">
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
      </section>
      <section v-if="isRoute('game')" id="gamePage"></section>
      <section v-if="isRoute('results')" id="resultsPage"></section>
      <section v-if="isRoute('match-history')" id="matchHistoryPage"></section>
    </main>
    <footer class="w-full"></footer>
  </div>

  <!-- Match History -->
  <section id="History">
    <div class="flex justify-center"><p class="text-6xl text-teal-400">HISTORY</p></div>

    <div class="overflow-x-auto">
      <table
        class="min-w-full divide-y divide-gray-800 bg-gray-900 text-white shadow-md rounded-lg"
      >
        <thead>
          <tr>
            <th class="px-4 py-2 text-left">Scores</th>
            <th class="px-4 py-2 text-left">Missed</th>
            <th class="px-4 py-2 text-left">Kills</th>
            <th class="px-4 py-2 text-left">Created At</th>
            <th class="px-4 py-2 text-left">Ended At</th>
            <th class="px-4 py-2 text-left">Result</th>
            <th class="px-4 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="match in matchHistory" :key="match.ID" :class="fontColor(match.win)">
            <td class="px-4 py-2">{{ match.scores }}</td>
            <td class="px-4 py-2">{{ match.missed }}</td>
            <td class="px-4 py-2">{{ match.kills }}</td>
            <td class="px-4 py-2">{{ match.createdAt }}</td>
            <td class="px-4 py-2">{{ match.endedAt }}</td>
            <td class="px-4 py-2">{{ WinOrLose(match.win) }}</td>
            <td class="px-4 py-2">
              <button @click="removeMatch(match.id)" class="p-2 bg-red-400 text-white rounded">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-around">
      <button @click="addMatch(testWin)" class="mt-4 p-2 bg-green-800 text-white rounded">
        Test Add Win
      </button>
      <button @click="addMatch(testLose)" class="mt-4 p-2 bg-red-800 text-white rounded">
        Test Add Lose
      </button>
      <button @click="clearMatchHistory()" class="mt-4 p-2 bg-blue-800 text-white rounded">
        Test Clear
      </button>
    </div>
  </section>
</template>

<style scoped></style>
