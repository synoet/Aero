import Customer from '../models/customer.model';
import User from '../models/user.model';
import BookingAgent from '../models/booking_agent.model';
import express from 'express';
import { MongooseService } from '../services/mongoose.service';
import * as shortUUID from "short-uuid";
import Transaction from '../models/transaction.model';
import PurchaseInfo from '../models/purchase_info.model';
import Ticket from '../models/ticket.model';

type TransactionData = {
    ticket_id: string,
    customer_email: string,
    booking_agent_email: string
}

type PurchaseInfoData = {
    ticket_ID: string,
    purchase_ID: string,
    sold_price: number,
    card_type: string,
    card_number: number,
    card_Name: string,
    card_expiration: Date,
    //purchase_time: Date,
    purchase_date: Date,
    booking_ID: string
}

type TicketData = {
    ticket_id: string,
    email: string,
    flight_number: string
}

const searchableKeys = [
    'customer_email',
    'booking_agent_email'
]

export class TransactionController {
    mongooseService: MongooseService = MongooseService.getInstance();
    constructor(){}

    createTransaction = async(req: express.Request, res: express.Response) => {
        const UserEmail = req.params.customerEmail;
        const BookingEmail = req.params.bookingEmail;
        const ticketID = shortUUID.generate();

        const purchaseDate = new Date();
        purchaseDate.setHours(purchaseDate.getHours());


        const transactionData: TransactionData = {
            ticket_id: ticketID,
            customer_email: UserEmail,
            booking_agent_email: BookingEmail
        }
        const transaction: any = new Transaction(transactionData);
        const newTransaction = await transaction.save(transaction);
        res.status(201).send(transaction);


    }

    



}