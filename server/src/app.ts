import express  from 'express';
import * as http from 'http';
const app: express.Application = express();
const router = express.Router();
const server: http.Server = http.createServer(app);

import dotenv from 'dotenv';
dotenv.config();
const group = [{name: "Teo", Nationality: "Russian", Age: "20", Email: "teonys@nyu.edu"}, {name: "Soji", Nationality: "American", Age: "21", Email: "asa699@nyu.edu"}]

const port = process.env.PORT;
app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Aero Server Running!")

})

app.get("/groupmembers", (req: express.Request, res: express.Response) => {
    res.status(200).send(group);
})

app.get("/groupmembers?=:name", (req: express.Request, res: express.Response) => {
    let name = req.params.name;
    res.status(200).send(name == 'teo' ? group[0] : name == 'soji' ? group[1]: "Not Found");
})

app.use(express.json());

server.listen(port, () => {
    console.log(`Server Running at port ${port}`)
})

export default app;


