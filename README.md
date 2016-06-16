# Visit Planner for LateRooms interview

NB Only tested with NodeJS 4.4.5 on Mac OS

# Task

The description [from github](https://github.com/LateRoomsGroup/interview-katas/blob/2bc43b2e724c38ac4f54c337a53779ccdb28ea3c/full-stack.md) is included below

#The LateRooms Group full-stack task

Please take as much time as you see appropriate to tackle this task. Your solution will be the basis for a discussion during our interview.

##The task

The aim of the kata is to create a basic application to allow a user to record a list of cities they would like to visit.
The initial list should be served up from an endpoint that you create and should use the following JSON data:

```json
[
  {
    "City": "Manchester",
    "Country": "UK",
    "Attractions": ["football", "bars"]
  },
  {
    "City": "Liverpool",
    "Country": "UK",
    "Attractions": ["football", "bars", "music"]
  },  
  {
    "City": "York",
    "Country": "UK",
    "Attractions": ["city walls", "cathedral"]
  },
  {
    "City": "Las Vegas",
    "Country": "USA",
    "Attractions": ["casinos","Grand Canyon","shows"]
  },
  {
    "City": "Beijing",
    "Country": "China",
    "Attractions": ["Great Wall of China", "Forbidden City"]
  }
]
```

You should then create a basic web application and add as many of the following pieces of functionality as you have time to:

1. - [x] Retrieve the cities from the endpoint you created and list them along with their country and attractions
2. - [] Ability to add a new city to the list
    - [] * Provide basic validation
3. - [x] Allow a user to mark a city as visited/unvisited
4. - [] Show a visual counter of the number of cities visited/unvisited
5. - [] Filter the cities by visited state (i.e. visited or unvisited)
6. - [] Sort the cities by visited state (i.e. visited or unvisited)
7. - [x] Search for city by attraction or country

You should aim to complete as many of these things as possible, demonstrating a good understanding of architecture, design and best practice.
__Testing methodologies (TDD and/or BDD) should be used.__
