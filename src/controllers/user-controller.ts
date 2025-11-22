import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { hash } from "bcrypt"
import { AppError } from "@/utils/appError"

export class UserController {
  async create(request: Request, response: Response) {
    const userSchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = userSchema.parse(request.body)

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

    if (userWithSameEmail) {
      throw new AppError("usuário com esse email já existe!")
    }

    const hashedPassword = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
    })

    const {password: _, ...userWithoutPassword } = user

    return response.status(201).json(userWithoutPassword)
  }
}
