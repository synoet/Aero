import Customer from "../models/customer.model";
import User from "../models/user.model";
import Staff from "../models/staff.model";
import BookingAgent from "../models/booking_agent.model";
import PurchaseInfo from "../models/purchase_info.model";
import Transaction from "../models/transaction.model";
import express from "express";
import { MongooseService } from "../services/mongoose.service";
import * as shortUUID from "short-uuid";
import Ticket from "../models/ticket.model";
import Flight from "../models/flight.model";

interface UserEntity {
  email: string;
  password: string;
  type: string;
  Agent?: AgentEntity;
  Customer?: CustomerEntity;
  Staff?: StaffEntity;
}

interface AgentEntity {
  commission: number;
}

interface CustomerEntity {
  name: string;
  street: string;
  building_number: number;
  city: string;
  state: string;
  phone_number: string;
  passport_number: number;
  passport_expiration: Date;
  passport_country: string;
  date_of_birth: Date;
}

interface StaffEntity {
  airline_name: string;
}

export class UserController {
  mongooseService: MongooseService = MongooseService.getInstance();
  constructor() {}

  spending = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    let total = 0;
    let spendingByMonths = [
      {
        month: 1,
        name: "January",
        spending: 0,
      },
      {
        month: 2,
        name: "Febuary",
        spending: 0,
      },
      {
        month: 3,
        name: "March",
        spending: 0,
      },
      {
        month: 4,
        name: "April",
        spending: 0,
      },
      {
        month: 5,
        name: "May",
        spending: 0,
      },
      {
        month: 6,
        name: "June",
        spending: 0,
      },
      {
        month: 7,
        name: "July",
        spending: 0,
      },
      {
        month: 8,
        name: "August",
        spending: 0,
      },
      {
        month: 9,
        name: "September",
        spending: 0,
      },
      {
        month: 10,
        name: "October",
        spending: 0,
      },
      {
        month: 11,
        name: "November",
        spending: 0,
      },
      {
        month: 12,
        name: "December",
        spending: 0,
      },
    ];

    const user: any = await User.findOne({ _id: id });
    if (user) {
      const transactions = await Transaction.find({
        customer_email: user.email,
      });
      await Promise.all(
        transactions.map(async (transaction: any) => {
          const purchase: any = await PurchaseInfo.findOne({
            transaction_id: transaction._id,
          });
          const month: any = new Date(purchase.purchase_date).getMonth();
          spendingByMonths[month].spending += purchase.sold_price;
          total += purchase.sold_price;
        })
      );
    }

