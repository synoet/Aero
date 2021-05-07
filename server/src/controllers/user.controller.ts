import Customer from '../models/customer.model'
import User from '../models/user.model'
import Staff from '../models/staff.model'
import BookingAgent from '../models/booking_agent.model'
import PurchaseInfo from '../models/purchase_info.model'
import Transaction from '../models/transaction.model'
import express from 'express'
import { MongooseService } from '../services/mongoose.service'
import * as shortUUID from 'short-uuid'
import Ticket from '../models/ticket.model'
import Flight from '../models/flight.model'

interface UserEntity {
  email: string
  password: string
  type: string
  Agent?: AgentEntity
  Customer?: CustomerEntity
  Staff?: StaffEntity
}

interface AgentEntity {
  commission: number
}

interface CustomerEntity {
  name: string
  street: string
  building_number: number
  city: string
  state: string
  phone_number: string
  passport_number: number
  passport_expiration: Date
  passport_country: string
  date_of_birth: Date
}

interface StaffEntity {
  airline_name: string
}

export class UserController {
  mongooseService: MongooseService = MongooseService.getInstance()
  constructor() {}

  spending = async (req: express.Request, res: express.Response) => {
    const monthly = [
      {
        month: 1,
        name: 'Jan',
        data: 0,
      },
      {
        month: 2,
        name: 'Feb',
        data: 0,
      },
      {
        month: 3,
        name: 'Mar',
        data: 0,
      },
      {
        month: 4,
        name: 'Apr',
        data: 0,
      },
      {
        month: 5,
        name: 'May',
        data: 0,
      },
      {
        month: 6,
        name: 'Jun',
        data: 0,
      },
      {
        month: 7,
        name: 'Jul',
        data: 0,
      },
      {
        month: 8,
        name: 'Aug',
        data: 0,
      },
      {
        month: 9,
        name: 'Sep',
        data: 0,
      },
      {
        month: 10,
        name: 'Oct',
        data: 0,
      },
      {
        month: 11,
        name: 'Nov',
        data: 0,
      },
      {
        month: 12,
        name: 'Dec',
        data: 0,
      },
    ]

    const id = req.params.id
    let total = 0

    const user: any = await User.findOne({ _id: id })
    if (user) {
      const transactions = await Transaction.find({
        customer_email: user.email,
      })
      await Promise.all(
        transactions.map(async (transaction: any) => {
          const purchase: any = await PurchaseInfo.findOne({
            transaction_id: transaction._id,
          })
          if (purchase) {
            const month: any = new Date(purchase.purchase_date).getMonth()
            monthly[month].data += purchase.sold_price
            total += purchase.sold_price
          }
        })
      )
    }

    res.status(200).send({ totalSpending: total, spendingByMonths: monthly })
  }

