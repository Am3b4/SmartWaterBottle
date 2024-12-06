from database import Users
from models import User, Mail, LoginUser
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db =  Users('database.db')

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/register")
async def register(user: User):
    response = db.register(user.email, user.password, user.salt)

    if response == "Already Exists":
        return f"Account with email: {user.email} already exists"
    elif response == "200 OK":
        return "Registration complete"

@app.post("/login/salt")
async def loginSalt(email: Mail):
    salt = db.getSalt(email.email)
    if salt is None:
        return "Wrong Email"
    return salt

@app.post("/login")
async def login(loginUser: LoginUser):

    response = db.login(loginUser.email, loginUser.password)
    return response

@app.get("/getSalt")
async def getSalt():

    asciiChars = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

    salt = []
    lenght = random.randint(16, 32)

    for _ in range(int(lenght)):
        salt.append(random.choice(asciiChars))

    return ''.join(salt)