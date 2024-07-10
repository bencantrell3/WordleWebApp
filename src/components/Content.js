import "./Content.css";
//import allWords from "./allWords.txt";
import { useState } from 'react';

//import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


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

// Call the function as soon as the script runs
fetchAndLogTextFile();



let globalBlur = false;

let answer = "shape";

let board = [[],[],[],[],[],[]];
let colorArr = [[],[],[],[],[],[]];

let index = 0;

let currentGuess = [];
let keyAdded = false;
let qwertyList = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","ENTER","Z","X","C","V","B","N","M","BACK"]
function Content() {
  if(!keyAdded)
    window.addEventListener('keydown', handleKeyPress);
  keyAdded = true;
  let [currentWord, setCurrentWord] = useState([]);
  let [colors, setColors] = useState(['rgb(44, 44, 44)','rgb(44, 44, 44)','rgb(44, 44, 44)','rgb(44, 44, 44)','rgb(44, 44, 44)']);

   
  let qwerty = (top, offset, text, size) => {
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
  
  
  let Square = (top, offset, letter, colorX) => {//need to get it to put arguments into the style sheet. Wierd interaction is JS and css.
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
      border: '4px solid rgb(23, 23, 23)',
      padding: '5px',
      margin: '20px',
      fontSize: '8vh',
      alignItems: 'center',         // Centers items vertically
      justifyContent: 'center',     // Centers items horizontally
      textAlign: 'center',  
      lineHeight: '0.7',    
      color: 'rgb(255, 255, 255)',
    };
    return(
      <div style={style}>{letter}</div>
    )
  }
  let [opac, setOpac] = useState(0);
 
  let sideStyle = {
    width: '30vw',            
    height: '100vh' ,         
    backgroundColor: 'rgb(23, 23, 23)',
    position:'fixed',
    top: -20,              
    left: -20,       
    //transform: 'translateY(-50%)',
    border: '4px solid rgb(255, 0, 0)',
    padding: '5px',
    margin: '20px',
    fontSize: '8vh',
    alignItems: 'center',         // Centers items vertically
    justifyContent: 'center',     // Centers items horizontally
    textAlign: 'center',  
    lineHeight: '0.7',    
    color: 'rgb(255, 255, 255)',
    opacity: opac,
  };
  let Sidebar = () => {
    //let offsetVar = 'calc(50% + ' + offset + 'vh)';
    /*
    sideStyle = {
      width: '30vw',            
      height: '100vh' ,         
      backgroundColor: 'rgb(23, 23, 23)',
      position:'fixed',
      top: -20,              
      left: -20,       
      //transform: 'translateY(-50%)',
      border: '4px solid rgb(255, 0, 0)',
      padding: '5px',
      margin: '20px',
      fontSize: '8vh',
      alignItems: 'center',         // Centers items vertically
      justifyContent: 'center',     // Centers items horizontally
      textAlign: 'center',  
      lineHeight: '0.7',    
      color: 'rgb(255, 255, 255)',
      
    };*/
    return(
      <div style={sideStyle}>{}</div>
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
    console.log('CLICK');
    if(opac === 0){
      setOpac(opac = 100);
    }
    else setOpac(opac = 0);

    globalBlur = !globalBlur;
  }
  
 
  
  function handleKeyPress(event){
    console.log(event.key);
    try{
      if(event.key === 'Backspace' && currentGuess.length > 0 ){
        currentGuess.pop();
        currentGuess.push('');
        board[index] = currentGuess;
        setCurrentWord(currentWord = currentGuess); 
      }
      else if(currentGuess.length < 5 && (event.key.length === 1 && event.key.match(/[a-zA-Z]/))){
        let newGuess = [...currentGuess, event.key.toString().toUpperCase()];
        console.log(newGuess);
        currentGuess = newGuess;
        board[index] = currentGuess;
        setCurrentWord(currentWord = currentGuess); 
      } 
      else if(event.key === 'Enter' && currentGuess.length === 5){

        let guessStr = (currentGuess[0] + '' + currentGuess[1] + '' + currentGuess[2] + '' + currentGuess[3] + '' + currentGuess[4]).toLowerCase();
        if(validWords.includes(guessStr)){
          let rowColors = processGuess(guessStr);
          colorArr[index] = [rowColors[0], rowColors[1], rowColors[2], rowColors[3], rowColors[4]];
          setColors(colors = [rowColors[0], rowColors[1], rowColors[2], rowColors[3], rowColors[4]]);
          setCurrentWord(currentWord = currentGuess);
          index++;
          console.log("INDEX: " + index)
          currentGuess = [];
          board[index] = currentGuess;
          
        }
        else{
          setColors(colors = ['rgb(100, 44, 44)','rgb(100, 44, 44)','rgb(100, 44, 44)','rgb(100, 44, 44)','rgb(100, 44, 44)']);}
      }
       
      if(event.key === 'Backspace'){
        currentGuess.pop();
        setCurrentWord(currentWord = currentGuess); 
      }
      
    }
    catch(error){}
    console.log(currentGuess);
    
  };

  function processGuess(currentGuess){
      let retArray = ['rgb(23, 23, 23)','rgb(23, 23, 23)','rgb(23, 23, 23)','rgb(23, 23, 23)','rgb(23, 23, 23)'];
      let temp = answer;
      //green logic
      if(currentGuess[0] == answer[0]){
        retArray[0] = 'rgb(43, 166, 55)';
        temp = temp.substring(1);
      }
      if(currentGuess[1] == answer[1]){
        retArray[1] = 'rgb(43, 166, 55)';
        temp = temp.substring(0,temp.indexOf(answer[1])) + temp.substring(temp.indexOf(answer[1])+1,temp.length);
      }
      if(currentGuess[2] == answer[2]){
        retArray[2] = 'rgb(43, 166, 55)';
        temp = temp.substring(0,temp.indexOf(answer[2])) + temp.substring(temp.indexOf(answer[2])+1,temp.length);
      }
      if(currentGuess[3] == answer[3]){
        retArray[3] = 'rgb(43, 166, 55)';
        temp = temp.substring(0,temp.indexOf(answer[3])) + temp.substring(temp.indexOf(answer[3])+1,temp.length);
      }
      if(currentGuess[4] == answer[4]){
        retArray[4] = 'rgb(43, 166, 55)';
        temp = temp.substring(0,temp.indexOf(answer[4])) + temp.substring(temp.indexOf(answer[4])+1,temp.length);
      } 
      //yellow logic
      if(temp.indexOf(currentGuess[0]) != -1){
        retArray[0] = 'rgb(201, 188, 40)';
        temp = temp.substring(0,temp.indexOf(currentGuess[0])) + temp.substring(temp.indexOf(currentGuess[0])+1,temp.length);
      }
      if(temp.indexOf(currentGuess[1]) != -1){
        retArray[1] = 'rgb(201, 188, 40)';
        temp = temp.substring(0,temp.indexOf(currentGuess[1])) + temp.substring(temp.indexOf(currentGuess[1])+1,temp.length);
      }
      if(temp.indexOf(currentGuess[2]) != -1){
        retArray[2] = 'rgb(201, 188, 40)';
        temp = temp.substring(0,temp.indexOf(currentGuess[2])) + temp.substring(temp.indexOf(currentGuess[2])+1,temp.length);
      }
      if(temp.indexOf(currentGuess[3]) != -1){
        retArray[3] = 'rgb(201, 188, 40)';
        temp = temp.substring(0,temp.indexOf(currentGuess[3])) + temp.substring(temp.indexOf(currentGuess[3])+1,temp.length);
      } 
      if(temp.indexOf(currentGuess[4]) != -1){
        retArray[4] = 'rgb(201, 188, 40)';
        temp = temp.substring(0,temp.indexOf(currentGuess[4])) + temp.substring(temp.indexOf(currentGuess[4])+1,temp.length);
      }

      console.log(temp);
      return retArray;

  }


  
  return (
    <>
      
      <background></background>
      <title>
        <h1>WORDLE PRO</h1>
      </title>
      

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

      {(qwerty(71, 28.9, qwertyList[0],30))}
      {(qwerty(71, 20.9, qwertyList[1],30))}
      {(qwerty(71, 12.9, qwertyList[2],30))}
      {(qwerty(71, 4.9, qwertyList[3],30))}
      {(qwerty(71, -3.1, qwertyList[4],30))}
      {(qwerty(71, -11.1, qwertyList[5],30))}
      {(qwerty(71, -19.1, qwertyList[6],30))}
      {(qwerty(71, -27.1, qwertyList[7],30))}
      {(qwerty(71, -35.1, qwertyList[8],30))}
      {(qwerty(71, -43.1, qwertyList[9],30))}

      {(qwerty(80, 24.8, qwertyList[10],30))}
      {(qwerty(80, 16.8, qwertyList[11],30))}
      {(qwerty(80, 8.8, qwertyList[12],30))}
      {(qwerty(80, 0.8, qwertyList[13],30))}
      {(qwerty(80, -7.2, qwertyList[14],30))}
      {(qwerty(80, -15.2, qwertyList[15],30))}
      {(qwerty(80, -23.2, qwertyList[16],30))}
      {(qwerty(80, -31.2, qwertyList[17],30))}
      {(qwerty(80, -39.2, qwertyList[18],30))}

      {(qwerty(89, 24.8, qwertyList[19],15))}
      {(qwerty(89, 16.8, qwertyList[20],30))}
      {(qwerty(89, 8.8, qwertyList[21],30))}
      {(qwerty(89, 0.8, qwertyList[22],30))}
      {(qwerty(89, -7.2, qwertyList[23],30))}
      {(qwerty(89, -15.2, qwertyList[24],30))}
      {(qwerty(89, -23.2, qwertyList[25],30))}
      {(qwerty(89, -31.2, qwertyList[26],30))}
      {(qwerty(89, -39.2, qwertyList[27],15))}

      {Sidebar()}

      {CalendarComponent()}
      {button()}
    </>
  )
}
/*
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
*/

export default Content;