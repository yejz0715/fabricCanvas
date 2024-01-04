import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
// import { IEvent } from "fabric/fabric-impl";
// import { Rect } from "fabric/fabric-impl";
// type PointerType = {
//   x: number;
//   y: number;
// };
const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);

  const selectCanvasTool = (tool: string) => {
    if (!fabricRef || !fabricRef.current) return;
    if (tool === "pen") {
      fabricRef!.current.isDrawingMode = true;
      fabricRef.current.freeDrawingBrush.color = "black";
      fabricRef.current.freeDrawingBrush.width = 5;
      console.log("선택한 tool:", tool);
    } else {
      fabricRef!.current.isDrawingMode = false;
      // handleText();
      console.log("선택한 tool:", tool);
    }

    fabricRef.current.renderAll();
  };

  useEffect(() => {
    const initCanvas = () => {
      if (!canvasRef || !canvasRef.current) return;

      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 800,
        backgroundColor: "white",
      });

      fabricRef!.current = canvas;
    };

    initCanvas();
  }, []);
  return (
    <div>
      <canvas
        id="canvas"
        ref={canvasRef}
        className="border-solid border-2 border-indigo-600 "
      />
      <button id="pen" onClick={() => selectCanvasTool("pen")}>
        펜
      </button>
      <button id="text" onClick={() => selectCanvasTool("text")}>
        텍스트
      </button>
    </div>
  );
};

export default Canvas;
