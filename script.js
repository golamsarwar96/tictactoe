let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector(".newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


//tracking turn of O player
let turnO = true;
let count = 0;

//all the cases where a player wins
const winPatterns = [ 
    [0,1,2], [0,3,6], [0,4,8],
    [1,4,7], [2,5,8], [2,4,6],
    [3,4,5], [6,7,8]
];
//Reset game button functionality
const resetGame = () =>{
    turnO = true;
    count = 0; //counter variable to count step
    enableBtn(); //all buttons are clickable
    msgContainer.classList.add("hide"); //hiding the winner message
}


/*Box click (X/O) and disabling button
when a box is already clicked.*/
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Button was clicked.");
        if(turnO){
            box.innerText = "0";
            turnO=false;
        }else{
            box.innerText = "X";
            turnO=true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        //Game Draw Condition
        if(count===9 && !isWinner){
            gameDraw();
        }
    })
});

//Game draw function
const gameDraw = () => {
    msg.innerText =  `Game Drawn`;
    msgContainer.classList.remove("hide");
    disableBtn();
}

//Disabling all buttons after a winner is found
const disableBtn = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

//reseting all buttons for a new game.
const enableBtn = () =>{
    for(let box of boxes){
        box.disabled = false; 
        box.innerHTML = " "; //emptying all the boxes.
    }
}

//Printing Winners Name
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtn();
};

const checkWinner = () => {
    /*To find winner we have to check each winning pattern*/
    for(let pattern of winPatterns){
        //We are getting all the positions where the box
        //is clicked.
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner",pos1Val);
                showWinner(pos1Val);
                return true;
            }
        
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);