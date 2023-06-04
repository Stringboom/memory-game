import '../styles/Card.css';
import backLogoImg from '../resources/logo.png';
import solvedImg from '../resources/ward.png';

function Card({isFlipped, isSolved, flipFunction, frontImage}) {
  if(isSolved){
    return (
        <div>
            <img src={solvedImg} style={{width: "80%", marginTop: "20px"}} />
        </div>
    )
  }
  else{
    return (
        <div className={(!isFlipped)? "card facedown" : "card"} onClick={flipFunction}>
              <div className="flipper">
                <div className="front">
                    <div className='backdrop' style={{ backgroundImage: `url("${frontImage}")` }}></div>
                    <div className='foreground'>                
                        <img src={frontImage}></img>
                    </div>
                </div>
                <div className="back">
                    <div className='backdrop'></div>
                    <div className='foreground'>                
                        <img src={backLogoImg}></img>
                    </div>
                </div>
            </div>
        </div>
      );
  }
}

export default Card;
