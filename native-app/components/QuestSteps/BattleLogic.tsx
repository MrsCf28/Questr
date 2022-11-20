import { useContext } from "react"
import { CurrentUser } from "../../context/CurrentUser"

const Bandit = require('../../assets/images/enemybandit.png')
const Bruiser = require('../../assets/images/enemybruiser.png')
const EvilKnight = require('../../assets/images/enemyknight.png')
const EvilMage = require('../../assets/images/enemymage.png')

//0 = magic 1 = quick 2 = defence
export const magicAttackLogic = (me, enemy) => {
    let randomMove = Math.floor(Math.random() * 3)
    if(randomMove === 0) {
        return {
            myMove: 'Magic Attack',
            enemyAttack: 'Magic Attack',
            myDamageAmount: 25,
            myDamage: true,
            enemyDamageAmount : 25,
            enemyDamage: true,
            statement: 'The Combined Magic Explodes Causing Damage To You Both'
        }
    } else if(randomMove === 1) {
        return {
            myMove: 'Magic Attack',
            enemyAttack: 'Quick Attack',
            myDamageAmount: enemy.strength + enemy.dexterity,
            myDamage: true,
            enemyDamageAmount : 0,
            enemyDamage: false,
            statement: 'The Enemy Darts In Striking You Before You Can Cast'
        }
    } else if (randomMove === 2) {
        return {
            myMove: 'Magic Attack',
            enemyAttack: 'Defence',
            myDamageAmount: 0,
            myDamage: false,
            enemyDamageAmount : me.wisdom + me.exploration,
            enemyDamage: true,
            statement: 'Your Magic Breaks The Enemies Defence'
        }
    }
}

export const quickAttackLogic = (me, enemy) => {
    let randomMove = Math.floor(Math.random() * 3)
    if(randomMove === 0) {
        return {
            myMove: 'Quick Attack',
            enemyAttack: 'Magic Attack',
            myDamageAmount: 0,
            myDamage: false,
            enemyDamageAmount : me.strength + me.dexterity,
            enemyDamage: true,
            statement: 'You Dart In Striking The Enemy Before They Can Cast'
        }
    } else if(randomMove === 1) {
        return {
            myMove: 'Qucik Attack',
            enemyAttack: 'Quick Attack',
            myDamageAmount: 5,
            myDamage: true,
            enemyDamageAmount : 5,
            enemyDamage: true,
            statement: 'Your Swords Clash Causing Little Damage To Either Of You'
        }
    } else if (randomMove === 2) {
        return {
            myMove: 'Quick Attack',
            enemyAttack: 'Defence',
            myDamageAmount: enemy.stamina + enemy.perception,
            myDamage: false,
            enemyDamageAmount : 0,
            enemyDamage: true,
            statement: 'The Enemy Smashed Your Attack Aside With Their Defence'
        }
    }
}

export const defenceLogic = (me, enemy) => {
    let randomMove = Math.floor(Math.random() * 3)
    if(randomMove === 0) {
        return {
            myMove: 'Defence',
            enemyAttack: 'Magic Attack',
            myDamageAmount: enemy.wisdom + enemy.exploration,
            myDamage: true,
            enemyDamageAmount : 0,
            enemyDamage: false,
            statement: 'The Enemies Magic Breaks Your Defence'
        }
    } else if(randomMove === 1) {
        return {
            myMove: 'Defence',
            enemyAttack: 'Quick Attack',
            myDamageAmount: 0,
            myDamage: false,
            enemyDamageAmount : me.stamina + me.perception,
            enemyDamage: true,
            statement: 'You Smash The Enemies Attack Aside Knocking Them To The Ground'
        }
    } else if (randomMove === 2) {
        return {
            myMove: 'Defence',
            enemyAttack: 'Defence',
            myDamageAmount: 0,
            myDamage: false,
            enemyDamageAmount : 0,
            enemyDamage: false,
            statement: 'You Both Stare At Each Other Waiting For The Other To Attack'
        }
    }
}

export const generateEnemy = () => {
    const {currentUser} = useContext(CurrentUser)

    const { dexterity, exploration, perception, stamina, strength, wisdom, xp } =
    currentUser.stats;

    const randomNumber = Math.floor(Math.random() * 4)

    if(randomNumber === 0) {
        return {
            name: 'Evil Mage',
            image: EvilMage,
            dexterity: Math.round((dexterity + 0) * 1),
            perception: Math.round((perception + 1) * 1),
            wisdom: Math.round((wisdom + 4) * 1.2),
            exploration: Math.round((exploration + 2) * 1.1),
            strength: Math.round((strength + 1) * 0.7),
            stamina: Math.round((stamina + 1) * 0.8),
            health: Math.round((xp + 100) / 2)
        }
    } else if (randomNumber === 1) {
        return {
            name: 'Evil Knight',
            image: EvilKnight,
            dexterity: Math.round((dexterity + 2) * 1.1),
            perception: Math.round((perception + 1) * 0.9),
            wisdom: Math.round((wisdom + 1) * 1.1),
            exploration: Math.round((exploration + 1) * 0.9),
            strength: Math.round((strength + 1) * 1),
            stamina: Math.round((stamina + 1) * 1),
            health: Math.round((xp + 100) / 2)
        }
    } else if (randomNumber === 2) {
        return {
            name: 'Evil Bruiser',
            image: Bruiser,
            dexterity: Math.round((dexterity + 1) * 1),
            perception: Math.round((perception + 1) * 1.2),
            wisdom: Math.round((wisdom + 1) * 0.7),
            exploration: Math.round((exploration + 2) * 0.7),
            strength: Math.round((strength + 1) * 1),
            stamina: Math.round((stamina + 3) * 1.2),
            health: Math.round((xp + 100) / 2)
        }
    } else if (randomNumber === 3) {
        return {
            name: 'Evil Bandit',
            image: Bandit,
            dexterity: Math.round((dexterity + 2) * 1.1),
            perception: Math.round((perception + 1) * 0.9),
            wisdom: Math.round((wisdom + 1) * 0.9),
            exploration: Math.round((exploration + 1) * 1.1),
            strength: Math.round((strength + 1) * 1.2),
            stamina: Math.round((stamina + 2) * 0.8),
            health: Math.round((xp + 100) / 2)
        }
    }
}