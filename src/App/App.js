import { useEffect, useState } from 'react';
import jsonDeck from './data/cards.json';
import styles from './styles/App.module.css';
import deck  from "./components/Deck";
import Card from './components/Card';

function App() {

  const scoreDeductMagnitude = 6;
  const scoreIncreaseMagnitude = 40;

  const [cards, setCards] = useState(deck.getCards());  
  const [checkTurn, setCheckTurn] = useState(false);
  const [gameOver, setGameover] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);


  function flipCard(card) {
    
    if(checkTurn) return;

    deck.flipCard(card);

    setCards((newCards) => [...newCards]);

    if(deck.getFlippedCards().length == 2){
      setCheckTurn(true);
    }

  }

  function isGameOver(){
    return cards.every(card => card.solved);
  }



  useEffect(() => {
    if (!checkTurn) return;
    if (checkTurn) {

      setTimeout(() => {

        let result = deck.checkFlippedCards();
       
        if(result.solved){
          
          setScore(score + (scoreIncreaseMagnitude * cards[result.pairIndizes[0]].quickSolveMuliplier));
          
          let newCards = deck.getCards();
          setCards((newCards) => [...newCards]);
          setCheckTurn(!checkTurn);
          if(isGameOver()) setGameover(true);

        }else{

          setScore(score - (scoreDeductMagnitude * ((cards[result.pairIndizes[0]].deductionMuliplier + cards[result.pairIndizes[1]].deductionMuliplier) / 2)));
          
          let newCards = deck.getCards();
          setCards((newCards) => [...newCards]);
          setCheckTurn(!checkTurn);
          

        }
      
      }, 500);
    }

  }, [checkTurn]);




  useEffect(() => {
    if (!gameOver) return;
    if (gameOver) {
      setTimeout(() => {
        reset();
      }, 1000);
    }
  }, [gameOver]);




  function reset(){
    
    deck.repack();
    setCards(deck.getCards());

    if(score > highScore){
      setHighScore(score);
    }

    setScore(0);
    setCheckTurn(false);
    setGameover(false);


  }



  
  let cardsDisplay = [];
  let cells =  cards.length;
  let rowCols = cards.length / 4;

  for(let row = 0; row < cells; row += rowCols){
    let cells = [];
    for(let col = 0; col < rowCols; col++){
      let i = row + col;
      cells.push((
        <span key={"cell-"+i} className={styles.cell}>
          <Card key={cards[i].id}
                flipFunction={() => flipCard(i)} 
                frontImage={cards[i].heroImg} 
                isFlipped={cards[i].flipped} 
                isSolved={cards[i].solved} />
        </span>
      ));
    }
    cardsDisplay.push(
      <div key={"col-"+row} className={styles.col}>
          {cells}
      </div>
    )
  }

  return (
    <div className="App">
    <div className={styles.app}>
      <div className={styles.frame}>
        <div className={styles.stats}>
          <div className={styles.score}>
            <div>Score:</div><div style={(score < 0)? {color: "red"} : {color:"yellow"}}>{score}</div>
          </div>
          <div className={styles.highScore}>
            <div></div><div>Highscore:</div> <div style={{color:"yellow"}}>{highScore}</div>
          </div>
        </div>
        <div className={styles.container}>
          {cardsDisplay}
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
