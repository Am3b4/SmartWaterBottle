import sqlite3

class Users:

    def __init__(self, db:str) -> None:
        
        self.connection = sqlite3.connect(db)
        self.cursor = self.connection.cursor()

        self.cursor.execute("""
                    CREATE TABLE IF NOT EXISTS Users(
                       email TEXT UNIQE PRIMARY KEY NOT NULL,
                       password TEXT NOT NULL,
                       salt TEXT NOT NULL
                       )""")
        
    def register(self, email: str, password: str, salt: str):

        try:
            with self.connection:
                self.cursor.execute("""INSERT INTO Users VALUES(?, ?, ?)""", [email, password, salt])
            return "200 OK"
        except sqlite3.IntegrityError:
            return "Already Exists"

    def getSalt(self, email: str):

        with self.connection:
            data = self.cursor.execute("SELECT salt FROM Users WHERE email=?", [str(email)])
            return data.fetchone()
        
    def login(self, email: str, pw: str):

        with self.connection:
            password = self.cursor.execute("SELECT password FROM Users WHERE email=?", [str(email)])
            password = password.fetchone()

            if password is None:
                return "Wrong Email"
            elif pw==password[0]:
                return "Correct"
            else:
                return "Wrong Password"