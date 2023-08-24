/**
 * @name Main
 * @function
 * @description
 * @return {void}
 */

import { Circle, Elevator } from "./index";

export const Main = (): JSX.Element => {
  return (
    <div className="App">
      <Circle />
      <Elevator />
    </div>
  );
};
