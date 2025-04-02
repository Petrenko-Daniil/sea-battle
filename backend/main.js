import express from "express"
import {config} from "dotenv";
import {AppDataSource} from "./configs/db.js";
import {Games} from "./entities/games.js";

config()

const app = express()
const port = process.env.PORT

app.use(express.json())

app.post('/api/game/start', async (req, res) => {
    try {
        const { token } = req.body
        const gamesRepository = await AppDataSource.getRepository(Games)

        console.log(gamesRepository)

    }   catch (error) {
        console.error(`Here error: ${error}`)

    }
})

app.listen(port, () => {
    console.log(`Server has been start on ${port}`)
})

