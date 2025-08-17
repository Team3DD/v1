import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, appointmentType, preferredDate, preferredTime, message } = body

    // Validate required fields
    if (!name || !email || !phone || !appointmentType) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Validate appointment type
    const validTypes = ["primera-vez", "seguimiento", "cirugia", "deportiva", "dolor", "segunda-opinion"]

    if (!validTypes.includes(appointmentType)) {
      return NextResponse.json({ error: "Tipo de cita inválido" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Check availability
    // 3. Send email notification to doctor
    // 4. Send confirmation email to patient
    // 5. Integrate with calendar system

    // For now, we'll just log the data and return success
    console.log("Appointment request:", {
      name,
      email,
      phone,
      appointmentType,
      preferredDate,
      preferredTime,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json(
      {
        message: "Solicitud de cita enviada correctamente",
        success: true,
        appointmentId: `APT-${Date.now()}`, // Generate a simple ID
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing appointment request:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
