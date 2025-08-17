import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email to user

    // For now, we'll just log the data and return success
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        message: "Mensaje enviado correctamente",
        success: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
