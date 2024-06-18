import "./Content.css";


let squareArray = [];
function Content() {
  let x = 30;
  let y = 130;
  let topVar = '' + x + '%';
  let offsetVar = 'calc(50% + ' + y + 'px)';
  return (
    <>
      <background></background>
      <title>
        <h1>WORDLE ARCHIVE</h1>
      </title>
      <square1/>
      <square2></square2>
      <square3></square3>
      <square4></square4>
      <square5></square5>
      <Square1 top= {topVar} offset= {offsetVar} />
    </>
  )
}

function generateBoard(){
  for(let i = 0; i < 2; i++){
    squareArray.push(Square())
  }
}


const Square1 = ({ top, offset }) => {//need to get it to put arguments into the style sheet. Wierd interaction is JS and css.
  const style = {
    width: '70px',            
    height: '70px' ,         
    backgroundColor: 'rgb(0, 255, 4)',
    position:'fixed',
    top: top,              
    right: offset,       
    transform: 'translateY(-50%)',
    border: '4px solid rgb(23, 23, 23)',
    padding: '10px',
    margin: '20px',
  };
  console.log("accessed");
  return(
    <div style={style}>square</div>
  )
}



export default Content;
