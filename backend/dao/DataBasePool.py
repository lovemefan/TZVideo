#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/12/22 下午10:23
# @Author  : lovemefan
# @File    : DBOperation.py
# using lock to make sure get one config at same time
import threading

import pymysql
from dbutils.persistent_db import PersistentDB

from backend.config.BaseConfig import BaseConfig
from backend.utils.logger import logger

lock = threading.Lock()


class DataBasePool(BaseConfig):
    """DataBase pool
    To get connection from database pool
    Example : DataBasePool.get_instance()
    """
    __instance = None

    def __init__(self):
        config = {
            'host': self.get('mysql.host'),
            'port': int(self.get('mysql.port')),
            'database': self.get('mysql.db_name'),
            'user': self.get('mysql.user'),
            'password': self.get('mysql.password'),
            'charset': 'utf8'
        }
        self.poolDB = PersistentDB(
            # use pymysql as mysql database driver
            creator=pymysql,
            # max number usage of one connection,0 or None is no limits,default is 0
            maxusage=int(self.get('mysql.maxusage')),
            **config
        )

    def execute(self, sql):
        """execute sql by a connection from database pool
        Args:
            sql (str): sql
        Returns:
            list: results of sql
        """
        logger.info("Getting a connection from database pool.")
        conn = self.poolDB.connection()
        logger.info("Getting a connection from database pool finished.")
        cursor = conn.cursor()
        # execute sql
        logger.info(f"executing {sql}")
        cursor.execute(sql)
        result = cursor.fetchall()
        conn.commit()
        logger.info(f"execute  finished. return {result}")
        # return the connection back
        conn.close()
        return result

    @staticmethod
    def get_instance():
        """get a instance at once simultaneously"""
        if DataBasePool.__instance:
            return DataBasePool.__instance
        try:
            lock.acquire()
            if not DataBasePool.__instance:
                logger.info('Building DataBase Pool.')
                DataBasePool.__instance = DataBasePool()
                logger.info('Build DataBase Pool finished.')
        finally:
            lock.release()
        return DataBasePool.__instance
