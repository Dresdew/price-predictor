from fastapi import FastAPI
import logging
from fastapi.staticfiles import StaticFiles
from fastapi import Request, Depends, Response
from starlette.responses import FileResponse
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
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
    def __init__(self, model_handler=Depends(dnn_model_handler.create_model_handler)) -> None:
        self.model_handler = model_handler

    @router.get("/")
    def read_root(self):
        # print(self.model_handler)
        # return FileResponse('static/index.html')
        return "hello"

    @router.post("/api/predict-price")
    async def predict_price(self, request: Request):
        feature_filter = await request.json()
        price = self.model_handler.predict_price(feature_filter)
        print(print)
        return {'predictedPrice': float(price)}


app.include_router(router)
