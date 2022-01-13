import { Router, Request, Response } from "express";

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello World'
  })
})

export default router