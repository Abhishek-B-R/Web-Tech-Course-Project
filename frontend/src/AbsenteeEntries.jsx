/* eslint-disable react/prop-types */
import { useState } from "react";
import SendBackendReq from "./SendBackendReq"

function AbsenteeEntries({ noOfStud, startNo }) {
    noOfStud = parseInt(noOfStud);
    startNo = parseInt(startNo);

    if (!noOfStud) noOfStud = 10;
    if (!startNo) startNo = 100;

    const [selectedSubject, setSelectedSubject] = useState("Web Tech"); // State for the chosen subject
    const [doneSending, setDoneSending] = useState(false);

    // Generate roll numbers starting from startNo
    const rollNumbers = Array.from({ length: noOfStud }, (_, index) => startNo + index);

    // Initialize attendance to true (Present) for all roll numbers
    const [attendanceData, setAttendanceData] = useState(() =>
        rollNumbers.reduce((acc, rollNo) => {
            acc[rollNo] = true; // Default to true (Present)
            return acc;
        }, {})
    );

    // Handle Submit
    const handleSubmit = () => {
        console.log("Attendance Data:", attendanceData);
        const attendanceArray = rollNumbers.map((rollNo) => attendanceData[rollNo]);
        console.log("Final Attendance Array:", attendanceArray);
        SendBackendReq(attendanceArray,startNo,selectedSubject)
        setDoneSending(true);
    };

    // Update attendance for a specific roll number
    const updateAttendance = (rollNo, value) => {
        setAttendanceData((prev) => ({
            ...prev,
            [rollNo]: value === "Present",
        }));
    };

    if (doneSending) {
        return (
            <div className="flex mt-52 justify-center">
                <h1 className="text-3xl font-bold">Your results have been updated in the database</h1>
            </div>
        );
    }

    return (
        <>
            {/* Top-right subject dropdown */}
            <div className="fixed top-4 right-4 text-black">
                <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                >
                    <option value="Web Tech">Web Tech</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="System Software">System Software</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Computer Networks-1">Computer Networks-1</option>
                </select>
            </div>

            <div className="p-4 text-black ml-10 mb-10">
                <h3 className="font-bold mb-4 text-white text-2xl">
                    Subject: {selectedSubject}
                </h3>
                {rollNumbers.map((rollNo) => (
                    <InputBox key={rollNo} rollNo={rollNo} updateAttendance={updateAttendance} />
                ))}
            </div>

            <div>
                <input
                    type="button"
                    value="Submit"
                    onClick={handleSubmit}
                    className="bg-yellow-500 text-black border border-gray-300 p-3 rounded ml-14"
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
                value={rollNo} // Display actual roll number
                readOnly
                className="border border-gray-300 p-2 rounded bg-gray-100"
            />
            <select
                defaultValue="Present" // Default to Present
                onChange={(e) => updateAttendance(rollNo, e.target.value)}
                className="border border-gray-300 p-2 rounded"
            >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
            </select>
        </div>
    );
}

export default AbsenteeEntries;
