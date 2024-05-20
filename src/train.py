# train.py

from transformers import BertForSequenceClassification, get_linear_schedule_with_warmup
import torch
from torch.optim import AdamW  # PyTorch의 AdamW 사용 최적화 알고리즘 
from data import dataloader, hobbies  # data.py에서 데이터셋과 hobbies를 가져옴

# KoBERT 모델 로드
# 사전 학습된 monologg/kobert 모델을 BertForSequenceClassification으로 로드하여 분류 작업에 사용
model = BertForSequenceClassification.from_pretrained('monologg/kobert', num_labels=len(hobbies))

# 사용 가능한 디바이스 설정 (GPU가 있으면 GPU 사용, 없으면 CPU 사용)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)  # 모델을 설정된 디바이스로 이동

# 옵티마이저와 스케줄러 설정
optimizer = AdamW(model.parameters(), lr=2e-5)  # 학습률 : 2e-5
total_steps = len(dataloader) * 4  # 총 학습 단계 수 (에포크 수 * 배치 수)
scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=0, num_training_steps=total_steps)  # 학습률 스케줄러 설정

# 손실 함수 설정
loss_fn = torch.nn.CrossEntropyLoss().to(device)  # 교차 엔트로피 손실 함수 사용 설정하고 디바이스로 이동 

# 모델 훈련 함수
def train_model(dataloader, model, optimizer, device, scheduler, loss_fn, num_epochs=4):
    model.train()  # 모델을 훈련 모드로 설정
    for epoch in range(num_epochs):  # 각 에포크에 대해 반복
        for batch in dataloader:  # 데이터로더에서 배치를 반복
            input_ids = batch['input_ids'].to(device)  # 입력 시퀀스를 디바이스로 이동
            attention_mask = batch['attention_mask'].to(device)  # 어텐션 마스크를 디바이스로 이동
            labels = batch['label'].to(device)  # 레이블을 디바이스로 이동

            outputs = model(input_ids, attention_mask=attention_mask)  # 모델에 입력하여 출력 얻기
            loss = loss_fn(outputs.logits, labels)  # 출력과 레이블을 비교하여 손실 계산
            loss.backward()  # 손실에 대한 그래디언트 계산

            optimizer.step()  # 옵티마이저를 사용하여 가중치 업데이트
            scheduler.step()  # 스케줄러를 사용하여 학습률 업데이트
            optimizer.zero_grad()  # 그래디언트 초기화

            print(f"Epoch {epoch + 1}/{num_epochs}, Loss: {loss.item()}")  # 에포크와 손실 값 출력

if __name__ == "__main__":
    train_model(dataloader, model, optimizer, device, scheduler, loss_fn)  # 모델 훈련 함수 호출
    print("train success")  # 훈련 성공 메시지 출력
