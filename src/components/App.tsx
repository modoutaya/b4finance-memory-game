import { useState } from 'react'
import Score from './Score'
import Board from './Board'


function App() {

  return (
    <div className="app-container">
      <Score/>
      <Board/>
    </div>
  )
}

export default App