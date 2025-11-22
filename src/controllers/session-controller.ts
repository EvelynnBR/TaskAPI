import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/appError"
import { authConfig } from "@/config/auth"
import { compare } from "bcrypt"
import { z } from "zod"
import { sign } from "jsonwebtoken"

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

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ name: user.name, email: user.email }, secret, {
      subject: user.id,
      expiresIn,
    })

    const { password: hashedPassword, ...userWithoutPassword } = user
    
    return response.status(201).json({ token, userWithoutPassword })
  }
}
