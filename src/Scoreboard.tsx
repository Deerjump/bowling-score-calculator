import Frame from './Frame';
import styles from './Scoreboard.module.css';

type ScoreboardProps = {
  scores: DisplayScore[];
};

function Scoreboard({ scores }: ScoreboardProps) {
    return (
    <div className={styles.scoreboard}>
      {Array.from({ length: 10 }).map((_, i) => {
        const score = scores[i];
        return (
          <Frame
            roundNumber={++i}
            firstScore={score?.first}
            secondScore={score?.second}
            total={score?.total}
          ></Frame>
        );
      })}
    </div>
  );
}

export default Scoreboard;
