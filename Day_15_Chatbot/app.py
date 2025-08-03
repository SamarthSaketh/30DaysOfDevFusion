from flask import Flask, request, jsonify, render_template
from gemini_chat import chat_with_gemini

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json(force=True)
        user_message = data.get("message")
        model = data.get("model", "gemini-1.5-flash")

        if not user_message:
            return jsonify({"response": "Please send a message"}), 400

        response = chat_with_gemini(user_message, model=model)
        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"response": f"❌ Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
