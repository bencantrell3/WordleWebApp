import "./Content.css";
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';//calendar dependency
import DatePicker from 'react-datepicker';//calendar dependency

//CALENDAR: MAY NOT USE///////////////////////////////////////////////////////////////////////////////////////////////////////
const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgb(240, 240, 240)',
    opacity: '0'
  };

  const datePickerStyle = {
    width: '300px',
    padding: '10px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  return (
    <div style={style}>
      <div style={datePickerStyle}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
        />
      </div>
    </div>
  );
};


//WORD LIST SETUP///////////////////////////////////////////////////////////////////////////////////////////////////////
let validWords = [];
function fetchAndLogTextFile() {
  fetch('/allWords.txt')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(text => {
      const lines = text.split(/\r\n|\n/);
      lines.forEach((line, index) => {
        validWords.push(`${line}`);
      });
    })
    .catch(error => {
      console.error('Error fetching the text file:', error);
    });
}

fetchAndLogTextFile();


//VARIABLE INITIALIZATION////////////////////////////////////////////////////////////////////////////////////////////////////
let globalBlur = false;
let canClickSideBar = false;
const RED = 'rgb(255, 0 ,0';
const SOFTRED = 'rgb(100,44,44';
const GREEN = 'rgb(43, 166, 55)';
const YELLOW = 'rgb(201, 188, 40)';
const BLACK = 'rgb(0, 0, 0)';
const DARKGRAY = 'rgb(23, 23, 23)';
const LIGHTGRAY = 'rgb(44, 44, 44';
const LIGHTLIGHTGRAY = 'rgb(100,100,100)';
const WHITE = 'rgb(255, 255, 255';
let answer = "cameo";
let board = [[],[],[],[],[],[]];//2d array of every letter
let colorArr = [[],[],[],[],[],[]];//2s array of board colors
let qwertyColors = [LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY,LIGHTLIGHTGRAY];
let index = 0;//current row
let currentGuess = [];//current guess
let keyAdded = false;//used to validate an event listener is only added once
let qwertyList = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","ENTER","Z","X","C","V","B","N","M","BACK"]//qwerty board

