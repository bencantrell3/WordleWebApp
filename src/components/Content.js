import "./Content.css";


let squareArray = [];
let qwertyArray = [];
let qwertyList = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","ENTER","Z","X","C","V","B","N","M","BACK"]
function Content() {
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
      {button()}
    </>
  )
}

function generateBoard(){
  for(let i = 0; i < 6; i++){
    for(let j = 0; j < 5; j++){
      squareArray.push(Square(14+(i*9), 10-(j*9)))
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


let Square = (top, offset) => {//need to get it to put arguments into the style sheet. Wierd interaction is JS and css.
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
    <div style={style}></div>
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

export default Content;
