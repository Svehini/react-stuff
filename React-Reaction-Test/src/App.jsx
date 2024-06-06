
// Imports from react´s library and components
import { useState, useEffect } from "react";
import GridMaker from "./components/Grid.jsx";
import TitleMaker from "./components/TitleMaker.jsx";
import StartButton from "./components/StartButton.jsx";
import ResetButton from "./components/ResetButton.jsx";
import "./components/MainGameDesign.css";   // Here are the designs for elements used directly in this code such as the start/reset button

function App(){


  let mainTitle = TitleMaker(); // This points to the TitleMaker code, and retrieves the Title

  // This is the grid for the game
  let GridRows = 5;
  let GridCols = 5;

  // This sets the time
  let time = 30.0;

  // This is the variable that is on the screen, hence they have to be changed by useState function
  // The special button is the green button you have to click in order to get points
  const [specialButtonRow, setSpecialButtonRow] = useState(-1); // This is its row
  const [specialButtonCol, setSpecialButtonCol] = useState(-1); // This is its column
  const [timeLeft, setTimeLeft] = useState(0);    // This keeps track of time left, and makes it possible to diplay it using useState
  const [points, setPoints] = useState(0);  // These are the points, aka correct number of 'special buttons' pressed - wrong buttons pressed


  // This keeps track of the 30 sec timer, and will stop the game when the timer goes out
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {   // Checks that there is more than 0 second left
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Reduces the time every 1000 milliseconds, aka 1 second
    } else if (timeLeft === 0) {  // When the time runs out, the special button is unclickable
      setSpecialButtonRow(-1);    // Out of bounds Row
      setSpecialButtonCol(-1);    // Out of bounds Col
    }

    // This clears the timer if it runs out and clears "old timers"
    return () => clearInterval(timer);
  }, [timeLeft]);

  // This function gets called on later and starts the game
  function startGame(){
    setPoints(0); // Sets points to zero
    setSpecialButtonRow(Math.floor(Math.random(0,GridRows-1) * 4));   // Changes the row of the special button to a row inside the array
    setSpecialButtonCol(Math.floor(Math.random(0,GridCols-1) * 4));   // Changes the column of the special button to a column inside the array
    setTimeLeft(time);  // Sets the timer to 30 sec
  }

  // This is the reset game button, which is not really needed, since the timer stops the game and "removes" the special button, and startGame sets points to zero
  function ResetGame(){
    if (specialButtonCol === -1){   // If you click the reset button after a game is ended, it will set points to 0. This is more for looks, as it doesnt change anything
      setPoints(0); // Resets points
    }
    setSpecialButtonRow(-1);  // "Removes" the button from rows
    setSpecialButtonCol(-1);  // "Removes" the button from rows
    setTimeLeft(0);     // Sets the time to 0
  }

  // This changes the location of the special button
  function changeSpecialButton(clickedRow, clickedCol) { 
    // If the clicked button is the correct button, then it will run the code underneath
    if (specialButtonRow === clickedRow && specialButtonCol === clickedCol) {
      setPoints(points+1);  // Adds one point to the point tally
      let newRow = Math.random(0,GridRows-1) * 4; // Changes the row to a random row inside the range of rows
      let newCol = Math.random(0,GridCols-1) * 4; // Changes the column to a random column inside the range of columns
      // This part is not really important, but it will try to redirect the special button to a new column if 
      // it sees that the button will be tha same as the one before. (still has a small chance of that happening)
      setSpecialButtonRow(Math.floor(newRow)); 
      if ((newRow === clickedRow) && (newCol == clickedCol)){
        try {
          setSpecialButtonCol(Math.floor(newCol+1));  // Moves it to a column 1 bigger
        } catch (error) {
          setSpecialButtonCol(Math.floor(newCol-1));  // Moves it to a column 1 smaller
        }
      }
      else {
        setSpecialButtonCol(Math.floor(newCol));    // If it is not the same row and col, it will just choose this column
      }
    }
    // If the wrong button (not the special button) is clicked, it will give you minus one point
    else {
      if (points > 0 && timeLeft > 0){  // This checks that the points are more than 0, so you cant get negative points
        // also checks that the timer has not ended, since clicking the wrong button after the game is ended should be allowed
        setPoints(points-1);  // Retracts one point
      }
    }
  }

  return (
    <>
      <header 
          className='Main-Title'>
            {mainTitle}
      </header>
        <div className="main-game">
          <div className="point-tracker">
              {points}
          </div>
          <GridMaker
              specialButtonRow={specialButtonRow} 
              specialButtonCol={specialButtonCol} 
              changeSpecialButton={changeSpecialButton}
              GridRows = {GridRows}
              GridCols = {GridCols}
          />
          <div className="time-tracker">
            {timeLeft > 0 ? `${timeLeft}s` : "Click Start!"} {/* If the time is zero, it will put the click start instead */}
          </div>
        </div>
      <div className="start-reset" >
          <StartButton onClick={startGame} /> <ResetButton onClick={ResetGame} />
      </div>
    </>
  );
}

export default App;