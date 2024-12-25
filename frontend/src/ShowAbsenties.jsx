/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function ShowAllEntries({ selectedSubject, setSelectedSubject }) {
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(false);

    
    const fetchEntries = async (subject) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/Students");
            const data = await response.json();
            console.log(data)

            // Filter by subject and sort by roll number
            const filteredData = data
                .filter((entry) => entry.subject === subject && !entry.attendence) // Ensure subject filtering
                .sort((a, b) => a.rollno - b.rollno); // Sort by rollno

            setFetchedData(filteredData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch data on component mount and whenever the subject changes
        fetchEntries(selectedSubject);
    }, [selectedSubject]);

    const handleSubjectChange = (e) => {
        const newSubject = e.target.value;
        setSelectedSubject(newSubject);
        fetchEntries(newSubject);
    };

    return (
        <div className="p-4 text-white">
            <div className="fixed top-4 right-4">
                <select
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                    className="border border-gray-600 bg-black p-2 rounded text-white"
                >
                    <option value="Web Tech">Web Tech</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="System Software">System Software</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Computer Networks-1">Computer Networks-1</option>
                </select>
            </div>

            <h3 className="font-bold mb-4 text-2xl">Entries for {selectedSubject}</h3>

            {loading ? (
                <div className="text-center text-white">
                    <div className="loader border-t-4 border-white rounded-full w-8 h-8 animate-spin mx-auto"></div>
                    <p>Loading...</p>
                </div>
            ) : fetchedData.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-600">
                    <thead>
                        <tr>
                            <th className="border border-gray-600 px-4 py-2">Roll Number</th>
                            <th className="border border-gray-600 px-4 py-2">Attendance</th>
                            <th className="border border-gray-600 px-4 py-2">Booklet Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchedData.map(({ rollno, attendence, bookletNo}) => (
                            <tr key={rollno}>
                                <td className="border border-gray-600 px-4 py-2">{rollno}</td>
                                <td className="border border-gray-600 px-4 py-2">
                                    {attendence ? "Present" : "Absent"}
                                </td>
                                <td className="border border-gray-600 px-4 py-2">
                                    {bookletNo || "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center text-white">
                    <p>No entries found for {selectedSubject}.</p>
                </div>
            )}
        </div>
    );
}

export default ShowAllEntries;
