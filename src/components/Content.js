import "./Content.css";
import { useState } from 'react';

let squareArray = [];
let qwertyArray = [];
let currentGuess = [];
let keyAdded = false;
let qwertyList = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","ENTER","Z","X","C","V","B","N","M","BACK"]
function Content() {
  if(!keyAdded)
    window.addEventListener('keydown', handleKeyPress);
  keyAdded = true;
  let [currentIndex, setCurrentIndex] = useState(0);

  /*
  function generateBoard(){
    for(let i = 0; i < 5; i++){//only generates 5
      for(let j = 0; j < 5; j++){
        squareArray.push(Square(14+(i*9), 10-(j*9),board[j]))
      }
    }
  }
*/
  
  function generateQwerty(){
    for(let i = 0; i < 10; i++){
      qwertyArray.push(qwerty(71, 28.9-(i*8),qwertyList[i],30))
    }
    for(let i = 0; i < 9; i++){
      qwertyArray.push(qwerty(80, 24.8-(i*8),qwertyList[i+10],30))
    }
    for(let i = 0; i < 9; i++){
      if(i === 0 || i === 8)
        qwertyArray.push(qwerty(89, 24.8-(i*8),qwertyList[i+19],15))
      else
        qwertyArray.push(qwerty(89, 24.8-(i*8),qwertyList[i+19],30))
    }
  }
  
  let qwerty = (top, offset, text, size) => {
    let topVar = '' + top + 'vh';
    let offsetVar = 'calc(50% + ' + offset + 'vh)';
    let style = {
      width: '3vh',            
      height: '4vh' ,         
      backgroundColor: 'rgb(30, 30, 30)',
      color: 'rgb(255,255,255)',
      position:'fixed',
      top: topVar,              
      right: offsetVar, 
      transform: 'translateY(-50%)',
      border: '0.5vh solid rgb(255, 255, 255)',
      padding: '10px',
      margin: '20px',
      borderRadius: '10px',
      fontSize: ''+ size + 'px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };  
    return(
      <div style={style}>{text}</div>
    )
  }
  
  
  let Square = (top, offset, letter) => {//need to get it to put arguments into the style sheet. Wierd interaction is JS and css.
    let topVar = '' + top + 'vh';
    let offsetVar = 'calc(50% + ' + offset + 'vh)';
    let style = {
      width: '6vh',            
      height: '6vh' ,         
      backgroundColor: 'rgb(44, 44, 44)',
      position:'fixed',
      top: topVar,              
      right: offsetVar,       
      transform: 'translateY(-50%)',
      border: '4px solid rgb(23, 23, 23)',
      padding: '5px',
      margin: '20px',
      
    };
    return(
      <div style={style}>{letter}</div>
    )
  }
  
  function button(){
    return(
      <sideButton
        style={{}} // Example style object
        onClick={handleClick}
      />
    )
  }
  
  function handleClick(){
    console.log('yoooo');
  }
  
  function handleKeyPress(event){
    console.log(event.key);
    //let newGuess = [...currentGuess, event.key];
    //console.log(newGuess);
    //currentGuess = newGuess;
    setCurrentIndex(currentIndex + 1); 
  };


  //let lastRow = [Square(14+(45), 10-(0),board[0]),Square(14+(45), 10-(9),board[1]),Square(14+(45), 10-(18),board[2]),Square(14+(45), 10-(27),board[3]),Square(14+(45), 10-(36),board[4])]


  //generateBoard();
  generateQwerty();
  
  return (
    <>
      <background></background>
      <title>
        <h1>WORDLE ARCHIVE</h1>
      </title>
      {qwertyArray}
      {button()}

      {Square(14,10,currentIndex)}
      {Square(14,1,currentIndex)}
      {Square(14,-8,currentIndex)}
      {Square(14,-17,currentIndex)}
      {Square(14,-26,currentIndex)}

      {Square(23,10,currentIndex)}
      {Square(23,1,currentIndex)}
      {Square(23,-8,currentIndex)}
      {Square(23,-17,currentIndex)}
      {Square(23,-26,currentIndex)}
      
      {Square(32,10,currentIndex)}
      {Square(32,1,currentIndex)}
      {Square(32,-8,currentIndex)}
      {Square(32,-17,currentIndex)}
      {Square(32,-26,currentIndex)}

      {Square(41,10,currentIndex)}
      {Square(41,1,currentIndex)}
      {Square(41,-8,currentIndex)}
      {Square(41,-17,currentIndex)}
      {Square(41,-26,currentIndex)}

      {Square(50,10,currentIndex)}
      {Square(50,1,currentIndex)}
      {Square(50,-8,currentIndex)}
      {Square(50,-17,currentIndex)}
      {Square(50,-26,currentIndex)}

      {Square(59,10,currentIndex)}
      {Square(59,1,currentIndex)}
      {Square(59,-8,currentIndex)}
      {Square(59,-17,currentIndex)}
      {Square(59,-26,currentIndex)}
    </>
  )
}


export default Content;