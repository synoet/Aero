import React, { useState, useEffect, useContext, createContext } from 'react'

type AuthContextType = {
  signin: (email: string, password: string, callback?: () => void) => void
  user: any
  role: string | undefined
  signup: (data: any) => void
  signout: () => void
  isSession: () => boolean
}

const defaultContext: AuthContextType = {
  user: undefined,
  role: undefined,
  signin: (email: string, password: string) => {
    console.log('no provider')
  },
  signup: (data: any) => {
    console.log('no provider')
  },
  signout: () => {
    console.log('no provider')
  },
  isSession: () => false,
}

const authContext = createContext<AuthContextType>(defaultContext)

export const AuthProvider = ({ children }: { children: any }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(undefined)
  const [role, setRole] = useState<string | undefined>(undefined)

  const signin = (email: string, password: string, callback?: () => void): void => {
    fetch(`https://projectaero-api.herokuapp.com/user/login/${email}/${password}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if ((res['_id'], res['type'])) {
          setSession(res['_id'], res['type'])
          refresh()
          if (callback) {
            callback()
          }
        }
      })
      .catch(error => console.log(error))
  }

  const signup = (data: any): void => {
    fetch(`https://projectaero-api.herokuapp.com/user/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log(res);
      signin(data.email, data.password);
    }).catch((error) => console.log(error));
  }

  const isSession = (): boolean => {
    const user_id = localStorage.getItem('aero-id')
    const user_role = localStorage.getItem('aero-role')
    if (user_id && user_role) {
      return true
    }
    return false
  }

  const getSession = () => {
    if (!isSession()) {
      return undefined
    }
    return {
      id: localStorage.getItem('aero-id'),
      role: localStorage.getItem('aero-role'),
    }
  }

  const setSession = (token: string, role: string): void => {
    if (isSession()) {
      localStorage.removeItem('aero-id')
      localStorage.removeItem('aero-role')
    }
    localStorage.setItem('aero-id', token)
    localStorage.setItem('aero-role', role)
  }

  const removeSession = (): void => {
    if (isSession()) {
      localStorage.removeItem('aero-id')
      localStorage.removeItem('aero-role')
    }
  }

  const refresh = () => {
    if (!user && isSession()) {
      const session = getSession()
      if (session) {
        fetch(`https://projectaero-api.herokuapp.com/user/${session.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(res => {
            setUser(res)
            if (session.role) {
              setRole(session.role)
            }
          })
          .catch(error => console.log(error))
      }
    }
  }

  const signout = (): void => {
    setUser(undefined)
    removeSession()
  }

  useEffect(() => {
    if (!user && isSession()) {
      const session = getSession()
      if (session) {
        fetch(`https://projectaero-api.herokuapp.com/user/${session.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(res => {
            setUser(res)
            if (session.role) {
              setRole(session.role)
            }
          })
          .catch(error => console.log(error))
      }
    }
  }, [])

  // Return the user object and auth methods
  return {
    user,
    role,
    signin,
    signup,
    signout,
    isSession,
  }
}
