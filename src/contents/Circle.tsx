/**
 * @name Circle
 * @function
 * @description Canvas Function Components
 * @return {void}
 */

import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlay } from "../common/Play";

const WIDTH = 500;
const HEIGHT = 500;

interface PathNode {
  x: number;
  y: number;
}

interface Arrow {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const arrows: Arrow[] = [
  { startX: 50, startY: 100, endX: 50, endY: 50 },
  { startX: 50, startY: 170, endX: 50, endY: 110 },

  { startX: 60, startY: 50, endX: 110, endY: 50 },
  { startX: 120, startY: 50, endX: 170, endY: 50 },

  { startX: 180, startY: 50, endX: 180, endY: 100 },
  { startX: 180, startY: 110, endX: 180, endY: 160 },

  { startX: 180, startY: 170, endX: 130, endY: 170 },
  { startX: 120, startY: 170, endX: 60, endY: 170 },
];

export const Circle = (): JSX.Element => {
  const play: boolean = useSelector((state: { play: boolean }) => state.play);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useDispatch();

  const onClickPlay = () => {
    dispatch(setPlay(!play));
  };

  const path: PathNode[] = [
    { x: 80, y: 80 },
    { x: 150, y: 80 },
    { x: 150, y: 150 },
    { x: 80, y: 150 },
    { x: 80, y: 80 },
  ];

  const circleRadius = 10;
  let currentPosition = 0;
  let percent = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw arrows
      arrows.forEach((arrow) => {
        const { startX, startY, endX, endY } = arrow;

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);

        const arrowAngle = Math.PI / 8;
        const arrowLength = 10;

        const angle1 = Math.atan2(endY - startY, endX - startX) - arrowAngle;
        const angle2 = Math.atan2(endY - startY, endX - startX) + arrowAngle;

        const arrowX1 = endX - arrowLength * Math.cos(angle1);
        const arrowY1 = endY - arrowLength * Math.sin(angle1);

        const arrowX2 = endX - arrowLength * Math.cos(angle2);
        const arrowY2 = endY - arrowLength * Math.sin(angle2);

        context.lineTo(arrowX1, arrowY1);
        context.moveTo(endX, endY);
        context.lineTo(arrowX2, arrowY2);

        context.strokeStyle = "gray";
        context.lineWidth = 2;
        context.stroke();

        context.closePath();
      });
      // Draw path and animated circle
      context.beginPath();
      context.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        context.lineTo(path[i].x, path[i].y);
      }
      context.strokeStyle = "gray";
      context.lineWidth = 2;
      context.stroke();

      const currentPathNode = path[currentPosition];
      const nextPathNode = path[(currentPosition + 1) % path.length];

      const dx = nextPathNode.x - currentPathNode.x;
      const dy = nextPathNode.y - currentPathNode.y;

      const x = currentPathNode.x + dx * percent;
      const y = currentPathNode.y + dy * percent;

      context.beginPath();
      context.arc(x, y, circleRadius, 0, 2 * Math.PI);
      context.fillStyle = "blue";
      context.fill();
      context.closePath();

      if (play) {
        percent += 0.005;
      }
      if (percent > 1) {
        percent = 0;
        currentPosition = (currentPosition + 1) % path.length;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [play]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ backgroundColor: "black" }}
      />
      <button onClick={onClickPlay}>{play ? "멈춤" : "시작"}</button>
    </div>
  );
};