    res
      .status(200)
      .send({ totalSpending: total, spendingByMonths: spendingByMonths });
  };

  revenue = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    let revenueByMonths = [
      {
        month: 1,
        name: "January",
        revenue: 0,
      },
      {
        month: 2,
        name: "Febuary",
        revenue: 0,
      },
      {
        month: 3,
        name: "March",
        revenue: 0,
      },
      {
        month: 4,
        name: "April",
        revenue: 0,
      },
      {
        month: 5,
        name: "May",
        revenue: 0,
      },
      {
        month: 6,
        name: "June",
        revenue: 0,
      },
      {
        month: 7,
        name: "July",
        revenue: 0,
      },
      {
        month: 8,
        name: "August",
        revenue: 0,
      },
      {
        month: 9,
        name: "September",
        revenue: 0,
      },
      {
        month: 10,
        name: "October",
        revenue: 0,
      },
      {
        month: 11,
        name: "November",
        revenue: 0,
      },
      {
        month: 12,
        name: "December",
        revenue: 0,
      },
    ];

    const user: any = await User.findOne({ _id: id });
    if (user.type === "customer") {
      res
        .status(200)
        .send("Sorry this feature is only available for Staff & Agents");
    }
    let total = 0;
    if (user.type === "agent") {
      const agent: any = await BookingAgent.findOne({ _id: user._id });
      const commission = agent.commission;

      const transactions = await Transaction.find({
        booking_agent_email: user.email,
      });

      await Promise.all(
        transactions.map(async (transaction: any) => {
          if (transaction.customer_email !== transaction.booking_agent_email) {
            const purchase: any = await PurchaseInfo.findOne({
              transaction_id: transaction._id,
            });
            const month: any = new Date(purchase.purchase_date).getMonth();
            revenueByMonths[month].revenue += commission;
            total += commission;
          }
        })
      );

      res
        .status(200)
        .send({ revenueSpending: total, revenueByMonths: revenueByMonths });
    } else if (user.type === "staff") {
      const staff: any = await Staff.findOne({ _id: id });
      const airline = staff.airline;

      const transactions = await Transaction.find();

      await Promise.all(
        transactions.map(async (transaction: any) => {
          if (
            transaction.customer_email === transaction.booking_agent_email ||
            transaction.booking_agent_email === null
          ) {
            const purchase: any = await PurchaseInfo.findOne({
              transaction_id: transaction._id,
            });
            const month: any = new Date(purchase.purchase_date).getMonth();
            const ticket: any = await Ticket.findOne({
              _id: purchase.ticket_id,
            });
            const flight: any = await Flight.findOne({ _id: ticket.flight_id });
            if (flight.airline_name === staff.airline_name) {
              revenueByMonths[month].revenue += flight.base_price;
              total += flight.base_price;
            }
          }
        })
      );

      res
        .status(200)
        .send({ totalRevenue: total, revenueByMonths: revenueByMonths });
    }
  };

  tickets = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const user: any = await User.findOne({ _id: id });
    const tickets = await Ticket.find({ email: user.email });

    res.status(200).send(tickets);
  };

  flights = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const user: any = await User.findOne({ _id: id });

    const tickets = await Ticket.find({ email: user.email });
    const currDate = new Date();
    const previousFlights: any = [];
    const upcomingFlights: any = [];
    await Promise.all(
      tickets.map(async (ticket: any) => {
        const flight: any = await Flight.findOne({ _id: ticket.flight_id });
        if (flight.departure_date < currDate) {
          previousFlights.push(flight);
        } else {
          upcomingFlights.push(flight);
        }
      })
    );

    res
      .status(200)
      .send({
        previousFlights: previousFlights,
        upcomingFlights: upcomingFlights,
      });
  };

  getUser = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    const user: any = await User.findOne({ _id: id });

    const { type } = user;
    if (type === "customer") {
      const customer = await Customer.findOne({ _id: id });
      res.status(200).send(customer);
    } else if (type === "agent") {
      const agent = await BookingAgent.findOne({ _id: id });
      res.status(200).send(agent);
    } else if (type === "staff") {
      const staff = await Staff.findOne({ _id: id });
      res.status(200).send(staff);
    }
  };

  login = async (req: express.Request, res: express.Response) => {
    const email = req.params.email;
    const password = req.params.password;

    const user: any = await User.findOne({ email: email });

    if (!user) {
      res.status(401).send("User with Email does not Exist");
    } else {
      const { type, _id } = user;

      if (type === "customer") {
        const customer: any = await Customer.findOne({ _id: _id });
        if (customer.password === password) {
          res.status(200).send(user);
        } else {
          res.status(401).send("Incorrect Password");
        }
      } else if (type === "staff") {
        const staff: any = await Staff.findOne({ _id: _id });
        if (staff.password === password) {
          res.status(200).send(user);
        } else {
          res.status(401).send("Incorrect Password");
        }
      } else if (type === "agent") {
        const agent: any = await BookingAgent.findOne({ _id: _id });
        if (agent.password === password) {
          res.status(200).send(user);
        } else {
          res.status(401).send("Incorrect Password");
        }
      }
    }
  };

  signup = async (req: express.Request, res: express.Response) => {
    const body: UserEntity = req.body;
    const { email, password, type } = body;

    const user: any = await User.findOne({ email: email });

    if (user) {
      res.status(401).send("User with Email Already Exists");
    } else {
      if (type === "customer") {
        const customer: CustomerEntity | undefined = body.Customer;
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
          } = customer;

          const id = shortUUID.generate();

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
          };

          const userData = {
            _id: id,
            type: "customer",
            email: email,
          };

          const user: any = new User(userData);
          const newUser = await user.save(user);
          const newCustomer: any = new Customer(customerData);
          await newCustomer.save(customer);

          res.status(201).send(user);
        }
      } else if (type === "agent") {
        const agent: AgentEntity | undefined = body.Agent;
        if (agent) {
          const { commission } = agent;
          const id = shortUUID.generate();

          const agentData = {
            _id: id,
            email: email,
            password: password,
            commission: commission,
          };
          const userData = {
            _id: id,
            type: "agent",
            email: email,
          };
          const user: any = new User(userData);
          const newUser = await user.save(user);
          const newAgent: any = new BookingAgent(agentData);
          await newAgent.save(newAgent);

          res.status(201).send(newUser);
        }
      } else if (type === "staff") {
        const staff: StaffEntity | undefined = body.Staff;

        if (staff) {
          const { airline_name } = staff;

          const id = shortUUID.generate();

          const staffData = {
            _id: id,
            email: email,
            password: password,
            airline_name: airline_name,
          };
          const userData = {
            _id: id,
            type: "staff",
            email: email,
          };

          const user: any = new User(userData);
          const newUser = await user.save(user);
          const newStaff: any = new Staff(staffData);
          await newStaff.save(newStaff);

          res.status(201).send(newUser);
        }
      }
    }
  };
}
