import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "@mediapipe/camera_utils";
import { Hands, Results } from "@mediapipe/hands";
import { drawCanvas } from "../../../utils/translate/drawCanvas";
import { useRecoilState } from "recoil";
import { resultText } from "../../../utils/recoil/atom";

const Input = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<Results>();
  const [loading, setLoading] = useState<boolean>(true);
  const handleUserMedia = () => setTimeout(() => setLoading(false), 1_000);
  const [text, setText] = useRecoilState(resultText);

  /**
   * 검출결과（프레임마다 호출됨）
   * @param results
   */
  const onResults = useCallback((results: Results) => {
    resultsRef.current = results;

    const canvasCtx = canvasRef.current!.getContext("2d")!;
    drawCanvas(canvasCtx, results);
  }, []);

  // 초기설정
  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      const camera = new Camera(webcamRef.current.video!, {
        onFrame: async () => {
          try {
            await hands.send({ image: webcamRef.current!.video! });
          } catch (e) {
            console.log(e);
          }
        },
        width: 500,
        height: 600,
      });
      camera.start();
    }
  }, [onResults]);

  const socket = new WebSocket("ws://localhost:8080");
  socket.onmessage = (event) => {
    console.log(`receive message: ${event.data}`);
    const jsonString = JSON.parse(event.data);
    setText(text + jsonString.result);
    console.log(text);
  };

  useEffect(() => {
    socket.onopen = () => {
      console.log("ws connected");
    };
    socket.onclose = () => {
      console.log("ws closed");
    };
    socket.onmessage = (event) => {
      console.log(`receive message: ${event.data}`);
    };
    return () => {
      socket.close();
    };
  }, []);

  /*  랜드마크들의 좌표를 콘솔에 출력 및 websocket으로 전달 */
  const OutputData = () => {
    if (!loading) {
      if (webcamRef.current !== null) {
        const results = resultsRef.current!;
        if (resultsRef.current) {
          console.log(results.multiHandLandmarks);
          // 웹소켓으로 데이터 전송
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(results.multiHandLandmarks));
          } else {
            console.error("ws connection is not open");
          }
        }
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(OutputData, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className="">
      {loading && (
        <div className="z-10 absolute w-[20rem] h-[20rem] md:w-[25rem] xl:w-[31.25rem] md:h-[31.25rem] xl:h-[37.5rem] rounded-xl border border-gray-200 shadow-md flex items-center justify-center">
          로딩 중...
        </div>
      )}
      <div className="relative w-[20rem] h-[20rem] md:w-[25rem] xl:w-[31.25rem] md:h-[31.25rem] xl:h-[37.5rem] overflow-hidden flex flex-col items-center justify-center rounded-[15px]">
        {/* 비디오 캡쳐 */}
        <div>
          <Webcam
            audio={false}
            style={{ visibility: loading ? "hidden" : "visible" }}
            width={500}
            height={600}
            ref={webcamRef}
            onUserMedia={handleUserMedia}
            screenshotFormat="image/jpeg"
            videoConstraints={{ width: 500, height: 600, facingMode: "user" }}
          />
        </div>

        {/* 랜드마크를 손에 표시 */}
        <canvas
          ref={canvasRef}
          className="absolute w-[20rem] h-[20rem] md:w-[25rem] xl:w-[31.25rem] md:h-[31.25rem] xl:h-[37.5rem] bg-white"
          width={500}
          height={600}
        />
      </div>
    </div>
  );
};

export default Input;
