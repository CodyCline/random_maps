import requests
import random
import math
import json
from flask import Flask, request, abort
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

def within_range(num):
    if num in range(10000, 999999):
        return True
    else:
        return False


#Get array of quantum numbers combine into long seed
def quantum_seed():
    res = requests.get("http://qrng.anu.edu.au/API/jsonI.php?length=8&type=uint16")
    json = res.json()
    val = [str(i) for i in json["data"] ]
    return int("".join(val))


def gauss(mu, sigma, seed):
        #Pass seed from API call
        random.seed(seed)
        gauss_next = None
        z = gauss_next
        if z is None:
            x2pi = random.random() * math.tau 
            g2rad = math.sqrt(-2.0 * math.log(1.0 - random.random()))
            z = math.cos(x2pi) * g2rad
            gauss_next = math.sin(x2pi) * g2rad

        return mu + z * sigma

def trim(lat, lon):
    #Round numbers to nearest hundreth thousand then multiply
    return {
        "latitude": int(round(lat, 6) * 1000000),
        "longitude": int(round(lon, 6) * 1000000)
    }


@app.route("/location")
def location():
    mean = float(request.args.get("mean"))
    if within_range(mean):
        v = 1000000.0 #Constant for dividing to nearest hundred thousandths place
        coords = trim(float(request.args.get("latitude")), float(request.args.get("longitude")))
        latitude = float(gauss(coords["latitude"], mean, quantum_seed()))
        longitude = float(gauss(coords["longitude"], mean, quantum_seed()))
    
        return ({
            "success": True,
            "latitude": latitude / v,
            "longitude": longitude / v,
        })
    else:
        abort(400, {
            "success": False,
            "message": "bad request, check your parameters",
        })



if __name__ == "__main__":
    app.run(debug=True)