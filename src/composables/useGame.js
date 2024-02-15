import { useInterval } from '@/composables/useInterval'
import { useMatchHistory } from '@/composables/useMatchHistory'
import { useMonster } from '@/composables/useMonster'
import { usePlayer } from '@/composables/usePlayer'
import { GameState } from '@/data/enums'
import { computed, reactive } from 'vue'

export function useGame(difficulty) {
  const getDefaultGame = () => {
    return {
      state: GameState.LOBBY,
      misses: 0,
      hits: 0,
      scores: 0,
      countdown: 5,
      button: {
        position: { top: 0, left: 0 },
      },
      startAt: null,
      isWin: false,
    }
  }

  const game = reactive(getDefaultGame())

  const clicks = computed(() => game.hits + game.misses)

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

  const playerManager = usePlayer(difficulty.maxHealth || 100)
  const monsterManager = useMonster()
  const matchHistoryManager = useMatchHistory()

  const isLobby = () => game.state === GameState.LOBBY
  const isStarting = () => game.state === GameState.STARTING
  const isPlaying = () => game.state === GameState.PLAYING
  const isEnding = () => game.state === GameState.ENDING
  const isResults = () => game.state === GameState.RESULTS
  const isWin = () => game.isWin

  const randomButtonPosition = () => {
    const padding = 15 // padding from the edge of the screen
    const randomTop = Math.floor(Math.random() * (100 - padding * 2) + padding) // random number between padding(15) and 85
    const randomLeft = Math.floor(Math.random() * (100 - padding * 2) + padding) // random number between padding(15) and 85

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
    game.startAt = new Date().toLocaleString()
    game.countdown = -1

    startPlaytime()
    startMonsterHitInterval()
    randomButtonPosition()
  }

  const startGame = () => {
    if (isPlaying()) return

    resetGame()

    game.state = GameState.STARTING

    const countdownInterval = setInterval(() => {
      game.countdown--

      if (game.countdown <= 0) {
        clearInterval(countdownInterval)
        startPlaying()
      }
    }, 1000)
  }

  const endGame = (win = false) => {
    game.state = GameState.ENDING

    stopPlaytime()
    stopMonsterHitInterval()

    matchHistoryManager.addMatch({
      win,
      name: playerManager.player.name,
      difficulty: difficulty.name,
      time: playtime.value,
      scores: game.scores,
      hits: game.hits,
      misses: game.misses,
      scores: game.scores,
      coins: playerManager.player.coins,
      lastMonster: monsterManager.monster.name,
      createdAt: game.startAt,
      endedAt: new Date().toLocaleString(),
    })

    game.isWin = win

    setTimeout(() => {
      game.state = GameState.RESULTS
    }, 1000)
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
    game.misses++

    defaultHit()

    const isDead = playerManager.damagePlayer(monsterManager.monster.attackDamage)

    playerManager.setModel(isDead ? 'dead' : 'hurt')
    monsterManager.setModel('attack')

    setTimeout(() => {
      monsterManager.setModel('idle')
      playerManager.setModel('idle')
    }, 500)

    if (isDead) {
      endGame()
    }
  }

  const playerHitMonster = () => {
    if (!isPlaying()) return

    game.hits++
    game.scores += playerManager.player.attackDamage

    defaultHit()

    const isDead = monsterManager.damageMonster(playerManager.player.attackDamage)

    monsterManager.setModel(isDead ? 'dead' : 'hurt')
    playerManager.setModel('attack')

    setTimeout(() => {
      monsterManager.setModel('idle')
      playerManager.setModel('idle')
    }, 500)

    randomAddCoins()

    if (isDead) {
      const isLastMonster = monsterManager.nextMonster()

      if (isLastMonster) {
        endGame()
      }
    }
  }

  const buttonClicked = event => {
    if (!isPlaying()) return

    event.preventDefault()
    event.stopPropagation()

    playerHitMonster()
  }

  const backgroundClicked = event => {
    if (!isPlaying()) return

    event.preventDefault()

    monsterHitPlayer()
  }

  return {
    game,
    playerManager,
    monsterManager,
    matchHistoryManager,
    isLobby,
    isStarting,
    isPlaying,
    isResults,
    isEnding,
    isWin,
    clicks,
    playtime,
    startGame,
    endGame,
    buttonClicked,
    backgroundClicked,
    difficulty,
  }
}
