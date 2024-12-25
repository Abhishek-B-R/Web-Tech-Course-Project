import './App.css'
import EntryPage from './EntryPage'
import { useState } from 'react';
// import AbsenteeEntries from './AbsenteeEntries'

function App() {
  const [viewEntries, setViewEntries] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Web Tech");
  return (
    <>
      <EntryPage viewEntries={viewEntries} setViewEntries={setViewEntries}
      selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}/>
    </>
  )
}

export default App
