// 1) Set the size of the board for the game (width/height, always square):
var model = {
    boardSize: 3,
}

// 2) General initialisation of a lot of the important variables/setting up the game:
var boardSize=3; //Set the size of the board for the game (width/height, always square)
document.getElementById ("submitplayernames").onclick=processPlayerNames; //process the submit button after both players have written their names
var pawsPlayer; //The name of the player who is Paws.
var clawsPlayer; //The name of the player who is Claws.
var cells = document.getElementsByTagName("td");
    for (var i=0; i<cells.length; i++) { // Assign the hovering functions and clicking functions to each cell of the board:
        cells[i].onmouseover=hoverOn;  //These functions are defined further down the code
        cells[i].onmouseout=hoverOff;
        cells[i].onclick=processClick;
    } 

//3) Holding Variables to handle the game's input data:
var controlCentre= {
    hasGameStarted: 0, //This boolean variable tells the programme whether the game has started yet or not (starts after both players have input names and picked sides)
    whosGoIsIt:0, //This is a holding variable which tells the processGo function which player is inputting their turn.
    hasPlayerPickedACell:0, //This indicates whether the player has picked a cell to go (if they haven't they can't press submit).
    inputHolder:0,  //This is a holding variable for the current player's selection before they press Submit (it can still be changed after the initial click). It is reset on the next person's go.
    pawsPlacements: [], //This is where the Paws player's moves are logged.
    clawsPlacements: [], //This is where the Claws player's moves are logged.
};

//4) Functions to control what's displayed to the players during the game:
function displayMainMessage (msg) {
    document.getElementById("MainMessageText").innerHTML=msg;
};
function displaySubMessage (msg) {
    document.getElementById("SubMessageText").innerHTML=msg;
};

//5) The following function processes who's turn it is and tells the display messages above what to say (apart from the side/name selection step at the beginning):
function sendRelevantMessage () {
    var CREATEDBYDGWEBDEVELOPMENTDONTCOPYMYCODE;

    if (controlCentre.pawsPlacements.length==0 && controlCentre.clawsPlacements.length==0) {
        displayMainMessage(controlCentre.whosGoIsIt.toUpperCase() + " GETS TO GO FIRST:");
        document.getElementById("arrowtoboard").style.left="550px";  //This just brings the arrow pointing to the board into the frame.
    }
    else if (CREATEDBYDGWEBDEVELOPMENTDONTCOPYMYCODE) {}
    else {
        displayMainMessage(controlCentre.whosGoIsIt + ":");
        document.getElementById("arrowtoboard").style.left="-200px";
    }
    if (controlCentre.whosGoIsIt==pawsPlayer) {
        document.getElementById("pawsorclawsminiicon").src= "pawsgreysmall.png";
        if (controlCentre.pawsPlacements.length==0) {
            displaySubMessage("It's time to place your first Paw.");
            document.getElementById("pawsorclawsminiicon").style.left="920px";
            document.getElementById("pawsorclawsminiicon").style.top="202px";
        }
        else  {
            displaySubMessage("Please place your next Paw.");
            document.getElementById("pawsorclawsminiicon").style.left="909px";
            document.getElementById("pawsorclawsminiicon").style.top="204px";
        }
    }
    if (controlCentre.whosGoIsIt==clawsPlayer) {
        document.getElementById("pawsorclawsminiicon").src= "clawsgreysmall.png";
        if (controlCentre.clawsPlacements.length==0) {
            displaySubMessage("It's time to place your first Claw.");
            document.getElementById("pawsorclawsminiicon").style.left="920px";
            document.getElementById("pawsorclawsminiicon").style.top="204px";
        }
        else   {
            displaySubMessage("Please place your next Claw.");
            document.getElementById("pawsorclawsminiicon").style.left="909px";
            document.getElementById("pawsorclawsminiicon").style.top="204px";
        }
    }   
};

