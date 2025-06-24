import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(fullName: string, email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AbhinayPath <noreply@abhinaypath.com>',
      to: [email],
      subject: 'Welcome to AbhinayPath Community!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #7E1F2E; text-align: center;">Welcome to AbhinayPath!</h1>
          <p style="font-size: 18px; color: #333;">
            WELCOME TO PART OF ABHINAYPATH GROWING COMMUNITY. ${fullName.toUpperCase()} IS REGISTERED
          </p>
          <p style="color: #666;">
            Thank you for joining our community of passionate artists and creative professionals. 
            You're now part of India's first comprehensive platform for auditions, workshops, and creative careers.
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #7E1F2E;">What's Next?</h2>
            <ul style="color: #666;">
              <li>Explore available auditions and opportunities</li>
              <li>Connect with fellow artists in the community</li>
              <li>Stay updated with workshops and training programs</li>
              <li>Build your creative career with us</li>
            </ul>
          </div>
          <p style="color: #666;">
            Welcome aboard!<br>
            The AbhinayPath Team
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}