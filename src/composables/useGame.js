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
    Object.assign(game, getDefaultGame())
    playerManager.resetPlayer()
    monsterManager.resetMonster()
    stopPlaytime()
    stopMonsterHitInterval()
    resetPlaytime()
  }

  const startPlaying = () => {
    game.state = GameState.PLAYING
    game.startAt = Date.now()
    game.countdown = -1

    startPlaytime()
    startMonsterHitInterval()
    randomButtonPosition()
  }

  const startGame = () => {
    if (isPlaying()) return

    resetGame()

    const countdownInterval = setInterval(() => {
      game.countdown--

      if (game.countdown <= 0) {
        clearInterval(countdownInterval)
        startPlaying()
      }
    }, 1000)
  }

  const endGame = (win = false) => {
    if (isEnding()) return

    game.state = GameState.GAME_OVER
    stopPlaytime()
    stopMonsterHitInterval()

    matchHistoryManager.addMatch({
      win,
      name: playerManager.player.name,
      difficulty: difficulty.name,
      time: playtime.value,
      score: game.score,
      hit: game.hit,
      miss: game.miss,
      coins: playerManager.player.coins,
      lastMonster: monsterManager.monster.name,
      createdAt: new Date().toLocaleString(),
      endedAt: new Date().toLocaleString(),
    })

    resetGame()
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
    if (!isPlaying()) return
    stopMonsterHitInterval()
    startMonsterHitInterval()
    randomButtonPosition()
  }

  const monsterHitPlayer = () => {
    if (!isPlaying()) return
    game.miss++

    defaultHit()

    const isDead = playerManager.damagePlayer(monsterManager.monster.attackDamage)

    if (isDead) {
      endGame()
    }
  }

  const playerHitMonster = () => {
    if (!isPlaying()) return

    game.hit++
    game.score += playerManager.player.attackDamage

    defaultHit()

    const isDead = monsterManager.damageMonster(playerManager.player.attackDamage)

    randomAddCoins()

    if (isDead) {
      const isLastMonster = monsterManager.nextMonster()

      if (isLastMonster) {
        endGame(true)
      }
    }
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
