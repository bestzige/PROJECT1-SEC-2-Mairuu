import monsters from '@/data/monsters.json'
import { reactive } from 'vue'

export function useMonster() {
  const getMonsterById = id => monsters.find(m => m.id === id)

  const getDefaultMonster = () => {
    const defaultMonster = monsters[1]
    return { ...defaultMonster, health: defaultMonster.maxHealth, model: 'idle' }
  }

  const monster = reactive(getDefaultMonster())

  const resetMonster = () => {
    Object.assign(monster, getDefaultMonster())
  }

  const isMonsterDead = () => monster.health <= 0

  const damageMonster = damage => {
    monster.health -= damage
    return isMonsterDead()
  }

  const nextMonster = () => {
    const monsterIndex = monsters.findIndex(m => m.id === monster.id)
    const nextMonster = monsters[monsterIndex + 1]
    if (nextMonster) {
      Object.assign(monster, { ...nextMonster, health: nextMonster.maxHealth })
    }
    return monsterIndex === monsters.length - 1 // Return true if this is the last monster
  }

  const setModel = model => {
    monster.model = model
  }

  return {
    monster,
    getMonsterById,
    resetMonster,
    isMonsterDead,
    damageMonster,
    nextMonster,
    setModel,
  }
}
