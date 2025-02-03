#!/bin/bash

if [ $1 = "docker" ]; then
  ip="area.tvermorel.fr"
else
  ip=$(hostname -i | awk '{print $1}')
fi
export EXPO_PUBLIC_IP_MACHINE=$ip