import { useState } from 'react';
import ResetButton from './ResetButton';
import Scoreboard from './Scoreboard';

const STRIKE = 'X';
const SPARE = '/';

const data: RoundScore[] = [
  { first: 10, second: 0 },
  { first: 1, second: 1 },
  { first: 1, second: 1 },
  { first: 1, second: 1 },
  { first: 1, second: 1 },
  { first: 1, second: 9 },
  { first: 1, second: 1 },
  { first: 1, second: 1 },
  { first: 1, second: 1 },
  { first: 1, second: 1 },
];

function App() {
  const [scores, setScores] = useState<RoundScore[]>(data);
  
  const resetScores = () => {
    setScores([]);
  }

  function changeScore(round: number, score: RoundScore) {
    const scoresCopy = [...scores];

    scoresCopy[round] = score;
  }

  function calculateScore(scores: RoundScore[]): RoundScore[] {
    const totaledScores = [...scores];
    let total = 0; 
    for (const score of totaledScores) {
      total += (score.first ?? 0 )+ (score?.second ?? 0);
      score.total = total;
    }
    
    return totaledScores;
  }

  function convertScoreToSymbol(score: RoundScore): DisplayScore {
    if (score.first === 10) return { ...score, first: undefined, second: STRIKE };
    const total = (score?.first ?? 0) + (score?.second ?? 0);
    if (total === 10 ) return { ...score, second: SPARE };
    return score; 
  }

  return (
    <>
      <Scoreboard scores={calculateScore(scores).map(convertScoreToSymbol)} />
      <ResetButton resetScores={resetScores}/>
    </>
  );
}

export default App;
