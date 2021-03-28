#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/12/24 下午3:35
# @Author  : lovemefan
# @File    : UserException.py
from sanic.exceptions import SanicException, add_status_code


@add_status_code(400)
class MissParameters(SanicException):
    pass

class UserCreateException(Exception):
    def __init__(self, description):
        self.description = description

    def __str__(self):
        return f"User create Failed:'{self.description}'"


class UserNotExist(Exception):
    def __init__(self, username):
        self.username = username

    def __str__(self):
        return f"User '{self.username}' is not exist"


class UserAddException(SanicException):
    pass


class UserAlreadyExist(Exception):
    def __init__(self, username):
        self.username = username

    def __str__(self):
        return f"User '{self.username}' is already exist"


class UserDeleteException(SanicException):
    pass
