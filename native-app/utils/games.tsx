function rockPaperScissors(user : string) {
  let computer = "";
  const num = Math.random();
  let result = "";

  if (num <= 1 / 3) {
    computer = "rock";
  } else if (num >= 1 / 3 && num <= 2 / 3) {
    computer = "paper";
  } else {
    computer = "scissors";
  }

  if (user === "rock") {
    if (computer === "rock") {
      result = "Tie";
    } else if (computer === "paper") {
      result = "You Loose";
    } else {
      result = "You Win";
    }
  }
  if (user === "paper") {
    if (computer === "rock") {
      result = "You Win";
    } else if (computer === "paper") {
      result = "Tie";
    } else {
      result = "You Loose";
    }
  }
  if (user === "scissors") {
    if (computer === "rock") {
      result = "You Loose";
    } else if (computer === "paper") {
      result = "You Win";
    } else {
      result = "Tie";
    }
  }
  return result;
}