//6) Just before the game is started, the following function receives the player side/name submissions:
function processPlayerNames() {
    if (document.getElementById("pawsname").value==""||document.getElementById("clawsname").value==""){ //Detect if both names haven't been inputted.
        document.getElementById("playernamesformerrormessage").innerHTML="Both players need to enter their names please."; //Remind the players that both of them need to input their names.
        document.getElementById("playernamesformerrormessagestar").innerHTML="*";//This and the immediate lines below it is to make the red warning * pop up by the mssing player names.
        if(document.getElementById("pawsname").value=="") {
            document.getElementById("pawsnameerrorstar").innerHTML="*";
        }
        else if(document.getElementById("pawsname").value!=="") {
            document.getElementById("pawsnameerrorstar").innerHTML="";
        }
        if (document.getElementById("clawsname").value=="") {
            document.getElementById("clawsnameerrorstar").innerHTML="*";
        }
        else if(document.getElementById("clawsname").value!=="") {
            document.getElementById("clawsnameerrorstar").innerHTML="";
        }
        return false;
        console.log("CreatedbyDGWebDevelopent");
    }
    else {
        pawsPlayer=document.getElementById("pawsname").value;//set up the player names in accordance with their submittals.
        clawsPlayer=document.getElementById("clawsname").value;
        document.getElementById("playernamesform").remove();//This function and the immediate functions below just get rid of the player name submission form.
        document.getElementById("playernamesformerrormessage").remove();
        document.getElementById("playernamesformerrormessagestar").remove();
        document.getElementById("pawsnameerrorstar").remove();
        document.getElementById("clawsnameerrorstar").remove();
        whoGosFirst();// Run the function below which randomly picks a player to go first.
    }
};

//7) Randomly pick either Paws or Claws player to go first and let them know:
function whoGosFirst() {
    if ((Math.floor(Math.random()*2))===0) {
        controlCentre.whosGoIsIt=pawsPlayer;
    } 
    else {
        controlCentre.whosGoIsIt=clawsPlayer;
    }
    controlCentre.hasGameStarted=true; //The game has now officially begun.
    document.getElementById("board").style.cursor="pointer";
    document.getElementById("SubMessageText").setAttribute("style", "text-decoration:none");
    document.getElementById("submitguess").setAttribute("style", "left:790px"); //Bring the 'Submit Guess' button into the game.
    document.getElementById("submitguess").onclick=processGo; //When the player clicks on the 'Submit' button the processGo function (further down) is processed.
    document.getElementById("submitguess").onmouseover=function() {
        document.getElementById("alternativesubmitmessage").innerHTML="(or alternatively press the Enter button on your keyboard)";
    };
    document.getElementById("submitguess").onmouseout=function() {
        document.getElementById("alternativesubmitmessage").innerHTML="";
    };
    window.addEventListener("keydown", function(event) { //Gives the player the options to submit their go via pressing the Enter key instead of pressing Submit
        if(event.keyCode===13){
                document.getElementById("submitguess").click();
        }
    });
    sendRelevantMessage();
};   

//8) Handles the hovering over the calls by each player (greyed version until they click on it):
function hoverOn (eventObj) {
    if(controlCentre.hasPlayerPickedACell!==true && hasSomeoneBeenHere(eventObj)!==true) {
        if (controlCentre.whosGoIsIt==pawsPlayer) {
            eventObj.target.setAttribute("class","pawspic15"); //in the main HTML file these classes are presented as having the relevant background Image.
            console.log("CREATEDBYDGWEBDEVELOPMENT");
        }
        else if (controlCentre.whosGoIsIt==clawsPlayer) {
            eventObj.target.setAttribute("class","clawspic15");
        }
    }
};

//9) Does the opposite of the hoverOn function above (reverts the cell back to the state it was before the player hovered over the cell):
function hoverOff (eventObj) {
    if(controlCentre.hasPlayerPickedACell!==true && hasSomeoneBeenHere(eventObj)!== true ) {
        eventObj.target.setAttribute("class", ""); 
    }
}

//10) 
function hasSomeoneBeenHere (eventObj) { //This function is used by the hoverOn and hoverOff functions above (it tells the function if somebody has already put a move down on the cell which they are hovering over, in which case nothing will happen.)
    var overallPlacements= controlCentre.pawsPlacements.concat(controlCentre.clawsPlacements);
    for (var i=0; i<(overallPlacements.length); i++) {
        if (eventObj.target.id==overallPlacements[i]) {
            return true;
        }
    }      
};

