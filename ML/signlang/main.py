import json

import cv2
import numpy as np
import os
import base64
import asyncio
import websockets
from matplotlib import pyplot as plt
import time
import mediapipe as mp
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.callbacks import TensorBoard
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical  # 원핫인코딩으로 변경
from sklearn.metrics import multilabel_confusion_matrix, accuracy_score
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, MaxPooling1D, Flatten, Dense
from tensorflow.keras.optimizers.legacy import Adam
from tensorflow.keras.callbacks import EarlyStopping

mp_holistic = mp.solutions.holistic  # holistic: 인체 다양한 부분 감지(얼굴,손 등)


# mp_drawing = mp.solutions.drawing_utils # mp.holistic에서 감지한 부분 시각화

def process_frame(image_data):
    # base64 형식의 이미지 데이터를 bytes로 디코딩
    image_bytes = base64.b64decode(image_data)

    # bytes를 NumPy 배열로 변환
    np_arr = np.frombuffer(image_bytes, np.uint8)

    # NumPy 배열을 이미지로 변환
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # 이미지 처리 로직 수행
    # 예시로 그레이스케일 변환을 수행합니다.
    # gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 처리된 이미지를 다시 base64 형식으로 인코딩
    # _, encoded_img = cv2.imencode('.jpg', gray_img)
    # processed_image_data = base64.b64encode(encoded_img).decode('utf-8')

    return img


def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # COLOR CONVERSION BGR 2 RGB
    image.flags.writeable = False  # 이미지 수정 불가
    results = model.process(image)  # 모델을 사용해 입력 이미지에 대한 예측 수행
    image.flags.writeable = True  # 이미지 다시 수정가능
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)  # COLOR COVERSION RGB 2 BGR
    return image, results


def draw_landmarks(image, results):  # Draw face connections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)  # Draw pose connections
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks,
                              mp_holistic.HAND_CONNECTIONS)  # Draw left hand connections
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks,
                              mp_holistic.HAND_CONNECTIONS)  # Draw right hand connections


def draw_styled_landmarks(image, results):
    # Draw pose connections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                              mp_drawing.DrawingSpec(color=(80, 22, 10), thickness=2, circle_radius=4),
                              mp_drawing.DrawingSpec(color=(80, 44, 121), thickness=2, circle_radius=2)
                              )
    # Draw left hand connections
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                              mp_drawing.DrawingSpec(color=(121, 22, 76), thickness=2, circle_radius=4),
                              mp_drawing.DrawingSpec(color=(121, 44, 250), thickness=2, circle_radius=2)
                              )
    # Draw right hand connections
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                              mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=4),
                              mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
                              )


