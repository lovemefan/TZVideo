#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/12/24 下午12:26
# @Author  : lovemefan
# @File    : User.py
from datetime import datetime


class User:
    def __init__(self, username=None, uid=None, phone=None, email=None, password=None,
                 role=0, create_by=None, create_time=None, last_login_time=None, status=1):
        """ The user class
        :param uid: user id
        :param username: username
        :param phone: user phone number
        :param email:  user email
        :param password: uer password  MD5 text
        :param role: 0 is normal user ,1 is administrator
        :param create_by: the admin id created by
        :param last_login_time: last login time,update when user login
        :param status: user status,0 is available, 1 is forbidden
        """
        self.uid = uid
        self.username = username
        self.phone = phone
        self.email = email
        self.password = password
        self.role = role
        self.create_by = create_by
        if isinstance(create_time, datetime):
            self.create_time = create_time.strftime('%Y-%m-%d %H:%M:%S')
        else:
            self.create_time = create_time

        if isinstance(last_login_time, datetime):
            self.last_login_time = last_login_time.strftime('%Y-%m-%d %H:%M:%S')
        else:
            self.last_login_time = last_login_time
        self.status = status

    def to_dict(self):
        return {
                "user_id": self.uid,
                "username": self.username,
                "phone": self.phone,
                "email": self.email,
                "role": self.role,
                "create_by": self.create_by,
                "create_time": self.create_time,
                "last_login_time": self.last_login_time,
                "status": self.status}


