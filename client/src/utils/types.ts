export interface IFlight {
  _id: string;
  flight_number: string;
  departure_date: Date;
  departure_airport_name: string;
  airline_name: string;
  arrival_date: Date;
  arrival_airport_name: string;
  base_price: number;
  airplane_id: string;
  status: string;
}

export const mockFlight: IFlight = {
  _id: "A1",
  flight_number: "abcde",
  departure_date: new Date(),
  departure_airport_name: "newark",
  airline_name: "Jet Blue",
  arrival_date: new Date(),
  arrival_airport_name: "london",
  base_price: 400,
  airplane_id: "12345",
  status: "on-time",
};
