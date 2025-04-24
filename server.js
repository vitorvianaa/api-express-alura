import 'dotenv/config'
import app from './src/app.js'

app.listen(process.env.PORT_SERVER, () => {
    console.log(`Server listen in port ${process.env.PORT_SERVER}...`)
})
