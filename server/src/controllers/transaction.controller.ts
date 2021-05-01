import Customer from '../models/customer.model'
import User from '../models/user.model'
import BookingAgent from '../models/booking_agent.model'
import express from 'express'
import { MongooseService } from '../services/mongoose.service'
import * as shortUUID from 'short-uuid'
import Transaction from '../models/transaction.model'
import PurchaseInfo from '../models/purchase_info.model'
import Ticket from '../models/ticket.model'

type TransactionData = {
  _id: string
  customer_email: string
  booking_agent_email: string
}

type PurchaseInfoData = {
  _id: string
  ticket_id: string
  transaction_id: string
  sold_price: number
  card_type: string
  card_number: number
  card_name: string
  card_expiration: Date
  purchase_date: Date
  booking_id: string
}

type TicketData = {
  _id: string
  email: string
  flight_id: string
}

export class TransactionController {
  mongooseService: MongooseService = MongooseService.getInstance()
  constructor() {}

  createTransaction = async (req: express.Request, res: express.Response) => {
    const { userEmail, bookingEmail, price, cardType, cardNumber, cardName, cardExpiration, flightId } = req.body

    const ticketId = shortUUID.generate()
    const purchaseId = shortUUID.generate()
    const transactionId = shortUUID.generate()

    const bookingAgent: any = BookingAgent.findOne({ email: bookingEmail })

    const transactionData: TransactionData = {
      _id: transactionId,
      customer_email: userEmail,
      booking_agent_email: bookingEmail,
    }

    const purchaseInfoData: PurchaseInfoData = {
      _id: purchaseId,
      ticket_id: ticketId,
      transaction_id: transactionId,
      sold_price: price,
      card_type: cardType,
      card_number: cardNumber,
      card_name: cardName,
      card_expiration: new Date(cardExpiration),
      purchase_date: new Date(),
      booking_id: bookingAgent ? bookingAgent['_id'] : null,
    }

    const ticketData: TicketData = {
      _id: ticketId,
      email: bookingEmail === userEmail ? bookingEmail : userEmail,
      flight_id: flightId,
    }

    if(bookingEmail !== userEmail){
      await Ticket.deleteOne({email: bookingEmail, flight_id: flightId})
    }

    const transaction: any = new Transaction(transactionData)
    await transaction.save(transaction)

    const purchaseInfo: any = new PurchaseInfo(purchaseInfoData)
    await purchaseInfo.save(purchaseInfo)

    const ticket: any = new Ticket(ticketData)
    const newTicket = await ticket.save(ticket)
    res.status(201).send(newTicket)
  }
}
