/* import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'; 

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/admin',adminRouter)

app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.listen(port, () => console.log("Server Started", port))
*/

// server.js
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// --- Express setup ---
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

// --- API routes ---
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

// Test route
app.get('/', (req, res) => {
    res.send('API WORKING')
})

// --- Socket.IO setup ---
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*', // allow frontend access
        methods: ['GET', 'POST']
    }
})

// Define namespace for doctors
const doctorNamespace = io.of('/prescripto.doctors')

doctorNamespace.on('connection', (socket) => {
    console.log('Doctor connected:', socket.id)

    // Example: receive messages from doctor
    socket.on('message', (data) => {
        console.log('Message from doctor:', data)
        // You can broadcast to all doctors in this namespace
        doctorNamespace.emit('message', data)
    })

    socket.on('disconnect', () => {
        console.log('Doctor disconnected:', socket.id)
    })
})

// --- Start server ---
httpServer.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

