/* eslint-disable react/prop-types */
import { useState } from "react"
import AbsenteeEntries from "./AbsenteeEntries";
import ShowAllEntries from "./ShowAllEntries";

function EntryPage({selectedSubject,setSelectedSubject,setViewEntries,viewEntries}){
    const [noOfStud, setNoOfStud] = useState(""); // State for number of students
    const [startNo, setStartNo] = useState(""); // State for starting roll number
    const [showAbsenteeEntries, setShowAbsenteeEntries] = useState(false); // State to toggle components

    function renderNextPg() {
        console.log(noOfStud, startNo);
        setShowAbsenteeEntries(true); // Toggle to show AbsenteeEntries
    }

    if (viewEntries) {
        return (
            <>
                <ShowAllEntries
                    selectedSubject={selectedSubject}
                    setSelectedSubject={setSelectedSubject}
                />
                <button
                    onClick={() => setViewEntries(false)}
                    className="bg-red-500 text-white p-3 rounded mt-4"
                >
                    Back
                </button>
            </>
        );
    }

    if (showAbsenteeEntries) {
        return <AbsenteeEntries noOfStud={noOfStud} startNo={startNo} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}
        viewEntries={viewEntries} setViewEntries={setViewEntries}/>; 
    }

    return <>
        <h2 className="ml-10 mt-10 font-bold text-2xl">Enter number of students and starting roll number: </h2>
        <input type="number" placeholder=" No. of students"
         value={noOfStud}
         onChange={(e) => setNoOfStud(e.target.value)} 
         className="h-8 m-10 mr-0 bg-black p-2 rounded text-white border border-gray-600"/>
        <input type="number" placeholder="Start roll no." 
        value={startNo}
        onChange={(e) => setStartNo(e.target.value)} 
        className="h-8 m-10 bg-black p-2 rounded text-white border border-gray-600"/>
        <input type="button" value="Submit" onClick={renderNextPg} className="bg-red-400 size-8 w-20 h-12"/>
        <input
            type="button"
            value="Show all entries till now"
            onClick={() => setViewEntries(true)}
            className="bg-green-500 text-white p-3 rounded ml-4"
        />
    </>
}
export default EntryPage