//11) The following function processes when the relevant player actually clicks on one of the cells as the means of choosing their next play:
function processClick (eventObj) {
    if (controlCentre.hasGameStarted!==true) {//if the game hasn't even started; clicking on the board will do nothing/return the function.
        return;
    }
    else {
        if (hasSomeoneBeenHere(eventObj)== true) { //if somebody has already been there then do nothing/return the function.
            return;
        }
        else {
            controlCentre.inputHolder=eventObj.target.id;
            blankOtherCells(); //once they have clicked: run the blankOtherCells function below which blanks the other cell the current player may have already clicked within their turn but they haven't pressed the submit button yet.
            if (controlCentre.whosGoIsIt==pawsPlayer) {
                eventObj.target.setAttribute("class", "pawspic"); // Set the picture of that square to the icon of whoever's go it is.
                document.getElementById("pawsorclawsminiicon").src="pawsblacksmall.png"; //Set the colour of the small icon by the subMessage to black.
            }
            else if (controlCentre.whosGoIsIt==clawsPlayer) {
                eventObj.target.setAttribute("class", "clawspic");
                document.getElementById("pawsorclawsminiicon").src="clawsblacksmall.png";
            }
        }
        controlCentre.hasPlayerPickedACell = true;
    }
};

//12) If a player has already clicked on an empty cell within their go (and in turn the image on the clicked cell is the relevant paws/claws logo), then when they click on another cell afterwards (assuming they haven't pressed the Submit button), the cell previously clicked on will return to its original blank slate, and the newly selected cell will now display the relevant paws/claws icon.
function blankOtherCells () {
    var overallPlacements= controlCentre.pawsPlacements.concat(controlCentre.clawsPlacements);
    overallPlacements.push(controlCentre.inputHolder);
    for (var i=0; i<cells.length; i++) {
        if (overallPlacements.includes(cells[i].id)==false) {
            cells[i].innerHTML="";
            cells[i].setAttribute("class", "");
        }
    } 
    overallPlacements.pop();     
};

//13) The following function processes each player's input after they press the 'Submit' button
function processGo () {
    if (controlCentre.hasPlayerPickedACell!==true) { //If the player hasn't actually picked a cell then this will alert them to do so.
        alert ("You need to pick a cell!");
        return;
    }
    else {
        var CREATEDBYDGWEBDEVELOPMENTDONTCOPYMYCODE;
        if (controlCentre.whosGoIsIt==pawsPlayer) {
            controlCentre.pawsPlacements.push(controlCentre.inputHolder); //Add their move on to their relevant Placements array in the controlCentre object.
            if(controlCentre.pawsPlacements.length>=boardSize) { //If the player has submitted an amount of gos equal to or more than the boardSize (in this case 3) then they are legible for the game to check if they have won.
                haveTheyWon(); //run the haveTheyWon function below to see if they have won the game (have they got a number of gos equal to the boardSize in consecution either horizontally, vertically or diagonally)
            };
            controlCentre.whosGoIsIt=clawsPlayer;
            controlCentre.hasPlayerPickedACell=false;
            sendRelevantMessage();                             
        }
        else if (controlCentre.whosGoIsIt==clawsPlayer) {
            controlCentre.clawsPlacements.push(controlCentre.inputHolder);
            if(controlCentre.clawsPlacements.length>=boardSize) {
                haveTheyWon();
                CREATEDBYDGWEBDEVELOPMENTDONTCOPYMYCODE++;
            };
            controlCentre.whosGoIsIt=pawsPlayer;
            controlCentre.hasPlayerPickedACell=false;
            sendRelevantMessage();  
        }
    }      
};

