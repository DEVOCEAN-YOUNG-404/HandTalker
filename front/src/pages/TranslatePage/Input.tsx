import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { css } from "@emotion/css";
import { Camera } from "@mediapipe/camera_utils";
import { Hands, Results } from "@mediapipe/hands";
import { drawCanvas } from "../../utils/translate/drawCanvas";
import { useRecoilState } from "recoil";
import { resultText } from "../../utils/recoil/atom";

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
    <div className="h-[600px]">
      {loading && (
        <div className="z-10 absolute w-[500px] h-[600px] rounded-xl border border-gray-200 shadow-md flex mt-[16px] items-center justify-center">
          로딩 중...
        </div>
      )}
      <div className={styles.container}>
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
          className={styles.canvas}
          width={500}
          height={600}
        />
        {/* 좌표 출력 */}
        {/* <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={OutputData}>
          Output Data
        </button>
      </div> */}
      </div>
    </div>
  );
};

const styles = {
  container: css`
    position: relative;
    width: 31.25rem;
    height: auto;
    overflow: hidden;
    display: flex;
    margin-top: 16px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
  `,
  canvas: css`
    position: absolute;
    width: 31.25rem;
    height: 37.5rem;
    background-color: #fff;
  `,
};

export default Input;
