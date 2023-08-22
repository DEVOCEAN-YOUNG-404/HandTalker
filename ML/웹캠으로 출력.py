import cv2
import mediapipe as mp
import numpy as np
import json
import keyboard
import time

max_num_hands = 1

gesture = {
    0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h',
    8: 'i', 9: 'j', 10: 'k', 11: 'l', 12: 'm', 13: 'n', 14: 'o',
    15: 'p', 16: 'q', 17: 'r', 18: 's', 19: 't', 20: 'u', 21: 'v',
    22: 'w', 23: 'x', 24: 'y', 25: 'z', 26: 'spacing', 27: 'backspace', 28:'1',
    29: '2', 30: '3', 31: '4', 32: '5', 33: '6', 34: '7', 35:'8', 36: '9', 37:'0'
}

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(
    max_num_hands=max_num_hands,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

file = np.genfromtxt('dataSet.txt', delimiter=',')
angleFile = file[:, :-1]
labelFile = file[:, -1]
angle = angleFile.astype(np.float32)
label = labelFile.astype(np.float32)

knn = cv2.ml.KNearest_create()
knn.train(angle, cv2.ml.ROW_SAMPLE, label)
cap = cv2.VideoCapture(0)

startTime = time.time()
prev_index = 0
sentence = ''
recognizeDelay = 1

output_data = {'gestures': [], 'text': ''}

while True:
    ret, img = cap.read()
    if not ret:
        continue
    img = cv2.flip(img, 1)  # 이미지를 좌우 반전시켜 원래 방향으로 표시

    result = hands.process(img)

    if result.multi_hand_landmarks is not None:
        for res in result.multi_hand_landmarks:
            joint = np.zeros((21, 3))
            for j, lm in enumerate(res.landmark):
                joint[j] = [lm.x, lm.y, lm.z]

            v1 = joint[[0, 1, 2, 3, 0, 5, 6, 7, 0, 9, 10, 11, 0, 13, 14, 15, 0, 17, 18, 19], :]
            v2 = joint[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], :]
            v = v2 - v1
            v = v / np.linalg.norm(v, axis=1)[:, np.newaxis]

            compareV1 = v[[0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 16, 17], :]
            compareV2 = v[[1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19], :]
            angle = np.arccos(np.einsum('nt,nt->n', compareV1, compareV2))
            angle = np.degrees(angle)

            data = np.array([angle], dtype=np.float32)
            ret, results, neighbours, dist = knn.findNearest(data, 3)
            idx = int(results[0][0])

            if idx in gesture.keys():
                if idx != prev_index:
                    startTime = time.time()
                    prev_index = idx
                else:
                    if time.time() - startTime > recognizeDelay:
                        if idx == 26:
                            sentence += ' '
                        elif idx == 27:
                            if len(sentence) > 0:
                                sentence = sentence[:-1]  # 마지막 문자 제거
                        else:
                            sentence += gesture[idx]
                        startTime = time.time()

                cv2.putText(img, gesture[idx].upper(), (int(res.landmark[0].x * img.shape[1] - 10),
                                                        int(res.landmark[0].y * img.shape[0] + 40)),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 3)

            mp_drawing.draw_landmarks(img, res, mp_hands.HAND_CONNECTIONS)
            cv2.putText(img, sentence, (20, 440), cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 3)

    cv2.imshow('HandTracking', img)

    key = cv2.waitKey(1)
    if key == ord('.'):
        output_data['text'] = sentence
        json_filename = 'output_data.json'
        with open(json_filename, 'w') as json_file:
            json.dump(output_data, json_file, indent=4)
        break

cap.release()
cv2.destroyAllWindows()
