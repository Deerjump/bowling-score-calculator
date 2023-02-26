import styles from './Scoreboard.module.css';

type FrameProps = {
  roundNumber: number;
  firstScore?: number | string;
  secondScore?: number | string;
  total?: number
};

function Frame({ roundNumber, firstScore, secondScore, total }: FrameProps) {
  return (
    <div className={styles.frame} key={roundNumber}>
      <div className={`${styles.frameHeader} ${styles.centeredText}`}>{roundNumber}</div>
      <div className={styles.score}>
        <div className={styles.centeredText}>{firstScore}</div>
        <div className={`${styles.innerBox} ${styles.centeredText}`}>{secondScore}</div>
        <div className={`${styles.total} ${styles.centeredText}`}>{total}</div>
      </div>
    </div>
  );
}

export default Frame;
