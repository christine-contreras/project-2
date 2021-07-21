import { useEffect, useState } from "react"
import axios from 'axios'

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios
      .post("http://localhost:8000/login", { code })
      .then((response) => {

        // If success then cut the code string from the URL and execute the other thing
        // window.history.pushState({}, null, "/")

        console.log(response.data);
        setRefreshToken(response.data.refreshToken)
        setExpiresIn(response.data.expiresIn)
        setAccessToken(response.data.accessToken)
        

      })
      .catch((err) => {
        console.log(err)
        //   If fail redirect to home page - Login page
        //window.location = "/"
      })
  }, [code])

  // useEffect(() => {
  //   if (!refreshToken || !expiresIn) return

  //   const interval = setInterval(() => {

  //     axios
  //     .post("http://localhost:8000/refresh", { refreshToken })
  //     .then((response) => {
        
  //       setAccessToken(response.data.accessToken)
  //       setExpiresIn(response.data.expiresIn)

  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       //   If fail redirect to home page - Login page
  //       window.location = "/"
  //     })

  //   }, (expiresIn - 60) * 1000 )

  //   return () => clearInterval(interval)
    
  // }, [refreshToken, expiresIn])


  // console.log(accessToken)
  return accessToken
}