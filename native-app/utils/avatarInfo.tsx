export type AvatarArray = Array<{
    id: number;
    avatarName: string;
    image: string;
    cost: number;
}>

const Knight = require('../assets/images/knight.png');
const DeathKnight = require('../assets/images/deathknight.png');
const Jester = require('../assets/images/Jester.png');
const Bard = require('../assets/images/Bard.png');
const Blacksmith = require('../assets/images/blacksmith.png');
const King = require('../assets/images/king.png');
const Mage = require('../assets/images/mage.png');
const ManAtArms = require('../assets/images/manAtArms.png');
const Princess = require('../assets/images/Princess.png');
const Elf = require('../assets/images/elfknight.png');

export const avatarInfo: AvatarArray = [
    {
        id: 0,
        avatarName: 'bard',
        image: Bard,
        cost: 200,
    },
    {
        id: 1,
        avatarName: 'jester',
        image: Jester,
        cost: 200,
    },
    {
        id: 2,
        avatarName: 'blacksmith',
        image: Blacksmith,
        cost: 300,
    },
    {
        id: 3,
        avatarName: 'knight',
        image: Knight,
        cost: 400,
    },
    {
        id: 4,
        avatarName: 'manAtArms',
        image: ManAtArms,
        cost: 500,
    },
    {
        id: 5,
        avatarName: 'mage',
        image: Mage,
        cost: 600,
    },
    {
        id: 6,
        avatarName: 'elfknight',
        image: Elf,
        cost: 700,
    },
    {
        id: 7,
        avatarName: 'princess',
        image: Princess,
        cost: 800,
    },
    {
        id: 8,
        avatarName: 'king',
        image: King,
        cost: 900,
    },
    {
        id: 9,
        avatarName: 'deathknight',
        image: DeathKnight,
        cost: 1000,
    },
];