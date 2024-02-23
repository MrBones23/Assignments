

var primeArray = new Array();;
var nonPrimeArray = new Array();

function createPrimeAndNonPrimeLst(){
    let upToVal = document.getElementById('upToNumber').value;
    let numOfUpToVal = parseInt(upToVal);
    var primeListCounter = 0;
    var nonPrimeListCounter = 0;
    
    
    for (let i = 1; i <= numOfUpToVal; i++) {
        if (isPrime(i)) {
            
            primeArray[primeListCounter] = i;
            primeListCounter++;
        } 
        else {
            
            nonPrimeArray[nonPrimeListCounter] = i;
            
            nonPrimeListCounter++;
        }
       
    }
    
    
    let list = document.getElementById('primeListCont');
    for (i = 0; i < primeArray.length; ++i) {
        let li = document.createElement('li');
        li.innerText = primeArray[i];
        list.appendChild(li);
    }

    let list2 = document.getElementById('nonPrimeListCont');
    for (i = 0; i < nonPrimeArray.length; ++i) {
        let li = document.createElement('li');
        li.innerText = nonPrimeArray[i];
        list2.appendChild(li);
    }


}


function isPrime(num) {
    // edge case
    if (num <= 1)
        return false;
 
    // Check from 2 to Math.sqrt(n)
    for (let i = 2; i <= Math.sqrt(num); i++){
        if (num % i === 0){
            return false;
        
        }

    }
        
 
    return true;
}
var primeTotal =  0;
var nonPrimeTotal =  0;
function sumPrime(){
    
    for (let i = 0; i < primeArray.length; ++i){
        primeTotal += primeArray[i];   
    }  
    document.getElementById('primeTotal').textContent = 'Sum: ' + primeTotal;  
    
}

function sumNonPrime(){
    
    for (let i = 0; i < nonPrimeArray.length; ++i){
        nonPrimeTotal += nonPrimeArray[i];   
    }  
    document.getElementById('nonPrimeTotal').textContent = 'Sum: ' + nonPrimeTotal;  
    
}