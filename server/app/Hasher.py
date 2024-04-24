import bcrypt
import os
_salt = bytes(os.getenv('SECRET'), 'utf-8')
class Hasher():
    @staticmethod
    def hash(string):
        return bcrypt.hashpw(bytes(string, 'utf-8'), _salt)
    @staticmethod
    def verify(string, hashed):
        return bcrypt.checkpw(bytes(string, 'utf-8'), bytes(hashed, 'utf-8') if type(hashed) == str else hashed)