function Equator(equation){
    // equation will be given as a list of numbers and math symbols, e.g, 12+3*9.


    // This is just a summer of a list
    function sum(arr) {
        return arr.reduce((acc, curr) => acc + curr, 0);
    }

    // If the last element is a "*", it will remove it
    // e.g, [12, "*"] => [12]
    if (equation[equation.length-1] === "*"){
        equation = [...equation.slice(0,-1)]
    }

    while (true){
        // This will repeat this until there are no more multiple symbols in the equation
        let multiplySumbol = equation.indexOf("*");
        if (multiplySumbol !== -1){     // When it finds a multiply symbol, it will multiply the number before and after the symbol
            try {
                // will try to multiply the two numbers around the multiply symbol
                equation = [...equation.slice(0,multiplySumbol-1), 
                            equation[multiplySumbol-1] * equation[multiplySumbol+1], 
                            ...equation.slice(multiplySumbol+2,)]

            } catch (error) {
                equation = [...equation.slice(0,multiplySumbol-1), 
                            equation[multiplySumbol-1] * equation[multiplySumbol+1]]
            }
        } else {
            break;
        }
    }

    // This filters out all the + signs in the list, and results in it only being numbers (including negative numbers)
    return sum(equation.filter(item => typeof item === "number"));
}

export default Equator;
