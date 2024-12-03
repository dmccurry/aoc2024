#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "I need a day.  It should be two digits"
    exit
fi

mkdir day$1
touch day$1/test
touch day$1/input
cp ./part1.template.js day$1/part1.js
touch day$1/part2.js