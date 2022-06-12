from tensorflow import keras
import logging
import json
import numpy as np


class ModelHandler:
    def __init__(self) -> None:
        self.model = load_model()
        self.feature_order = load_json('./data/feature_order.json')[1:]
        self.features = {f['key']: f for f in load_json(
            './static/features.json')}

    def predict_price(self, feature_filter) -> float:
        input_arr = self.__construct_input_arr(feature_filter)
        price = self.model.predict(input_arr)[0, 0]
        return price

    def __construct_input_arr(self, feature_filter) -> np.array:
        input_arr = np.zeros((1, len(self.feature_order)))
        for key, value in feature_filter.items():
            feature = self.features[key]
            if feature['type'] == 'numeric':
                input_arr[0, self.feature_order.index(key)] = value
            elif feature['type'] == 'enum':
                column_name = f'{key}_{value}'
                input_arr[0, self.feature_order.index(column_name)] = 1
        return input_arr


def create_model_handler() -> ModelHandler:
    return ModelHandler()


def load_model():
    try:
        return keras.models.load_model(
            './data/price_predictor_model')
    except OSError:
        logging.error('failed to load the price_predictor_model')


def load_json(path):
    with open(path) as f:
        return json.loads(f.read())
    logging.error('failed to load json: %s', path)
