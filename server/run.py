import os
import globals #sets up env
from app import create_app
app = create_app()

if __name__ == '__main__':
    app.run(port=os.getenv('PORT'), host=os.getenv('HOST'))
