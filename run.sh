#!/usr/bin/env bash

#!/bin/bash
exit_script() {
    echo "Killing all chromes"
    killall chrome
    trap - SIGINT SIGTERM # clear the trap
    echo "KILLING ID=$ID"
    pkill -P $ID
    kill $ID
    kill -- -$$ # Sends SIGTERM to child/sub processes

}

trap exit_script SIGINT SIGTERM

TARGET_DOMAIN=play.tagvenue.uk \
DEBUG=true \
../node_modules/.bin/jest --config jest.config.js &
ID=$!

echo "ID=$ID"
