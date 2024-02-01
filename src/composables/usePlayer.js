import { reactive } from 'vue'

export function usePlayer() {
  const getDefaultPlayer = () => {
    return {
      name: 'Guest',
      health: 100,
      attackDamage: 10,
      coins: 0,
    }
  }

  const player = reactive(getDefaultPlayer())

  const setPlayerName = name => {
    player.name = name
  }

  const setPlayerHealth = health => {
    player.health = health
  }

  const addPlayerHealth = health => {
    player.health += health
  }

  const takePlayerHealth = health => {
    player.health -= health
  }

  const setAttackDamage = damage => {
    player.attackDamage = damage
  }

  const addAttackDamage = damage => {
    player.attackDamage += damage
  }

  const takeAttackDamage = damage => {
    player.attackDamage -= damage
  }

  const setCoins = coins => {
    player.coins = coins
  }

  const addCoins = coins => {
    player.coins += coins
  }

  const takeCoins = coins => {
    player.coins -= coins
  }

  const isEnoughCoins = coins => {
    return player.coins >= coins
  }

  const isPlayerDead = () => player.health <= 0

  const resetPlayer = () => {
    Object.assign(player, getDefaultPlayer())
  }

  const damagePlayer = damage => {
    player.health -= damage

    return isPlayerDead()
  }

  return {
    player,
    setPlayerName,
    setPlayerHealth,
    addPlayerHealth,
    takePlayerHealth,
    setAttackDamage,
    addAttackDamage,
    takeAttackDamage,
    setCoins,
    addCoins,
    takeCoins,
    isEnoughCoins,
    isPlayerDead,
    resetPlayer,
    damagePlayer,
  }
}
