import geID from "../util/HtmlHelper";
import { ICoordinate } from "./ICoordinate";
import { Tictac } from "./tictac";

const mainGrid = geID<HTMLDivElement>("mainGrid");
const currentPlayerDiv = geID<HTMLDivElement>("currentPlayer");
const nextPlayerDiv = geID<HTMLDivElement>("nextPlayerDiv");


//Create 9x9 grid;

function createGrid(){
    mainGrid.innerHTML = "";
    for (let x = 0; x < 9; x++) {
        const child = document.createElement("div");
        child.id = `${x}`;
        child.classList.add("outerChild");
        mainGrid.appendChild(child);
    
        for (let y = 0; y < 9; y++) {
            const grandChild = document.createElement("div");
            grandChild.id = `${x}${y}`;
            grandChild.classList.add("innerChild");
            grandChild.addEventListener("click", () => btnClicked(GetCord(grandChild.id)));
            child.appendChild(grandChild); 
        }
    
    }

}


function GetCord(id: string): ICoordinate {
    return {
        x: parseInt(id[0]),
        y: parseInt(id[1]),
        str: id,
    }
}


/// game
createGrid();
let tictac = new Tictac();
currentPlayerDiv.innerText = tictac.getCurrentPlayer();

function btnClicked(id: ICoordinate) {
    if (tictac.nextMove(id)){
        const changedChild = geID<HTMLDivElement>(id.str)
        changedChild.innerText = tictac.getLastPlayer();
        currentPlayerDiv.innerText = tictac.getCurrentPlayer();
        
        
        if (tictac.checkSmallWin(id)) {
            removeChildren(id, tictac.getLastPlayer());
        }
        if (tictac.checkbigWin()) {
            colorNextArea(-1, id);
            victory(tictac.getLastPlayer());
            return;
            
        }
   
        colorNextArea(tictac.getCurrentArea(), id);

    };
}


function colorNextArea(area: number, id:ICoordinate){
    //color if only one available

    for (let i = 0; i < 9; i++) {   
        //remove color
        if (!tictac.checkBigGrid(id.x)) {
            const cAreaChildDivCurrent = geID<HTMLDivElement>(`${id.x}${i}`);
            cAreaChildDivCurrent.classList.remove("available");   
        }
        if (area >= 0 && !tictac.checkBigGrid(area)) {
            //add color
            const cAreaChildDivNext = geID<HTMLDivElement>(`${String(area)}${i}`);
            cAreaChildDivNext.classList.add("available");
        } 
    }
}

function removeChildren(id: ICoordinate, winner: string){
    const parentDiv = geID<HTMLDivElement>(String(id.x));
    let child = parentDiv.lastElementChild;
    while (child) {
        parentDiv.removeChild(child);
        child = parentDiv.lastElementChild;
    }
    parentDiv.innerText = winner;
    parentDiv.classList.add("outerChildOneElement");
    parentDiv.classList.remove("outerChild");
}


function victory(winner: string) {

    for (let i = 0; i < 9; i++) {
        if (!tictac.checkBigGrid(i)) {
            removeChildren(GetCord(String(i)), "");
        }
        
    }
    //remove title/ dusplay winner
    nextPlayerDiv.innerText = `${winner} won`;

    const reloadBtn = document.createElement("button");
    reloadBtn.textContent = "New Round";
    reloadBtn.addEventListener("click", ()=>{
        window.location.reload();
    })
    currentPlayerDiv.innerText = "";
    currentPlayerDiv.appendChild(reloadBtn);
}

