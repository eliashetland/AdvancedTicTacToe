import { ICoordinate } from "./ICoordinate";


export class Tictac {
    private static readonly winCombos: number[][] = [
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
    private playerbool: boolean = false;
    private players: string[] = ["X", "O"];
    private currentArea: number = -1;

    constructor() {
        //creates 2d Array 9x9 filled with undefined values
        this.grid = [...Array(9)].map(()=>Array(9));
        //creates Array of size 9 with undefined values
        this.bigGrid = [...Array(9)];
    }
     

    public nextMove(id: ICoordinate): boolean {
        if (!this.validMove(id)) {
            return false;
        }
        this.grid[id.x][id.y] = this.getCurrentPlayer();
        this.playerbool = !this.playerbool;
        this.currentArea = this.nextArea(id);
        return true; 
    }
    
    public getLastPlayer(): string{
        return this.players[this.playerbool?0:1]
    }

    public getCurrentPlayer(): string{
        return this.players[this.playerbool?1:0];
    }

    public getCurrentArea(): number {
        return this.currentArea;
    }

    private validMove(id: ICoordinate) : boolean{ 
        return((this.currentArea == id.x || this.currentArea == -1) && this.grid[id.x][id.y] == undefined );
    }

    private nextArea(id: ICoordinate){
        this.checkSmallWin(id)

        if (this.bigGrid[id.y] || this.checkFullGrid(id)) {
            return(-1);
        }else{
            return(id.y);
        }
    }

    public checkFullGrid(id: ICoordinate): boolean{
        for (let i = 0; i < 9; i++) {
            if (this.grid[id.y][i] == undefined) {
                return false;
            }  
        }
        return true;
    }

    public checkBigGrid(index: number):boolean{
        return (this.bigGrid[index] != undefined);
    }

    public checkSmallWin(id: ICoordinate): boolean{
        if (!this.checkWin(this.grid[id.x], this.getLastPlayer())) {
            return false;
        }
        this.bigGrid[id.x] = this.getLastPlayer();
        return true;
    }
    
    public checkbigWin(): boolean{
        return (this.checkWin(this.bigGrid, this.getLastPlayer())); 
    }

    private checkWin(board: string[], player: string){
        for(let x = 0; x< Tictac.winCombos.length; x++){
            if (
                board[Tictac.winCombos[x][0]] == player &&
                board[Tictac.winCombos[x][1]] == player &&
                board[Tictac.winCombos[x][2]] == player
            ) { return true}
        }
        return false;
    }


}
