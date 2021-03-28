#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/12/18 下午3:25
# @Author  : lovemefan
# @File    : config.py
import os

import threading
from configparser import ConfigParser, NoOptionError
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

# using lock to make sure get one config at same time
from backend.utils.logger import logger

lock = threading.Lock()


class ConfigFileModifyHandler(FileSystemEventHandler):
    """Envent handle of config change"""

    def on_modified(self, event):
        logger.debug('updating config ...')
        Config.get_instance().load_config()


class Config:
    """upgrade the config automatically while the config.ini file changed
    Example Config.get_instance().get(key, default)
    """
    # private global attribute of config instance
    __instance = None

    def __init__(self, config_file_path=None):
        """initialize attributions of config class """
        logger.debug('init config ...')
        self.config = ConfigParser()
        self.config_file_path = config_file_path or os.path.join(os.path.dirname(__file__), 'config.ini')
        self.load_config()
        self._init_config_file_observer()

    def _init_config_file_observer(self):
        logger.debug('monitor the config file while file changed')
        event_handler = ConfigFileModifyHandler()
        observer = Observer()
        observer.schedule(event_handler, path=os.path.dirname(self.config_file_path), recursive=False)
        observer.setDaemon(True)
        observer.start()

    @staticmethod
    def get_instance():
        """get a instance at once simultaneously"""
        if Config.__instance:
            return Config.__instance
        try:
            lock.acquire()
            if not Config.__instance:
                Config.__instance = Config()
        finally:
            lock.release()
        return Config.__instance

    def load_config(self):
        """load the config file"""
        logger.debug('loading the config ...')
        self.config.read(self.config_file_path, 'utf-8')

    def get(self, key, default=None):
        """get value by the key from config
        Args:
            key (str): format [section].[key] example: app.name
            default: if the key not exist ,return default value
        Returns:
            str: value of key, if the key not exist ,return default value
        """
        map_key = key.split('.')
        if len(map_key) < 2:
            return default
        section = map_key[0]
        if not self.config.has_section(section):
            return default
        option = '.'.join(map_key[1:])
        try:
            return self.config.get(section, option)
        except NoOptionError:
            return default
