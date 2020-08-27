import requests
import random
import math
import json
from flask import Flask, request
app = Flask(__name__)

#Get array of quantum numbers combine into long seed
def quantum_seed():
    res = requests.get("http://qrng.anu.edu.au/API/jsonI.php?length=8&type=uint16")
    json = res.json()
    val = [str(i) for i in json["data"] ]
    return int("".join(val))


if __name__ == "__main__":
    app.run(debug=True)