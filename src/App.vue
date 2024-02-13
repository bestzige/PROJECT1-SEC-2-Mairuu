<script setup>
  /* Components */
  import BellIcon from '@/components/icons/BellIcon.vue'
  import HomeIcon from '@/components/icons/HomeIcon.vue'
  import LogoIcon from '@/components/icons/LogoIcon.vue'

  /* Constants */
  import { SITE_TITLE } from '@/utils/constants'

  /* Composables */
  import { useGame } from '@/composables/useGame'
  import { useMatchHistory } from '@/composables/useMatchHistory'
  import { useRouter } from '@/composables/useRouter'
  import { useSetting } from '@/composables/useSetting'

  /* Utils */
  import { readableTime } from '@/utils/time'

  /* Settings */
  const { themes, theme, setTheme, cursors, cursor, setCursor } = useSetting()

  /* Router */
  const { isRoute, push } = useRouter()

  const { matchHistory, clearMatchHistory, reloadMatchHistory } = useMatchHistory()

  /* Game */
  const gameService = useGame({
    id: 1,
    name: 'Easy',
    speed: 1.0,
    maxHealth: 100,
  })

  const settingClass = {
    label: 'flex w-2/6 bg-gray-500 rounded-none rounded-l-lg p-4 justify-center items-center',
    input: 'flex w-4/6 bg-gray-50 rounded-none rounded-r-lg p-4 justify-center items-center',
  }

  const playGame = () => {
    push('game')
    gameService.startGame()
  }

  const matchHistoryClick = () => {
    push('match-history')
    reloadMatchHistory()
  }
</script>

