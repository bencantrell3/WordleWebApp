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
    </>
  )
}

function generateBoard(){
  for(let i = 0; i < 6; i++){
    for(let j = 0; j < 5; j++){
      squareArray.push(Square(17+(i*8), 95-(j*82)))
      console.log(j*50);
    }
  }
}

function generateQwerty(){
  for(let i = 0; i < 10; i++){
    qwertyArray.push(qwerty(68, 232-(i*65),qwertyList[i],30))
  }
  for(let i = 0; i < 9; i++){
    qwertyArray.push(qwerty(77, 200-(i*65),qwertyList[i+10],30))
  }
  for(let i = 0; i < 9; i++){
    if(i === 0 || i === 8)
      qwertyArray.push(qwerty(86, 200-(i*65),qwertyList[i+19],15))
    else
      qwertyArray.push(qwerty(86, 200-(i*65),qwertyList[i+19],30))
  }
}

let qwerty = (top, offset, text, size) => {
  let topVar = '' + top + '%';
  let offsetVar = 'calc(50% + ' + offset + 'px)';
  let style = {
    width: '30px',            
    height: '40px' ,         
    backgroundColor: 'rgb(30, 30, 30)',
    color: 'rgb(255,255,255)',
    position:'fixed',
    top: topVar,              
    right: offsetVar, 
    transform: 'translateY(-50%)',
    border: '4px solid rgb(255, 255, 255)',
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
  let topVar = '' + top + '%';
  let offsetVar = 'calc(50% + ' + offset + 'px)';
  let style = {
    width: '50px',            
    height: '50px' ,         
    backgroundColor: 'rgb(44, 44, 44)',
    position:'fixed',
    top: topVar,              
    right: offsetVar,       
    transform: 'translateY(-50%)',
    border: '4px solid rgb(23, 23, 23)',
    padding: '10px',
    margin: '20px',
  };
  return(
    <div style={style}></div>
  )
}



export default Content;
