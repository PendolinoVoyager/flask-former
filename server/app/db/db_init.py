from mongoengine import connect as mongo_connect, disconnect as mongo_disconnect

def connect(uri):
    try:
        connection = mongo_connect(db='former', host=uri)

    except ConnectionError as e:
        print(f'\x1b[6;30;41mFailed to connect to MongoDB on {uri}, exiting...\x1b[0m')
        exit(1)

    print(f'\x1b[6;30;42mConnected to MongoDB on {uri}\x1b[0m')

def disconnect():
    mongo_disconnect()