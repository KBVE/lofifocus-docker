import kbve

# from pocketbase import PocketBase  # Client also works the same
# from pocketbase.client import FileUpload

import requests
import json

# client = PocketBase('http://pocketbase:8090')

timg, pkey = kbve.getter('timg'), kbve.getter('pkey') # timg: image to make a mockup from, pkey: printful key
pocketAdmin, pocketPass = kbve.getter('padm-user'), kbve.getter('padm-pass')

# admin_data = client.admins.auth_with_password(pocketAdmin, pocketPass)

headers = {
    "Authorization": "Bearer " + pkey,
}

data = {
    "variant": "10290",
}

products = requests.get('https://api.printful.com/products', headers=headers)

print(products.json())