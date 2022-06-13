import logging
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi import Request, Depends, Response
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from starlette.responses import FileResponse

from src import dnn_model_handler

app = FastAPI()

router = InferringRouter()


@app.middleware("http")
async def handle_all_exception(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception:
        logging.exception('unexpected exception during request')
        return Response(content='Internal server error...', status_code=500)

app.mount(
    "/static", StaticFiles(directory="./static"), name="static")


@cbv(router)
class App:
    def __init__(self, model_handler=Depends(dnn_model_handler.ModelHandler.create)) -> None:
        self.model_handler = model_handler

    @router.get("/")
    def read_root(self):
        return FileResponse('static/website/index.html')

    @router.post("/api/predict-price")
    async def predict_price(self, request: Request):
        feature_filter = await request.json()
        price = self.model_handler.predict_price(feature_filter)
        print(print)
        return {'predictedPrice': float(price)}


app.include_router(router)
