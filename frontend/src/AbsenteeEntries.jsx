/* eslint-disable react/prop-types */
import { useState } from "react";
import SendBackendReq from "./SendBackendReq";
import ShowAllEntries from "./ShowAllEntries";

function AbsenteeEntries({ noOfStud, startNo, selectedSubject, setSelectedSubject, setViewEntries, viewEntries }) {
    noOfStud = parseInt(noOfStud);
    startNo = parseInt(startNo);

    if (Number.isNaN(noOfStud)) noOfStud = 10;
    if (Number.isNaN(startNo)) startNo = 100;

    const [doneSending, setDoneSending] = useState(false);

    // Start generating rollNumbers from startNo + 1
    const rollNumbers = Array.from({ length: noOfStud }, (_, index) => startNo + 1 + index);

    const [attendanceData, setAttendanceData] = useState(() =>
        rollNumbers.reduce((acc, rollNo) => {
            acc[rollNo] = true; // Default to true (Present)
            return acc;
        }, {})
    );

    const handleSubmit = () => {
        const attendanceArray = rollNumbers.map((rollNo) => attendanceData[rollNo]);
        SendBackendReq(attendanceArray, startNo + 1, selectedSubject); // Adjust startNo for the backend
        setDoneSending(true);
    };

    const updateAttendance = (rollNo, value) => {
        setAttendanceData((prev) => ({
            ...prev,
            [rollNo]: value === "Present",
        }));
    };

    if (doneSending) {
        return (
            <div className="flex mt-52 justify-center">
                <h1 className="text-3xl font-bold text-white">Your results have been updated in the database</h1>
                <input
                    type="button"
                    value="Show all entries till now"
                    onClick={() => setViewEntries(true)}
                    className="bg-green-500 text-white p-3 rounded ml-4"
                />
            </div>
        );
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

    return (
        <>
            <div className="fixed top-10r right-10">
                <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="border border-gray-600 bg-black p-2 rounded text-white"
                >
                    <option value="Web Tech">Web Tech</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="System Software">System Software</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Computer Networks-1">Computer Networks-1</option>
                </select>
            </div>

            <div className="p-4 text-white ml-20 mt-10">
                <h3 className="font-bold mb-4 text-2xl">
                    Subject: {selectedSubject}
                </h3>
                {rollNumbers.map((rollNo) => (
                    <InputBox key={rollNo} rollNo={rollNo} updateAttendance={updateAttendance} />
                ))}
            </div>

            <div className="ml-10">
                <input
                    type="button"
                    value="Submit"
                    onClick={handleSubmit}
                    className="bg-yellow-500 text-black border border-gray-600 p-3 rounded ml-14"
                />
                <input
                    type="button"
                    value="Show all entries till now"
                    onClick={() => setViewEntries(true)}
                    className="bg-green-500 text-white p-3 rounded ml-4"
                />
            </div>
        </>
    );
}


function InputBox({ rollNo, updateAttendance }) {
    return (
        <div className="flex items-center gap-4 mb-4">
            <input
                type="number"
                value={rollNo}
                readOnly
                className="border border-gray-600 p-2 rounded bg-gray-800 text-white"
            />
            <select
                defaultValue="Present"
                onChange={(e) => updateAttendance(rollNo, e.target.value)}
                className="border border-gray-600 bg-black p-2 rounded text-white"
            >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
            </select>
        </div>
    );
}

export default AbsenteeEntries