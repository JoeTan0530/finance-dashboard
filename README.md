# Finance Dashboard
This is a simple web app that can be use to track expenses of the user. This web app is intended as a simple demonstration of web app design and coding skill.

## Features
- Registration
- Login and verification with JWT Token
- Pie chart to display "Monthly" and "Weekly" expenses and category of expenses that makes up each portion.
- Progress bar to display "Daily", "Weekly" and "Monthly" budget set by the user.
- Listing on dashboard page to display a list of all the expenses recorded into the system.
- Add and edit expense records.
- Delete expense records

## Backend (.env)
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
|`MONGODB_URI`| MongoDB connection URL | **Yes** | - |
|`PORT`| Server port | No | 5000 |

## Frontend (.env)
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
|`REACT_APP_QUERY_URL`| Default Backend URL | **Yes** | - |
|`REACT_APP_QUERY_URL_AUTH`| Backend URL specified to the auth route | **Yes** | - |
|`REACT_APP_QUERY_URL_EXPENSES`| Backend URL specified to the expenses route | **Yes** | - |
|`REACT_APP_QUERY_URL_CATEGORY`| Backend URL specified to the category route | **Yes** | - |
|`REACT_APP_QUERY_URL_BUDGET`| Backend URL specified to the budget route | **Yes** | - |

## Installation
````bash
git clone [This repo clone URL]
cd [your-project-folder]/backend
npm install
npm run dev
cd [your-project-folder]/frontend
npm install
npm start
