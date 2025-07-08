from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load the summarization model (once)
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get("text", "")
    
    if not text.strip():
        return jsonify({"summary": "No input text provided."}), 400
    
    summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
    return jsonify({"summary": summary[0]['summary_text']})

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load model only once at startup
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"summary": "⚠️ Please provide some text to summarize."}), 400

    summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
    return jsonify({"summary": summary[0]["summary_text"]})

if __name__ == "__main__":
    app.run(debug=True)
