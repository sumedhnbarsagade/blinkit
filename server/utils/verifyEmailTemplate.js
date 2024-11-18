const verifyEmailTemplate = ({name, url}) => {
    return `
    <p>Dear ${name}</p>
    <p>Thank you for registering Blinkit.</p>
    <a href=${url} style="color: #fff; background: #0078d4; padding: 20px; border-radius: 0.5rem;">
        Verify Email
    </a>
    
    `
}

export default verifyEmailTemplate;