import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { compare } from "bcrypt"
import { z } from "zod"
import { AppError } from "@/utils/appError"

export class SessionController {
  async session(request: Request, response: Response) {
    const sessionSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = sessionSchema.parse(request.body)

    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) {
      throw new AppError("E-mail ou senha invalido!", 400)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("E-mail ou senha invalido!", 400)
    }

    const { password: hashedPassword, ...userWithoutPassword } = user
    return response.status(201).json({ userWithoutPassword })
  }
}
