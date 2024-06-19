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
  for(let i = 0; i < 6; i++){
    for(let j = 0; j < 5; j++){
      squareArray.push(Square(18+(i*9), 105-(j*90)))
      console.log(j*50);
    }
  }
}


let Square = (top, offset) => {//need to get it to put arguments into the style sheet. Wierd interaction is JS and css.
  let topVar = '' + top + '%';
  let offsetVar = 'calc(50% + ' + offset + 'px)';
  let style = {
    width: '60px',            
    height: '60px' ,         
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