<template>
  <div id="container" class="flex flex-col items-center w-full min-h-screen">
    <header class="w-full">
      <div class="flex flex-row justify-between w-full p-4 bg-black">
        <div class="flex flex-row items-center gap-4 cursor-pointer" @click="push('home')">
          <LogoIcon class="w-8 h-8 cursor-pointer" :color="theme.color" />
          <h1 class="text-xl text-white uppercase tracking-widest font-semibold">
            {{ SITE_TITLE }}
          </h1>
        </div>
        <div class="flex flex-row justify-between items-center gap-4">
          <BellIcon class="w-5 h-5 text-gray-500 cursor-pointer" />
          <HomeIcon class="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
      </div>
      <hr :style="{ backgroundColor: theme.color }" class="h-1 border-none" />
    </header>
    <main class="flex flex-col justify-center items-center w-full my-4">
      <!-- Home -->
      <section v-if="isRoute('home')" id="homePage">
        <section id="header-title" class="flex flex-col items-center w-full gap-2">
          <div class="flex flex-row items-center gap-4">
            <LogoIcon class="w-12 h-12 cursor-pointer" :color="theme.color" />
            <h1 class="text-4xl text-white uppercase tracking-widest font-semibold">
              {{ SITE_TITLE }}
            </h1>
          </div>
          <h3 class="text-xl text-white uppercase tracking-widest font-light">
            {{ SITE_TITLE }}, Monster Kill by Aim Target
          </h3>
        </section>
        <section
          id="settings"
          class="flex flex-col items-center w-full p-4 gap-4 bg-black rounded-lg my-4"
        >
          <div class="w-full">
            <ul id="themes" class="flex w-full m-2">
              <li :class="settingClass.label">Target Color</li>
              <li :class="settingClass.input">
                <div class="flex flex-wrap justify-center items-center">
                  <button
                    v-for="t in themes"
                    class="w-10 h-10 cursor-pointer rounded-full justify-center overflow-hidden p-1"
                    :class="theme.id === t.id ? 'border-2 border-gray-500' : ''"
                    @click="setTheme(t)"
                  >
                    <div class="w-full h-full rounded-full" :style="{ backgroundColor: t.color }" />
                  </button>
                </div>
              </li>
            </ul>
            <ul id="cursors" class="flex w-full m-2">
              <li :class="settingClass.label">Cursor</li>
              <li :class="settingClass.input">
                <div class="flex flex-wrap justify-center items-center">
                  <img
                    v-for="c in cursors"
                    :key="c"
                    :alt="c"
                    :src="`/images/cursors/${c}.svg`"
                    class="w-10 h-10 cursor-pointer rounded-full justify-center overflow-hidden p-1 text-red-500"
                    :class="cursor === c ? 'border-2' : ''"
                    :style="{
                      borderColor: cursor === c ? theme.color : '',
                    }"
                    @click="setCursor(c)"
                  />
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section id="game-start" class="flex flex-col items-center w-full p-4 gap-4">
          <button
            @click="playGame"
            class="w-1/2 p-4 bg-green-500 text-white rounded-lg cursor-pointer"
          >
            Start Game
          </button>
          <button
            @click="matchHistoryClick"
            class="w-1/2 p-4 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            Match History
          </button>
        </section>
      </section>

      <!-- Game -->
      <section
        v-if="isRoute('game')"
        id="gamePage"
        :style="{ cursor: `url('/images/cursors/${cursor}.svg'), auto !important` }"
        class="w-full flex flex-col items-center gap-4"
      >
        <h1 v-show="gameService.game.countdown > 0" class="text-3xl text-white">
          Starting in {{ gameService.game.countdown }} seconds
        </h1>
        <div v-show="gameService.isEnding()">
          <h1 class="text-3xl text-white">Game Over</h1>
          <h3 class="text-white">You {{ gameService.isWin() ? 'Win' : 'Lose' }} the game</h3>
        </div>
        <div
          v-show="gameService.isPlaying()"
          class="flex flex-row justify-between w-full gap-4 items-center"
        >
          <div class="flex flex-col items-center gap-4">
            <h2 class="text-3xl text-white">Player</h2>
            <h2 class="text-3xl text-white">Model: {{ gameService.playerManager.player.model }}</h2>
            <h2 class="text-3xl text-white">
              Health: {{ gameService.playerManager.player.health }}
            </h2>
            <h2 class="text-3xl text-white">Scores: {{ gameService.game.scores }}</h2>
            <h2 class="text-3xl text-white">Coins: {{ gameService.playerManager.player.coins }}</h2>
            <h2 class="text-3xl text-white">Time: {{ gameService.playtime }}</h2>
          </div>
          <div class="flex flex-col items-center gap-4">
            <h2 class="text-3xl text-white">Monster</h2>
            <h2 class="text-3xl text-white">
              Model: {{ gameService.monsterManager.monster.model }}
            </h2>
            <h2 class="text-3xl text-white">Difficulty: {{ gameService.difficulty.name }}</h2>
            <h2 class="text-3xl text-white">
              Monster {{ gameService.monsterManager.monster.name }}
            </h2>
            <h2 class="text-3xl text-white">
              Health: {{ gameService.monsterManager.monster.health }}
            </h2>
          </div>
        </div>
        <div
          v-show="gameService.isPlaying()"
          class="flex justify-center bg-dark border-red-500 border-2 relative w-full h-96 select-none text-white"
          @click="gameService.backgroundClicked"
        >
          <button
            @click="gameService.buttonClicked"
            class="absolute rounded-full"
            :style="{
              top: gameService.game.button.position.top + '%',
              left: gameService.game.button.position.left + '%',
              // below is for dynamic button size
              // width: user.settings.button.size + 'px',
              // height: user.settings.button.size + 'px',
              width: '50px',
              height: '50px',
              backgroundColor: theme.color,
              cursor: `url('/images/cursors/${cursor}.svg'), auto !important`,
            }"
          />
        </div>
      </section>

      <!-- Result -->
      <section v-if="gameService.isResults() && isRoute('game')" id="resultsPage">
        <div>
          <h2 class="text-3xl font-semibold text-white">Game Result</h2>
          <p class="text-white">Hits: {{ gameService.game.hits }}</p>
          <p class="text-white">Misses: {{ gameService.game.misses }}</p>
          <p class="text-white">Clicks: {{ gameService.clicks }}</p>
          <p class="text-white">Coins: {{ gameService.playerManager.player.coins }}</p>
          <p class="text-white">PlayTime: {{ gameService.playtime }}</p>
          <p class="text-white">Total Score: {{ gameService.game.scores }}</p>
        </div>
        <button @click="push('home')" class="p-2 bg-red-800 text-white rounded w-full">
          Change Settings
        </button>
        <button @click="playGame" class="mt-4 p-2 bg-green-800 text-white rounded w-full">
          Play Again
        </button>
      </section>

      <!-- Match History -->
      <section v-if="isRoute('match-history')" id="matchHistoryPage">
        <section id="match-history-title" class="flex flex-col items-center w-full gap-2">
          <div class="flex flex-row items-center gap-4">
            <LogoIcon class="w-12 h-12 cursor-pointer" :color="theme.color" />
            <h1 class="text-4xl text-white uppercase tracking-widest font-semibold">
              Match History
            </h1>
          </div>
        </section>
        <div class="overflow-x-auto my-4">
          <table
            class="min-w-full divide-y divide-gray-800 bg-gray-900 text-white shadow-md rounded-lg"
          >
            <thead class="text-center bg-gray-800">
              <tr>
                <th class="px-4 py-2">Mode</th>
                <th class="px-4 py-2">Scores</th>

                <th class="px-4 py-2">Coins</th>
                <th class="px-4 py-2">Playtime</th>
                <th class="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="match in matchHistory"
                :key="match.id"
                :class="`${match.win ? 'text-emerald-400' : 'text-rose-600'}`"
              >
                <td class="px-4 py-2">{{ match.difficulty }}</td>
                <td class="px-4 py-2">{{ match.scores }}</td>

                <td class="px-4 py-2">{{ match.coins }}</td>
                <td class="px-4 py-2">{{ readableTime(match.time) }}</td>
                <td class="px-4 py-2">{{ match.endedAt }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-around gap-4">
          <button
            @click="clearMatchHistory()"
            class="mt-4 p-2 bg-red-800 text-white rounded w-full"
          >
            Reset History
          </button>
          <button @click="push('home')" class="mt-4 p-2 bg-blue-800 text-white rounded w-full">
            Back
          </button>
        </div>
      </section>
    </main>
    <footer class="w-full"></footer>
  </div>
</template>

<style scoped></style>
