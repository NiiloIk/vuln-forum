import requests
URL = "http://localhost:3002/api/posts"


def send_request():
  try:
      res = requests.get(URL)
      print(f"response: {res.status_code}")
  except Exception as e:
      print(f"Request failed: {e}")


while True:
   send_request()

