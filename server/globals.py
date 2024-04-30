import os
from dotenv import load_dotenv
load_dotenv()
#source the G_CONFIG to prevent cross-imports
G_CONFIG = {
    "ENV":  os.getenv('ENV'),
    "SECRET": os.getenv('SECRET', 'utf-8'),
    "DB_URI": os.getenv('DB_URI'),
    "STATIC_DIR": os.path.join(os.getcwd(), os.getenv("STATIC_DIR")),
    "RESULTS_PER_PAGE": 10,
}