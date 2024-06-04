function Equator(equation){
    // equation will be given as a list of numbers and math symbols, e.g, 12+3*9.

    function sum(arr) {
        return arr.reduce((acc, curr) => acc + curr, 0);
    }

    while (true){
        let multiplySumbol = equation.indexOf("*");
        if (multiplySumbol !== -1){
            try {
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
