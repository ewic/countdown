import { nanoid } from "https://deno.land/x/nanoid/mod.ts"

export type numberPoolType = {
    "large": number[],
    "small": number[]
};

export class NumbersGame {
    uid: string;
    game: {"pool": number[], "target": number | null};
    numberPool: numberPoolType;

    constructor() {
        this.uid = nanoid(6);
        this.numberPool = { 
            "large": [25,50,75,100], 
            "small": [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10]
        };

        this.game = {pool: [], target: null};
    };

    init() {
        console.log("New Numbers Game");
    }

    addLarge() {
        const index = Math.floor(Math.random()*this.numberPool.large.length);
        const number = this.numberPool.large[index];
        this.numberPool.large.splice(index, 1);
        this.game.pool.push(number);
        return number;
    }

    addSmall() {
        const index = Math.floor(Math.random()*this.numberPool.small.length);
        const number = this.numberPool.small[index];
        this.numberPool.small.splice(index, 1);
        this.game.pool.push(number);
        return number;
    }

    setTarget(val?: number): number {
        if (val) {
            this.game.target = val;
            return val
        }
        let number;
        do {
            number = Math.floor(Math.random()*1000);
        } while (number < 100);

        this.game.target = number;
        return number;
    }

    startGame(numLarge?: number) {
        if (!numLarge) numLarge = 2;
        if (numLarge > 4) {
            console.warn("Invalid value given to numLarge!")
            numLarge = 4;
        }
        console.log(`Starting New Numbers Game with ${numLarge} Big Numbers...`);
        this.setTarget();
        
        while(this.game.pool.length < numLarge) this.addLarge()
        while (this.game.pool.length < 6) this.addSmall();

        this.printState();
    }

    getGame() {
        return this.game;
    }

    getPool() {
        return this.game.pool;
    }

    getTarget() {
        return this.game.target;
    }

    printState(): void {
        console.log("==== Numbers Game ====")
        console.log("Game id:", this.uid)
        console.log("Target:", this.game.target)
        console.log("Pool:", this.game.pool)
        // console.log("Numbers Pool:", this.numberPool)
    }

}
