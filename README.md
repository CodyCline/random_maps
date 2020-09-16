# Random Maps
Demo application which generates random geo locations relative to your location and displays it 
in google maps. 

## Key features
- Python backend which generates new coordinates
- React frontend with intutive features like address search, location history


## Setting up project locally
1) Set up virtual environment for python3 
2) Install with: `pip install requirements.txt`
3) [Get an api key](https://developers.google.com/maps/documentation/javascript/get-api-key) for google maps from the console; ensure the places api is enabled
4) In `frontend` directory create a `.env` file and set the `REACT_APP_GOOGLE_MAPS_KEY` variable equal to maps api key
4) Install and start frontend: `npm i && npm start`
5) Start the backend with python3 `server.py`





