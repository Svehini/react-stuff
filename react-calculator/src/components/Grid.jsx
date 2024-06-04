import { useState } from "react";
import "./Grid.css";
import Equator from "./Equator.jsx";

// The outlay of my simple calculator
const array = [
    ["+","-","*"],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["c",0,"="],
];

function Gridder(){

    // This is the math bar, which is the bar displaying what the equation currently is
    const [mathbar, setMathbar] = useState([0]);

    // The name of my calkis
    const header = "IskaldCulaTore"

    // This is the main function in this file
    function handleClick(cell){
        if (cell === "c"){
            setMathbar([0])     // Clears the math bar when c, or Clear, is clicked
        }

        // This is if there is only a 0 in the math bar
        else if (mathbar.length === 1 && mathbar[0] === 0){
            if (typeof cell === "number" || cell === "-"){
                setMathbar([cell])  // Will only place either a number or -
            }
        }
        
        // This is if the clicked button is a number
        else if (typeof cell === "number"){
            let lastItem = mathbar[mathbar.length-1];

            // If the last item was also a number, then it adds the number behind, e.g, 1 input 2 => 12, in this instance
            if (typeof lastItem === "number"){
                if (mathbar.length === 1){
                    setMathbar([Number(""+lastItem+cell)])  // If there is only one element in the list e.g, [12]
                }
                else {
                    // If there are multiple elements in the list, then it will add the preceeding elements, and then add onto the last
                    // e.g, [12, "+", 11] input 1 => [12, "+", 111], where 1 is added onto the last item
                    setMathbar([...mathbar.slice(0,-1), Number(""+lastItem+cell)])
                }
            }
            // If the last element is a minus, then it will add the number onto the minus, resulting in a negative number
            // e.g, [12, "-"] input 2 => [12, -2]
            else if (lastItem === "-"){
                setMathbar([...mathbar.slice(0,-1), Number(""+lastItem+cell)])
            }
            // If the last element is a + or a *, will instead make a new element in the list
            // e.g, [12, "*"] input 5 => [12, "*", 5]
            else {
                setMathbar([...mathbar, cell]);
            }
        }

        // If the clicked button is the equal symbol, this code will trigger the Equator file, and calculate the math bar
        // e.g, [12, "*", -5, "+", 1] input "=" => -59
        else if (cell === "="){
            setMathbar([Equator(mathbar)]); // It will then put the new calculated answer into the math bar
        }

        // This is if the element is either +, * or -
        else {
            // If the last item was not a number, it will then check to see if it should replace or add onto it
            if (typeof mathbar[mathbar.length-1] !== "number"){

                // We should be able to multiply negative numbers, so "*" should be able to preceed a minus, "-"
                if (mathbar[mathbar.length-1] === "*" && cell === "-"){
                        // setMathbar([...mathbar.slice(0,-1)]);
                        setMathbar([...mathbar, cell]);     // e.g, [12, "*"] input "-" => [12, "*", "-"]
                    }
                

                // This is less logical and more "user friendly" where we can change most signs into another sign
                else if (mathbar.length > 1){
                    if (mathbar[mathbar.length-2] === "*"){
                        setMathbar([...mathbar.slice(0,-1)]);   // e.g, [12, "*", "-"] input "+" => [12, "*"]
                    }
                    else {
                        setMathbar([...mathbar.slice(0,-1), cell]);     // e.g, [12, "+"] input "-" => [12, "-"]
                    }
                }

                // If there are no elements other than a minus, and we try to change it to a plus, it should reset instead
                else {
                    setMathbar([0]);    // e.g, ["-"] input "+" => [0]
                }
            }

            // This is just a normal -, + or *
            // e.g, [12, "+", 3] input "*" => [12, "+", 3, "*"]
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

