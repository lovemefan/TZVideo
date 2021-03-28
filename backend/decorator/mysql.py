#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/12/22 下午11:14
# @Author  : lovemefan
# @File    : mysql.py
from backend.dao.DataBasePool import DataBasePool
from backend.utils.logger import logger


class Mysql:
    @staticmethod
    def execute_sql(sql):
        """this is a decorator to execute sql and autowire result into parameter named results of method
        It use the DataBase pool to get connection.
        Examples:
        @execute_sql(sql='select * from user')
        def user_list(results):
            return results
        Args:
            sql (str): sql
        """

        def decorator(func):
            def wrap(*args, **kwargs):
                logger.info(f"executing {sql}")
                results = DataBasePool.get_instance().execute(sql)
                logger.info(f"execute {sql} finished")
                return func(*args, **kwargs, results=results)

            return wrap

        return decorator

    @staticmethod
    def auto_execute_sql(func):
        """this is a decorator execute sql from the return of func method and return results of sql execution.
        Examples:
        @auto_execute_sql
        def user_list(sql):
            return 'select * from user'
        Returns:
            tuple: results of
        """

        def wrap(*args, **kwargs):
            sql = func(*args, **kwargs)
            results = DataBasePool.get_instance().execute(sql)
            return results

        return wrap
