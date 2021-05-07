<a><p align="center">
<img height=100 src="https://user-images.githubusercontent.com/10552019/114287500-3f3f7680-9a35-11eb-81a6-33eebd6a5efd.png"/>

</p></a>
<p align="center">
  <strong>A Simple & Clean Flight Tracker & Manager</strong>
</p>

# Aero Server - Backend


## How do i run this locally?

### Environment
You must include the following in `/server/.env`
```
PORT = PORT (ex: 3000)
DB_HOST = MongoDb
```

### Terminal
Open the terminal and run the following from `/`
```
cd server
npm install
npm run tsc
npm start
```
You can also run
```
cd server
npm install
npm run develop
```

### Airplane Controller
#### createAirplane 

This function is for the creation of an individual airplane when given the id, seats and the airline name. It will create a new airplane and save it to the database


#### listAirplanes

This function is for going through the database and returning all the planes that are currently in it. 



### Flight Controller
#### createFlight
This function is where the flight is being created. When given all of the necessary details such as departure date and arrival date a new flight is create and saved to the database.

#### listFlights
This function simply returns all the flights from the database in descending order based off of the arrival date of the flight.

#### getFlightByID
This function is meant to return a specific flight when given a specific id. It simply goes through the database and returns the flight the matched the id. 

#### getFlightSearchWithDateRange
This function is used to find all the flights that fall between a specific date range. It takes a date range given and then compares the range given to the respective arrival and departure dates of all the flights in the databasea and then only returns the flights that fall in the range. 
#### listings

#### getReturnFlightsByID

#### updateFlightStatus
This function is used for changing the specific status of an individual flight. It will go through all the flights and when it finds the specific flight that corresponds to the given id it will change the status to what the user determines.

#### searchFlights

#### getFlightsView

#### getFlightByAirline

This function is meant to simply return all the flights that are coming from a specific airline. 







### Airport Controller
#### createAirport 

This function is used for creating airports when given the name and the city. It will create and save a new airport to the database.


#### listAirports

This function is for going through the database and returning all the airports that are currently present. 
