import './App.css'
import EntryPage from './EntryPage'
import { useState } from 'react';
// import AbsenteeEntries from './AbsenteeEntries'

function App() {
  const [selectedSubject, setSelectedSubject] = useState("Web Tech");
  const [viewEntries, setViewEntries] = useState(false);
  return (
    <>
      <EntryPage selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}
      viewEntries={viewEntries} setViewEntries={setViewEntries}/>
    </>
  )
}

export default App
