
var startbtn = document.getElementById("makeBtn");
startbtn.addEventListener("click", generateBtn);
var numBtn = 0;
var buttonClickTotal = 0;

function generateBtn(){
    var color = document.getElementById("colors").value;
    var btn = document.createElement("button");

    // alert("creating a button");

    btn.innerHTML = Math.floor(Math.random() * 99) + 1;
    btn.style.position = "absolute";
    var x_pos = Math.floor(Math.random() * 899) + 100;
    var y_pos = Math.floor(Math.random() * 800) + 125;
    btn.style.left = x_pos + 'px';
    btn.style.top = y_pos + 'px';

    btn.style.backgroundColor = color;
    if (color === "white") {
        btn.style.color = "black";    
    }
    else{
        btn.style.color = "white";
    }
    
    btn.className = "btn btn-secondary";
    btn.id = numBtn++
    // alert("button created");

    document.body.appendChild(btn);
    btn.onclick = function(){
        var color = document.getElementById("colors").value;
        console.log(this.id);
        //this.innerHTML = Math.floor(Math.random() * 888) + 100;
        if (color === "white") {
            btn.style.color = "black";    
        }
        else{
            btn.style.color = "white";
        }
        this.style.backgroundColor = color;
        buttonClickTotal +=  parseInt(this.innerHTML);
        document.getElementById('buttonClickTotal').textContent = 'Running Count: ' + buttonClickTotal;
    }
    

}