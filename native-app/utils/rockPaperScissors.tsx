const randomNumber = Math.floor(Math.random() * 3) + 1;

export default function rockPaperScissors2(user: string, randomNumber: number) {
    let computer = '';
    let result = '';

    if (randomNumber === 1) {
        computer = 'rock';
    } else if (randomNumber === 2) {
        computer = 'paper';
    } else {
        computer = 'scissors';
    }

    if (user === computer) {
        result = 'Tie';
    } else if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')
    ) {
        result = 'You Win!';
    } else {
        result = 'You Lose';
    }

    return result
}
