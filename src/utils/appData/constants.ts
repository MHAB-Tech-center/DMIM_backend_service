export const headerHTML = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            color: white;
            text-align: center;
        }

        .header img {
            width: 100%;
            height: auto;
        }

        .content {
            padding: 20px;
            color: black;
        }

        .footer {
            background-color: #0056b3;
            color: white;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #0056b3;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
        }

        @media only screen and (max-width: 600px) {
            .content {
                padding: 10px;
            }

            .header {
                padding: 10px;
            }
        }
    </style>
</head>

<body>

    <div class="container">
        <div class="header">
            <img src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWluaW5nJTIwcGVyc29ufGVufDB8fDB8fHww"
                alt="Construction">`;

export const footerHTML = `
        <div class="footer">
            <p>&copy; 2024 Rwanda Mines, Petroleum, and Gas Board (RMB). All rights reserved.</p>
        </div>
    </div>

</body>

</html>`;
