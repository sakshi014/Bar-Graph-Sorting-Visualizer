import React, {useState, useEffect} from 'react'
import MergeSort from './Algorithms/MergeSort'
import QuickSort from './Algorithms/QuickSort'
import BubbleSort from './Algorithms/BubbleSort'
import InsertionSort from './Algorithms/InsertionSort'
import SelectionSort from './Algorithms/SelectionSort'
import HeapSort from './Algorithms/HeapSort'
import {doAnimation, finishAnimatioon, changeColor} from './animations'

const Body = () => {
    let isSorted=false;
    let nameOfMonth=[]
    let months=['january','feburary','march','april','may','june','july','august','september','october','novermber','december']
    const [arr, setArr] = useState([])
    const [type, setType] = useState("quickSort")
    const [running, setRunning] = useState(false)
    const [timer, setTimer] = useState([])

    useEffect(()=>{
        generateNewArray(15)
    }, [])


    const generateNewArray= (num) => {
        let temp = []
        for(let i=0; i<num; i++){
            temp[i] = Math.floor(Math.random()*400)
            if(temp[i]<20)
            {
                temp[i]=temp[i]+20;
            }
            nameOfMonth[temp[i]]=months[i];
            
        }
        setRunning(false)
        changeColor()
        setArr(temp)
    }

    // const changeArrayLength = (event) =>{
    //     generateNewArray(event.target.value)
    // }

   

    const startSorting = () => {
        let animation=[]
        setRunning(true)
        let temp=arr.slice()
        if(type === "quickSort") animation = QuickSort(temp)
        if(type === "mergeSort") animation = MergeSort(temp)
        if(type === "heapSort") animation = HeapSort(temp)
        if(type === "bubbleSort") animation = BubbleSort(temp)
        if(type === "insertionSort") animation = InsertionSort(temp)
        if(type === "selectionSort") animation = SelectionSort(temp)  
        const t=(doAnimation(animation))
        t.push(setTimeout(()=>{
            finishAnimatioon()
            setRunning(false)
        }, animation.length*10))
        setTimer(t)
    }

    const sortingType = () => {
        return(
            <>
            <button className="dropbtn">{type}</button>
            <div className="dropdown-content">
                <button className='btn mx-2 my-2' onClick={() => setType("mergeSort")} >Merge Sort</button>
                <button className='btn mx-2 my-2' onClick={() => setType("quickSort")} >Quick Sort</button>
                <button className='btn mx-2 my-2' onClick={() => setType("bubbleSort")} >Bubble Sort</button>
                <button className='btn mx-2 my-2' onClick={() => setType("insertionSort")} >Insertion Sort</button>
                <button className='btn mx-2 my-2' onClick={() => setType("selectionSort")} >Selection Sort</button>
                <button className='btn mx-2 my-2' onClick={() => setType("heapSort")} >Heap Sort</button>
            </div>
            </>
        )
    }

    const onReset = (timer) => {
        isSorted=false;
        for(let i=0; i<timer.length; i++){
            clearTimeout(timer[i])
        }
        generateNewArray(15)
    }

    
    return (
        <div id="container">
            <div id="toolbar">
                <button className="buttons" onClick={() => {onReset(timer)}}>Reset</button>
                <button className="buttons" disabled={running} onClick={() => {startSorting()}}>Start Sorting</button>
                {/* <button className="buttons" disabled={running} onClick={() => {generateNewArray(arr.length)}}>Generate New Array</button> */}
                <div className="buttons dropdown">{sortingType()}</div>
                {/* <input className="slider" type="range" min="10" max="200"  value={arr.length} step="1" onChange={changeArrayLength} disabled={running} /> */}
            </div>

            <div id="box">
                {
                    arr.map((num, idx)=>(
                        <div 
                        key={idx}
                        className="bars"
                        style={{height: `${num}px`, backgroundColor: "grey"}}>
                             { isSorted ? <></> : <div class="valueOfBar" ></div>  }
                            
                        </div>
                    ))
                }
            </div>
            <hr  width="90%" align="center" ></hr>
        </div>
    )
}

export default Body