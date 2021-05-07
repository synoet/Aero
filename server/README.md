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
```
This function is for the creation of an individual airplane when given the id, seats and the airline name. It will create a new airplane and save it to the database

```
#### listAirplanes
```
This function is for going through the database and returning all the planes that are currently in it. 
```


### Flight Controller
#### createFlight

#### listFlights

#### getFlightByID

#### getFlightSearchWithDateRange

#### listings

#### getReturnFlightsByID

#### updateFlightStatus

#### searchFlights

#### getFlightsView

#### getFlightByAirline
This function is meant to simply return all the flights that are coming from a specific airline. 







### Airport Controller
#### createAirport 
```
This function is used for creating airports when given the name and the city. It will create and save a new airport to the database.

```
#### listAirports
```
This function is for going through the database and returning all the airports that are currently present. 
```