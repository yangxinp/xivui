#!/bin/bash

username="root"
domain="0.0.0.0"
port="22"
dist="./docs/.vitepress/dist/*"
web_root="/usr/share/nginx/xivui/"

sudo mkdir -p $web_root

ssh $username@$domain -t "mkdir $web_root"

scp -r -P $port $dist $username@$domain:$web_root

ssh $username@$domain -t "service nginx reload"
