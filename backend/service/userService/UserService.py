#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/12/24 下午2:18
# @Author  : lovemefan
# @File    : UserService.py

from backend.dao.UserDao import UserDao
from backend.decorator.singleton import singleton
from backend.exception.UserException import UserNotExist
from backend.model.User import User


@singleton
class UserService:
    """user @singleton to avoid create amount of same instance, improve the efficiency

    """

    def __init__(self):
        self.userDao = UserDao()


    def get_all_user_information(self):
        """query from dbs
        Args:
            user (User): User instance
        Returns:
            User : user information
        """
        info = self.userDao.get_all_user()
        users = []
        for row in info:
            user = User(uid=row[0], username=row[1], phone=row[2], email=row[3], role=row[4], create_by=row[5],
                    create_time=row[6], last_login_time=row[7], status=row[8])
            users.append(user.__dict__)

        return users

    def get_user_information(self, user: User):
        """query from dbs
        Args:
            user (User): User instance
        Returns:
            User : user information
        """
        info = self.userDao.get_user_information(user)

        if len(info) == 0:
            raise UserNotExist(user.username)
        row = info[0]
        user = User(uid=row[0], username=row[1], phone=row[2], email=row[3], role=row[4], create_by=row[5],
                    create_time=row[6], last_login_time=row[7], status=row[8])

        return user

    def get_user_id(self, user):
        """get uid by usename"""
        row = self.userDao.get_user_id(user.username)

        if len(row) == 0:
            raise UserNotExist(user.username)
        uid = row[0]
        user.uid = uid[0]
        return user

    def add_user(self, user):
        """add User and add user into group
        Args:
            user (User): class instance of User
        Exception:
            pymysql.err.IntegrityError : The username has exist
        """
        self.userDao.add_user(user)
        self.userDao.add_user_into_group(self.get_user_id(user).uid, user.create_by)
        return True

    def modify_user(self, user):
        """modify User you can only modify username,password,phone,user_role and status
        Args:
            user (User): class instance of User
        """
        self.userDao.modify_user(user)
        return True

    def delete_user(self, user):
        """delete User
        Args:
            user (User): class instance of User
        Exception:
            if the user's uid is none, will raise a exception
        """
        self.userDao.delete_user(user)
        return True

    def validate(self, user):
        """validate username and password
        Args:
            user (User): user instance of User class
        Returns:
            bool: if username and password correct return True else return False
        Exception:
            UserNotExist : if the user not exist will raise this exception
        """
        username = user.username
        password = self.userDao.get_user_password(username)
        if len(password) == 0:
            raise UserNotExist(username)

        password = password[0][0]

        return password == user.password

    def login(self, user):
        """update last login time"""
        self.userDao.login(user)
        return True

if __name__ == '__main__':
    ins1 = UserService()
    ins2 = UserService()
    # print True
    # print(ins1 is ins2)
    user = User(username='lovemefan',
                uid=1342014866998829056,
                password='5c5ed1b1b2e95abacda4cc7c8b40d58d',
                phone='186******2',
                email='lovemefan@outlook.com',
                role=1,
                create_by=1341983140255768576
                )
    # res = ins1.get_user_information(User('admin'))
    # print(res)
    # ins2.add_user(user)
    print(ins1.validate(user))
