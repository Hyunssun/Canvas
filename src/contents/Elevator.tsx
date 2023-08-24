/**
 * @name Elevator
 * @function
 * @description Canvas Function Components
 * @return {void}
 */

import { useRef, useEffect, useState } from "react";

const WIDTH = 500;
const HEIGHT = 500;

interface Elevator {
  x: number;
  y: number;
  width: number;
  height: number;
  floorHeight: number;
  currentFloor: number;
  targetFloor: number | null;
}

export const Elevator = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [elevator, setElevator] = useState<Elevator>({
    x: 50,
    y: HEIGHT - 100,
    width: 50,
    height: 50,
    floorHeight: (HEIGHT - 100) / 5,
    currentFloor: 0,
    targetFloor: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw floors
    for (let i = 0; i < 5; i++) {
      const floorY = i * elevator.floorHeight;
      context.fillStyle = "gray";
      context.fillRect(0, floorY, WIDTH, 5);
    }

    // Draw elevator
    context.fillStyle = "blue";
    context.fillRect(elevator.x, elevator.y, elevator.width, elevator.height);

    // Update elevator position
    if (elevator.targetFloor !== null) {
      const targetY = elevator.targetFloor * elevator.floorHeight;
      if (elevator.y > targetY) {
        setElevator((prevElevator) => ({
          ...prevElevator,
          y: prevElevator.y - 2,
        }));
      } else if (elevator.y < targetY) {
        setElevator((prevElevator) => ({
          ...prevElevator,
          y: prevElevator.y + 2,
        }));
      } else {
        setElevator((prevElevator) => ({
          ...prevElevator,
          currentFloor: prevElevator.targetFloor!,
          targetFloor: null,
        }));
      }
    }
  }, [elevator]);

  const moveElevatorToFloor = (floor: number) => {
    if (floor !== elevator.currentFloor) {
      setElevator((prevElevator) => ({
        ...prevElevator,
        targetFloor: floor,
      }));
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ backgroundColor: "black" }}
      />
      <button onClick={() => moveElevatorToFloor(4)}>1F</button>
      <button onClick={() => moveElevatorToFloor(3)}>2F</button>
      <button onClick={() => moveElevatorToFloor(2)}>3F</button>
      <button onClick={() => moveElevatorToFloor(1)}>4F</button>
      <button onClick={() => moveElevatorToFloor(0)}>5F</button>
    </div>
  );
};
