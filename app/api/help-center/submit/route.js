import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, issue } = await req.json();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,// Replace with your email password or app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: email, // Receiver email
      subject: "We Received Your Issue",
      text: `Hi there, \n\nWe have received your issue:\n"${issue}"\n\nOur team will look into it and get back to you shortly.\n\nThank you for reaching out to us.\n\nBest regards,\nThe Support Team`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
