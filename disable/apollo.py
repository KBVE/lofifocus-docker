from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
import yt_dlp

import sys
import json
import os

data = sys.argv[1]

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

class MyLogger:
    def debug(self, msg):
        # For compatibility with youtube-dl, both debug and info are passed into debug
        # You can distinguish them by the prefix '[debug] '
        if msg.startswith('[debug] '):
            pass
        else:
            self.info(msg)

    def info(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)

def my_hook(d):
    if d['status'] == 'finished':
        print('Done downloading, now post-processing ...')

client = PocketBase('http://pocketbase:8090')

# This is just a throw away test account, does not work in production, you stupid memers.
admin_data = client.admins.auth_with_password("test@test.com", "pythonpython")

# yt_id = jsonData.get('yt_id')
yt_id = None

if "yt_id" in jsonData:
    yt_id = jsonData["yt_id"]

if yt_id is None:
    print("YT_ID is None")
    exit()


# 'outtmpl': '/%(title)s.%(ext)s',

ydl_opts = {
    'format': 'm4a/bestaudio/best',
    'logger': MyLogger(),
    'progress_hooks': [my_hook],
    'outtmpl': './public/download/%(id)s',
    # ℹ️ See help(yt_dlp.postprocessor) for a list of available Postprocessors and their arguments
    'postprocessors': [{  # Extract audio using ffmpeg
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
    }]
}

URLS = 'https://www.youtube.com/watch?v=' + yt_id

# Downloads the MP3
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    error_code = ydl.download(URLS)
# Where do we get the reference to the mp3? which we then have to feed to the FileUpload.
# I think its a ydl_opts -> where we set the -o aka output. That is where I am at right now. 
# Ideally I would like NOT to even store it as a file, but rather move it directly, but you know, that is extra work. Why!
# outtmpl
# We are here right now -> 
file_dir = f"./public/download/{yt_id}.mp3"
result = client.collection("apollo").create(
    {
        "yt_id": yt_id,
        "music": FileUpload((f"{yt_id}.mp3", open(file_dir, "rb"))),
    })

os.remove(file_dir)

print(f"{result}")

# sE6pRDNIHoo
# http://localhost/app/api/token/?file=apollo&json={%22yt_id%22:%20%221PV55o9AsTg%22}
# http://localhost/app/api/token/?file=apollo&json={%22yt_id%22:%20%22sE6pRDNIHoo%22}
# {"data":"Done downloading, now post-processing ...\n<Record: 7wwjeg35akfo69m>"}
# http://localhost/_/#/collections?collectionId=8t44k548pjmmpxk&filter=&sort=-created