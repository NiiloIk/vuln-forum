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


# There were problems with the threading
# Create multiple threads to send requests
start_time = time.time()

threads = list()
for _ in range(100):
#    send_request()
   thread = threading.Thread(target=send_request)
   threads.append(thread)
   thread.start()


for x in threads:
   x.join()

end_time = time.time()

print("time in end", end_time-start_time, "time")

# Threading time
# 0.11972784996032715
# Time without threading
# 0.22227239608764648