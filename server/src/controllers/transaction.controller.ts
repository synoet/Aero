import Customer from '../models/customer.model';
import User from '../models/user.model';
import BookingAgent from '../models/booking_agent.model';
import express from 'express';
import { MongooseService } from '../services/mongoose.service';
import * as shortUUID from "short-uuid";
import Transaction from '../models/transaction.model';

type TransactionData = {
    ticket_id: string,
    customer_email: string,
    booking_agent_email:{
        type: string,
        default: null
    }
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

        const user = User.findOne({email: UserEmail});

        // const transactionData: TransactionData = {
        //     ticket_id: shortUUID.generate(),
        //     customer_email: customerEmail,
        // }
        // const transaction: any = new Transaction(transactionData);
        // const newTransaction = await transaction.save(transaction);
        // res.status(201).send(transaction);


    }

    



}