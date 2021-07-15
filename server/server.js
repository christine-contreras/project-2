require('dotenv').config()
const express = require('express')
const cors = require('cors')
const spotifyWebApi = require('spotify-web-api-node')
const app = express()
const port = 8000

app.use(cors()) // To handle cross-origin requests
app.use(express.json()); // To parse JSON bodies

app.get('/', (req, res) => {
  console.log('Hello World!')
})

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken

  const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken
  }

  let spotifyApi = new spotifyWebApi(credentials)

  spotifyApi.refreshAccessToken().then(
    data => {
      res.json({
        accessToken : data.body.access_token,
        expiresIn: data.body.expires_in
    }) 
  
      // Save the access token so that it's used in future calls
      //spotifyApi.setAccessToken(data.body['access_token']);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400)
  })

})

app.post('/login', (req,res) => {
  const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  }

//  setup 
    let spotifyApi = new spotifyWebApi(credentials)

//  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api     
    const code = req.body.code

    // Retrieve an access token
    spotifyApi.authorizationCodeGrant(code).then((data) => {

        // Returning the User's AccessToken in the json formate  
        res.json({
            accessToken : data.body.access_token,
            refreshToken : data.body.refresh_token,
            expiresIn: data.body.expires_in
        }) 
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(400)
    })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})