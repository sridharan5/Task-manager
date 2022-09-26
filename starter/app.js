const connectDB = require("./db/connect")
const express = require("express")
const app = express()
const tasks = require('./routes/tasks')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


// const notFound = require('./middleware/not-found')
require("dotenv").config()

// middleware
app.use(express.static('./public'))
app.use(express.json())

// app.use(notFound)

const options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Nodejs projects',
            version:'1.0.0'
        },
        servers:[
            {
                api:'http://localhost:8000'
            }
        ]
    },
    apis:['./controllers/tasks.js']
}

const swaggerSpec = swaggerJSDoc
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/v1/tasks',tasks)

const port = 3000
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`The server is running on ${port}`))
    }
    catch(error){
        console.log(error)
    }
}

start()
