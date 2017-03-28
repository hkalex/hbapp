#!/bin/bash

(cd /opt/build-server/src && \
  sudo git checkout ready_to_build)

(cd /opt/build-server/src && \
  sudo git pull)

