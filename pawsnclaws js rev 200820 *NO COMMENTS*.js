var model = {
    boardSize: 3,
}


var boardSize=3; 
document.getElementById ("submitplayernames").onclick=processPlayerNames;
var pawsPlayer; 
var clawsPlayer; 
var cells = document.getElementsByTagName("td");
    for (var i=0; i<cells.length; i++) { 
        cells[i].onmouseover=hoverOn; 
        cells[i].onmouseout=hoverOff;
        cells[i].onclick=processClick;
    } 

var controlCentre= {
    hasGameStarted: 0, 
    whosGoIsIt:0, 
    hasPlayerPickedACell:0, 
    inputHolder:0,  
    pawsPlacements: [], 
    clawsPlacements: [], 
};

function displayMainMessage (msg) {
    document.getElementById("MainMessageText").innerHTML=msg;
};
function displaySubMessage (msg) {
    document.getElementById("SubMessageText").innerHTML=msg;
};

function sendRelevantMessage () {
    var CREATEDBYDGWEBDEVELOPMENTDONTCOPYMYCODE;

    if (controlCentre.pawsPlacements.length==0 && controlCentre.clawsPlacements.length==0) {
        displayMainMessage(controlCentre.whosGoIsIt.toUpperCase() + " GETS TO GO FIRST:");
        document.getElementById("arrowtoboard").style.left="550px";  
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

function processPlayerNames() {
    if (document.getElementById("pawsname").value==""||document.getElementById("clawsname").value==""){ 
        document.getElementById("playernamesformerrormessage").innerHTML="Both players need to enter their names please."; 
        document.getElementById("playernamesformerrormessagestar").innerHTML="*";
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
        pawsPlayer=document.getElementById("pawsname").value;
        clawsPlayer=document.getElementById("clawsname").value;
        document.getElementById("playernamesform").remove();
        document.getElementById("playernamesformerrormessage").remove();
        document.getElementById("playernamesformerrormessagestar").remove();
        document.getElementById("pawsnameerrorstar").remove();
        document.getElementById("clawsnameerrorstar").remove();
        whoGosFirst();
    }
};

function whoGosFirst() {
    if ((Math.floor(Math.random()*2))===0) {
        controlCentre.whosGoIsIt=pawsPlayer;
    } 
    else {
        controlCentre.whosGoIsIt=clawsPlayer;
    }
    controlCentre.hasGameStarted=true; 
    document.getElementById("board").style.cursor="pointer";
    document.getElementById("SubMessageText").setAttribute("style", "text-decoration:none");
    document.getElementById("submitguess").setAttribute("style", "left:790px"); 
    document.getElementById("submitguess").onclick=processGo; 
    document.getElementById("submitguess").onmouseover=function() {
        document.getElementById("alternativesubmitmessage").innerHTML="(or alternatively press the Enter button on your keyboard)";
    };
    document.getElementById("submitguess").onmouseout=function() {
        document.getElementById("alternativesubmitmessage").innerHTML="";
    };
    window.addEventListener("keydown", function(event) { 
        if(event.keyCode===13){
                document.getElementById("submitguess").click();
        }
    });
    sendRelevantMessage();
};   

function hoverOn (eventObj) {
    if(controlCentre.hasPlayerPickedACell!==true && hasSomeoneBeenHere(eventObj)!==true) {
        if (controlCentre.whosGoIsIt==pawsPlayer) {
            eventObj.target.setAttribute("class","pawspic15"); 
            console.log("CREATEDBYDGWEBDEVELOPMENT");
        }
        else if (controlCentre.whosGoIsIt==clawsPlayer) {
            eventObj.target.setAttribute("class","clawspic15");
        }
    }
};

function hoverOff (eventObj) {
    if(controlCentre.hasPlayerPickedACell!==true && hasSomeoneBeenHere(eventObj)!== true ) {
        eventObj.target.setAttribute("class", ""); 
    }
}

function hasSomeoneBeenHere (eventObj) { 
    var overallPlacements= controlCentre.pawsPlacements.concat(controlCentre.clawsPlacements);
    for (var i=0; i<(overallPlacements.length); i++) {
        if (eventObj.target.id==overallPlacements[i]) {
            return true;
        }
    }      
};

function processClick (eventObj) {
    if (controlCentre.hasGameStarted!==true) {
        return;
    }
    else {
        if (hasSomeoneBeenHere(eventObj)== true) { 
            return;
        }
        else {
            controlCentre.inputHolder=eventObj.target.id;
            blankOtherCells(); 
            if (controlCentre.whosGoIsIt==pawsPlayer) {
                eventObj.target.setAttribute("class", "pawspic"); 
                document.getElementById("pawsorclawsminiicon").src="pawsblacksmall.png"; 
            }
            else if (controlCentre.whosGoIsIt==clawsPlayer) {
                eventObj.target.setAttribute("class", "clawspic");
                document.getElementById("pawsorclawsminiicon").src="clawsblacksmall.png";
            }
        }
        controlCentre.hasPlayerPickedACell = true;
    }
};

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

function processGo () {
    if (controlCentre.hasPlayerPickedACell!==true) { 
        alert ("You need to pick a cell!");
        return;
    }
    else {
        var CREATEDBYDGWEBDEVELOPMENTDONTCOPYMYCODE;
        if (controlCentre.whosGoIsIt==pawsPlayer) {
            controlCentre.pawsPlacements.push(controlCentre.inputHolder); 
            if(controlCentre.pawsPlacements.length>=boardSize) { 
                haveTheyWon(); 
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

function haveTheyWon () {
    var theirPlacements; 
    if (controlCentre.whosGoIsIt==pawsPlayer) {theirPlacements=controlCentre.pawsPlacements};
    if (controlCentre.whosGoIsIt==clawsPlayer) {theirPlacements=controlCentre.clawsPlacements};
                   
    for (var i=0; i<theirPlacements.length; i++) { 
        var confirmedHorizontalLinks=0; 
        for (var x=0; x<theirPlacements.length; x++) {
            if (theirPlacements[i].charAt(0)==theirPlacements[x].charAt(0)) {
                    confirmedHorizontalLinks++;                     
            }                   
        }
        if (confirmedHorizontalLinks==boardSize) {
            declareWinner();
            return;
        }
        confirmedHorizontalLinks=0; 
    };

    for (var i=0; i<theirPlacements.length; i++) {
        var confirmedVerticalLinks=0; 
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

    var boardSizeMinus1String=(boardSize-1).toString(); 
    if (theirPlacements.includes("00")){ 
        var confirmedDiagonalLinks=0;
        for (var i=0; i<boardSize; i++) {
            if (theirPlacements.includes(i.toString()+i.toString())) { 
                confirmedDiagonalLinks ++;
            }
        }
        if (confirmedDiagonalLinks==boardSize) {
            declareWinner();
            return;
        }
        confirmedDiagonalLinks=0;
    };
    if (theirPlacements.includes("0" + boardSizeMinus1String)) { 
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

    if (controlCentre.pawsPlacements.concat(controlCentre.clawsPlacements).length==(boardSize*model.boardSize)) {
        alert("Nobody has won this time. Please click the OK button below to restart the game:");
        location.reload();
    };
};

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