function Content() {

  if(!keyAdded)
    window.addEventListener('keydown', handleKeyPress);

  keyAdded = true;

  //USESTATES: CURRENT GUESS AND COLORS. BACKSPACE IS BUGGED RN////////////////////////////////////////////////////////////////
  let [currentWord, setCurrentWord] = useState([]);
  let [colors, setColors] = useState([LIGHTGRAY,LIGHTGRAY,LIGHTGRAY,LIGHTGRAY,LIGHTGRAY]);
  let [opac, setOpac] = useState(0);

  //INLINE STYLING OF COMPONENTS///////////////////////////////////////////////////////////////////////////////////////////////
  let background = () => {
    let style = {
    width: '100vw',                /* Set the width of the circle */
    height: '100vh',               /* Set the height of the circle */
    backgroundColor: LIGHTGRAY,      /* Set the background color of the circle */
    /*border-radius: 50%;          /* Make the element round */
    position: 'absolute',       /* Use absolute positioning */
    top: '50%',                    /* Center vertically */
    right: '0',                /* Position it at the right edge */
    transform: 'translateY(-50%)',
    };
    return(
      <div style={style}>{}</div>
    )
  }

  let title = () => {
    let text = 'WORDLE++';
    let style = {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5vh',
    top: '0',
    width: '100%',
    fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif'",//pretty sure this isnt picking up everything
    fontSize: '32px',
    backgroundColor: BLACK,
    color: RED,
    padding: '1rem',
    boxShadow: "0 2px 4px rgb(0, 0, 0, 0.1)",
    border: '4px solid ' + RED,
    };
    return(
      <div style={style}>{text}</div>
    )
  }

  let qwerty = (top, offset, text, size, colorArg) => {
    let blurVar = '';
    if(globalBlur){
      blurVar = 'blur(5px)';
    }
    let topVar = '' + top + 'vh';
    let offsetVar = 'calc(50% + ' + offset + 'vh)';
    let style = {
      filter: blurVar,
      width: '3vh',            
      height: '4vh' ,         
      backgroundColor: colorArg,
      color: WHITE,
      position:'fixed',
      top: topVar,              
      right: offsetVar, 
      transform: 'translateY(-50%)',
      border: '0.5vh solid ' + DARKGRAY,
      padding: '10px',
      margin: '20px',
      borderRadius: '10px',
      fontSize: ''+ size + 'px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };  
    if(text == "BACK"){
      return(
        <div style={style} onClick={() => handleBackspace()}>{text}</div>
      )
    }
    else if(text == "ENTER"){
      return(
        <div style={style} onClick={() => handleEnter()}>{text}</div>
      )
    }
    return(
      <div style={style} onClick={() => handleQwerty(text)}>{text}</div>
    )
  }
  
  let Square = (top, offset, letter, colorX) => {
    let blurVar = '';
    if(globalBlur){
      blurVar = 'blur(5px)';
    }
    let topVar = '' + top + 'vh';
    let offsetVar = 'calc(50% + ' + offset + 'vh)';
    let style = {
      filter: blurVar,
      width: '6vh',            
      height: '6vh' ,         
      backgroundColor: colorX,
      position:'fixed',
      top: topVar,              
      right: offsetVar,       
      transform: 'translateY(-50%)',
      border: '4px solid ' + DARKGRAY,
      padding: '5px',
      margin: '20px',
      fontSize: '8vh',
      alignItems: 'center',         // Centers items vertically
      justifyContent: 'center',     // Centers items horizontally
      textAlign: 'center',  
      lineHeight: '0.7',    
      color: WHITE,
    };
    return(
      <div style={style}>{letter}</div>
    )
  }
  
 
  let Sidebar = () => {
    let sideStyle = {
      width: '30vw',            
      height: '100vh' ,         
      backgroundColor: BLACK,
      position:'fixed',
      top: -20,              
      left: -20,       
      border: '4px solid ' + RED,
      padding: '5px',
      margin: '20px',
      fontSize: '8vh',
      alignItems: 'center',         // Centers items vertically
      justifyContent: 'center',     // Centers items horizontally
      textAlign: 'center',  
      lineHeight: '0.7',    
      color: WHITE,
      opacity: opac,
      pointerEvents: canClickSideBar ? 'auto' : 'none'
    };
    return(
      <div style={sideStyle}>{}</div>
    )
  }
  
  let button = () => {
    let style = {
      width: '4vh',            
      height: '2vh',          
      backgroundColor: BLACK,
      position: 'fixed',
      top: '2vh',              
      right: 'offsetVar',       
      transform: 'translateY(-50%)',
      border: '4px solid ' + RED,
      padding: '10px',
      margin: '20px',
      borderRadius: '10px',
    };
    return(
      <div style={style} onClick={handleClick}>{}</div>
    )
  }


  //EVENT HANDLING////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function handleClick(){
    console.log('CLICK');
    if(opac === 0){
      setOpac(opac = 100);
    }
    else setOpac(opac = 0);
    canClickSideBar = !canClickSideBar;
    globalBlur = !globalBlur;
  }

  function handleQwerty(input){
    if(currentGuess.length < 5 && (input.length === 1 && input.match(/[a-zA-Z]/))){
      console.log("QWERTY CLICK");
      let newGuess = [...currentGuess, input.toUpperCase()];
      currentGuess = newGuess;
      board[index] = currentGuess;
      setCurrentWord(currentWord = currentGuess); 
    }
  }

  function handleBackspace(){
    currentGuess.pop();
        let newGuess = [...currentGuess];//these lines are redundant but fix the backspace bug
        console.log(newGuess);
        currentGuess = newGuess;
        board[index] = currentGuess;
        setCurrentWord(currentWord = currentGuess); 
  }

  function handleEnter(){
    let guessStr = (currentGuess[0] + '' + currentGuess[1] + '' + currentGuess[2] + '' + currentGuess[3] + '' + currentGuess[4]).toLowerCase();
    if(validWords.includes(guessStr)){
      let rowColors = processGuess(guessStr);
      colorArr[index] = [rowColors[0], rowColors[1], rowColors[2], rowColors[3], rowColors[4]];
      setColors(colors = [rowColors[0], rowColors[1], rowColors[2], rowColors[3], rowColors[4]]);
      setCurrentWord(currentWord = currentGuess);
      index++;
      currentGuess = [];
      board[index] = currentGuess;
      console.log("VALID GUESS");
    }
    else{
      console.log("INVALID GUESS");
      colorArr[index] = [SOFTRED,SOFTRED,SOFTRED,SOFTRED,SOFTRED];
      setColors(colors = [SOFTRED,SOFTRED,SOFTRED,SOFTRED,SOFTRED]);
    }
  }
  
  function handleKeyPress(event){
      if(event.key === 'Backspace'){
        handleBackspace();
      }
      else if(currentGuess.length < 5 && (event.key.length === 1 && event.key.match(/[a-zA-Z]/))){
        handleQwerty(event.key.toString().toUpperCase());
      } 
      else if(event.key === 'Enter' && currentGuess.length === 5){
        handleEnter();
      }  
  }
    
  


  //GUESS CHECK LOGIC//////////////////////////////////////////////////////////////////////////////////////////////////
  function processGuess(currentGuess){
      let retArray = [DARKGRAY,DARKGRAY,DARKGRAY,DARKGRAY,DARKGRAY];
      let temp = answer;
      for(let i = 0; i < temp.length;i++){
        qwertyColors[qwertyList.indexOf(currentGuess[i].toUpperCase())] = DARKGRAY;
      }
      //green logic
      if(currentGuess[0] === answer[0]){
        retArray[0] = GREEN;
        qwertyColors[qwertyList.indexOf(currentGuess[0].toUpperCase())] = GREEN;
        temp = temp.substring(1);
      }
      if(currentGuess[1] === answer[1]){
        retArray[1] = GREEN;
        qwertyColors[qwertyList.indexOf(currentGuess[1].toUpperCase())] = GREEN;
        temp = temp.substring(0,temp.indexOf(answer[1])) + temp.substring(temp.indexOf(answer[1])+1,temp.length);
      }
      if(currentGuess[2] === answer[2]){
        retArray[2] = GREEN;
        qwertyColors[qwertyList.indexOf(currentGuess[2].toUpperCase())] = GREEN;
        temp = temp.substring(0,temp.indexOf(answer[2])) + temp.substring(temp.indexOf(answer[2])+1,temp.length);
      }
      if(currentGuess[3] === answer[3]){
        retArray[3] = GREEN;
        qwertyColors[qwertyList.indexOf(currentGuess[3].toUpperCase())] = GREEN;
        temp = temp.substring(0,temp.indexOf(answer[3])) + temp.substring(temp.indexOf(answer[3])+1,temp.length);
      }
      if(currentGuess[4] === answer[4]){
        retArray[4] = GREEN;
        qwertyColors[qwertyList.indexOf(currentGuess[4].toUpperCase())] = GREEN;
        temp = temp.substring(0,temp.indexOf(answer[4])) + temp.substring(temp.indexOf(answer[4])+1,temp.length);
      }
      //yellow logic
      if(temp.indexOf(currentGuess[0]) !== -1){
        retArray[0] = YELLOW;
        qwertyColors[qwertyList.indexOf(currentGuess[0].toUpperCase())] = YELLOW;
        temp = temp.substring(0,temp.indexOf(currentGuess[0])) + temp.substring(temp.indexOf(currentGuess[0])+1,temp.length);
      }
      if(temp.indexOf(currentGuess[1]) !== -1){
        retArray[1] = YELLOW;
        qwertyColors[qwertyList.indexOf(currentGuess[1].toUpperCase())] = YELLOW;
        temp = temp.substring(0,temp.indexOf(currentGuess[1])) + temp.substring(temp.indexOf(currentGuess[1])+1,temp.length);
      }
      if(temp.indexOf(currentGuess[2]) !== -1){
        retArray[2] = YELLOW;
        qwertyColors[qwertyList.indexOf(currentGuess[2].toUpperCase())] = YELLOW;
        temp = temp.substring(0,temp.indexOf(currentGuess[2])) + temp.substring(temp.indexOf(currentGuess[2])+1,temp.length);
      }
      if(temp.indexOf(currentGuess[3]) !== -1){
        retArray[3] = YELLOW;
        qwertyColors[qwertyList.indexOf(currentGuess[3].toUpperCase())] = YELLOW;
        temp = temp.substring(0,temp.indexOf(currentGuess[3])) + temp.substring(temp.indexOf(currentGuess[3])+1,temp.length);
      } 
      if(temp.indexOf(currentGuess[4]) !== -1){
        retArray[4] = YELLOW;
        qwertyColors[qwertyList.indexOf(currentGuess[4].toUpperCase())] = YELLOW;
        temp = temp.substring(0,temp.indexOf(currentGuess[4])) + temp.substring(temp.indexOf(currentGuess[4])+1,temp.length);
      }
      console.log(temp);
      return retArray;

  }


  //JSX//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      
      {background()}
      {title()}
      
      {console.log("RERENDER")}
      {Square(14,10,board[0][0], colorArr[0][0])}
      {Square(14,1,board[0][1], colorArr[0][1])}
      {Square(14,-8,board[0][2], colorArr[0][2])}
      {Square(14,-17,board[0][3], colorArr[0][3])}
      {Square(14,-26,board[0][4], colorArr[0][4])}

      {Square(23,10,board[1][0], colorArr[1][0])}
      {Square(23,1,board[1][1], colorArr[1][1])}
      {Square(23,-8,board[1][2], colorArr[1][2])}
      {Square(23,-17,board[1][3], colorArr[1][3])}
      {Square(23,-26,board[1][4], colorArr[1][4])}
      
      {Square(32,10,board[2][0], colorArr[2][0])}
      {Square(32,1,board[2][1], colorArr[2][1])}
      {Square(32,-8,board[2][2], colorArr[2][2])}
      {Square(32,-17,board[2][3], colorArr[2][3])}
      {Square(32,-26,board[2][4], colorArr[2][4])}

      {Square(41,10,board[3][0], colorArr[3][0])}
      {Square(41,1,board[3][1], colorArr[3][1])}
      {Square(41,-8,board[3][2], colorArr[3][2])}
      {Square(41,-17,board[3][3], colorArr[3][3])}
      {Square(41,-26,board[3][4], colorArr[3][4])}

      {Square(50,10,board[4][0], colorArr[4][0])}
      {Square(50,1,board[4][1], colorArr[4][1])}
      {Square(50,-8,board[4][2], colorArr[4][2])}
      {Square(50,-17,board[4][3], colorArr[4][3])}
      {Square(50,-26,board[4][4], colorArr[4][4])}

      {Square(59,10,board[5][0], colorArr[5][0])}
      {Square(59,1,board[5][1], colorArr[5][1])}
      {Square(59,-8,board[5][2], colorArr[5][2])}
      {Square(59,-17,board[5][3], colorArr[5][3])}
      {Square(59,-26,board[5][4], colorArr[5][4])}

      

      

      {CalendarComponent()}
      
      {qwerty(71, 28.9, qwertyList[0],30, qwertyColors[0])}
      {qwerty(71, 20.9, qwertyList[1],30, qwertyColors[1])}
      {qwerty(71, 12.9, qwertyList[2],30, qwertyColors[2])}
      {qwerty(71, 4.9, qwertyList[3],30, qwertyColors[3])}
      {qwerty(71, -3.1, qwertyList[4],30, qwertyColors[4])}
      {qwerty(71, -11.1, qwertyList[5],30, qwertyColors[5])}
      {qwerty(71, -19.1, qwertyList[6],30, qwertyColors[6])}
      {qwerty(71, -27.1, qwertyList[7],30, qwertyColors[7])}
      {qwerty(71, -35.1, qwertyList[8],30, qwertyColors[8])}
      {qwerty(71, -43.1, qwertyList[9],30, qwertyColors[9])}

      {qwerty(80, 24.8, qwertyList[10],30, qwertyColors[10])}
      {qwerty(80, 16.8, qwertyList[11],30, qwertyColors[11])}
      {qwerty(80, 8.8, qwertyList[12],30, qwertyColors[12])}
      {qwerty(80, 0.8, qwertyList[13],30, qwertyColors[13])}
      {qwerty(80, -7.2, qwertyList[14],30, qwertyColors[14])}
      {qwerty(80, -15.2, qwertyList[15],30, qwertyColors[15])}
      {qwerty(80, -23.2, qwertyList[16],30, qwertyColors[16])}
      {qwerty(80, -31.2, qwertyList[17],30, qwertyColors[17])}
      {qwerty(80, -39.2, qwertyList[18],30, qwertyColors[18])}

      {qwerty(89, 24.8, qwertyList[19],15, qwertyColors[19])}
      {qwerty(89, 16.8, qwertyList[20],30, qwertyColors[20])}
      {qwerty(89, 8.8, qwertyList[21],30, qwertyColors[21])}
      {qwerty(89, 0.8, qwertyList[22],30, qwertyColors[22])}
      {qwerty(89, -7.2, qwertyList[23],30, qwertyColors[23])}
      {qwerty(89, -15.2, qwertyList[24],30, qwertyColors[24])}
      {qwerty(89, -23.2, qwertyList[25],30, qwertyColors[25])}
      {qwerty(89, -31.2, qwertyList[26],30, qwertyColors[26])}
      {qwerty(89, -39.2, qwertyList[27],15, qwertyColors[27])}

      {Sidebar()}
      {button()}
    </>
  )
}

export default Content;