import React from "react";
import { useForm } from "react-hook-form";
import './modal.scss';

type ModalProps = {
  toggleModal: () => void
  setPlayer: (name: string) => void
  isWinner: boolean
}

type Player = {
  username: string;
}

const Modal: React.FC<ModalProps> = ({ toggleModal, setPlayer, isWinner }) => {
  const { register, handleSubmit } = useForm<Player>();
  const onSubmit = (data: Player) => {
    setPlayer(data.username);
    toggleModal()
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn"><button onClick={toggleModal}>X</button></div>
        {
          isWinner ?
            (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="body">
                  <input type="text" className="player" id="username" {...register("username")} placeholder="Entrer ton pseudonyme pour sauvegarder la partie" />
                </div>
                <div className="footer">
                  <button id="cancelBtn" type="submit">Sauvegarder</button>
                </div>
              </form>
            ) :
            (
              <p>Temps imparti terminé, vous avez perdu!</p>
            )
        }

      </div>
    </div>
  );
};

export default Modal;