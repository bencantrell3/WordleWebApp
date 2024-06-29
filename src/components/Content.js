import "./Content.css";
import { useState } from 'react';

let squareArray = [];
let qwertyArray = [];
let currentGuess = [];
let keyAdded = false;
let qwertyList = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","ENTER","Z","X","C","V","B","N","M","BACK"];
let statesArray = [];

let stateTemplate = {
    width: '6vh',            
    height: '6vh' ,         
    backgroundColor: 'rgb(255, 255, 255)',
    position:'fixed',       
    transform: 'translateY(-50%)',
    border: '4px solid rgb(23, 23, 23)',
    padding: '5px',
    margin: '20px',
};


for (let i = 0; i < 30; i++) {
  let state = {
    ...stateTemplate,
  };
  statesArray.push(state);
}

function Content() {
  if(!keyAdded)
    window.addEventListener('keydown', handleKeyPress);
  keyAdded = true;
  
  let [board, setBoard] = useState(stateTemplate);

  function generateBoard(){
    for(let i = 0; i < 5; i++){//only generates 5
      for(let j = 0; j < 5; j++){
        squareArray.push(Square(14+(i*9), 10-(j*9),board[j],statesArray[i+j]));
      }
    }
  }

  
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
  
  
  let Square = (top, offset, letter,instance,state) => {//need to get it to put arguments into the style sheet. Wierd interaction is JS and css.
    let topVar = '' + top + 'vh';
    let offsetVar = 'calc(50% + ' + offset + 'vh)';
    let currState = {
      width: '6vh',            
      height: '6vh' ,         
      backgroundColor: 'rgb(255, 255, 255)',
      position:'fixed',       
      transform: 'translateY(-50%)',
      border: '4px solid rgb(23, 23, 23)',
      padding: '5px',
      margin: '20px',
      top: topVar,
      right: offsetVar
    }


    return(
      <div style={currState}>{letter}</div>
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
    let newGuess = [...currentGuess, event.key];
    console.log(newGuess);
    currentGuess = newGuess;

    setBoard(stateTemplate); // Update the board with the current guess
  };


  let lastRow = [Square(14+(45), 10-(0),board[0]),Square(14+(45), 10-(9),board[1]),Square(14+(45), 10-(18),board[2]),Square(14+(45), 10-(27),board[3]),Square(14+(45), 10-(36),board[4])]


  generateBoard();
  generateQwerty();
  
  return (
    <>
      <background></background>
      <title>
        <h1>WORDLE ARCHIVE</h1>
      </title>
      {squareArray}
      {qwertyArray}
      {lastRow}
      {button()}
    </>
  )
}


export default Content;
