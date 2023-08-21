import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { css } from "@emotion/css";
import { Camera } from "@mediapipe/camera_utils";
import { Hands, Results } from "@mediapipe/hands";
import { drawCanvas } from "../../utils/translate/drawCanvas";

const Input = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<Results>();
  const [loading, setLoading] = useState<boolean>(true);
  const handleUserMedia = () => setTimeout(() => setLoading(false), 1_000);

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

  /*  랜드마크들의 좌표를 콘솔에 출력 */
  const OutputData = () => {
    if (!loading) {
      const results = resultsRef.current!;
      if (webcamRef.current !== null) console.log(results.multiHandLandmarks);
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
    width: 500px;
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
    width: 500px;
    height: 600px;
    background-color: #fff;
  `,
  buttonContainer: css`
    position: absolute;
    top: 20px;
    left: 20px;
  `,
  button: css`
    color: #fff;
    background-color: #0082cf;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    padding: 10px 10px;
    cursor: pointer;
  `,
};

export default Input;
