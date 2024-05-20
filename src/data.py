import json
from transformers import BertTokenizer
from torch.utils.data import DataLoader, Dataset
import torch

# JSON 파일 읽기
with open('data.json', 'r', encoding='utf-8') as f:
    hobbies_data = json.load(f)

# 리뷰와 취미를 포함하는 데이터 리스트 생성
data =  [(review, hobby) for hobby, reviews in hobbies_data.items() for review in reviews]

# KoBERT 모델과 토크나이저 로드
tokenizer = BertTokenizer.from_pretrained('monologg/kobert')

# 사용자 정의 데이터셋 클래스
class HobbyDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = self.texts[idx]
        label = self.labels[idx]
        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=self.max_len,
            return_token_type_ids=False,
            padding='max_length',
            return_attention_mask=True,
            return_tensors='pt',
            truncation=True
        )
        return {
            'text': text,
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'label': torch.tensor(label, dtype=torch.long)
        }

# 전체 취미 리스트 생성
hobbies = list(hobbies_data.keys())

# 데이터셋 생성
texts = [item[0] for item in data]
labels = [hobbies.index(item[1]) for item in data]
dataset = HobbyDataset(texts, labels, tokenizer, max_len=32)
dataloader = DataLoader(dataset, batch_size=2)

print("success!")
