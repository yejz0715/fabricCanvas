import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { stickerList } from "../../dummy";
/**
 * 그림판을 나타내는 컴포넌트
 * @returns {JSX.Element} Canvas 컴포넌트
 */
const Canvas = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [isStickerModalOpen, setIsStickerModalOpen] = useState<boolean>(false);
  const [isPencilModalOpen, setIsPencilModalOpen] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<string>("#333333");
  const [currentWidth, setCurrentWidth] = useState<number>(10);

  /** 펜의 칼라를 선택하는 함수 */
  const handleSelectColor = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setCurrentColor(value);
  };

  /** 펜의 두께를 선택하는 함수 */
  const handleSelectWidth = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setCurrentWidth(Number(value));
  };

  /** 텍스트를 추가하는 함수 */
  const createText = () => {
    if (!fabricRef || !fabricRef.current) return;
    const text = new fabric.Textbox("hi", {
      left: 100,
      top: 100,
    });
    fabricRef.current.add(text);
  };

  /** 선택한 스티커를 추가하는 함수  */
  const handleSelectSticker = (img: string) => {
    if (!fabricRef || !fabricRef.current || !img) return;
    fabric.Image.fromURL(img, (sticker) => {
      fabricRef.current!.add(sticker);
    });
  };

  /** 그림판 도구를 선택하는 함수 */
  const selectCanvasTool = (tool: string) => {
    if (!fabricRef || !fabricRef.current) return;
    if (tool === "pen") {
      setIsPencilModalOpen((prev) => !prev);
      fabricRef!.current.isDrawingMode = true;
      fabricRef.current.freeDrawingBrush.color = currentColor;
      fabricRef.current.freeDrawingBrush.width = currentWidth;
    } else {
      fabricRef!.current.isDrawingMode = false;
      if (tool === "text") {
        createText();
      } else {
        setIsStickerModalOpen((prev) => !prev);
      }
    }

    fabricRef.current.renderAll();
  };

  useEffect(() => {
    const initCanvas = () => {
      if (!canvasRef || !canvasRef.current) return;

      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        backgroundColor: "white",
      });

      fabricRef!.current = canvas;
    };

    initCanvas();
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <canvas
        id="canvas"
        ref={canvasRef}
        className="mt-4 mb-4 border-solid border-2 border-black-800"
      />
      <article className="flex flex-rol gap-2 mt-2">
        <button
          id="pen"
          onClick={() => selectCanvasTool("pen")}
          className="p-[2px] border border-[#333333] rounded-[4px]"
        >
          펜
        </button>
        <button
          id="text"
          onClick={() => selectCanvasTool("text")}
          className="p-[2px] border border-[#333333] rounded-[4px]"
        >
          텍스트
        </button>
        <button
          id="text"
          onClick={() => selectCanvasTool("sticker")}
          className=" p-[2px] border border-[#333333] rounded-[4px]"
        >
          스티커
        </button>
      </article>
      {isPencilModalOpen && (
        <div>
          <input
            type="color"
            value={currentColor}
            onChange={handleSelectColor}
          />
          <input
            type="range"
            min="10"
            max="50"
            step="10"
            value={currentWidth}
            onChange={handleSelectWidth}
          />
        </div>
      )}
      {isStickerModalOpen && (
        <div className="flex">
          {stickerList?.map((sticker, index) => (
            <img
              key={index}
              src={sticker.url}
              alt={sticker.name}
              onClick={() => handleSelectSticker(sticker.url)}
              width="44px"
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Canvas;
