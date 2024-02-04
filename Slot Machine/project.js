//1. Deposit some money
//2.determine the number of lines to bet on
//3. collect a bet amount
//4. spin the slot machine
//5. check if the user won
//6. give the user their winnings
//7.play again

const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3; 
const SYMBOLS_COUNT ={
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOLS_VALUES ={
    A:5,
    B:4,
    C:3,
    D:2
}



const deposit = () => {
    while(true){
    const depositamount = prompt("Enter a deposit amount: ");
    const nodepositnumber = parseFloat(depositamount);
    if (isNaN(nodepositnumber)|| nodepositnumber<=0){
        console.log("invalid deposit number")
    }else{
        return nodepositnumber;
    }
    }
}
const getnumberoflines =()=>{
    while (true){
        const lines = prompt("Enter no of lines(1-3): ");
        const nooflines = parseFloat(lines);
        if(isNaN(nooflines)|| nooflines<=0 || nooflines>3){
            console.log("invalid number of lines");
        }else{
            return nooflines;
        }
    }
}

const getbet =(balance,lines)=>{
    while(true){
        const bet = prompt("Enter amount you want to bet: ");
        const betamount = parseFloat(bet)
        if (isNaN(betamount)|| betamount<=0){
            console.log("invalid bet amount");
        }else if(betamount*lines>=balance){
            console.log("you cannot bet higher than your balance amount"); 
        }else{
            return betamount;
        }
    }
}

const spin =() =>{
    const symbols =[]; 
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }
const reels = [];
    for (let i=0;i<COLS;i++){
        reels.push([]);
        const reelsymbols=[...symbols];
        for(let j=0;j<ROWS;j++){
            const randomindex = Math.floor(Math.random()*reelsymbols.length);
            const selectedsymbol = reelsymbols[randomindex];
            reels[i].push(selectedsymbol)
            reelsymbols.splice(randomindex,1);
        }
    }
    return reels;
}

const transpose = (reels) =>{
    const rows=[];
    for(let i =0;i<ROWS;i++){
        rows.push([]);
        for (let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printrows= (rows) =>{
    for (const row of rows){
        let rowstring=""
        for (const [i,symbol] of row.entries()){ 
            rowstring+= symbol
            if(i != row.length-1){
                rowstring+='|'
            }
        }
        console.log(rowstring)
    }
}

const getwinnings = (rows,bet,lines) =>{
    let winnings=0;
    for (let row=0;row<lines;row++){
        const symbols = rows[row];
        let allsame=true;

        for (const symbol of symbols){
            if(symbol!=symbols[0]){
                allsame = false;
                break;
            }
        }

        if (allsame){
            winnings+= bet*SYMBOLS_VALUES[symbols[0]]
        }else{
            winnings=-bet*lines
        }
    }
    return winnings;
}

const game=()=>{
    balance = deposit();
    while (true){
        console.log("You have a balance of $"+ balance);
        const lines = getnumberoflines();
        const bet = getbet(balance,lines);
        const reels = spin();
        const rows = transpose(reels);
        printrows(rows);
        const winnings=getwinnings(rows,bet,lines);
        if (winnings<=0){
            balance +=winnings
            console.log("You lost,$"+ winnings.toString().slice(1))
            console.log("Your balance is,$"+balance.toString())
        }
        else{
            balance +=winnings
            console.log("You won,$"+ winnings.toString())
            console.log("Your balance is,$"+balance.toString())
        }
        if (balance<=0){
            console.log("You ran out of money!");
            break
        }
        const playagain = prompt("Do you want to play again(y/n");
        if (playagain!="y")break;
    } 
}

game()



