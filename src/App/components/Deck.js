import jsonDeck from "../data/cards.json";
import { shuffle } from "../Helpers";

class Deck{

    constructor(){

    }

    flipCard(card){
        this.cards[card].flipped = true;
    }

    repack(){

        this.cards = [];

        jsonDeck.forEach(function(jsonCard){
            for(let i = 1; i < 3; i++){
                this.cards.push({
                    id: jsonCard.name + i,
                    hero: jsonCard.name,
                    heroImg: jsonCard.img,
                    flipped: false,
                    solved: false,
                    quickSolveMuliplier: 4,
                    deductionMuliplier: 1
                });
            }
        }.bind(this));

        this.cards = shuffle(this.cards)

    }

    checkFlippedCards(){
        
        let flipped = this.getFlippedCards();

        let result = {
            solved: false,
            pairIndizes: [
                this.getIndexOfCardById(flipped[0].id),
                this.getIndexOfCardById(flipped[1].id)
            ]
        }

        if(flipped[0].hero === flipped[1].hero){

            this.cards[result.pairIndizes[0]].solved = true;
            this.cards[result.pairIndizes[1]].solved = true;
            
            result.solved = true;

        }else{

            flipped.forEach(function (card) {

                let cardIndex = this.getIndexOfCardById(card.id);
                
                this.cards[cardIndex].flipped = false;
                
                this.getCardPairByIndex(cardIndex).forEach(function (pairIndex) {
                    
                    if(this.cards[pairIndex].quickSolveMuliplier != 1){
                        this.cards[pairIndex].quickSolveMuliplier--;
                    }
          
                    if(this.cards[pairIndex].deductionMuliplier != 3 && (pairIndex == cardIndex)){
                        this.cards[pairIndex].deductionMuliplier++;
                    }

                }.bind(this))

            }.bind(this))

        }

        return result;
    }

    getCardPairByIndex(cardIndex) {

        let pair = [cardIndex];
        
        this.cards.forEach(function(card, index) {
        
            if(card.hero == this.cards[cardIndex].hero && index != cardIndex)
          {
            pair.push(index);
          }
        
        }.bind(this));
        
        return pair;
    }

    getIndexOfCardById(id){
        return this.cards.findIndex(card => { return card.id == id })
    }

    getFlippedCards(){
        return this.cards.filter(card => card.flipped && !card.solved);
    }

    getCards(){
        if(!this.cards){
            this.repack();
        }
        return this.cards;
    }

}

const deck = new Deck();

export default deck;