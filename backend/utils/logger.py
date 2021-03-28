#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/12/21 下午2:05
# @Author  : lovemefan
# @File    : logger.py
import logging

logging.basicConfig(level=logging.INFO, format='[%(asctime)s]  - %(levelname)s - %(threadName)s - %(module)s.%(funcName)s - %(message)s')
logger = logging.getLogger(__name__)