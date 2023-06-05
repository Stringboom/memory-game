import Deck  from "./Deck";

export default class Game{
    
    constructor(){
        this.deck = new Deck();
    }



    getAllCards(){
        return this.deck.cards;
    }

    flipCard(card, update) {

        // if(checkTurn) return;
        this.deck.cards[card].flipped = true;
        update();

    }
    
}