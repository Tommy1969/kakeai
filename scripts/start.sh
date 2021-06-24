#!/usr/bin/sh

export DENO_INSTALL="/home/ec2-user/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"

cd /opt/app/kakeai
nohup deno -L info run --allow-net --allow-read --allow-write --allow-env --unstable mod.ts < /dev/null 2>&1 /dev/null &

exit 0
