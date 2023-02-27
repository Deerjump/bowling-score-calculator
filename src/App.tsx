import { useState } from 'react';
import ResetButton from './ResetButton';
import Scoreboard from './Scoreboard';
import { FAULT, SPARE, STRIKE } from './utils/constants';

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
  };

  function updateScore(round: number, newScore: RoundScore) {
    console.log('Updating score', round, newScore);
    // TODO: Check for fully empty scores
    const index = round - 1;
    const newScores = [...scores];
    const oldScore = newScores[index];

    newScores[index] = { ...oldScore, ...newScore };
    newScores[index] =
      newScore.first === undefined && newScore.second === undefined
        ? {}
        : { ...oldScore, ...newScore };

    setScores(newScores);
  }

  function calculateScore(scores: RoundScore[]): RoundScore[] {
    const totaledScores = [...scores];
    let total = 0;
    for (const score of totaledScores) {
      if (score.first === undefined && score.second === undefined)
        return totaledScores;
      total +=
        score?.first === 10 ? 10 : (score?.first ?? 0) + (score?.second ?? 0);
      score.total = total;
    }

    return totaledScores;
  }

  function convertScoreToSymbol(score: RoundScore): DisplayScore {
    if (score.first === 10)
      return { ...score, first: undefined, second: STRIKE };
    const total = (score?.first ?? 0) + (score?.second ?? 0);
    if (total === 10) return { ...score, second: SPARE };
    return score;
  }

  return (
    <>
      <Scoreboard
        updateScore={updateScore}
        scores={calculateScore(scores).map(convertScoreToSymbol)}
      />
      <ResetButton resetScores={resetScores} />
      <button onClick={() => console.log(scores)}> Log Scores </button>
    </>
  );
}

export default App;
