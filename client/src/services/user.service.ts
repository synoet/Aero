export const loadCustomerData = (userId: string) => {
  let userData: any, spending: any, tickets: any, flights: any
  return new Promise(async (resolve, reject) => {
    await fetch(`https://projectaero-api.herokuapp.com/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        userData = res
      })
      .catch(err => console.log(err))

    await fetch(`https://projectaero-api.herokuapp.com/user/${userId}/spending`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        spending = res
      })
      .catch(err => console.log(err))

    await fetch(`https://projectaero-api.herokuapp.com/user/${userId}/tickets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        tickets = res
      })
      .catch(err => console.log(err))

    await fetch(`https://projectaero-api.herokuapp.com/user/${userId}/flights`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        flights = res
      })
      .catch(err => console.log(err))

    resolve({
      userData: userData,
      spending: spending,
      tickets: tickets,
      flights: flights,
    })
  })
}

export const loadStaffData = (userId: string) => {
  let userData: any, revenue: any, flights: any
  return new Promise(async (resolve, reject) => {
    await fetch(`https://projectaero-api.herokuapp.com/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        userData = res
      })
      .catch(err => console.log(err))

    await fetch(`https://projectaero-api.herokuapp.com/user/${userId}/revenue`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        revenue = res
      })
      .catch(err => console.log(err))

    await fetch(`https://projectaero-api.herokuapp.com/flights/airline/${userData.airline_name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        flights = res
      })
      .catch(err => console.log(err))

    resolve({
      userData: userData,
      revenue: revenue,
      flights: flights,
    })
  })
}

export const loadAgentData = (userId: string) => {
  let userData: any, revenue: any, spending: any, flights: any, frequent: any

  return new Promise(async (resolve, reject) => {
    await fetch(`https://projectaero-api.herokuapp.com/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        userData = res
      })
      .catch(err => console.log(err))

    await fetch(`https://projectaero-api.herokuapp.com/user/${userId}/revenue`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        revenue = res
      })
      .catch(err => console.log(err))

    await fetch(`https://projectaero-api.herokuapp.com/user/${userId}/spending`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        spending = res
      })
      .catch(err => console.log(err))

    await fetch(`https://projectaero-api.herokuapp.com/user/${userId}/flights`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        flights = res
      })
      .catch(err => console.log(err))

    await fetch(`https://projectaero-api.herokuapp.com/user/${userId}/frequent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        frequent = res
      })
      .catch(err => console.log(err))

    resolve({
      userData: userData,
      revenue: revenue,
      spending: spending,
      flights: flights,
      frequent: frequent,
    })
  })
}

export default {
  loadAgentData,
  loadCustomerData,
  loadStaffData,
}
