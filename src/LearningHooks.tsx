import { useCallback, useEffect, useMemo, useState } from "react";

function sortMyArray(arr: number[]) {
    checkRender("sort array")
    return arr.sort();
}

export const LearningHooks = () => {
    const [counter, setCounter] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const [myArray] = useState([5, 4, 8, 6]); //buat cek sort

    // const sortedArray = sortMyArray(myArray)
    // console.log(sortedArray) //klo pake ini dia sortnya keluar terus

    const sortedArray = useMemo(() => {
        const result = sortMyArray(myArray);
        console.log("Sorted Result:", result);
        return result
    }, [myArray]) // cmn keluar sekali si sortnya

    useEffect(() => {
        console.log("Sorted Result terpantau berubah:", sortedArray);
    }, [sortedArray]); //ini jg buat sortnya

    checkRender("-");

    const reset = () => {
        checkRender("gapake useCallback");
        setCounter(0);
        setCounter2(0);
    } //functionnya yg return jd gada eksekusi (jd ke reset)

    const checking = (a: number) => {
        console.log('checking called');
        return a >= 3;
    }

    if (checking(counter) && checking(counter2)) {
        checkRender("call reset")
        reset();
    }

    // useEffect(() => {
    //     checkRender("use effect reset")
    //     if (counter2 == 3 && counter >= 8) { //jd klo kondisi ini dia langsung ke reset
    //         reset();
    //     }
    // }, [counter, counter2, reset])

    const updatedCounter = useMemo(() => {
        checkRender("updated counter");
        return counter * 4;
    }, [counter])
    //nilainya bakal diitung ulang karna dependencynya berubah (counter"annya)


    useEffect(() => {
        checkRender("update counter 2: " + counter2);
    }, [counter2, counter]) //klo misal [] kosong, berarti di console cmn bisa update 1x dan gada limit jd mau brp pun

    return (
        <div>
            <h1>LearningHooks</h1>
            <button onClick={() => setCounter(counter + 1)}> counter {counter}</button>
            <button onClick={() => setCounter2(counter2 + 1)}> counter2 {counter2}</button>
            <button onClick={reset}>Reset</button>
            <br />
            counter * 4 = {updatedCounter}
        </div>
    )
}

export default LearningHooks;

//buat ngeliat rendering di console 
function checkRender(label: string) {
    console.log("rendering", Math.random(), label);
}