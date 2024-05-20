# recommend.py
from transformers import BertTokenizer, BertModel
import torch
import torch.nn.functional as F
from train import model, device  # train.py에서 훈련된 모델과 디바이스를 가져옴
from data import hobbies, tokenizer  # data.py에서 hobbies와 tokenizer를 가져옴

# 파인 튜닝된 모델을 사용하여 예측 함수
def recommend_hobby_finetuned(keyword):
    model.eval() # 모델을 평가 모드로 설정
    encoding = tokenizer.encode_plus(
        keyword, # 입력 키워드 
        add_special_tokens=True, # 스페셜 토큰 추가
        max_length=32, # 최대 길이 설정 
        return_token_type_ids=False, # 토큰 타입 ID 반환 안 함 
        padding='max_length', # 최대 길이까지 패딩 
        return_attention_mask=True, # 어텐션 마스크 반환 
        return_tensors='pt', # 텐서 형식으로 반환 
        truncation=True # 최대 길이를 초과하는 토큰 자르기 
    )
    input_ids = encoding['input_ids'].to(device) # input_ids를 디바이스로 이동 
    attention_mask = encoding['attention_mask'].to(device) # attention_mask를 디바이스로 이동
    with torch.no_grad(): # 그래디언트 계산 비활성화 
        outputs = model(input_ids, attention_mask=attention_mask) # 모델 출력 얻기 
    probabilities = torch.nn.functional.softmax(outputs.logits, dim=1) # 츌력 로직에 소프트맥스 적용 
    best_hobby_idx = torch.argmax(probabilities, dim=1).item() # 가장 높은 확률의 인덱스 찾기 
    return hobbies[best_hobby_idx] # 추천된 취미 반환 

if __name__ == "__main__":
    # 예제 사용: 'food' 키워드로 취미 추천
    keyword = "food" # 예제 키워드 
    recommended_hobby = recommend_hobby_finetuned(keyword) # 추천된 취미 얻기 
    print(f"Recommended hobby for '{keyword}': {recommended_hobby}") # 추천된 취미 출력 
