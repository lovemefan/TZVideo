#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/11/12 下午9:48
# @Author  : lovemefan
# @File    : Md5Utils.py

import hashlib



class MD5Utils:
    def __init__(self):
        pass

    @staticmethod
    def encode(text):
        """利用MD5算法进行不可逆的加密
        :param text 待加密字符串
        """
        # 创建md5对象，
        # md5对象，md5不能反解，但是加密是固定的，就是关系是一一对应，所以有缺陷，可以被对撞出来
        # 如果没有参数，所以md5遵守一个规则，生成同一个对应关系，如果加了参数，
        # 就是在原先加密的基础上再加密一层，这样的话参数只有自己知道，防止被撞库，
        # 因为别人永远拿不到这个参数
        md5_hash = hashlib.md5(bytes('人社厅语音项目', encoding='utf-8'))

        # 要对哪个字符串进行加密，就放这里
        # 此处必须声明encode
        # 若写法为hl.update(str)  报错为： Unicode-objects must be encoded before hashing
        md5_hash.update(text.encode(encoding='utf-8'))

        return md5_hash.hexdigest()

    @staticmethod
    def file_md5(file_path):
        """计算文件的md5码值"""
        with open(file_path, 'rb') as fp:
            data = fp.read()
        file_md5 = hashlib.md5(data).hexdigest()
        return file_md5


if __name__ == '__main__':
    username = 'test2'
    # password = 'kust_admin'
    password = 'test'
    # 密码用md5加密
    hash = MD5Utils.encode(password)
    print(hash)
    file = 'Alaw2pcm.py'
    print(MD5Utils.file_md5(file))

