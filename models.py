from pydantic import BaseModel


class User(BaseModel):
    email: str
    password: str
    salt: str

class Mail(BaseModel):
    email: str

class LoginUser(BaseModel):
    email: str
    password: str