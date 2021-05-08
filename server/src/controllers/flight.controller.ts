import Flight from '../models/flight.model'
import express, { request } from 'express'
import { MongooseService } from '../services/mongoose.service'
import Rating from '../models/ratings.model'
import * as shortUUID from 'short-uuid'
import Ticket from '../models/ticket.model'
import User from '../models/user.model'
import BookingAgent from '../models/booking_agent.model'
import Ratings from '../models/ratings.model'

type FlightData = {
  flight_number: string
  departure_date: Date
  departure_airport_name: string
  airline_name: string
  arrival_date: Date
  arrival_airport_name: string
  base_price: number
  airplane_id: string
  status: string
}
type RatingData = {
  customer_email: string
  commentary: string
  ratings: number
  flight_id: string
  user_id: string
}

const searchableKeys = ['flight_number', 'airline_name', 'departure_airport_name', 'arrival_airport_name']

export class FlightController {
  mongooseService: MongooseService = MongooseService.getInstance()
  constructor() {}

  createFlight = async (req: express.Request, res: express.Response) => {
    let randHours = Math.floor(Math.random() * 72)
    let departureDate = new Date()
    departureDate.setHours(departureDate.getHours() + randHours)

    let arrivalDate = new Date()
    arrivalDate.setHours(arrivalDate.getHours() + Math.floor(Math.random() * 18) + randHours)

    const flightData: FlightData = {
      flight_number: shortUUID.generate(),
      departure_date: departureDate,
      departure_airport_name: req.body.departure_airport_name,
      airline_name: req.body.airline_name,
      arrival_date: arrivalDate,
      arrival_airport_name: req.body.arrival_airport_name,
      base_price: req.body.base_price,
      airplane_id: req.body.airlplane_id,
      status: req.body.status,
    }
    const flight: any = new Flight(flightData)
    const newFlight = await flight.save(flight)
    res.status(201).send(newFlight)
  }

  listFlights = async (req: express.Request, res: express.Response) => {
    const flightList = await Flight.find().limit(100).sort({ arrival_date: 'desc' }).exec()
    res.status(200).send(flightList)
  }

  getFlightById = async (req: express.Request, res: express.Response) => {
    // _id is generated automatically
    const flight = await Flight.findOne({ _id: req.params.id })
    res.status(200).send(flight)
  }

  createRating = async (req: express.Request, res: express.Response) => {
    const ratingData: RatingData = {
      customer_email: req.body.customer_email,
      commentary: req.body.commentary,
      ratings: req.body.ratings,
      flight_id: req.body.flight_id,
      user_id: req.body.user_id,
    }

    const rating: any = new Rating(ratingData)
    const newRating = await rating.save(rating)
    res.status(201).send(newRating)
  }

  getAllRatingsByID = async (req: express.Request, res: express.Response) => {
    const user: any = await User.findOne({ _id: req.params.id })
    const flightID: any = req.params.flightID
    const allRatings: any = await Ratings.find()
    const ratings: any = []
    if (user) {
      if (user.type == 'staff') {
        allRatings.map((rating: any) => {
          if (rating.flight_id == flightID) {
            ratings.push(rating)
          }
        })
        //const allRatings: any = await Ratings.find()
        res.status(200).send(ratings)
      }
    } else {
      res.status(401).send('Only staff can see all the ratings')
    }
  }

  getUserRatings = async (req: express.Request, res: express.Response) => {
    const user: any = await User.findOne({ _id: req.params.id })
    const flightID: any = req.params.flightID
    const allRatings: any = await Ratings.find()
    const userRatings: any = []
    if (user) {
      if (user.type == 'customer') {
        allRatings.map((rating: any) => {
          if (rating.user_id == user._id && rating.flight_id == flightID) {
            userRatings.push(rating)
          }
        })
        res.status(200).send(userRatings)
      }
    } else {
      res.status(401).send('Only customers can see all their ratings')
    }
  }

