from flask import Blueprint, request, jsonify
from models import get_notifications_collection
from datetime import datetime

notification_bp = Blueprint('notification', __name__)

@notification_bp.route('/notification', methods=['POST'])
def create_notification():
    data = request.get_json()
    user_id = data.get('user_id')
    message = data.get('message')

    notification = {
        'user_id': user_id,
        'message': message,
        'timestamp': datetime.now()
    }
    
    notifications = get_notifications_collection()
    notifications.insert_one(notification)

    return jsonify({'message': 'Notification created successfully'}), 201

@notification_bp.route('/notifications', methods=['GET'])
def get_notifications():
    notifications = get_notifications_collection()
    notifications_list = list(notifications.find({}, {'_id': 0}))
    return jsonify(notifications_list), 200