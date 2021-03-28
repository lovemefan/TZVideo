#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/12/21 下午3:28
# @Author  : lovemefan
# @File    : app.py
import os
from time import sleep

from sanic import Sanic
import sys
from sanic.exceptions import RequestTimeout, NotFound
from sanic.response import json
from sanic_jwt import initialize
from sanic_openapi import swagger_blueprint


from backend.exception.UserException import UserAddException, UserDeleteException, UserNotExist, MissParameters
from backend.model.ResponseBody import ResponseBody
from backend.routes.userRoute.UserRoute import user_route, authenticate, retrieve_user
from backend.utils.StatusCode import StatusCode

sys.path.append(os.path.abspath(os.pardir))

from backend.config.Config import Config

app = Sanic(__name__)
app.blueprint(swagger_blueprint)
app.static("/v1/data", "../../data")

@app.exception(RequestTimeout)
async def timeout(request, exception):
    response = {
        "reasons": ['Request Timeout'],
        "exception": StatusCode.REQUEST_TIMEOUT.name
    }
    return json(response, 408)


@app.exception(NotFound)
async def notfound(request, exception):
    response = {
        "reasons": [f'Requested URL {request.url} not found'],
        "exception": StatusCode.NOT_FOUND.name
    }

    return json(response, 404)


@app.exception(MissParameters)
async def miss_parameters(request, exception):
    response = {
        "reasons": [str(exception)],
        "exception": StatusCode.MISSPARAMETERS.name
    }

    return json(response, 401)


@app.exception(UserAddException)
async def add_user_exceptin_handle(request, exception):
    response = {
        "reasons": [str(exception)],
        "exception": StatusCode.ADD_USER_FAILED.name
    }

    return json(response, 401)


@app.exception(UserNotExist)
async def add_user_exceptin_handle(request, exception):
    response = {
        "reasons": [str(exception)],
        "exception": StatusCode.USER_NOT_EXIST.name
    }

    return json(response, 401)


@app.exception(UserDeleteException)
async def delete_user_exceptin_handle(request, exception):
    response = {
        "reasons": [str(exception)],
        "exception": StatusCode.DELETE_USER_FAILED.name
    }

    return json(response, 401)

initialize(app,
           authenticate=authenticate,
           retrieve_user=retrieve_user,
           url_prefix='/v1/api/auth')


def load_banner():
    """load the banner"""
    with open('banner.txt', 'r', encoding='utf-8') as f:
        banner = f.read()

    print(banner)


app.blueprint(user_route)
if __name__ == '__main__':
    load_banner()
    port = int(Config.get_instance().get('http.port', 80))
    app.run(host="0.0.0.0", port=port)

