import express from 'express'
import path from 'path'
import cors  from 'cors'
import mongoose from 'mongoose'
import router from './routes'

//conexion a la base de datos

const DB = () => {
    //const {USER_NAME, DB_PASSWORD}= process.env
    mongoose.connect(`mongodb+srv://jcmartinorozco:16080073@cluster0.hvxvolp.mongodb.net/?retryWrites=true&w=majority`),{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true
    }

    }
    console.log(
        'DB is connected')

DB() 
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/', router)

app.set( 'port', process.env.PORT || 5000
)

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})   








