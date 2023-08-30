#https://www.op.gg
#https://u.gg
#http://localhost/_/

import kbve
import requests

champion = kbve.getter('champion')
#http://localhost/app/api/token/?file=champion&json={%22champion%22:%20%22shaco%22} , it returns champion as shaco.
#print(f"{champion}")

# In Op.gg , shaco is https://www.op.gg/champions/shaco/

#opggChampion = requests.get(f"https://www.op.gg/champions/{champion}/")
opggChampion = requests.get(f"https://holyman.cityvote.com/api/token/?__website=https://www.op.gg/champions/{champion}/&__action=clone")

print(opggChampion.text)