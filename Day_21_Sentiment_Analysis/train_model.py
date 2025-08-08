# train_model.py
import nltk
from nltk.corpus import movie_reviews, stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import random
import pickle

nltk.download('movie_reviews')
nltk.download('stopwords')

# Load data
documents = [(list(movie_reviews.words(fileid)), category)
             for category in movie_reviews.categories()
             for fileid in movie_reviews.fileids(category)]
random.shuffle(documents)

# Preprocessing
stop_words = set(stopwords.words('english'))
def preprocess(words):
    words = [w.lower() for w in words if w.isalpha()]
    words = [w for w in words if w not in stop_words]
    return " ".join(words)

texts = [preprocess(words) for words, label in documents]
labels = [label for words, label in documents]

# Vectorize
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

# Train
model = LogisticRegression()
model.fit(X, labels)

# Save model & vectorizer
pickle.dump(model, open("sentiment_model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))

print("✅ Model and vectorizer saved!")
