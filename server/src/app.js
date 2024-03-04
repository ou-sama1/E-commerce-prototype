const express = require("express");
const path = require('path');
const cors = require("cors");
const helmet = require('helmet');
const productsRouter = require("./routes/products/products.router");
const usersRouter = require("./routes/users/users.router");

const app = express();

app.use(helmet({
                contentSecurityPolicy: {
                        directives: {
                            "script-src": ["'self'", "https://www.google.com", "https://www.gstatic.com", "https://api.emailjs.com"],
                            "img-src": ["'self'", "https://images.unsplash.com", "https://img.freepik.com", "data:"],
                            "frame-src": ["'self'", "https://www.google.com", "https://www.gstatic.com/recaptcha/", "https://recaptcha.google.com/recaptcha/"],
                            "default-src": ["'self'", "https://api.emailjs.com"],
                        },
                    },
                }
                )
        );

app.use(cors({
    origin : "http://localhost:5173",
}));

app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(productsRouter);
app.use(usersRouter);

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// })

module.exports = app;