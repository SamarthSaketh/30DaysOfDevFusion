from flask import Flask, render_template, request
import pickle
import string

# Load model & vectorizer
model = pickle.load(open("sentiment_model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

app = Flask(__name__)

def predict_sentiment(text):
    text = text.lower()
    text = "".join([ch for ch in text if ch not in string.punctuation])
    X = vectorizer.transform([text])
    prediction = model.predict(X)[0]
    prob = model.predict_proba(X).max()
    return prediction, prob

@app.route("/", methods=["GET", "POST"])
def index():
    sentiment = None
    confidence = None
    if request.method == "POST":
        user_text = request.form["user_text"]
        sentiment, confidence = predict_sentiment(user_text)
        confidence = round(confidence * 100, 2)
    return render_template("index.html", sentiment=sentiment, confidence=confidence)

if __name__ == "__main__":
    app.run(debug=True)
