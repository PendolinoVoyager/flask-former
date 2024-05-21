def error_wrapper(action):
    def wrapper(*args, **kwargs):
        try:
            return action(*args, **kwargs)
        except Exception as e:
            if os.getenv('ENV') == 'development':  
                print(e)
            return {'status': "fail", "message": str(e)}, 400
    return wrapper
