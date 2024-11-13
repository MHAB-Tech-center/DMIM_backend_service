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
    { header: 'Mine site number', key: 'MineNo', width: 10},
    { header: 'Mine site (parameters)', key: 'parameters', width: 30 },
    { header: 'Subsites', key: 'Subsites', width: 30 },
    { header: 'Mine Site Operator', key: 'Operator', width: 20 },
    { header: 'Operator Address', key: 'operatorAddress', width: 15 },
    { header: 'Contact Name', key: 'ContactName', width: 20 },
    { header: 'Contact Number', key: 'ContactNumber', width: 20 },
    { header: 'National or Other ID number of Operator', key: 'OperatorNID', width: 20 },
    { header: 'Address of the Owner', key: 'OwnerAddress', width: 20 },
    { header: 'National or Other ID number of owner(If different from Operator)', key: 'OwnerNID', width: 20 },
    { header: 'East UTM', key: 'EastUTM', width: 20 },
    { header: 'South UTM', key: 'SouthUTM', width: 20 },
    { header: 'Degree-minute-second - East', key: 'DMSEast', width: 20 },
    { header: 'Degree-minute-second - South', key: 'SouthDMS', width: 20 },
    { header: 'District', key: 'District', width: 20 },
    { header: 'Sector', key: 'Sector', width: 20 },
    { header: 'Cell', key: 'Cell', width: 20 },
    { header: 'Mined Minerals', key: 'MinedMinerals', width: 20 },
    { header: 'ICGLR Classification', key: 'ICGLRClassification', width: 20 },
    { header: 'Type of mineral license', key: 'MineralLicenseType', width: 20 },
    { header: 'License Number', key: 'LicenseNumber', width: 20 },
    { header: 'Issued Date', key: 'IssuedDate', width: 20 },
    { header: 'Expiry Date', key: 'ExpiryDate', width: 20 },
    { header: 'Surface Area (ha)', key: 'SurfaceArea', width: 20 },
    { header: 'Type of Mine (open pit, underground,both)', key: 'TypeofMine', width: 20 },
    { header: 'Mining Activity Status (Active,Non-Active, Abandoned)', key: 'MiningActivityStatus', width: 20 },
    { header: 'Exploitation begun', key: 'ExploitationBegun', width: 20 },
    { header: 'Number of Workers (incl. Artisinalminers)', key: 'NumberofWorkers', width: 20 },
    { header: 'Average production per miner per day(kg)', key: 'AverageProduction', width: 20 },
    { header: 'Number of Large open pit(s) - ACTIVE', key: 'NumberOfLargeOpenPitActive', width: 20 },
    { header: 'Number of Large open pit(s) - ABANDONED', key: 'NumberOfLargeOpenPitAbandoned', width: 20 },
    { header: 'Number of Small open pit(s) - ACTIVE', key: 'NumberOfSmallOpenPitActive', width: 20 },
    { header: 'Number of Small open pit(s) - ABANDONED', key: 'NumberOfSmallOpenPitAbandoned', width: 20 },
    { header: 'Number of Underground (tunnels) - Active', key: 'NumberOfUndergroundActive', width: 20 },
    { header: 'Number of Underground (tunnels) - ABANDONED', key: 'NumberOfUndergroundAbandoned', width: 20 },
    { header: 'Mine Site Monthly Productive Capacity[t]', key: 'MonthlyProductiveCapacity', width: 20 },
    { header: 'Production History', key: 'ProductionHistory', width: 20 },
    { header: 'The Current status of the minesite', key: 'CurrentstatusOfMinesite', width: 20 },
    { header: 'Date of last mine inspection', key: 'DateOfLastInspection', width: 20 },
    { header: 'Next inspection date', key: 'NextInspectionDate', width: 20 },
    { header: 'Individual Responsible of last mine inspection', key: 'ResponsibleOfLastMine', width: 20 },
    { header: 'Reference of Last Mine Inspection Report', key: 'LastMineInspection', width: 20 },
    { header: 'Inspection Comments', key: 'InspectionComments', width: 20 },
    { header: 'Non-State Armed Groups present in mine', key: 'ArmedGroupsPresent', width: 20 },
    { header: 'Children present in mine', key: 'ChildrenPresent', width: 20 },
    { header: 'Forced Labor at Mine', key: 'ForcedLabor', width: 20 },
    { header: 'Influx of Foreign Minerals', key: 'ForeignMinerals', width: 20 },
    { header: 'Sampling took place (complete, partly,none)', key: 'SamplingTookPlace', width: 20 },
    { header: "PPE's available", key: "PPEAvailable", width: 20 },
    { header: 'Safety at the operating site', key: 'SafetyAtOperatingSite', width: 20 },
    { header: 'Environmental Status', key: 'EnvironmentalStatus', width: 20 },
    { header: 'Wayforward/comment', key: 'Wayforwardcomment', width: 20 },
  ];


  export class RedFlagInformation{
    ArmedGroupsPresent: string = "N/A";
    ChildrenPresent: string = "N/A";
    ForeignMinerals: string = "N/A";
    ForcedLabor: string = "N/A";
  }