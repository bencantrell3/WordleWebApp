import "./Content.css";


let squareArray = [];
function Content() {
  generateBoard();
  return (
    <>
      <background></background>
      <title>
        <h1>WORDLE ARCHIVE</h1>
      </title>

      {squareArray}
    </>
  )
}

function generateBoard(){
  for(let j = 0; j < 5; j++){
    squareArray.push(Square(25, 130-(j*100)))
    console.log(j*50);
  }
}


let Square = (top, offset) => {//need to get it to put arguments into the style sheet. Wierd interaction is JS and css.
  let topVar = '' + top + '%';
  let offsetVar = 'calc(50% + ' + offset + 'px)';
  let style = {
    width: '70px',            
    height: '70px' ,         
    backgroundColor: 'rgb(0, 255, 4)',
    position:'fixed',
    top: topVar,              
    right: offsetVar,       
    transform: 'translateY(-50%)',
    border: '4px solid rgb(23, 23, 23)',
    padding: '10px',
    margin: '20px',
  };
  return(
    <div style={style}>square</div>
  )
}



export default Content;
