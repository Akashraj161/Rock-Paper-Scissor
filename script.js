// Game

let playerScore = 0;
let computerScore = 0;
let roundWinner = '';

function computerPlay()
{
    const arrayObject = ["rock","paper","scissors"];
    let randomObject = arrayObject[Math.floor(Math.random() * arrayObject.length)];
    return randomObject;
}

function playRound(playerSelection, computerSelection) {
    
    if(playerSelection === computerSelection )
    {
        roundWinner = 'tie';
    }
    if((playerSelection === 'rock' && computerSelection === 'scissors')||
       (playerSelection === 'paper' && computerSelection === 'rock') ||
       (playerSelection === 'scissors' && computerSelection === 'paper'))
        {
            playerScore++;
            roundWinner = 'player';
        }

    if((playerSelection === 'rock' && computerSelection === 'paper')||
        (playerSelection === 'paper' && computerSelection === 'scissors')||
        (playerSelection === 'scissors' && computerSelection === 'rock'))
        {
            computerScore++;
            roundWinner = 'computer';
        }
    
  }

  function gameOver(){
      return playerScore === 5 || computerScore === 5 ;
  }


  //UI 
  
  const scoreInfo = document.getElementById('scoreInfo');
  const playerSign = document.getElementById('playerSign');
  const playerScorePara = document.getElementById('playerScore');
  const computerSign = document.getElementById('computerSign');
  const computerScorePara = document.getElementById('computerScore');
  const rockbtn = document.getElementById('rockbtn');
  const paperbtn = document.getElementById('paperbtn');
  const scissorsbtn = document.getElementById('scissorsbtn');
  const endgameModal = document.getElementById('endgameModal');
  const endgameMsg = document.getElementById('endgameMsg');
  const overlay = document.getElementById('overlay');
  const restartBtn = document.getElementById('restartBtn');


  rockbtn.addEventListener('click', () => handleClick('rock'));
  paperbtn.addEventListener('click', () => handleClick('paper'));
  scissorsbtn.addEventListener('click', () => handleClick('scissors'));
  restartBtn.addEventListener('click', restartGame);
  overlay.addEventListener('click', closeEndgameModal)


  function handleClick(playerSelection)
  {
      if(gameOver()){
          openEndgameModal()
          return
      }

      const computerSelection = computerPlay();
      playRound(playerSelection, computerSelection);
      updateChoices(playerSelection, computerSelection);
      updateScore();

      if(gameOver()){
          openEndgameModal();
          setFinalMessage();
      }
  }


  function updateChoices(playerSelection , computerSelection)
  {
      const playerSignClassName =`fa-hand-${playerSelection.toLowerCase()}`;
      const computerSignClassName =`fa-hand-${computerSelection.toLowerCase()}`;

      playerSign.classList =`fas ${playerSignClassName} active` ;
      computerSign.classList =`fas ${computerSignClassName} active`;
  }

  function updateScore()
  {
      if(roundWinner==='tie')
      scoreInfo.textContent = "It's a Tie!"
      
      else if(roundWinner === 'player')
      scoreInfo.textContent = "You Won!"

      else if(roundWinner === 'computer')
      scoreInfo.textContent = "You Lost."

      playerScorePara.textContent =`Player Score: ${playerScore}`;
      computerScorePara.textContent = `Computer Score: ${computerScore}`; 
     
  }

  function openEndgameModal()
  {
    endgameModal.classList.add('active')
    overlay.classList.add('active')

  }
  

  function closeEndgameModal()
  {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
  }

  function setFinalMessage()
  {
      if(computerScore<playerScore)
      {
          endgameMsg.textContent = 'YOU WON! :)'
      }

      else
          endgameMsg.textContent = 'YOU LOST :('
  }


  function restartGame()
  {
      playerScore = 0;
      computerScore = 0;
      scoreInfo.textContent = '';
      playerScorePara.textContent = 'Player Score: 0';
      computerScorePara.textContent = 'Computer Score: 0';
      endgameMsg.textContent = '';
      playerSign.classList.remove('active')
      computerSign.classList.remove('active')
      endgameModal.classList.remove('active')
      overlay.classList.remove('active')
  }