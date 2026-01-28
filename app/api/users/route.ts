import { adminStorage } from "@/lib/firebase-admin"
import prisma from "@/lib/seed"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const users = await prisma.user.findMany()

    if (users.length === 0) {
      return NextResponse.json({ message: "Users not found." }, { status: 404 })
    }

    return NextResponse.json(
      { message: "Users were fetched successfully.", users },
      { status: 201 },
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { message: `Something went wrong: ${e}.` },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as "USER" | "ADMIN"
    const file = formData.get("avatar") as File
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const address = formData.get("address") as string
    const paymentMethod = formData.get("paymentMethod") as string

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const filename = `${Date.now()}_${file.name}`
    const filePath = `noir-fit/users/${filename}`

    const bucket = adminStorage.bucket()
    const fileRef = bucket.file(filePath)

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
      public: true,
    })

    const [imageUrl] = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    })

    const user = await prisma.user.create({
      data: {
        email,
        password,
        role,
        avatar: imageUrl as string,
        firstName,
        lastName,
        address,
        paymentMethod,
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Something went wrong with user creation." },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: "User was created successfully.", user },
      { status: 201 },
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { message: `Something went wrong: ${e}.` },
      { status: 500 },
    )
  }
}
