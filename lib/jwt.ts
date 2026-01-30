import { ITokenPayload } from "@/utils/models"
import jwt from "jsonwebtoken"

export function signAccessToken(payload: object): string {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  })
}

export function signRefreshToken(payload: object): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  })
}

export function verifyAccessToken(token: string): ITokenPayload {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as ITokenPayload
}

export function verifyRefreshToken(token: string): ITokenPayload {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as ITokenPayload
}
