import rockPaperScissors2 from '../rockPaperScissors';

describe('rockPaperScissors tests', () => {
    test('returns a string', () => {
        const user = "rock";
        const result = rockPaperScissors2(user, 1);
        expect(typeof result).toBe('string');
    })
    test('does not mutate original input', () => {
        const user = "scissors";
        rockPaperScissors2(user, 1);
        expect(user).toBe("scissors");
    })
    test('returns tie for same choice', () => {
        let user = "rock";
        let randomNumber = 1;
        let result = rockPaperScissors2(user, randomNumber);
        expect(result).toBe("Tie")
        user = "paper";
        randomNumber = 2;
        result = rockPaperScissors2(user, randomNumber);
        expect(result).toBe("Tie")
        user = "scissors";
        randomNumber = 3;
        result = rockPaperScissors2(user, randomNumber);
        expect(result).toBe("Tie")
    })
    test('returns win for correct combo', () => {
        let user = "rock";
        let randomNumber = 3;
        let result = rockPaperScissors2(user, randomNumber);
        expect(result).toBe("You Win!")
        user = "scissors";
        randomNumber = 2;
        result = rockPaperScissors2(user, randomNumber);
        expect(result).toBe("You Win!")
        user = "paper";
        randomNumber = 1;
        result = rockPaperScissors2(user, randomNumber);
        expect(result).toBe("You Win!")
    })
    test('returns loss for correct combo', () => {
        let user = "rock";
        let randomNumber = 2;
        let result = rockPaperScissors2(user, randomNumber);
        expect(result).toBe("You Lose")
        user = "scissors";
        randomNumber = 1;
        result = rockPaperScissors2(user, randomNumber);
        expect(result).toBe("You Lose")
        user = "paper";
        randomNumber = 3;
        result = rockPaperScissors2(user, randomNumber);
        expect(result).toBe("You Lose")
    })
})

