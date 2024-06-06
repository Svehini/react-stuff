import { useState } from "react";
import "./Grid.css"

function GridMaker ({ specialButtonRow, specialButtonCol, changeSpecialButton, GridRows, GridCols }) {

    // Defines the number of rows and columns in the reaction game


  // This sub-function makes all the row x col buttons
  function theButtons() {
    let buttons = [];   // This generates all the buttons as a 2D array, with rows x cols
    for (let i = 0; i < GridRows; i++) {
      let row = [];
      for (let j = 0; j < GridCols; j++) {
        row.push(
          <button 
          className = {`${(specialButtonRow === i && specialButtonCol === j) ? "special-button" : "grid-button"}`}
          key={`${i}-${j}`}
          onClick={()=> changeSpecialButton(i, j)}
          >
            {/* Button should remain empty */}
          </button>
        );
      }
      buttons.push(
        <div className="button-row" key={i}>
          {row}
        </div> // This displayes each row
      );
    }


    return buttons;
  };



  return (
    <div className="grid-container">
        <div
        // This is the main gris
            className="main-grid"
            >
            {theButtons()}
        </div> 
        <div className="HelpBar"> 
        </div>
    </div> 
  );
}

export default GridMaker;
