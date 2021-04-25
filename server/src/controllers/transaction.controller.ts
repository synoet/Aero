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
    //card_expiration: Date,
    card_expiration: string,
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
        const UserEmail = req.body.customerEmail;
        console.log(UserEmail);
        const BookingEmail = req.body.bookingEmail;
        console.log(BookingEmail);
        const ticketID = shortUUID.generate();

        const expireDate = new Date(req.body.cardExpiration);

        const purchaseDate = new Date();
        //purchaseDate.setHours(purchaseDate.getHours());


        const TransactionData: TransactionData = {
            ticket_id: ticketID,
            customer_email: UserEmail,
            booking_agent_email: BookingEmail
        }

        const PurchaseData: PurchaseInfoData = {
            ticket_ID: ticketID,
            purchase_ID: req.body.purchaseID,
            sold_price: req.body.soldPrice,
            card_type: req.body.cardType,
            card_number: req.body.cardNumber,
            card_Name: req.body.cardName,
            //card_expiration: expireDate,
            card_expiration: req.body.cardExpiration,
            //purchase_time: Date,
            purchase_date: purchaseDate,
            booking_ID: req.body.bookingID
        }

        const TicketData: TicketData = {
            ticket_id: ticketID,
            email: (UserEmail === BookingEmail? BookingEmail:UserEmail),
            flight_number: req.body.flightNumber
        }

        const transaction: any = new Transaction(TransactionData);
        await transaction.save(transaction);

        const purchaseInfo: any = new PurchaseInfo(PurchaseData);
        await purchaseInfo.save(purchaseInfo);

        const ticket: any = new Ticket(TicketData);
        const newTicket = await ticket.save(ticket);
        res.status(201).send(newTicket);

    }

    



}