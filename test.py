import requests

BASE = "http://127.0.0.1:5000/"

# response = requests.put(
#     BASE + "video/1", {"likes": 10, "name": "Tim", "views": 100000})
# print(response.json())
response = requests.post(BASE + "api/get-lucky-num", {
                         "name": "Alex", "email": "alexmartinez323@gmail.com", "year": 1993, "color": "red"})
print(response.json())
