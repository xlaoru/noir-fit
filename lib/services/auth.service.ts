import { hashPassword, verifyPassword } from "./password.service"
import prisma from "../prisma"
import { createSession } from "./session.service"

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return null
  }

  const isValid = verifyPassword(password, user.password)

  if (!isValid) {
    return null
  }

  await createSession(user.id)

  return user
}

export async function register(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) {
  const isExist = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (isExist) {
    throw new Error("User already exists.")
  }

  const passwordHash = await hashPassword(password)

  const baseSlug = `${firstName.toLowerCase().replace(/\s+/g, "-")}-${lastName.toLowerCase().replace(/\s+/g, "-")}`
  let slug = baseSlug
  let i = 1

  while (await prisma.user.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${i++}`
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      firstName,
      lastName,
      slug,
    },
  })

  await createSession(user.id)

  return user
}
