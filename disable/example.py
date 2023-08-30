import sys
import json

data = sys.argv[1]
jsonData = json.loads(data)

if jsonData['name']:
    name = jsonData['name']
    print(f"Hello, {name} how are you?")