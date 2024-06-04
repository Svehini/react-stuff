import { useState } from "react";
import "./Grid.css";
import Equator from "./Equator.jsx";

const array = [
    ["+","-","*"],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["c",0,"="],
];

function Gridder(){

    const [mathbar, setMathbar] = useState([0]);

    const header = "IskaldCulaTore"

    function handleClick(cell){
        if (cell === "c"){
            setMathbar([0])     // Clears the math bar when c, or Clear, is clicked
            console.log(cell);
        }

        else if (mathbar.length === 1 && mathbar[0] === 0){
            if (typeof cell === "number" || cell === "-"){
                setMathbar([cell])
            }
        }

        else if (typeof cell === "number"){
            let lastItem = mathbar[mathbar.length-1];
            if (typeof lastItem === "number"){
                if (mathbar.length === 1){
                    setMathbar([Number(""+lastItem+cell)])
                }
                else {
                    setMathbar([...mathbar.slice(0,-1), Number(""+lastItem+cell)])
                }
            }
            else if (lastItem === "-"){
                setMathbar([...mathbar.slice(0,-1), Number(""+lastItem+cell)])
            }
            else {
                setMathbar([...mathbar, cell]);
            }
        }
        else if (cell === "="){
            // console.log(mathbar)
            setMathbar([Equator(mathbar)]);
        }

        // This is if the elemen tis either +, * or -
        else {
            if (typeof mathbar[mathbar.length-1] !== "number"){
                if (mathbar[mathbar.length-1] === "*" && cell === "-"){
                    setMathbar([...mathbar, cell]);
                }
                else if (mathbar.length > 1){
                    setMathbar([...mathbar.slice(0,-1), cell]);
                }
                else {
                    setMathbar([0]);
                }
            }
            else {
                setMathbar([...mathbar, cell]);
            }
        }
    }



    return (
        <>
            <h1>
                {header}
            </h1> 
            <div>
                <div className="math-bar">
                    {mathbar}
                </div>

                <table className="Grid">
                    <tbody>
                        {array.map((row, rowIndex) => 
                        <tr key = {rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td 
                                    className="cell" 
                                    key = {cellIndex}
                                    onClick = {() => handleClick(cell) }
                                    >
                                        {cell}
                                </td>
                            ))}
                        </tr> 
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Gridder;