  revenue = async (req: express.Request, res: express.Response) => {
    const monthly = [
      {
        month: 1,
        name: 'Jan',
        data: 0,
      },
      {
        month: 2,
        name: 'Feb',
        data: 0,
      },
      {
        month: 3,
        name: 'Mar',
        data: 0,
      },
      {
        month: 4,
        name: 'Apr',
        data: 0,
      },
      {
        month: 5,
        name: 'May',
        data: 0,
      },
      {
        month: 6,
        name: 'Jun',
        data: 0,
      },
      {
        month: 7,
        name: 'Jul',
        data: 0,
      },
      {
        month: 8,
        name: 'Aug',
        data: 0,
      },
      {
        month: 9,
        name: 'Sep',
        data: 0,
      },
      {
        month: 10,
        name: 'Oct',
        data: 0,
      },
      {
        month: 11,
        name: 'Nov',
        data: 0,
      },
      {
        month: 12,
        name: 'Dec',
        data: 0,
      },
    ]

    const id = req.params.id
    const user: any = await User.findOne({ _id: id })
    if (user.type === 'customer') {
      res.status(200).send('Sorry this feature is only available for Staff & Agents')
    }
    let total = 0
    if (user.type === 'agent') {
      const agent: any = await BookingAgent.findOne({ _id: user._id })
      const commission = agent.commission

      const transactions = await Transaction.find({
        booking_agent_email: user.email,
      })

      await Promise.all(
        transactions.map(async (transaction: any) => {
          if (transaction.customer_email !== transaction.booking_agent_email) {
            const purchase: any = await PurchaseInfo.findOne({
              transaction_id: transaction._id,
            })
            if (purchase) {
              const month: any = new Date(purchase.purchase_date).getMonth()
              monthly[month].data += total += commission
            }
          }
        })
      )

      res.status(200).send({ revenueSpending: total, revenueByMonths: monthly })
    } else if (user.type === 'staff') {
      const staff: any = await Staff.findOne({ _id: id })
      const airline = staff.airline

      const transactions = await Transaction.find();

      var directRevenue: number = 0;
      var indirectRevenue: any = 0;

      await Promise.all(
        transactions.map(async (transaction: any) => {
          if (
            transaction.customer_email === transaction.booking_agent_email ||
            transaction.booking_agent_email === null
          ) {
            const purchase: any = await PurchaseInfo.findOne({
              transaction_id: transaction._id,
            })
            if (purchase) {
              const month: any = new Date(purchase.purchase_date).getMonth()
              const ticket: any = await Ticket.findOne({
                _id: purchase.ticket_id,
              })
              if (ticket) {
                const flight: any = await Flight.findOne({ _id: ticket.flight_id })
                if (flight){
                  if (flight.airline_name === staff.airline_name) {
                    monthly[month].data += flight.base_price
                    if(transaction.customer_email === transaction.booking_agent_email){
                      indirectRevenue += flight.base_price;
                    }else if(transaction.booking_agent_email === null){
                      console.log(flight.base_price);
                      directRevenue +=  flight.base_price
                    }
                    total += flight.base_price
                  }
                }
              }
            }
          }
        })
      )

      res.status(200).send({ totalRevenue: total, revenueByMonths: monthly, comparison: {direct: directRevenue, indirect: indirectRevenue} })
    }
  }

