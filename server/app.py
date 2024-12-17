from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import os
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

CONVERSATIONS_FILE = 'conversations.json'

def load_conversations():
    if os.path.exists(CONVERSATIONS_FILE):
        with open(CONVERSATIONS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_conversations(conversations):
    with open(CONVERSATIONS_FILE, 'w') as f:
        json.dump(conversations, f, indent=2)

@app.route('/api/query', methods=['POST'])
def query():
    data = request.json
    conversation_id = str(uuid.uuid4())
    
    conversations = load_conversations()
    conversations[conversation_id] = {
        'text': data['text'],
        'additional_input': data.get('additionalInput', ''),
        'url': data['url'],
        'timestamp': datetime.now().isoformat(),
        'messages': [{
            'content': f"Selected text: {data['text']}\n\nAdditional context: {data.get('additionalInput', 'None')}",
            'timestamp': datetime.now().isoformat(),
            'role': 'user'
        }]
    }
    
    # Here you would integrate with an LLM API
    initial_response = "I understand you want to discuss the selected text. How can I help you analyze it?"
    
    conversations[conversation_id]['messages'].append({
        'content': initial_response,
        'timestamp': datetime.now().isoformat(),
        'role': 'assistant'
    })
    
    save_conversations(conversations)
    return jsonify({'conversation_id': conversation_id})

@app.route('/chat')
def chat():
    conversation_id = request.args.get('id')
    conversations = load_conversations()
    conversation = conversations.get(conversation_id, {})
    return render_template('chat.html', conversation=conversation)

@app.route('/api/messages/<conversation_id>', methods=['POST'])
def add_message(conversation_id):
    data = request.json
    conversations = load_conversations()
    
    if conversation_id in conversations:
        conversations[conversation_id]['messages'].append({
            'content': data['message'],
            'timestamp': datetime.now().isoformat(),
            'role': 'user'
        })
        
        # Here you would integrate with an LLM API
        response = f"I received your message. This is where you'd integrate with an LLM API to get a real response."
        
        conversations[conversation_id]['messages'].append({
            'content': response,
            'timestamp': datetime.now().isoformat(),
            'role': 'assistant'
        })
        
        save_conversations(conversations)
        return jsonify({'response': response})
    
    return jsonify({'error': 'Conversation not found'}), 404

if __name__ == '__main__':
    app.run(port=5000)