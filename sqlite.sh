#!/bin/sh

# SQLITE PATCH
wget https://www.sqlite.org/2023/sqlite-autoconf-3420000.tar.gz
tar xvfz sqlite-autoconf-3420000.tar.gz
mv sqlite-autoconf-3420000 /usr/local/share/sqlite3
cd /usr/local/share/sqlite3
./configure
make -j 1
make install
export LD_LIBRARY_PATH="/usr/local/lib"
