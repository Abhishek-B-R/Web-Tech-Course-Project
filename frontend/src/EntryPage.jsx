import { useState } from "react"
import AbsenteeEntries from "./AbsenteeEntries";

function EntryPage(){
    const [noOfStud, setNoOfStud] = useState(""); // State for number of students
    const [startNo, setStartNo] = useState(""); // State for starting roll number
    const [showAbsenteeEntries, setShowAbsenteeEntries] = useState(false); // State to toggle components

    function renderNextPg() {
        console.log(noOfStud, startNo);
        setShowAbsenteeEntries(true); // Toggle to show AbsenteeEntries
    }

    if (showAbsenteeEntries) {
        return <AbsenteeEntries noOfStud={noOfStud} startNo={startNo}/>; 
    }

    return <>
        <h2 className="ml-10 mt-10 font-bold text-2xl">Enter number of students and starting roll number: </h2>
        <input type="number" placeholder=" No. of students"
         value={noOfStud}
         onChange={(e) => setNoOfStud(e.target.value)} 
         className="h-8 m-10 mr-0 text-black"/>
        <input type="number" placeholder="Start roll no." 
        value={startNo}
        onChange={(e) => setStartNo(e.target.value)} 
        className="h-8 m-10 text-black"/>
        <input type="button" value="Submit" onClick={renderNextPg} className="bg-red-400 size-8 w-20"/>
    </>
}
export default EntryPage