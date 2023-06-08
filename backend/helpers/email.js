import nodemailer from 'nodemailer';

const emailSignUp = async (data) => {

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ca9f7d77163bae",
          pass: "d439fa3df630e9"
        }
      });

      //Email info 

      const info = await transport.sendMail({
        from: "Uptask - Administrator",
        to: data?.email,
        subject: "Uptask - Confirm your Account",
        text: 'This is the way to valid your account',
        html: `<p>Hello! ${data?.name} Confirm your account</p>
        <a href="/${process.env.FRONTEND_URL}/confirm/${data?.token}">Click here!</a>
        
        `

      })
      
};

const emailRecoverPassword = async (data) => {


  //TODO: move to ENV.

  const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ca9f7d77163bae",
        pass: "d439fa3df630e9"
      }
    });

    //Email info 

    const info = await transport.sendMail({
      from: "Uptask - Administrator",
      to: data?.email,
      subject: "Uptask - CHANGE YOUR PASSWORD",
      text: 'This is the way to change your password',
      html: `<p>Hello!${data?.name} change your Password</p>
      <a href="/${process.env.FRONTEND_URL}/forgot-password/${data.token}">Click here!</a>
      
      `
    })
    
};


export {
    emailSignUp,
    emailRecoverPassword
}