  frequent = async (req: express.Request, res: express.Response) => {
    const id = req.params.id
    const user: any = await User.findOne({ _id: id })

    if (user) {
      if (user.type === 'customer') {
        res.status(400).send('Sorry this feature is only available for Staff and Agents')
      } else if (user.type === 'agent') {
        const agent: any = await BookingAgent.findOne({ _id: user._id })
        const allTransactions = await Transaction.find({ booking_agent_email: user.email })
        let occur: any = {}
        allTransactions.map((transaction: any) => {
          if (transaction.customer_email in occur) {
            occur[transaction.customer_email] += 1
          } else {
            occur[transaction.customer_email] = 1
          }
        })

        var items = Object.keys(occur).map(key => {
          return [key, occur[key]]
        })

        items.sort((first, second) => {
          return second[1] - first[1]
        })

        var byTickets: any = []
        var byCommission: any = []

        await Promise.all(
          items.slice(0, 5).map(async (item: any) => {
            let specTransactions = await Transaction.find({ booking_agent_email: user.email, customer_email: item[0] })
            var totalCommission = 0
            const purchases = await Promise.all(
              specTransactions.map(async (transaction: any) => {
                let purchase = await PurchaseInfo.findOne({ transaction_id: transaction._id })
                if (purchase) {
                  return purchase
                }
              })
            )
            purchases.map((purchase: any) => {
              if (purchase) {
                totalCommission += purchase.sold_price
              }
            })
            byTickets.push({
              customer: item[0],
              tickets: item[1],
            })

            byCommission.push({
              customer: item[0],
              commission: totalCommission * (agent.commission / 100),
            })
          })
        )

        res.status(200).send({ byTickets: byTickets, byCommission: byCommission })
      } else if (user.type === 'staff') {
        const staff: any = await Staff.findOne({ _id: user._id })
        const { airline_name } = staff
        const tickets = await Ticket.find({})
        let occur: any = {}
        let flightByCustomer: any = {}
        let ticketsByAirline = await Promise.all(
          tickets.map(async (ticket: any) => {
            if (ticket) {
              const flight: any = await Flight.findOne({ _id: ticket.flight_id })
              if (flight) {
                if (flight.airline_name === airline_name) {
                  return ticket
                }
              }
            }
          })
        )
        ticketsByAirline.map((ticket: any) => {
          if (ticket) {
            if (ticket.email in occur) {
              occur[ticket.email] += 1
            } else {
              occur[ticket.email] = 1
            }
          }
        })

        var items = Object.keys(occur).map(key => {
          return [key, occur[key]]
        })

        items.sort((first, second) => {
          return second[1] - first[1]
        })

        let frequentCustomers: any = []

        await Promise.all(
          items.map(async item => {
            let customerFlights: any = []
            const customerTickets = await Ticket.find({ email: item[0] })
            await Promise.all(
              customerTickets.map(async (ticket: any) => {
                const customerFlight = await Flight.findOne({ _id: ticket.flight_id })
                if (customerFlight) {
                  if (customerFlight.airline_name === airline_name) {
                    customerFlights.push(customerFlight)
                  }
                }
              })
            )
            console.log(customerFlights)
            frequentCustomers.push({
              customer: item[0],
              tickets: item[1],
              flights: customerFlights,
            })
          })
        )

        //booking agent information

        const transactions = await Transaction.find({})

        const btcTransactions = transactions.map((transaction: any) => {
          if (transaction != undefined) {
            if (
              transaction.customer_email !== transaction.booking_agent_email &&
              transaction.booking_agent_email !== null
            ) {
              return transaction
            }
          }
        })

        let occurAgents: any = {}

        btcTransactions.map((transaction: any) => {
          if (transaction) {
            if (transaction.booking_agent_email in occurAgents) {
              occurAgents[transaction.booking_agent_email] += 1
            } else {
              occurAgents[transaction.booking_agent_email] = 1
            }
          }
        })

        var agentItems = Object.keys(occurAgents).map(key => {
          return [key, occurAgents[key]]
        })

        agentItems.sort((first, second) => {
          return second[1] - first[1]
        })

        let frequentAgents: any = []

        await Promise.all(
          agentItems.map(async (item: any) => {
            const selectedAgent: any = await BookingAgent.findOne({ email: item[0] })
            if (selectedAgent) {
              const agentTransactions = await Transaction.find({ booking_agent_email: item[0] })
              let agentCommission: any = 0
              await Promise.all(
                agentTransactions.map(async (transaction: any) => {
                  if (transaction) {
                    const purchase = await PurchaseInfo.findOne({ transaction_id: transaction._id })
                    if (purchase) {
                      agentCommission += purchase.sold_price * (selectedAgent.commission / 100)
                    }
                  }
                })
              )
              frequentAgents.push({
                agent: item[0],
                ticketsSold: item[1],
                commission: agentCommission,
              })
            }
          })
        )
        console.log(frequentAgents)

        res.status(200).send({ frequentCustomers: frequentCustomers, frquentAgents: frequentAgents })
      }
    }
  }

  tickets = async (req: express.Request, res: express.Response) => {
    const id = req.params.id
    const user: any = await User.findOne({ _id: id })
    const tickets = await Ticket.find({ email: user.email })

    res.status(200).send(tickets)
  }

  flights = async (req: express.Request, res: express.Response) => {
    const id = req.params.id
    const user: any = await User.findOne({ _id: id })

    const tickets = await Ticket.find({ email: user.email })
    const currDate = new Date()
    const previousFlights: any = []
    const upcomingFlights: any = []
    await Promise.all(
      tickets.map(async (ticket: any) => {
        const flight: any = await Flight.findOne({ _id: ticket.flight_id })
        if (flight.departure_date < currDate) {
          previousFlights.push(flight)
        } else {
          upcomingFlights.push(flight)
        }
      })
    )

    res.status(200).send({
      previousFlights: previousFlights,
      upcomingFlights: upcomingFlights,
    })
  }

