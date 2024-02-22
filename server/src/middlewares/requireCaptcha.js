
async function requireCaptcha(req, res, next){
    const captchaValue = req.body.captchaValue;
    
    try {
        if(!captchaValue){
            throw new Error();
        }

        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaValue}`,
            {
                method : 'POST',
            }
          )
        
        const data = await response.json()
        
        if(!data.success){
            throw new Error();
        }

        next();
    } catch (error) {
        res.status(400).json({error : "Invalid captcha."});
    }
}

module.exports = requireCaptcha
