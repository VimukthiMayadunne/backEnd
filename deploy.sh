#!/bin/bash

tar czf ncinga.tar.gz index.js package.json package-lock.json  config modules routes README.md
scp ncinga.tar.gz 68.183.84.177:~
rm ncinga.tar.gz

ssh 68.183.84.177 << 'ENDSSH'
pm2 stop all
rm -rf ncinga
mkdir ncinga
tar xf ncinga.tar.gz -C ncinga
rm ncinga.tar.gz
cd ncinga 
npm install
pm2 start ncinga
ENDSSH
