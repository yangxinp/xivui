#!/bin/bash

username="root"
domain="124.223.57.10"
port="22"
dist="./docs/.vitepress/dist/*"
web_root="/usr/share/nginx/xivui/"

scp -r -P $port $dist $username@$domain:$web_root

ssh $username@$domain -t "service nginx reload"
