import { useState } from 'react';
import ResetButton from './ResetButton';
import Scoreboard from './Scoreboard';

const STRIKE = 'X';
const SPARE = '/';

const data: RoundScore[] = [
  { first: 10, second: 10 },
  { first: 3, second: 7 },
  { first: 5, second: 6 },
  { first: 7, second: 8 },
  { first: 9, second: 0 },
  { first: 1, second: 2 },
  { first: 3, second: 4 },
  { first: 5, second: 6 },
  { first: 7, second: 8 },
  { first: 9, second: 0 },
];

function App() {
  const [scores, setScores] = useState<RoundScore[]>(data);
  
  const resetScores = () => {
    setScores([]);
  }

  function convertScoreToSymbol(score: RoundScore): DisplayScore {
    if (score.first === 10) return { ...score, first: STRIKE, second: undefined };
    const total = (score?.first ?? 0) + (score?.second ?? 0);
    if (total === 10 ) return { ...score, second: SPARE };
    return score; 
  }

  return (
    <>
      <Scoreboard scores={scores.map(convertScoreToSymbol)} />
      <ResetButton resetScores={resetScores}/>
    </>
  );
}

export default App;