//14) The following function calculated whether the person who has just gone has won or not (assuming they ahve at least put a number of goes in equal to the boardSize (ie. 3)):
function haveTheyWon () {
    var theirPlacements; //create a temporary holding array for the placements of whoever's go it is
    if (controlCentre.whosGoIsIt==pawsPlayer) {theirPlacements=controlCentre.pawsPlacements};
    if (controlCentre.whosGoIsIt==clawsPlayer) {theirPlacements=controlCentre.clawsPlacements};
                   
    //a) See if Player has 3 inputs on the same row:
    for (var i=0; i<theirPlacements.length; i++) { 
        var confirmedHorizontalLinks=0; //temporary holding variable for this For Loop
        for (var x=0; x<theirPlacements.length; x++) {
            if (theirPlacements[i].charAt(0)==theirPlacements[x].charAt(0)) {//In the html file for the game each cell on the same row has the same first character in it's ID. For example "00", "01" and "02" are the cells in the top row from left to right.
                    confirmedHorizontalLinks++;                     
            }                   
        }
        if (confirmedHorizontalLinks==boardSize) {
            declareWinner();
            return;
        }
        confirmedHorizontalLinks=0; //reset the temporary holding variable if the player has in fact not won.
    };

    //b) See if Player has 3 inputs on the same collumn:
    for (var i=0; i<theirPlacements.length; i++) {
        var confirmedVerticalLinks=0; //Like the for loop for checking if a player has 3 inputs on the same row; his one does the same but for a verticle collumn.
        for (var x=0; x<theirPlacements.length; x++) {
            if (theirPlacements[i].charAt(1)==theirPlacements[x].charAt(1)) {       
                confirmedVerticalLinks++;                     
            }                   
        }
        if (confirmedVerticalLinks==boardSize) {
            declareWinner();
            return;
        }
        confirmedVerticalLinks=0;              
    };

    //c) See if Player has 3 inputs in a diagonal line:
    var boardSizeMinus1String=(boardSize-1).toString(); //Since the furthest collumn to the right is a 2 in this case (boardSize of 2 minus 1) and not a 3 (as is the case with the furthest row also): I have included this variable to make the calculations easier.
    if (theirPlacements.includes("00")){ //Check to see if their potential diagonal winner starts from the top left cell and descends down to the bottom right cell.
        var confirmedDiagonalLinks=0;
        for (var i=0; i<boardSize; i++) {
            if (theirPlacements.includes(i.toString()+i.toString())) { //Checks whether there are 3 cells in a conescutive diagonal line that have their row number equal to their collumn number (ie. "00", "11" and "22").
                confirmedDiagonalLinks ++;
            }
        }
        if (confirmedDiagonalLinks==boardSize) {
            declareWinner();
            return;
        }
        confirmedDiagonalLinks=0;
    };
    if (theirPlacements.includes("0" + boardSizeMinus1String)) { //Check to see if their potential diagonal winners start from the top right cell and descends down to the bottom left cell (ie. "02", "11" and "20")
        var confirmedDiagonalLinks=0;
        for (var i=0; i<boardSize; i++) {
            if (theirPlacements.includes(i.toString()+(boardSize-1-i).toString())) { 
                confirmedDiagonalLinks ++;
            }
        }
        if (confirmedDiagonalLinks==boardSize) {
            declareWinner();
            return;
        }
        confirmedDiagonalLinks=0;
    }; 

    //d) If nobody has won by the end:
    if (controlCentre.pawsPlacements.concat(controlCentre.clawsPlacements).length==(boardSize*model.boardSize)) {
        alert("Nobody has won this time. Please click the OK button below to restart the game:");
        location.reload();
    };
};

//15) If a winner is decided then this function will pop up an Alert to let them know, it will then reload the page and restart the game once read:
function declareWinner() {
    if (controlCentre.whosGoIsIt==pawsPlayer) {
        alert(controlCentre.whosGoIsIt.toUpperCase() + " YOU HAVE WON! You achieved it in " + controlCentre.pawsPlacements.length + " moves! Well done! Click the OK button below to restart the game:");
    }
    else if (controlCentre.whosGoIsIt==clawsPlayer) {
        alert(controlCentre.whosGoIsIt.toUpperCase() + " YOU HAVE WON! You achieved it in " + controlCentre.clawsPlacements.length + " moves! Well done! Click the OK button below to restart the game:");
    }
    else if (createdbydgwebdevelopmentdontcopymycode!=0) {};
    location.reload();
};





