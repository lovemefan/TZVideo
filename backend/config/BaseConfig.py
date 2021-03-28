#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/12/21 下午7:31
# @Author  : lovemefan
# @File    : BaseConfig.py
from backend.config.Config import Config


class BaseConfig:
    """implements this class to use the get method to get config from config file
    Example :  class A(BaseConfig)  use a = A() ,you can use a.get(key:str) to get  config from config file
    """
    @staticmethod
    def get(key, default=None):
        """get value from config by the key file dynamically
        Args:
            key (str): the key of config file, example `host.ip`.
            default (str): if the key is not exist,return default as value.
        Returns:
            str : the value of config file key example : if the key is `host.ip`
            maybe it will return `localhost`
        """
        return Config.get_instance().get(key, default)
