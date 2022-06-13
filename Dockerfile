# Build client
FROM node:16.0 AS client_build
WORKDIR /client
COPY client/package.json ./
RUN npm install
COPY client/.env.production ./
COPY client/jsconfig.json ./
COPY client/src ./src
COPY client/public ./public
RUN npm run build

# Build server
FROM python:3.8

WORKDIR /app
COPY ./server/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./server/src ./server/src
# Copy dnn model and features info
COPY ./model-creation/price_predictor_model ./server/data/price_predictor_model
COPY ./model-creation/feature_order.json ./server/data/
COPY ./model-creation/features.json ./server/static/

# Copy client
COPY --from=client_build /client/build ./server/static/website

WORKDIR /app/server

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]