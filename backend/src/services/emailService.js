import nodemailer from 'nodemailer'


export const sendVerificationEmail = async (to, subject, code,type,  firstName) => {
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth:{
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_APP_PASSWORD
            }
        })

         const emailBody =
            type === "verify"
                ? `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px;">
                <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 40px 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
                    <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #3B82F6; margin: 0; font-size: 28px; font-weight: 600;">Connecto</h1>
                    <p style="color: #6B7280; margin: 5px 0 0 0; font-size: 16px;">Team Communication Platform</p>
                    </div>
                    
                    <h2 style="color: #1F2937; font-size: 24px; margin-bottom: 10px;">Welcome to Connecto! 👋</h2>
                    
                    <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                    Hi <strong style="color: #1F2937;">${firstName}</strong>,
                    </p>
                    
                    <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    Thank you for joining Connecto! To complete your registration and start connecting with your team, 
                    please verify your email address using the verification code below:
                    </p>
                    
                    <div style="text-align: center; margin: 35px 0;">
                    <div style="display: inline-block; background: #3B82F6; color: #ffffff; font-size: 32px; font-weight: bold; 
                                letter-spacing: 8px; padding: 20px 40px; border-radius: 8px; text-align: center; 
                                box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3); font-family: monospace;">
                        ${code}
                    </div>
                    </div>
                    
                    <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 30px 0;">
                    <p style="color: #4B5563; font-size: 14px; margin: 0; line-height: 1.5;">
                        <strong>Important:</strong> This verification code will expire in <strong>15 minutes</strong>. 
                        If you didn't create an account with Connecto, please ignore this email.
                    </p>
                    </div>
                    
                    <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 0;">
                    Once verified, you'll be able to access all Connecto features and start seamless communication with your team.
                    </p>
                    
                    <div style="border-top: 1px solid #E5E7EB; margin-top: 40px; padding-top: 20px; text-align: center;">
                    <p style="color: #9CA3AF; font-size: 14px; margin: 5px 0;">
                        &copy; ${new Date().getFullYear()} Connecto. All rights reserved.
                    </p>
                    <p style="color: #9CA3AF; font-size: 12px; margin: 5px 0;">
                        This email was sent from our secure notification system.
                    </p>
                    </div>
                </div>
                </div>
                `
                : `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px;">
                <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 40px 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
                    <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #3B82F6; margin: 0; font-size: 28px; font-weight: 600;">Connecto</h1>
                    <p style="color: #6B7280; margin: 5px 0 0 0; font-size: 16px;">Team Communication Platform</p>
                    </div>
                    
                    <h2 style="color: #1F2937; font-size: 24px; margin-bottom: 10px;">Password Reset Request 🔒</h2>
                    
                    <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                    Hi <strong style="color: #1F2937;">${firstName}</strong>,
                    </p>
                    
                    <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    We received a request to reset your password for your Connecto account. 
                    Use the reset code below to create a new secure password:
                    </p>
                    
                    <div style="text-align: center; margin: 35px 0;">
                    <div style="display: inline-block; background: #3B82F6; color: #ffffff; font-size: 32px; font-weight: bold; 
                                letter-spacing: 8px; padding: 20px 40px; border-radius: 8px; text-align: center; 
                                box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3); font-family: monospace;">
                        ${code}
                    </div>
                    </div>
                    
                    <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 30px 0;">
                    <p style="color: #4B5563; font-size: 14px; margin: 0; line-height: 1.5;">
                        <strong>Security Notice:</strong> This reset code is valid for <strong>15 minutes</strong> only. 
                        If you didn't request a password reset, please secure your account immediately.
                    </p>
                    </div>
                    
                    <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 0;">
                    After resetting your password, you can log in to your Connecto account with your new credentials 
                    and continue collaborating with your team.
                    </p>
                    
                    <div style="border-top: 1px solid #E5E7EB; margin-top: 40px; padding-top: 20px; text-align: center;">
                    <p style="color: #9CA3AF; font-size: 14px; margin: 5px 0;">
                        &copy; ${new Date().getFullYear()} Connecto. All rights reserved.
                    </p>
                    <p style="color: #9CA3AF; font-size: 12px; margin: 5px 0;">
                        This email was sent from our secure notification system.
                    </p>
                    </div>
                </div>
                </div>
                `;

        const info = await transporter.sendMail({
            from: "Connecto",
            to,
            subject,
            html: emailBody
        })
    }
    catch(err){
        console.log("Failed to send verification email")
    }
}   