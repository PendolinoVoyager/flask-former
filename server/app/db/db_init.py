import logging
from mongoengine import connect as mongo_connect, disconnect as mongo_disconnect
from mongoengine.connection import ConnectionFailure

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def connect(uri):
    try:
        connection = mongo_connect(db='former', host=uri)
        logger.info(f'\n\x1b[0;32mConnected to MongoDB on {uri}\x1b[0m')
        return connection
    except ConnectionFailure as e:
        logger.error(f'Failed to connect to MongoDB on {uri}, exiting...')
        exit(1)
    except Exception as e:
        logger.exception(f'An unexpected error occurred while connecting to MongoDB: {e}')
        exit(1)

def disconnect():
    try:
        mongo_disconnect()
        logger.info('Disconnected from MongoDB')
    except Exception as e:
        logger.exception(f'An error occurred while disconnecting from MongoDB: {e}')
