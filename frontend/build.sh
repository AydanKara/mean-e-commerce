#!/bin/bash

# Replace the placeholder in environment.prod.ts with the actual value of NG_APP_API_URL
sed -i "s/\${NG_APP_API_URL}/$NG_APP_API_URL/" ./src/environments/environment.prod.ts

# Run the Angular production build
ng build --configuration production
