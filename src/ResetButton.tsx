type ResetButtonProps = {
  resetScores: () => void
}

function ResetButton({ resetScores }: ResetButtonProps) {
  return <button onClick={resetScores}>Reset</button>;
}

export default ResetButton;
