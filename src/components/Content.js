import "./Content.css";

function Content() {
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
      {Square1(0,100)}
    </>
  )
}


const Square1 = ({ top, offset }) => {//need to get it to put arguments into the style sheet. Wierd interaction is JS and css.
  const style = {
    width: '70px',            
    height: '70px' ,         
    backgroundColor: 'rgb(0, 255, 4)',
    position:'fixed',
    top: '30%',              
    right: 'calc(50% + 100px))',       
    transform: 'translateY(-30%)',
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
