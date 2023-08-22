import cv2
import numpy as np
import json
import asyncio
import websockets

file = np.genfromtxt('dataSet.txt', delimiter=',')
angleFile = file[:, :-1]
labelFile = file[:, -1]
angle = angleFile.astype(np.float32)
label = labelFile.astype(np.float32)

knn = cv2.ml.KNearest_create()
knn.train(angle, cv2.ml.ROW_SAMPLE, label)


# 수어 입력/연결 테스트
async def handle_client(websocket, path):
    try:
        while True:
            # 클라이언트로부터 메시지를 기다립니다.
            message = await websocket.recv()
            print(message)
            data = json.loads(message)
            if len(data) == 0:
                continue
            numpy_array = np.array([[item["x"], item["y"], item["z"]] for item in data[0]], dtype=np.float32)

            num_joints = 21
            sample_input = numpy_array

            v1 = sample_input[[0, 1, 2, 3, 0, 5, 6, 7, 0, 9, 10, 11, 0, 13, 14, 15, 0, 17, 18, 19], :]
            v2 = sample_input[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], :]
            v = v2 - v1
            v = v / np.linalg.norm(v, axis=1)[:, np.newaxis]

            compareV1 = v[[0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 16, 17], :]
            compareV2 = v[[1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19], :]
            angles = np.arccos(np.einsum('nt,nt->n', compareV1, compareV2))
            angles = np.degrees(angles)

            data = np.array([angles], dtype=np.float32)
            ret, results, neighbours, dist = knn.findNearest(data, 3)
            predicted_idx = int(results[0][0])

            gesture_mapping = {
                0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h',
                8: 'i', 9: 'j', 10: 'k', 11: 'l', 12: 'm', 13: 'n', 14: 'o',
                15: 'p', 16: 'q', 17: 'r', 18: 's', 19: 't', 20: 'u', 21: 'v',
                22: 'w', 23: 'x', 24: 'y', 25: 'z', 26: 'spacing', 27: 'backspace', 28: '1',
                29: '2', 30: '3', 31: '4', 32: '5', 33: '6', 34: '7', 35: '8', 36: '9', 37: 'b'
            }

            predicted_gesture = gesture_mapping.get(predicted_idx, "Unknown Gesture")
            result_dict = {'result': predicted_gesture}

            # Convert to JSON and print the result
            result_json = json.dumps(result_dict)
            print(result_json)
            # 클라이언트로 결과를 전송합니다.
            try:
                if websocket.open:
                    print("sended!")
                    await websocket.send(result_json)
            except Exception as e:
                print(f"send error: {str(e)}")

    except websockets.exceptions.ConnectionClosedOK:
        pass


# WebSocket 서버를 시작합니다.
start_server = websockets.serve(handle_client, "localhost", 8080)  # IP 주소와 포트를 설정합니다.


async def main():
    await start_server


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
    asyncio.get_event_loop().run_forever()

# data = [[{"x": 0.39835071563720703, "y": 0.6549023985862732, "z": 2.730793084992911e-7},
#          {"x": 0.4580234885215759, "y": 0.6442438364028931, "z": 0.0009801943087950349},
#          {"x": 0.5066753625869751, "y": 0.6244935989379883, "z": -0.0034525536466389894},
#          {"x": 0.5476424694061279, "y": 0.610180139541626, "z": -0.013971020467579365},
#          {"x": 0.5772842168807983, "y": 0.5903446674346924, "z": -0.02434759959578514},
#          {"x": 0.4772828221321106, "y": 0.5447705984115601, "z": 0.024044910445809364},
#          {"x": 0.4967559576034546, "y": 0.5022020936012268, "z": 0.012012996710836887},
#          {"x": 0.527596116065979, "y": 0.5008521676063538, "z": -0.0028282564599066973},
#          {"x": 0.5510495901107788, "y": 0.5114332437515259, "z": -0.011568420566618443},
#          {"x": 0.46255233883857727, "y": 0.5395687222480774, "z": 0.011133303865790367},
#          {"x": 0.48419228196144104, "y": 0.4892517626285553, "z": -0.000563996029086411},
#          {"x": 0.5223025679588318, "y": 0.49113595485687256, "z": -0.015673648566007614},
#          {"x": 0.5468945503234863, "y": 0.5095529556274414, "z": -0.02432868257164955},
#          {"x": 0.4456366002559662, "y": 0.5386407375335693, "z": -0.0049849203787744045},
#          {"x": 0.4655718505382538, "y": 0.48708486557006836, "z": -0.015569599345326424},
#          {"x": 0.5040145516395569, "y": 0.48932528495788574, "z": -0.024271927773952484},
#          {"x": 0.5292048454284668, "y": 0.5078690052032471, "z": -0.028112303465604782},
#          {"x": 0.4289572834968567, "y": 0.5438469052314758, "z": -0.02238011732697487},
#          {"x": 0.44601303339004517, "y": 0.5022160410881042, "z": -0.031649988144636154},
#          {"x": 0.47602739930152893, "y": 0.4976288378238678, "z": -0.034979574382305145},
#          {"x": 0.500041127204895, "y": 0.5091043710708618, "z": -0.035225510597229004}]]
#
# print(result_json)
