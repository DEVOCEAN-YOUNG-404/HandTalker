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

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setText("");
  };

  /*  랜드마크들의 좌표를 콘솔에 출력 및 websocket으로 전달 */
  const OutputData = useCallback(() => {
    if (webcamRef.current !== null) {
      const results = resultsRef.current!;
      if (resultsRef.current) {
        console.log(results.rightHandLandmarks);
        // 웹소켓으로 데이터 전송
        if (socketRef_hands.current.readyState === WebSocket.OPEN) {
          socketRef_hands.current.send(
            JSON.stringify(results.rightHandLandmarks)
          );
          console.log("hands sended");
        } else {
          console.error("ws connection is not open");
        }
      }
    }
  }, [webcamRef]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    const imgData: string | undefined = imageSrc?.toString()?.substr(23);
    if (imgData && !isChecked) {
      if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(imgData);
      } else {
        console.error("ws connection is not open. (8080)");
      }
      // console.log(imgData);
    }
  }, [webcamRef]);
  useEffect(() => {
    if (!isChecked) {
      const interval = setInterval(capture, 1000 / 30);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(OutputData, 1000);
      return () => clearInterval(interval);
    }
  }, [capture, webcamRef, OutputData, isChecked]);

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

  const socketRef = useRef<WebSocket>(new WebSocket("ws://localhost:8080"));
  const socketRef_hands = useRef<WebSocket>(
    new WebSocket("ws://localhost:8081")
  );

  // useEffect(() => {
  //   if (isChecked) {
  //     if (socketRef.current.readyState === WebSocket.OPEN) {
  //       socketRef.current.close();
  //       console.log("disconnected");
  //       const socket = new WebSocket("ws://localhost:8081");
  //       socketRef.current = socket; // 지문자 모드
  //       console.log("changed");
  //     }
  //   } else {
  //     if (socketRef.current.readyState === WebSocket.OPEN) {
  //       socketRef.current.close();
  //       console.log("disconnected");
  //       const socket = new WebSocket("ws://localhost:8080");
  //       socketRef.current = socket;
  //       console.log("changed");
  //     }
  //   }

  //   return () => {
  //     socketRef.current.onclose = () => {}; // 연결 종료 메시지를 방지하기 위해 빈 함수를 설정합니다.
  //     socketRef.current.close();
  //   };
  // }, [isChecked]);

  socketRef.current.onmessage = (event) => {
    console.log(`receive message: ${event.data}`);
    const jsonString = JSON.parse(event.data);
    if (isChecked) {
      setText(text + jsonString.result);
    } else {
      setText(jsonString.result);
    }
    console.log(text);
  };
  socketRef_hands.current.onmessage = (event) => {
    console.log(`receive message: ${event.data}`);
    const jsonString = JSON.parse(event.data);
    if (isChecked) {
      setText(text + jsonString.result);
    } else {
      setText(jsonString.result);
    }
    console.log(text);
  };

  useEffect(() => {
    socketRef.current.onopen = () => {
      console.log("ws connected");
    };
    socketRef.current.onclose = () => {
      console.log("ws closed");
    };
    socketRef.current.onmessage = (event) => {
      console.log(`receive message: ${event.data}`);
      const jsonString = JSON.parse(event.data);
      if (isChecked) {
        setText(text + jsonString.result);
      } else {
        setText(jsonString.result);
      }

      console.log(text);
    };
    return () => {
      socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    socketRef_hands.current.onopen = () => {
      console.log("ws connected");
    };
    socketRef_hands.current.onclose = () => {
      console.log("ws closed");
    };
    socketRef_hands.current.onmessage = (event) => {
      console.log(`receive message: ${event.data}`);
      const jsonString = JSON.parse(event.data);
      if (isChecked) {
        setText(text + jsonString.result);
      } else {
        setText(jsonString.result);
      }

      console.log(text);
    };
    return () => {
      socketRef_hands.current.close();
    };
  }, []);

  return (
    <div className="">
      {loading && (
        <div className="z-10 absolute w-[20rem] h-[20rem] md:w-[25rem] xl:w-[37.5rem] md:h-[31.25rem] xl:h-[37.5rem] rounded-xl border border-gray-200 shadow-md flex items-center justify-center">
          로딩 중...
        </div>
      )}
      <label className="absolute z-10 inline-flex items-center mt-2 ml-2 cursor-pointer select-none themeSwitcherTwo">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <span className="flex items-center text-sm font-medium text-black text-white font-main label">
          지문자 모드
        </span>
        <span
          className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-main-2" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-[28px]" : ""
            }`}
          ></span>
        </span>
      </label>
      <div className="-scale-x-100 relative w-[20rem] h-[20rem] md:w-[25rem] xl:w-[37.5rem] md:h-[31.25rem] xl:h-[37.5rem] overflow-hidden flex flex-col items-center justify-center rounded-[15px]">
        {/* 비디오 캡쳐 */}

        <Webcam
          audio={false}
          style={{
            visibility: loading ? "hidden" : "visible",
            objectFit: "fill",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          mirrored={false}
          width={600}
          height={600}
          ref={webcamRef}
          onUserMedia={handleUserMedia}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 600, height: 600, facingMode: "user" }}
        />

        {/* 랜드마크를 손에 표시 */}
        <canvas
          ref={canvasPoseRef}
          className="absolute w-[20rem] h-[20rem] md:w-[25rem] xl:w-[37.5rem] md:h-[31.25rem] xl:h-[37.5rem] bg-white"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
};

export default Input;
