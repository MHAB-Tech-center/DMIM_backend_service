#!/bin/bash

# Specify the content to be written to the .env.local file
ENV_CONTENT="# TEST\nNEXT_PUBLIC_API_URL=http://194.163.167.131:7200/api/v1\nNEXT_PUBLIC_BASE_API_URL=http://194.163.167.131:7200\nADMIN_KEY=DMIM232@3$\nEMAIL_USERNAME=vavavalens2003@gmail.com\nEMAIL_PASSWORD=acny zzjw vmlt tsws\nEMAIL=valensniyonsenga2003@gmail.com\nSECRET_KEY=RCA-MIS1234@/2323o\nCLIENT_ID=116948829726-ehbjlte6qn9sh9q43cf3d9k3uui8rghv.apps.googleusercontent.com\nCLIENT_SECRET=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\nACCESS_TOKEN=ya29.a0AfB_byBPIaM3sIGf0qSqw4kmaZSjBFUVCXC3-X_C56k9Nqi4g2tkr2BF7YICnsM18Tl-NZRxM6shVanQAMMUxIKraISvQ8pf7ByX_PtCwesyxxwwBYqTfHKsgsqCb7x9f1QY1AelxKXMsKcuYcVOSemYfto9aCgYKAdESARMSFQHsvYlsTdLAFj-nREkfcwHmUdnGrA0163\nREFRESH_TOKEN=1//044-_FxpWOgOcCgYIARAAGAQSNwF-L9IrlUDxOjJY9d0HQCieRJrw5wbH_WdtI1vF0IH-GTtvPPEn-Fmdnbo6y7DgVqZnsDgVI0Y\nDB_HOST='localhost'\nDB_PORT=5432\nDB_USERNAME='postgres'\nDB_PASSWORD='valens'\nDB_NAME='dmim'"


# Check if .env.local file exists
if [ -f .env.local ]; then
    # If the file exists, override its contents
    echo -e "$ENV_CONTENT" > .env.local
    echo "Existing .env.local file updated."
else
    # If the file doesn't exist, create it and write the content
    echo -e "$ENV_CONTENT" > .env.local
    echo ".env.local file created."
fi