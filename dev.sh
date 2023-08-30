#!/bin/sh
# Work in Progress, currently does not run yarn inside of the new shell. 
# Remember to chmod +x dev.sh
# Enter Poetry
poetry shell && yarn dev
#poetry run yarn dev

#source $(poetry env info --path)/bin/activate