  getFlightSearchWithDateRange = async (req: express.Request, res: express.Response) => {
    const properFlights: any = []
    const tempDepDate = req.params.departure_date

    const departureDate =
      tempDepDate === 'none' ? new Date(new Date().setFullYear(new Date().getFullYear() - 10)) : new Date(tempDepDate)
    const tempArrivalDate = req.params.arrival_date
    const arrivalDate =
      tempArrivalDate === 'none'
        ? new Date(new Date().setFullYear(new Date().getFullYear() + 10))
        : new Date(tempArrivalDate)
    console.log(departureDate, arrivalDate)
    const departurePlace = req.params.depature_airport
    const arrivalPlace = req.params.arrival_airport

    if (departurePlace == 'none' && arrivalPlace == 'none') {
      const flights = await Flight.find({})
      res.status(200).send(flights)
    } else {
      const allFlights = await Flight.find()
      allFlights.map((flight: any) => {
        if (flight.departure_airport_name == departurePlace) {
          if (flight.arrival_airport_name == arrivalPlace) {
            if (flight.departure_date >= departureDate) {
              if (flight.departure_date <= arrivalDate) {
                properFlights.push(flight)
              }
            }
          }
        }
      })
      res.status(200).send(properFlights)
    }
  }

  listings = async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id
    const flight: any = await Flight.findOne({ _id: id })
    const { airline_name, base_price } = flight
    const purchaseOptions = [
      {
        seller: airline_name,
        seller_type: 'airline',
        price: base_price,
      },
    ]

    const tickets = await Ticket.find({ flight_id: id })
    await Promise.all(
      tickets.map(async (ticket: any) => {
        const purchaser: any = await User.findOne({ email: ticket.email })
        if (purchaser.type === 'agent') {
          const agent: any = await BookingAgent.findOne({ email: ticket.email })
          purchaseOptions.push({
            seller: ticket.email,
            seller_type: 'agent',
            price: base_price + base_price * (agent.commission / 100),
          })
        }
      })
    )

    res.status(200).send(purchaseOptions)
  }

  getReturnFlightsByID = async (req: express.Request, res: express.Response) => {
    const referenceFlight = await Flight.findOne({ _id: req.params.id })
    const arrival = referenceFlight?.departure_date
    const arrivalAirport = referenceFlight?.arrival_airport_name
    const departureAirport = referenceFlight?.departure_airport_name
    const properFlights: any = []
    const allFlights = await Flight.find()
    if (arrival && arrivalAirport) {
      allFlights.map((flight: any) => {
        if (flight.departure_date > arrival) {
          if (flight.departure_airport_name == arrivalAirport) {
            if (flight.arrival_airport_name == departureAirport) {
              properFlights.push(flight)
            }
          }
        }
      })
    }
    res.status(200).send(properFlights)
  }

  updateFlightStatus = async (req: express.Request, res: express.Response) => {
    const status: string = req.body.status
    const flight = await Flight.findOne({ _id: req.params.id })
    if (flight) {
      flight.status = status
      await flight.save()
      res.status(201).send(flight)
    }
  }

  searchFlights = async (req: express.Request, res: express.Response) => {
    const query = req.params.query
    const flights = await Flight.find({}).limit(100).sort({ arrival_date: 'desc' }).exec()
    const sortedFlights: any = []
    flights.map((flight: any) => {
      searchableKeys.map((key: any) => {
        if (flight[key].includes(query)) {
          console.log(flight[key])
          sortedFlights.push(flight)
        }
      })
    })

    res.status(200).send(sortedFlights)
  }

  getFlightsView = async (req: express.Request, res: express.Response) => {
    const currentDate = new Date()
    let upcomingResponse = await Flight.find({}).limit(100).sort({ departure_date: 'desc' }).exec()
    let upcomingFlights = upcomingResponse.filter(flight => flight.departure_date > currentDate).slice(0, 4)

    res.status(200).send({
      upcomingFlights: upcomingFlights,
      delayedFlights: await Flight.find({ status: 'delayed' }).exec(),
      allFlights: await Flight.find().limit(100).exec(),
    })
  }

  getFlightByAirline = async (req: express.Request, res: express.Response) => {
    const airline = req.params.airline
    const flights = await Flight.find({ airline_name: airline }).limit(100).sort({ departure_date: 'desc' }).exec()
    res.status(200).send(flights)
  }
}
