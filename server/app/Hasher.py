import bcrypt
import os
_salt = bytes(os.getenv('SECRET'), 'utf-8')
bcrypt.gensalt();
class Hasher():
    @staticmethod
    def hash(string):
        return bcrypt.hashpw(bytes(string, 'utf-8'), _salt)
    @staticmethod
    def verify(string, hashed):
        if type(hashed) == bytes:
            hashed = hashed.decode('utf-8')
        return bcrypt.checkpw(bytes(string, 'utf-8'), bytes(hashed, 'utf-8'))