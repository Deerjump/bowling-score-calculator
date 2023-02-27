import { FormEvent } from 'react';
import styles from './Scoreboard.module.css';
import { FAULT, SPARE, STRIKE, VALID_INPUT } from './utils/constants';

type FrameProps = {
  updateScore: (round: number, roundScore: RoundScore) => void
  roundNumber: number;
  firstScore?: number | string;
  secondScore?: number | string;
  total?: number;
};

function validateInput(input: string): boolean {
  if (!isNaN(Number(input)) && Number(input) >= 0 && Number(input) <= 10) {
    return true;
  }

  if (isNaN(Number(input)) && VALID_INPUT.includes(input)) {
    return true;
  }

  return false;
}

function Frame({ updateScore, roundNumber, firstScore, secondScore, total }: FrameProps) {

  const firstScoreHandler = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const text = target.value;

    // If clearing the text box
    if (text === '') {
      target.value = '';
      console.log("oopsie!")
      updateScore(roundNumber, { first: undefined })
      return;
    };

    const isValid = validateInput(text);

    // prevent invalid characters 
    if (!isValid) {
      console.error("INVALID CHARACTER", text)
      target.value = '';
      return;
    }

    // convert number/symbol to numerical value
    let value: number;
    if (text === STRIKE || text === STRIKE.toLowerCase()) value = 10;
    else if (text === SPARE) throw Error("Can't have a Spare on the first frame");
    else if (text === FAULT || text === FAULT.toLowerCase()) value = 0;
    else value = Number(text);

    updateScore(roundNumber, { first: value })
  };

  const secondScoreHandler = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const text = target.value;
    
    if (text === '' ) {
      target.value = '';
      console.log("oopsie!")
      updateScore(roundNumber, { first: Number(firstScore), second: undefined })
      return;
    };

    const isValid = validateInput(text);

    if (!isValid) {
      console.error("INVALID CHARACTER", text)
      target.value = '';
      return;
    }

    let value: number;
    if (text === STRIKE || text === STRIKE.toLowerCase()) value = 10;
    else if (text === SPARE) value = 10 - Number(firstScore);
    else if (text === FAULT || text === FAULT.toLowerCase()) value = 0;
    else value = Number(text);

    updateScore(roundNumber, { second: value })

  };

  return (
    <div className={styles.frame}>
      <div className={`${styles.frameHeader} ${styles.centeredText}`}>
        {roundNumber}
      </div>
      <div className={styles.score}>
        <input
          onChange={firstScoreHandler}
          className={styles.centeredText}
          maxLength={2}
          value={firstScore}
        />
        <div className={styles.innerBox}>
          <input
            onChange={secondScoreHandler}
            className={styles.centeredText}
            maxLength={2}
            value={secondScore}
          />
        </div>
        <div className={`${styles.total} ${styles.centeredText}`}>{total}</div>
      </div>
    </div>
  );
}

export default Frame;
