import sys
import json

data = sys.argv[1]
jsonData = json.loads(data)

a =  0
b =  0
c =  0


if "a" in jsonData:
    a = jsonData['a']

if "b" in jsonData:
    b = jsonData['b']

c =  a + b
print(f"{a} + {b} = {c}")
#docker-compose up --build for build command just for future reference 
