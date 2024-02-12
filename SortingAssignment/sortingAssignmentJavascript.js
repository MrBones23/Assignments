// initialize the counter and the array
var numbernames=0;
var names = new Array();
function SortNames() {
    // Get the name from the text field
    thename=document.theform.newname.value;
    thename = thename.toUpperCase();
    // Add the name to the array
    names[numbernames]=thename;
    // Increment the counter
    numbernames++;
    // Sort the array
    names.sort();

    var numberedNameString = "";
    for (let currentName = 0; currentName < names.length; currentName++) {
        numberedNameString = numberedNameString + (currentName + 1) + ". " + names[currentName] + "\n";
        
    }
    document.theform.sorted.value= numberedNameString;
    // var numberedNameString = "";
    // for (var i = 0; i < names.length; i++) {
    //     numberedNameString += (i + 1) + ". " + names[i] + "\n";
    // }
    
    // // Display the numbered list of names in the textarea
    // document.theform.sorted.value = numberedNameString;
}

function getKeyCode(keyCodeFromPress){
    if(keyCodeFromPress === 13){
        SortNames();
    }    
    return false;
}
