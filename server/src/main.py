from fastapi import FastAPI
import logging
from fastapi.staticfiles import StaticFiles
from fastapi import Request, Depends, Response
from starlette.responses import FileResponse 
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter


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
    def __init__(self) -> None:
        ...

    @app.get("/")
    def read_root():
        return FileResponse('static/index.html')


app.include_router(router)
