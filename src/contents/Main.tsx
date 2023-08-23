/**
 * @name Main
 * @function
 * @description
 * @return {void}
 */

import { setPlay } from "../common/Play";
import { Canvas } from "./Canvas";
import { useDispatch, useSelector } from "react-redux";

export const Main = (): JSX.Element => {
  const dispatch = useDispatch();
  const play: boolean = useSelector((state: { play: boolean }) => state.play);

  const onClickPlay = () => {
    dispatch(setPlay(!play));
  };

  return (
    <div className="App">
      <Canvas />

      <button onClick={onClickPlay}>{play ? "멈춤" : "시작"}</button>
    </div>
  );
};
