import pymysql 

DB_NAME = 'AplicacionesWeb'
DB_HOST = 'localhost'
DB_PORT = 3306
DB_USERNAME = 'root'
DB_PASSWORD = 'Manzana12345'
DB_CHARSET = 'utf8'

def get_connection():
    
    try:
        connection = pymysql.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USERNAME,
            password=DB_PASSWORD,
            db=DB_NAME,
            charset=DB_CHARSET
        )
        return connection
    except pymysql.MySQLError as e:
        print(f"Error connecting to MySQL: {e}")
        return None
    






