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

export const columns =  [
    { header: 'Mine site number', key: 'id', width: 10},
    { header: 'Mine site (parameters)', key: 'name', width: 30 },
    { header: 'Subsites', key: 'email', width: 30 },
    { header: 'Mine Site Operator', key: 'phone', width: 20 },
    { header: 'Operator Address', key: 'Operator Address', width: 15 },
    { header: 'Contact Name', key: 'Contact Name', width: 20 },
    { header: 'Contact Number', key: 'Contact Number', width: 20 },
    { header: 'National or Other ID number of Operator', key: 'National or Other ID of Operator', width: 20 },
    { header: 'Owner Name (if different from Operator)', key: 'Contact Name', width: 20 },
    { header: 'National or Other ID number of owner(If different from Operator)', key: 'National or Other ID number of owner(If different from Operator)', width: 20 },
    { header: 'East UTM', key: 'East UTM', width: 20 },
    { header: 'South UTM', key: 'South UTM', width: 20 },
    { header: 'Degree-minute-second - East', key: 'Degree-minute-second - East', width: 20 },
    { header: 'Degree-minute-second - South', key: 'Degree-minute-second - South', width: 20 },
    { header: 'District', key: 'District', width: 20 },
    { header: 'Sector', key: 'Sector', width: 20 },
    { header: 'Cell', key: 'Cell', width: 20 },
    { header: 'Mined Minerals', key: 'Mined Minerals', width: 20 },
    { header: 'ICGLR Classification', key: 'ICGLR Classification', width: 20 },
    { header: 'Type of mineral license', key: 'Type of mineral license', width: 20 },
    { header: 'License Number', key: 'License Number', width: 20 },
    { header: 'Issued Date', key: 'Issued Date', width: 20 },
    { header: 'Expiry Date', key: 'Expiry Date', width: 20 },
    { header: 'Surface Area (ha)', key: 'Surface Area (ha)', width: 20 },
    { header: 'Type of Mine (open pit, underground,both)', key: 'Type of Mine (open pit, underground,both)', width: 20 },
    { header: 'Mining Activity Status (Active,Non-Active, Abandoned)', key: 'Mining Activity Status (Active,Non-Active, Abandoned)', width: 20 },
    { header: 'Exploitation begun', key: 'Exploitation begun', width: 20 },
    { header: 'Number of Workers (incl. Artisinalminers)', key: 'Number of Workers (incl. Artisinalminers)', width: 20 },
    { header: 'Average production per miner per day(kg)', key: 'Average production per miner per day(kg)', width: 20 },
    { header: 'Number of Large open pit(s) - ACTIVE', key: 'Number of Large open pit(s) - ACTIVE', width: 20 },
    { header: 'Number of Large open pit(s) - ABANDONED', key: 'Number of Large open pit(s) - ABANDONED', width: 20 },
    { header: 'Number of Small open pit(s) - ACTIVE', key: 'Number of Small open pit(s) - ACTIVE', width: 20 },
    { header: 'Number of Small open pit(s) - ABANDONED', key: 'Number of Small open pit(s) - ABANDONED', width: 20 },
    { header: 'Number of Underground (tunnels) - ABANDONED', key: 'Number of Underground (tunnels) - ABANDONED', width: 20 },
    { header: 'Mine Site Monthly Productive Capacity[t]', key: 'Mine Site Monthly Productive Capacity[t]', width: 20 },
    { header: 'Production History', key: 'Production History', width: 20 },
    { header: 'The Current status of the minesite', key: 'The Current status of the minesite', width: 20 },
    { header: 'Date of last mine inspection', key: 'Date of last mine inspection', width: 20 },
    { header: 'Next inspection date', key: 'Next inspection date', width: 20 },
    { header: 'Individual Responsible of last mine inspection', key: 'Individual Responsible of last mine inspection', width: 20 },
    { header: 'Reference of Last Mine Inspection Report', key: 'Reference of Last Mine Inspection Report', width: 20 },
    { header: 'Inspection Comments', key: 'Inspection Comments', width: 20 },
    { header: 'Non-State Armed Groups present in mine', key: 'Non-State Armed Groups present in mine', width: 20 },
    { header: 'Children present in mine', key: 'Children present in mine', width: 20 },
    { header: 'Children present in mine', key: 'Children present in mine', width: 20 },
    { header: 'Forced Labor at Mine', key: 'Forced Labor at Mine', width: 20 },
    { header: 'Influx of Foreign Minerals', key: 'Sampling took place (complete, partly,none)', width: 20 },
    { header: 'Sampling took place (complete, partly,none)', key: 'Sampling took place (complete, partly,none)', width: 20 },
    { header: "PPE's available", key: "PPE's available", width: 20 },
    { header: 'Safety at the operating site', key: 'Safety at the operating site', width: 20 },
    { header: 'Environmental Status', key: 'Environmental Status', width: 20 },
    { header: 'Wayforward/comment', key: 'Wayforward/comment', width: 20 },
    { header: 'Cell', key: 'Cell', width: 20 },
  ];
