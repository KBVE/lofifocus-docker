import sys
import json

data = sys.argv[1]
jsonData = json.loads(data)

if jsonData['bigman']:
    print('Hello BigMan')

print(jsonData)