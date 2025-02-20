# File: crud.py
import os, json, uuid
from datetime import datetime
from typing import List

DATA_DIR = "./data/conversations"

def ensure_data_dir():
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    return DATA_DIR

def get_conversation_filepath(user_id: str, session_id: str) -> str:
    ensure_data_dir()
    return os.path.join(DATA_DIR, f"{user_id}_{session_id}.json")

# Save a message to a conversation JSON file.
def save_message(id: str, user_id: str, session_id: str, message: dict, agents: dict, run_mode_locally: bool, timestamp: str):
    filepath = get_conversation_filepath(user_id, session_id)
    if os.path.exists(filepath):
        with open(filepath, "r") as f:
            conversation = json.load(f)
    else:
        conversation = {
            "id": str(id),
            "user_id": user_id,
            "session_id": session_id,
            "messages": [],
            "agents": agents,
            "run_mode_locally": run_mode_locally,
            "timestamp": timestamp
        }
    # Append message with timestamp
    # message["id"] = str(uuid.uuid4())
    # message["timestamp"] = datetime.now().isoformat()
    conversation["messages"].append(message)
    with open(filepath, "w") as f:
        json.dump(conversation, f, indent=2)
    return conversation

# Retrieve a single conversation.
def get_conversation(user_id: str, session_id: str):
    filepath = get_conversation_filepath(user_id, session_id)
    if os.path.exists(filepath):
        with open(filepath, "r") as f:
            return json.load(f)
    return None

def extract_session_id(filepath: str) -> str:
    filename = os.path.basename(filepath)
    session_id = filename.split('_', 1)[-1].rsplit('.', 1)[0]
    return session_id

# List all conversations.
def get_all_conversations() -> List[dict]:
    ensure_data_dir()
    conversations = []
    for fname in os.listdir(DATA_DIR):
        if fname.endswith(".json"):
            path = os.path.join(DATA_DIR, fname)
            try:
                with open(path, "r") as f:
                    conversations.append(json.load(f))
            except json.JSONDecodeError:
                print(f"Error decoding JSON from file {path}")
                conversations.append({
                        "id": "DUMMY-b666-4943-9c3d-ec9482751601",
                        "user_id": "user123",
                        "session_id": extract_session_id(path),
                        "messages": [],
                        "agents": [],
                        "run_mode_locally": "false",
                        "timestamp": "ERROR"

                    })
    return conversations

# List conversations for a particular user.
def get_user_conversations(user_id: str):
    ensure_data_dir()
    conversations = []
    for fname in os.listdir(DATA_DIR):
        if fname.startswith(user_id+"_") and fname.endswith(".json"):
            path = os.path.join(DATA_DIR, fname)
            with open(path, "r") as f:
                conversations.append(json.load(f))
    return conversations

def delete_conversation(user_id: str, session_id: str) -> bool:
    filepath = get_conversation_filepath(user_id, session_id)
    if os.path.exists(filepath):
        os.remove(filepath)
        return True
    return False