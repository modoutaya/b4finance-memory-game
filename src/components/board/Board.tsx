import { useEffect, useRef, useState } from 'react'
import Card from '../card/Card'
import './board.scss'

type BoardProps = {
  setMoves: React.Dispatch<React.SetStateAction<number>>
  finishedGame: () => void
  images: { id: number; url: string }[]
}

const Board: React.FC<BoardProps> = ({ setMoves, finishedGame, images }) => {
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<number[]>([]);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState<boolean>(false);
  const timeout = useRef<NodeJS.Timeout>(setTimeout(() => { }));

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const handleCardClick = (id: number) => {
    if (openCards.length === 1) {
      // in this case we have alredy selected one card
      // this means that we are finishing a move
      setOpenCards((prev) => [...prev, id]);
      setMoves((moves) => moves + 1)
      disable();
    } else {
      // in this case this is the first card we select
      clearTimeout(timeout.current);
      setOpenCards([id]);
    }
  };

  useEffect(() => {
    let oppeningTimeout: NodeJS.Timeout = setTimeout(() => { });
    const evaluate = () => {
      const [first, second] = openCards;
      enable();
      // check if first card is equal second card
      if (images[first].id === images[second].id) {
        setClearedCards((prev) => [...prev, first, second]);
        setOpenCards([]);
        return;
      }
      // flip the cards back after 500ms duration
      timeout.current = setTimeout(() => {
        setOpenCards([]);
      }, 500);
    }

    if (openCards.length === 2) {
      oppeningTimeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(oppeningTimeout);
    };
  }, [openCards, images]);

  useEffect(() => {
    const checkCompletion = () => {
      if (clearedCards.length === images.length && images.length > 0) {
        finishedGame()
      }
    }
    checkCompletion();
  }, [images, clearedCards]);

  const checkIsFlipped = (id: number) => {
    return clearedCards.includes(id) || openCards.includes(id);
  };

  const checkIsInactive = (id: number) => {
    return clearedCards.includes(id)
  };

  return (
    <div className={'board'}>
      {images.map((image, i) => {
        return <Card
          key={i}
          image={`${image.url}`}
          id={i}
          isDisabled={shouldDisableAllCards}
          isInactive={checkIsInactive(i)}
          isFlipped={checkIsFlipped(i)}
          onClick={handleCardClick}
        />
      })}
    </div>
  )
}

export default Board