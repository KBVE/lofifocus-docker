import sys
import json
import os
import requests
import shutil

from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload

## Strict

def data(data = sys.argv[1]):
    if data is None:
        print("No Data Received, provide data query parameter with json")
        exit()
    try:
        jsonData = json.loads(data)
    except ValueError as e:
        print(f"Error when loading json: {e}. Please provide data query parameter with json")
        exit()
    else:
        pass
    return jsonData

def getter( key ):
    getData = data()
    getKey = None
    
    if f"{key}" in getData:
        getKey = getData[f"{key}"]

    if getKey is None:
        print("Failed to find f{key}")
        exit()

    return getKey

## Not Strict

def option(key, default):
    getData = data()

    if f"{key}" in getData:
        return getData[f"{key}"]
    else:
        return os.getenv(key, default)

def vulcan(key, jsonString, default = None):
    try:
        jsonData = json.loads(jsonString)
    except ValueError as e:
        return option(key, default)
    else:
        if f"{key}" in jsonData:
            return jsonData[f"{key}"]
        else:
            return default


def dbTask (task):
    return task

def dbURL ( jsonString, url , file, collection ):

    file_dir = f"./public/download/{file}"
    response = requests.get(url, stream=True)

    with open(f"./public/download/{file}", 'wb') as out_file:
        shutil.copyfileobj(response.raw, out_file)
    
    del response
    
    client = PocketBase(option('pb-api', 'http://pocketbase:8090'))
    
    admin_data = client.admins.auth_with_password(option('padm-user', 'test@test.com'), option('padm-pass', 'pythonpython'))
    
    result = client.collection(f"{collection}").create(
    {
        "file_id": file,
        "file_json": jsonString,
        "file_file": FileUpload((file, open(file_dir, "rb"))),
    })
    os.remove(file_dir)
    return result