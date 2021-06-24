#!/usr/bin/sh

FILE="/opt/app/kakeai/.env"

if [ ! -e $FILE ]; then
  cp ~/.kakeai/.env /opt/app/kakeai/
fi
