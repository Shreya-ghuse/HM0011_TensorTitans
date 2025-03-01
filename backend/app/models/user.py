from peewee import *
from app.config import Config

# Initialize Peewee Database
db = SqliteDatabase(Config.DATABASE_PATH)

# Base Model
class BaseModel(Model):
    class Meta:
        database = db

# User Model
class User(BaseModel):
    id = AutoField()
    email = CharField(unique=True)
    password = CharField()
    full_name = CharField()
    role = CharField()
    is_verified = BooleanField(default=False)
    credentials = TextField(null=True)
    license_number = CharField(null=True)
