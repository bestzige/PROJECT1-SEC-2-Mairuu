import { useInterval } from '@/composables/useInterval'
import { useMatchHistory } from '@/composables/useMatchHistory'
import { useMonster } from '@/composables/useMonster'
import { usePlayer } from '@/composables/usePlayer'
import { GameState } from '@/data/enums'
import { onMounted, reactive } from 'vue'

export function useGame(difficulty) {
  const getDefaultGame = () => {
    return {
      state: GameState.LOBBY,
      miss: 0,
      hit: 0,
      score: 0,
      countdown: 5,
      button: {
        position: { top: 0, left: 0 },
      },
      startAt: null,
    }
  }

  const game = reactive(getDefaultGame())

  const {
    counter: playtime,
    resetCounter: resetPlaytime,
    start: startPlaytime,
    stop: stopPlaytime,
  } = useInterval(null, 1000)
  const { start: startMonsterHitInterval, stop: stopMonsterHitInterval } = useInterval(
    () => monsterHitPlayer(),
    difficulty.speed * 1000,
  )

  const playerManager = usePlayer()
  const monsterManager = useMonster()
  const matchHistoryManager = useMatchHistory()

  const isLobby = () => game.state === GameState.LOBBY
  const isStarting = () => game.state === GameState.STARTING
  const isPlaying = () => game.state === GameState.PLAYING
  const isEnding = () => game.state === GameState.ENDING
  const isResults = () => game.state === GameState.RESULTS

  const randomButtonPosition = () => {
    const padding = 10 // in percentage
    const randomTop = Math.floor(Math.random() * (100 - padding * 2) + padding)
    const randomLeft = Math.floor(Math.random() * (100 - padding * 2) + padding)

    game.button.position = { top: randomTop, left: randomLeft }
  }

  const resetGame = () => {
    /* Assign to นายณัฐพล นิรัตติศัยกุล */
  }

  const startPlaying = () => {
    /* Assign to นายณัฐพล นิรัตติศัยกุล */
  }

  const startGame = () => {
    /* Assign to นายณัฐพล นิรัตติศัยกุล */
  }

  const endGame = (win = false) => {
    /* Assign to นายณัฐพล นิรัตติศัยกุล */
  }

  const randomAddCoins = () => {
    const randomCoin =
      Math.floor(
        Math.random() *
          (monsterManager.monster.rangeCoin[1] - monsterManager.monster.rangeCoin[0] + 1),
      ) + monsterManager.monster.rangeCoin[0]
    playerManager.addCoins(randomCoin)
  }

  const defaultHit = () => {
    /* Assign to นายพสิษฐ์ วิญญาณ */
    if (!isPlaying()) return
    stopMonsterHitInterval()
    startMonsterHitInterval()
    randomButtonPosition()
  }

  const monsterHitPlayer = () => {
    /* Assign to นายพสิษฐ์ วิญญาณ */
  }

  const playerHitMonster = () => {
    /* Assign to นายพสิษฐ์ วิญญาณ */
  }

  const buttonClicked = event => {
    /* Assign to นายวัชระ สันทวี */
  }

  const backgroundClicked = event => {
    /* Assign to นายวัชระ สันทวี */
  }

  onMounted(() => {
    /* Assign to นายวัชระ สันทวี */
  })

  return {
    game,
    playerManager,
    monsterManager,
    matchHistoryManager,
    isLobby,
    isStarting,
    isPlaying,
    isEnding,
    isResults,
    startGame,
    endGame,
    buttonClicked,
    backgroundClicked,
  }
}
