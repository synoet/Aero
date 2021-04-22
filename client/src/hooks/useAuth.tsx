import React, { useState, useEffect, useContext, createContext } from "react";

type AuthContextType =  {
  signin: (email: string, password: string, callback?: () => void) => void,
  user: any,
  signup: (data: any) => void,
  signout: () => void,
  isSession: () => boolean

}

const defaultContext: AuthContextType = {
  user: undefined,
  signin: (email: string, password: string) => {console.log('no provider')},
  signup: (data: any) => {console.log('no provider')},
  signout: () => {console.log('no provider')},
  isSession: () => false
}

const authContext = createContext<AuthContextType>(defaultContext);

export const  AuthProvider = ({ children }: {children: any}) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(undefined);

  const signin = (email: string, password: string, callback?: () => void): void => {
    fetch(`https://projectaero-api.herokuapp.com/user/login/${email}/${password}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    }).then((res) => res.json())
    .then((res) => {
      if(res['_id']){
        console.log(res['_id']);
        setSessionToken(res['_id']);
        if (callback){
          callback();
        }
      }
    }).catch(error => console.log(error))
  };

  const signup = (data: any): void => {

  };

  const isSession = (): boolean => {
    const user_id = localStorage.getItem('aero-id');
    if(user_id){
      return true;
    }
    return false;
  }

  const getSessionToken = () => {
    if (!isSession()){
      return undefined;
    }
    return localStorage.getItem('aero-id');
  }

  const setSessionToken = (token: string): void => {
    if (isSession()){
      localStorage.removeItem('aero-id');
    }
    localStorage.setItem('aero-id', token);
  }

  const removeSessionToken = (): void => {
    if(isSession()){
      localStorage.removeItem('aero-id');
    }
  }

  const signout = (): void => {
    setUser(undefined);
    removeSessionToken();
  };

  useEffect(() => {
    if(!user && isSession()){
      const token = getSessionToken();
      fetch(`https://projectaero-api.herokuapp.com/user/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
      }
      }).then((res) => res.json())
      .then((res) => {
        setUser(res);
      }).catch((error) => console.log(error))
    }
  }, [])

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    isSession
  };
}