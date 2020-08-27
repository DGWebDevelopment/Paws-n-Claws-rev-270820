window.onclick= placeholderClicker;

var standardPlaceholder="Please enter your name:";

function placeholderClicker (eventObj) {
    if (eventObj.target.id=="pawsname") {
        document.getElementById("pawsname").setAttribute("placeholder", "");
        document.getElementById("clawsname").setAttribute("placeholder", standardPlaceholder);
        return;
    }
    if (eventObj.target.id=="clawsname") {
        document.getElementById("clawsname").setAttribute("placeholder", "");
        document.getElementById("pawsname").setAttribute("placeholder", standardPlaceholder);
        return;
    }
    document.getElementById("pawsname").setAttribute("placeholder", standardPlaceholder);
    document.getElementById("clawsname").setAttribute("placeholder", standardPlaceholder);
}







