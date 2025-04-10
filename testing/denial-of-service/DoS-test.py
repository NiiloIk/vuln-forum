import requests
URL = "http://localhost:3000"


def send_request():
  try:
      res = requests.get(URL)
      print(f"response: {res.status_code}")
  except Exception as e:
      print(f"Request failed: {e}")


while True:
   send_request()

