import { ICoordinate } from "./ICoordinate";


export class Tictac {
    private winCombos: number[][] = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    private grid: string[][] = [];
    private bigGrid: string[] = [];
    private currentPlayer: number = 0;
    private players: string[] = ["X", "O"];
    private currentArea: number = -1;

    constructor() {
        this.grid = [...Array(9)].map(()=>Array(9));
        this.bigGrid = [...Array(9)];
    }
     
    public getGrid() : string[][] {
        return this.grid;
    }

    public nextMove(id: ICoordinate): boolean {
        if(this.validMove(id)){
            this.grid[id.x][id.y] = this.players[this.currentPlayer];
            this.currentPlayer = ((this.currentPlayer +1) %2);
            this.currentArea = this.nextArea(id);

            return true;
        } 
        return false   
    }
    
    public getLastPlayer(): string{
        return this.players[(this.currentPlayer +1) %2]
    }

    public getCurrentPlayer(): string{
        return this.players[this.currentPlayer];
    }

    public getCurrentArea(): number {
        return this.currentArea;
    }

    private validMove(id: ICoordinate) : boolean{
        return((this.currentArea == id.x || this.currentArea == -1) && this.grid[id.x][id.y] == undefined );
    }

    private nextArea(id: ICoordinate){
        //TODO: remove this
        

        if (this.bigGrid[id.y]) {
            return(-1);
        }else{
            return(id.y);
        }
    }

    public checkBigGrid(index: number):boolean{
        if (this.bigGrid[index] == undefined) {
            return false
        }
        return true;
    }

    public checkSmallWin(id: ICoordinate): boolean{
        if (this.checkWin(this.grid[id.x], this.getLastPlayer())) {
            this.bigGrid[id.x] = this.getLastPlayer();
            return true;
        }
        return false;
    }
    
    public checkbigWin(): boolean{
        if (this.checkWin(this.bigGrid, this.getLastPlayer())) {
            
            return true;
        }
        return false;
    }

    private checkWin(board: string[], player: string){
        for(let x = 0; x< this.winCombos.length; x++){
            if (
                board[this.winCombos[x][0]] == player &&
                board[this.winCombos[x][1]] == player &&
                board[this.winCombos[x][2]] == player
            ) { return true}
        }
        return false;
    }


}
