import Customer from '../models/customer.model';
import User from '../models/user.model';
import Staff from '../models/staff.model';
import BookingAgent from '../models/booking_agent.model';
import express from 'express';
import { MongooseService } from '../services/mongoose.service';
import * as shortUUID from "short-uuid";

interface UserEntity {
    email: string;
    password: string;  
    type: string;
    Agent?: AgentEntity;
    Customer?: CustomerEntity;  
    Staff?: StaffEntity;
}

interface AgentEntity {
    commision: number;
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
    constructor(){}

    getUser = async(req: express.Request, res: express.Response) => {
        const id = req.params.id;

        const user: any = await User.findOne({_id: id});

        const {type} = user;
        if(type === 'customer'){
            const customer = await Customer.findOne({_id: id});
            res.status(200).send(customer);
        }else if(type === 'agent'){
            const agent = await BookingAgent.findOne({_id: id});
            res.status(200).send(agent);
        }else if(type === 'staff'){
            const staff = await Staff.findOne({_id: id});
            res.status(200).send(staff);
        }
    }

    login = async(req: express.Request, res: express.Response) => {
        const email = req.params.email; 
        const password = req.params.password;

        const user: any = await User.findOne({email: email});

        if (!user){
            res.status(401).send('User with Email does not Exist')
        }else {
            const {type, _id} = user;

            if(type === 'customer'){
                const customer: any = await Customer.findOne({_id: _id});
                if (customer.password === password){
                    res.status(200).send(user);
                }else {
                    res.status(401).send('Incorrect Password');
                }
            }else if(type === 'staff'){
                const staff: any = await Staff.findOne({_id: _id});
                if (staff.password === password){
                    res.status(200).send(user);
                }else {
                    res.status(401).send('Incorrect Password');
                }
            }else if(type === 'agent'){
                const agent: any = await BookingAgent.findOne({_id: _id});
                if (agent.password === password){
                    res.status(200).send(user);
                }else {
                    res.status(401).send('Incorrect Password');
                }
            }
        }
    }

    signup = async(req: express.Request, res: express.Response) => {
        const body: UserEntity = req.body;
        const {email, password, type} = body;

        const user: any = await User.findOne({email: email});

        if(user){
            res.status(401).send('User with Email Already Exists');
        }else {
            if(type === 'customer'){
                const customer: CustomerEntity | undefined = body.Customer;
                if (customer){
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
                        date_of_birth
                    } = customer;
    
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
                        date_of_birth: date_of_birth   
                    }
    
                    const userData = {
                        _id: id,
                        type: 'customer',
                        email: email
                    }
    
                    const user: any = new User(userData);
                    const newUser = await user.save(user);
                    const newCustomer: any = new Customer(customerData);
                    await newCustomer.save(customer);
    
                    res.status(201).send(user);
                }
            }else if (type === 'agent'){
                const agent: AgentEntity | undefined = body.Agent;
                if (agent){
                    const {
                        commision
                    } = agent;
                    const id = shortUUID.generate()
                    
                    const agentData = {
                        _id: id,
                        email: email,
                        password: password,
                        commision: commision
                    }
                    const userData = {
                        _id: id,
                        type: 'agent',
                        email: email
                    }
                    const user: any = new User(userData);
                    const newUser = await user.save(user);
                    const newAgent: any = new BookingAgent(agentData);
                    await newAgent.save(newAgent);
    
                    res.status(201).send(newUser);
    
                }
    
            }else if (type === 'staff'){
                const staff: StaffEntity | undefined = body.Staff;
                
                if (staff) {
                    const {
                        airline_name
                    } = staff;
    
                    const id = shortUUID.generate()
    
                    const staffData = {
                        _id: shortUUID.generate(),
                        email: email,
                        password: password,
                        airline_name: airline_name
                    }
                    const userData = {
                        _id: id,
                        type: 'staff',
                        email: email
                    }
    
                    const user: any = new User(userData);
                    const newUser = await user.save(user);
                    const newStaff: any = new Staff(staffData);
                    await newStaff.save(newStaff);
    
                    res.status(201).send(newUser);
                }
    
    
            }

        }

    }
}