def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in
                     results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33 * 4)
    lh = np.array([[res.x, res.y, res.z] for res in
                   results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21 * 3)
    rh = np.array([[res.x, res.y, res.z] for res in
                   results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(
        21 * 3)
    return np.concatenate([pose, lh, rh])


current_directory = os.getcwd()
print("현재 작업 디렉토리:", current_directory)

# Path for exported data, numpy arrays
DATA_PATH = os.path.join('MP_Data')

# Actions that we try to detect
actions = np.array(['Hello', 'Love', 'Thanks', 'You', 'Me', 'Happy', 'Meet', 'Leave', 'nice to meet', 'Name'])

# Thirty videos worth of data
no_sequences = 30

# Videos are going to be 30 frames in length
sequence_length = 30

label_map = {label: num for num, label in enumerate(actions)}
print(label_map)

sequences, labels = [], []
for action in actions:
    for sequence in range(no_sequences):
        window = []
        for frame_num in range(sequence_length):  # seqeunce_length = 30
            res = np.load(os.path.join(DATA_PATH, action, str(sequence), "{}.npy".format(frame_num)))
            window.append(res)
        sequences.append(window)
        labels.append(label_map[action])

np.array(sequences).shape
# (300arrays, 30 frames in each one, 각각 258개의 key points )

X = np.array(sequences)
y = to_categorical(labels).astype(int)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

# EarlyStopping 콜백 설정
early_stopping = EarlyStopping(monitor='loss', patience=1, verbose=1, restore_best_weights=True)

# 모델 생성
model = Sequential()
model.add(Conv1D(64, 3, activation='relu', input_shape=(30, 258)))
model.add(MaxPooling1D(2))
model.add(Conv1D(128, 3, activation='relu'))
model.add(MaxPooling1D(2))
model.add(Conv1D(64, 3, activation='relu'))
model.add(MaxPooling1D(2))
model.add(Flatten())
model.add(Dense(64, activation='relu'))
model.add(Dense(32, activation='relu'))
model.add(Dense(actions.shape[0], activation='softmax'))  # 'actions'에 대한 정보가 누락됨

# optimizer 정의
optimizer = Adam(learning_rate=0.001)

# 모델 컴파일
model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['categorical_accuracy'])

# EarlyStopping 콜백을 사용하여 모델 학습
model.fit(X_train, y_train, epochs=2000, callbacks=[early_stopping])

# early_stopping에 따라 멈출 때의 모델을 사용하려면 다음과 같이 설정
# best_model = model


best_1DCNN_model = model
best_1DCNN_model.load_weights('final_action_model.h5')

yhat = best_1DCNN_model.predict(X_test)
ytrue = np.argmax(y_test, axis=1).tolist()
yhat = np.argmax(yhat, axis=1).tolist()

colors = [(245, 117, 16), (117, 245, 16), (16, 117, 245)]


def prob_viz(res, actions, input_frame, colors):
    output_frame = input_frame.copy()

    # 이전에 액션 레이블을 그리던 부분을 주석 처리하거나 삭제합니다.
    # for num, prob in enumerate(res):
    #     cv2.putText(output_frame, actions[num], (0, 85+num*40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)

    return output_frame


async def handle_client(websocket, path):
    try:
        # while True 있었음!!
        # 1. New detection variables
        sequence = []  # collect 30 frames 얘로 prediction
        sentence = []  #
        threshold = 0.95
        # concat sequec
        # cap = cv2.VideoCapture(0)
        # Set mediapipe model
        with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
            while True:
                message = await websocket.recv()
                # Read feed
                # ret, frame = cap.read()
                if message != "":
                    frame = process_frame(message)

                    # Make detections
                    image, results = mediapipe_detection(frame, holistic)
                    # print(f"result: {results}")

                    # Draw landmarks
                    # draw_styled_landmarks(image, results)

                    # 2. Prediction logic
                    keypoints = extract_keypoints(results)
                    #         sequence.insert(0,keypoints)
                    #         sequence = sequence[:30]
                    sequence.append(keypoints)
                    sequence = sequence[-30:]  # 마지막 30 frame으로 prediction 한다

                    if len(sequence) == 30:  # 30 프레임
                        res = best_1DCNN_model.predict(np.expand_dims(sequence, axis=0))[0]
                        result = actions[np.argmax(res)]
                        print(actions[np.argmax(res)])

                        # 3. Viz logic
                        if res[np.argmax(res)] > threshold:
                            if len(sentence) > 0:
                                if actions[np.argmax(res)] != sentence[-1]:
                                    sentence.append(actions[np.argmax(res)])
                            else:
                                sentence.append(actions[np.argmax(res)])  # 다르면 append 안한다

                        if len(sentence) > 5:
                            sentence = sentence[-5:]

                        # Viz probabilities
                        image = prob_viz(res, actions, image, colors)
                        result_dict = {'result': result}
                        result_json = json.dumps(result_dict)

                        try:
                            if websocket.open:
                                await websocket.send(result_json)
                        except Exception as e:
                            print(f"send error: {str(e)}")
                        print(' '.join(sentence))

                    # cv2.rectangle(image, (0, 0), (640, 40), (245, 117, 16), -1)
                    # cv2.putText(image, ' '.join(sentence), (3, 30),
                    #             cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

                    # Show to screen
                    cv2.imshow('OpenCV Feed', image)
                    # Capture key presses

            # cap.release()
            cv2.destroyAllWindows()
    except websockets.exceptions.ConnectionClosedOK:
        pass


start_server = websockets.serve(handle_client, "localhost", 8080)


async def main():
    await start_server


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
    asyncio.get_event_loop().run_forever()
