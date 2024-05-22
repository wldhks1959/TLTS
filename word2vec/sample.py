from gensim.models import FastText

# 예제 문서
sentences = [["나는", "오늘", "학교에", "갔다"], ["학교에서는", "많은", "수업이", "진행되었다"], ["수업이", "끝난", "후", "집에", "돌아왔다"]]

# FastText 모델 학습
model = FastText(sentences, vector_size=100, window=5, min_count=1, workers=4)

# 단어를 벡터로 변환
word_vector = model.wv['학교']
print(word_vector)
