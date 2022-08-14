import express, {Request, Response} from 'express'
import {prisma} from './prisma'

const app = express()
app.use(express.json())

app.post("/", async(req: Request, res: Response)=> {
  const {name, password} = req.body

  const user = await prisma.user.create({
      data: {
          name,
          password
      }
  })

  res.json(user)
})

app.get("/", async(req: Request, res: Response)=> {
  const users = await prisma.user.findMany()

  res.json(users)
})

app.get("/:id", async (req: Request, res: Response) => {
  const {id} = req.params

  const user = await prisma.user.findUnique({
      where: {
          id: Number(id),
      }
  })

  res.json(user)
})

app.patch("/", async(req: Request, res: Response)=> {
  const {id, name} = req.body
  const updatedUser = await prisma.user.update({
      where: {
          id
      },
      data: {
          name
      }
  })

  res.json(updatedUser)
})

app.delete("/:id", async(req: Request, res: Response)=> {
  const {id} = req.params

  const deletedUser = await prisma.user.delete({
      where: {
          id: Number(id)
      }
  })

  res.json(deletedUser)
})


app.listen(8080, () => {
  console.log("Server running")
})