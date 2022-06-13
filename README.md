# Price Predictor App

The purpuse of this app is the predict the price of flats around the center of Budapest.
The Python scripts inside /create-model folder are able to create a DNN model trained by sraping data.
The rest of this project is a traditional web application, where the trained DNN modell can be called with different parameters set by the user.

To run this app inside Docker Container, please run
```bash
sudo docker-compose up
```
command.

