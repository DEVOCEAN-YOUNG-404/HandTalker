import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "@mediapipe/camera_utils";
import {
  HAND_CONNECTIONS,
  Holistic,
  Results as HolisticResults,
  POSE_CONNECTIONS,
} from "@mediapipe/holistic";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
// import { Hands, Results } from "@mediapipe/hands";
// import { drawCanvas } from "../../../utils/translate/drawCanvas";
import { useRecoilState } from "recoil";
import { resultText } from "../../../utils/recoil/atom";

const Input = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasPoseRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<HolisticResults | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const handleUserMedia = () => setTimeout(() => setLoading(false), 1_000);
  const [text, setText] = useRecoilState(resultText);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    const imgData: string | undefined = imageSrc?.toString()?.substr(23);
    if (imgData) {
      socket.send(imgData);
      // console.log(imgData);
    }
  }, [webcamRef]);
  useEffect(() => {
    const interval = setInterval(capture, 33.33);
    return () => clearInterval(interval);
  }, [capture]);

  /**
   * 검출결과（프레임마다 호출됨）
   * @param results
   */
  const onPoseResults = useCallback((results: HolisticResults) => {
    const canvasElement = canvasPoseRef.current!;
    const canvasCtx = canvasElement.getContext("2d"); // 에러??
    if (canvasCtx === null) {
      return;
    }

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = "source-in";
    canvasCtx.fillStyle = "#00FF00";
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = "destination-atop";
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    canvasCtx.globalCompositeOperation = "source-over";
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: "#00FF00",
      lineWidth: 4,
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
      color: "#CC0000",
      lineWidth: 5,
    });
    drawLandmarks(canvasCtx, results.leftHandLandmarks, {
      color: "#00FF00",
      lineWidth: 2,
    });
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
      color: "#00CC00",
      lineWidth: 5,
    });
    drawLandmarks(canvasCtx, results.rightHandLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });
    canvasCtx.restore();
    resultsRef.current = results;
  }, []);

  // 초기설정
  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });
    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    holistic.onResults(onPoseResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      const camera = new Camera(webcamRef.current.video!, {
        onFrame: async () => {
          // await hands.send({ image: webcamRef.current!.video! });
          await holistic.send({ image: webcamRef.current!.video! });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    }
  }, [onPoseResults]);

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
  // const OutputData = () => {
  //   if (!loading) {
  //     if (webcamRef.current !== null) {
  //       const results = resultsRef.current!;
  //       if (resultsRef.current) {
  //         console.log(results.multiHandLandmarks);
  //         // 웹소켓으로 데이터 전송
  //         if (socket.readyState === WebSocket.OPEN) {
  //           socket.send(JSON.stringify(results.multiHandLandmarks));
  //         } else {
  //           console.error("ws connection is not open");
  //         }
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    const intervalId = setInterval(capture, 33.33);
    return () => {
      clearInterval(intervalId);
    };
  }, [capture]);

  return (
    <div className="">
      {loading && (
        <div className="z-10 absolute w-[20rem] h-[20rem] md:w-[25rem] xl:w-[31.25rem] md:h-[31.25rem] xl:h-[37.5rem] rounded-xl border border-gray-200 shadow-md flex items-center justify-center">
          로딩 중...
        </div>
      )}
      <div className="relative w-[20rem] h-[20rem] md:w-[25rem] xl:w-[31.25rem] md:h-[31.25rem] xl:h-[37.5rem] overflow-hidden flex flex-col items-center justify-center rounded-[15px]">
        {/* 비디오 캡쳐 */}
        <div className="w-full">
          <Webcam
            audio={false}
            style={{
              visibility: loading ? "hidden" : "visible",
              objectFit: "cover",
            }}
            width={1280}
            height={960}
            ref={webcamRef}
            onUserMedia={handleUserMedia}
            screenshotFormat="image/jpeg"
            videoConstraints={{ width: 1280, height: 960, facingMode: "user" }}
          />
        </div>

        {/* 랜드마크를 손에 표시 */}
        <canvas
          ref={canvasPoseRef}
          className="absolute w-[20rem] h-[20rem] md:w-[25rem] xl:w-[31.25rem] md:h-[31.25rem] xl:h-[37.5rem] bg-white"
          width={1280}
          height={960}
        />
      </div>
    </div>
  );
};

export default Input;
