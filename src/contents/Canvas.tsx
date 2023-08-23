/**
 * @name Canvas
 * @function
 * @description Canvas Function Components
 * @return {void}
 */

import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const WIDTH = 900;
const HEIGHT = 900;

interface PathNode {
  x: number;
  y: number;
}

export const Canvas = (): JSX.Element => {
  const play: boolean = useSelector((state: { play: boolean }) => state.play);
  console.log(`111`, play);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const path: PathNode[] = [
    { x: WIDTH / 2 - 300, y: HEIGHT / 2 },
    { x: WIDTH / 2 + 300, y: HEIGHT / 2 },
  ];

  const circleRadius = 20;
  let currentPosition = 0;
  let percent = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // 윤곽선 경로 시작
      context.beginPath();
      context.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        context.lineTo(path[i].x, path[i].y);
      }
      // 윤곽선 색상 설정
      context.strokeStyle = 'gray';
      // 윤곽선 굵기 설정
      context.lineWidth = 2;
      // 경로의 윤곽선 그리기
      context.stroke();

      // 현재 경로 노드의 좌표를 가져옴
      const currentPathNode = path[currentPosition];
      const nextPathNode = path[(currentPosition + 1) % path.length];

      // 다음 경로 노드와의 차이를 계산하여 움직이는 방향을 정함
      const dx = nextPathNode.x - currentPathNode.x;
      const dy = nextPathNode.y - currentPathNode.y;

      // 원 좌표
      const x = currentPathNode.x + dx * percent;
      const y = currentPathNode.y + dy * percent;

      // 원 경로 시작
      context.beginPath();
      // 원 크기 설정
      context.arc(x, y, circleRadius, 0, 2 * Math.PI);
      // 원 색상 설정
      context.fillStyle = 'blue';
      // 원 채우기
      context.fill();

      // 경로 끝
      context.closePath();

      if (play) {
        percent += 0.005;
        if (percent > 1) {
          percent = 0;
          currentPosition = (currentPosition + 1) % path.length;
        }
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
        style={{ border: '5px solid gray', backgroundColor: 'black' }}
      />
    </div>
  );
};
