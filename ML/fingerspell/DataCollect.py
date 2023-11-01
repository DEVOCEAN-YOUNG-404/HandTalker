import cv2
import mediapipe as mp
import numpy as np

def calculate_angle(joint):
    v1 = joint[[0, 1, 2, 3, 0, 5, 6, 7, 0, 9, 10, 11, 0, 13, 14, 15, 0, 17, 18, 19], :]
    v2 = joint[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], :]
    v = v2 - v1
    # Nomalize v
    v = v / np.linalg.norm(v, axis=1)[:, np.newaxis]

    # Dot product의 아크코사인으로 각도를 구한다.
    compareV1 = v[[0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 16, 17], :]
    compareV2 = v[[1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19], :]
    angle = np.arccos(np.einsum('nt,nt->n', compareV1, compareV2))
    angle = np.degrees(angle)  # radian값을 degree로 변환

    return angle

cap = cv2.VideoCapture(0)

mp_drawing = mp.solutions.drawing_utils
mp_hands = mp.solutions.hands

with mp_hands.Hands(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as hands:

    while cap.isOpened():
        success, image = cap.read()
        if not success:
            print("Ignoring empty camera frame.")
            continue

        image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
        results = hands.process(image)

        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        if results.multi_hand_landmarks:
            for res in results.multi_hand_landmarks:
                joint = np.zeros((21, 3))
                for j, lm in enumerate(res.landmark):
                    joint[j] = [lm.x, lm.y, lm.z]

                angle = calculate_angle(joint)

                mp_drawing.draw_landmarks(
                    image, res, mp_hands.HAND_CONNECTIONS)

        cv2.imshow('MediaPipe Hands', image)

        key = cv2.waitKey(1)
        if key == ord('.'):
            if results.multi_hand_landmarks:
                # 라벨 입력 받기
                label = input("라벨을 입력하세요 (예: open_hand, closed_fist, peace_sign 등): ")

                # 라벨과 각도 값을 텍스트 파일에 저장
                with open('hand_data_with_labels.txt', 'a') as file:
                    file.write(f"{','.join(str(a) for a in angle)},{label}\n")

        elif key == 27:  # ESC 키를 누르면 루프 종료
            break

cap.release()
cv2.destroyAllWindows()