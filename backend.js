require('./db/connection')
const model_cons = require('./schema/schema')

const bc = require('bcrypt')

const E = require('express')
const app = E();
const bp = require('body-parser')
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())


const path = require('path')
const ejs = require('ejs')
app.set('view engine', 'ejs')
//const exactpath=path.join(__dirname,'views')
app.set('views', path.join(__dirname, 'views'))


app.get('/home', (req, res) => {
   res.render('home')
})

app.get('/signup', (req, res) => {
   res.render('signup')
})

app.get('/signin', (req, res) => {
   res.render('signin')
})

app.get('/forgot', (req, res) => {
   res.render('forgot')
})

//Register Route
app.post('/signup', async (req, res) => {
   if (!req.body.email || !req.body.name || !req.body.job || !req.body.password || !req.body.cpassword) {
      res.send("fill all details")
   }

   const emailexist = await model_cons.findOne({ email: req.body.email })
   if (emailexist) {
      return res.send("email id is exist ,kindly register with different email id")
   }
   // else if(req.body.password != req.body.cpassword )
   //    {
   //       return res.send("password not matching with conifrm password")
   //    }
   else {


      const name = req.body.name
      const email = req.body.email
      const job = req.body.job
      const password = req.body.password
      const cpassword = req.body.cpassword

      // const hashedpassword=  await bc.hash(password,10)

      const template = model_cons({
         name,
         email,
         job,
         password,
         cpassword
      })
      template.save()
      return res.send("registration sucess")
   }
})

//Login Route
app.post('/signin', async (req, res) => {
   const emailexist = await model_cons.findOne({ email: req.body.email })
   if (!emailexist) {
      return res.send("user not exist ,kindly register first");
   }
   else if (req.body.password != emailexist.password) {
      return res.send("password incorrect");
   }
   else {
      return res.send("singed in ");
   }
});

app.post("/forgot", async (req, res) => {
   const emailexist = await model_cons.findOne({ email: req.body.email });
   if (!emailexist) {
      return res.send("User does not exist")
   }
   else {
      emailexist.password = req.body.newpassword
      emailexist.password = req.body.newpassword
      emailexist.save()
   }
})

app.listen(3000, () => {
   console.log("my server is running on 3000 port")
})



