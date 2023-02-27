import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Scoreboard.module.css';

type FrameProps = {
  roundNumber: number;
  firstScore?: number | string;
  secondScore?: number | string;
  total?: number;
};

function Frame({ roundNumber, firstScore, secondScore, total }: FrameProps) {
 
  return (
    <div className={styles.frame}>
      <div className={`${styles.frameHeader} ${styles.centeredText}`}>
        {roundNumber}
      </div>
      <div className={styles.score}>
        <input className={styles.centeredText} maxLength={1} defaultValue={firstScore}/>
        <div className={styles.innerBox}>
          <input className={styles.centeredText} defaultValue={secondScore}/>
        </div>
        <div className={`${styles.total} ${styles.centeredText}`}>{total}</div>
      </div>
    </div>
  );
}

export default Frame;