  getUser = async (req: express.Request, res: express.Response) => {
    const id = req.params.id

    const user: any = await User.findOne({ _id: id })

    const { type } = user
    if (type === 'customer') {
      const customer = await Customer.findOne({ _id: id })
      res.status(200).send(customer)
    } else if (type === 'agent') {
      const agent = await BookingAgent.findOne({ _id: id })
      res.status(200).send(agent)
    } else if (type === 'staff') {
      const staff = await Staff.findOne({ _id: id })
      res.status(200).send(staff)
    }
  }

  login = async (req: express.Request, res: express.Response) => {
    const email = req.params.email
    const password = req.params.password

    const user: any = await User.findOne({ email: email })

    if (!user) {
      res.status(401).send('User with Email does not Exist')
    } else {
      const { type, _id } = user

      if (type === 'customer') {
        const customer: any = await Customer.findOne({ _id: _id })
        if (customer.password === password) {
          res.status(200).send(user)
        } else {
          res.status(401).send('Incorrect Password')
        }
      } else if (type === 'staff') {
        const staff: any = await Staff.findOne({ _id: _id })
        if (staff.password === password) {
          res.status(200).send(user)
        } else {
          res.status(401).send('Incorrect Password')
        }
      } else if (type === 'agent') {
        const agent: any = await BookingAgent.findOne({ _id: _id })
        if (agent.password === password) {
          res.status(200).send(user)
        } else {
          res.status(401).send('Incorrect Password')
        }
      }
    }
  }

  signup = async (req: express.Request, res: express.Response) => {
    const body: UserEntity = req.body
    const { email, password, type } = body

    const user: any = await User.findOne({ email: email })

    if (user) {
      res.status(401).send('User with Email Already Exists')
    } else {
      if (type === 'customer') {
        const customer: CustomerEntity | undefined = body.Customer
        if (customer) {
          const {
            name,
            street,
            building_number,
            city,
            state,
            phone_number,
            passport_number,
            passport_country,
            passport_expiration,
            date_of_birth,
          } = customer

          const id = shortUUID.generate()

          const customerData = {
            _id: id,
            email: email,
            password: password,
            name: name,
            street: street,
            building_number: building_number,
            city: city,
            state: state,
            phone_number: phone_number,
            passport_country: passport_country,
            passport_expiration: passport_expiration,
            passport_number: passport_number,
            date_of_birth: date_of_birth,
          }

          const userData = {
            _id: id,
            type: 'customer',
            email: email,
          }

          const user: any = new User(userData)
          const newUser = await user.save(user)
          const newCustomer: any = new Customer(customerData)
          await newCustomer.save(customer)

          res.status(201).send(user)
        }
      } else if (type === 'agent') {
        const agent: AgentEntity | undefined = body.Agent
        if (agent) {
          const { commission } = agent
          const id = shortUUID.generate()

          const agentData = {
            _id: id,
            email: email,
            password: password,
            commission: commission,
          }
          const userData = {
            _id: id,
            type: 'agent',
            email: email,
          }
          const user: any = new User(userData)
          const newUser = await user.save(user)
          const newAgent: any = new BookingAgent(agentData)
          await newAgent.save(newAgent)

          res.status(201).send(newUser)
        }
      } else if (type === 'staff') {
        const staff: StaffEntity | undefined = body.Staff

        if (staff) {
          const { airline_name } = staff

          const id = shortUUID.generate()

          const staffData = {
            _id: id,
            email: email,
            password: password,
            airline_name: airline_name,
          }
          const userData = {
            _id: id,
            type: 'staff',
            email: email,
          }

          const user: any = new User(userData)
          const newUser = await user.save(user)
          const newStaff: any = new Staff(staffData)
          await newStaff.save(newStaff)

          res.status(201).send(newUser)
        }
      }
    }
  }
}
