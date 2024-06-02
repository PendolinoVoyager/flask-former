import base64
import os
import uuid

from server.app.globals import G_CONFIG
def error_wrapper(action):
    def wrapper(*args, **kwargs):
        try:
            return action(*args, **kwargs)
        except Exception as e:
            if os.getenv('ENV') == 'development':  
                print(e)
            return {'status': "fail", "message": str(e)}, 400
    return wrapper

#saves the file to static and returns it's relative path
def save_file(base64_encoded_string) -> str:
    # Decode the image data from base64
    image = base64.b64decode(base64_encoded_string.split(',')[1])
    # Generate a unique filename using UUID
    image_filename = f"{uuid.uuid4()}.jpg"
    # Construct the path to save the image
    image_path = os.path.join(G_CONFIG["STATIC_DIR"], image_filename)
    
    # Save the image to the file system
    with open(image_path, "wb") as f:
        f.write(image)
    
    # Return the filename
    return image_filename
