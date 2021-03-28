#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/12/25 下午9:49
# @Author  : lovemefan
# @File    : ResponseBody.py
class ResponseBody:
    """The response body of http"""
    def __init__(self, message='', status_code='', code=200):
        self.message = message
        self.status_code = status_code
        self.code = code