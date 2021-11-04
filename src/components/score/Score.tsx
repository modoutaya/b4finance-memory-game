import './score.scss'

export type BestScore = {
  player: string;
  moves: number;
  duration: number;
}

type ScoreProps = {
  moves: number
  recordMan: BestScore
}

const Score: React.FC<ScoreProps> = ({ moves, recordMan }) => {
  return (
    <div className="score-container">

      {recordMan.player && <div className="best-score"> Record détenu par {recordMan.player} (tentatives: {recordMan.moves}, durée: {recordMan.duration}) </div>}

      <div className="current-score">
        <div className="score">
          <div>
            <span>Tentatives:</span> {moves}
          </div>
        </div>
        <div>
          <button onClick={() => { window.location.reload() }}>NOUVELLE PARTIE</button>
        </div>
      </div>
    </div>
  )
}

export default Score