import axios from "axios";

async function SendBackendReq(attendanceArray, startNo, selectedSubject) {
  const payload = attendanceArray.map((attendance, index) => ({
    rollno: startNo + index ,
    subject: selectedSubject,
    attendence: attendance,
  }));

  console.log("Payload being sent:", payload);

  try {
    const response = await axios.post("http://localhost:5000/Students", payload);
    console.log("Response from server:", response.data);
  } catch (err) {
    console.error("Error in SendBackendReq:", err.response?.data || err);
  }
}

export default SendBackendReq;
