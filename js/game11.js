var yourChoice,
 yourScore = 0,
 opponentChoice, 
 opponentScore = 0, 
 choices = ['rock', 'paper', 'scissors'];
window.onload = function(){
    for(var i = 0; i < choices.length; i++){
        var choice = document.createElement('img');
        choice.id = choices[i];
        choice.src = '../images/' + choices[i] + '.png';
        // choice.src = choices[i] + '.png';
        choice.addEventListener('click', choiceSelected);
        document.getElementById('choices').append(choice);
    }
}

function choiceSelected(){
    yourChoice = this.id;
    document.getElementById('your_choice').src = '../images/' + yourChoice + '.png';
    // document.getElementById('your_choice').src =  yourChoice + '.png';
    opponentRandomIndex = Math.floor(Math.random() * choices.length);
    opponentChoice = choices[opponentRandomIndex];
    document.getElementById('opponent_choice').src = '../images/' + opponentChoice + '.png';
    // document.getElementById('opponent_choice').src =  opponentChoice + '.png';

    if(yourChoice == opponentChoice){
        yourScore += 1;
        opponentScore += 1;
    }
    else{
        if(yourChoice == 'rock'){
            if(opponentChoice == 'paper'){
                opponentScore += 1;
            }
            else if(opponentChoice == 'scissors'){
                yourScore += 1;
            }
        }
        else if(yourChoice == 'paper'){
            if(opponentChoice == 'scissors'){
                opponentScore += 1;
            }
            else if(opponentChoice == 'rock'){
                yourScore += 1;
            }
        }
        else if(yourChoice == 'scissors'){
            if(opponentChoice == 'rock'){
                opponentScore += 1;
            }
            else if(opponentChoice == 'paper'){
                yourScore += 1;
            }
        }
    }

    document.getElementById('your_score').innerText = yourScore;
    document.getElementById('opponent_score').innerText = opponentScore;
}