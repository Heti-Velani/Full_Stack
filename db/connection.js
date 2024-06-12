const M=require('mongoose')
M.connect('mongodb+srv://hetivelani:jjrwETcMJnyUwQt8@cluster0.puiiik3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then( ()=>{
    console.log("server is connected to database")
})
.catch( (err)=>{
    console.log("database is not connected",err)
})
