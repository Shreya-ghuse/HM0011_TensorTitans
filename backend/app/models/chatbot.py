from peewee import *
from app.models.user import BaseModel
import datetime

class Message(BaseModel):
    sender = CharField()  # 'user' or 'bot'
    text = TextField()
    timestamp = DateTimeField(default=datetime.datetime.now)