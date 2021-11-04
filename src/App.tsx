import Score, { BestScore } from './components/score/Score'
import Board from './components/board/Board'
import Modal from './components/modal/Modal'
import ProgressBar from './components/progress-bar/ProgressBar'
import { useState, useEffect } from 'react'
import http from './common/http'
import { useProgress } from './hooks/useProgress'

function App() {

  const [moves, setMoves] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isWinner, setWinnerFlag] = useState<boolean>(false);
  const [images, setImages] = useState<{ id: number; url: string }[]>([]);
  const [player, setPlayer] = useState<string>("");
  const [progress, stopProgressBar] = useProgress(60);
  const [bestScore, setBestScore] = useState<BestScore>({ player: "", moves: 0, duration: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const [imageData, bestScoreData] = await Promise.all([http.get('/images'), http.get('/scores/best')]);
      setImages(imageData.data);
      setBestScore({ ...bestScoreData.data, moves: bestScoreData.data.value });
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (player) {
      const newScore = { player: player, value: moves, duration: Math.trunc(progress) };
      const saveData = async () => await http.post('/scores', newScore);

      saveData();
    }
  }, [player, bestScore, moves, progress]);

  useEffect(() => {
    if (progress === 100) {
      setWinnerFlag(false);
      setOpenModal(true);
    }
  }, [progress]);

  const finishedGame = () => {
    const newBestScore = Math.trunc(progress) < bestScore.duration ? { duration: Math.trunc(progress), player: "", moves: 0 } : bestScore
    setBestScore(newBestScore)
    setWinnerFlag(true)
    setOpenModal(true)
    stopProgressBar()
  }

  const toggleModal = () => {
    setOpenModal(!openModal)
  };

  return (
    <div className="app-container">
      <Score
        moves={moves}
        recordMan={bestScore}
      />
      <Board
        setMoves={setMoves}
        finishedGame={finishedGame}
        images={images}
      />

      <ProgressBar progressValue={progress} />

      {openModal && <Modal toggleModal={toggleModal} setPlayer={setPlayer} isWinner={isWinner} />}
    </div>

  )
}

export default App