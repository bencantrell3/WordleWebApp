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
  let [currentWord, setCurrentWord] = useState([]);

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
      padding: '10px',
      margin: '20px',
      fontSize: '70px',
      alignItems: 'center',         // Centers items vertically
      justifyContent: 'center',     // Centers items horizontally
      textAlign: 'center',  
      lineHeight: '.8',    
      color: 'rgb(255, 0, 0)',
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
    try{
      if(currentGuess.length < 5){
        let newGuess = [...currentGuess, event.key.toString().toUpperCase()];
        console.log(newGuess);
        currentGuess = newGuess;
        setCurrentWord(currentWord = currentGuess); 
      }
    }
    catch(error){}
    console.log(currentGuess);
    
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

      {Square(14,10,currentGuess[0])}
      {Square(14,1,currentGuess[1])}
      {Square(14,-8,currentGuess[2])}
      {Square(14,-17,currentGuess[3])}
      {Square(14,-26,currentGuess[4])}

      {Square(23,10,'')}
      {Square(23,1,'')}
      {Square(23,-8,'')}
      {Square(23,-17,'')}
      {Square(23,-26,'')}
      
      {Square(32,10,'')}
      {Square(32,1,'')}
      {Square(32,-8,'')}
      {Square(32,-17,'')}
      {Square(32,-26,'')}

      {Square(41,10,'')}
      {Square(41,1,'')}
      {Square(41,-8,'')}
      {Square(41,-17,'')}
      {Square(41,-26,'')}

      {Square(50,10,'')}
      {Square(50,1,'')}
      {Square(50,-8,'')}
      {Square(50,-17,'')}
      {Square(50,-26,'')}

      {Square(59,10,'')}
      {Square(59,1,'')}
      {Square(59,-8,'')}
      {Square(59,-17,'')}
      {Square(59,-26,'')}
    </>
  )
}


export default Content;