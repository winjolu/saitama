# Breaching Tool Saitama

**Developer:** Winston Ludlam

## Project Description
Saitama is a web-based application that allows users to scan websites for common vulnerabilities such as open ports, outdated software versions, and common web vulnerabilities (e.g., SQL injection, XSS).

## Features
### User Authentication
- Basic login/signup functionality using Firebase Authentication.

### Target URL Input
- Form for users to input the URL of the target website.
- URL format validation.

### Vulnerability Scanning
- Integration with open-source security tools and APIs (e.g., Nmap, OWASP ZAP) to perform vulnerability scanning.
- Backend routes to handle scanning requests and process results.

### Display Results
- Components to display scan results in an organized and user-friendly manner.

### Report Generation
- Functionality to generate a report of the findings, downloadable as a PDF.

## Technology Stack
- **Frontend:** React or Next.js
- **Backend:** Node.js with Express
- **Database:** PostgreSQL (Supabase)
- **Styling:** Tailwind CSS or Material-UI

## UML Diagram

```plaintext
[User] --> [Saitama Web App]
[Saitama Web App] --> [Firebase Authentication]: Login/Signup
[Saitama Web App] --> [API Server (Node.js/Express)]: URL Input
[API Server (Node.js/Express)] --> [Security Tools/APIs (Nmap, OWASP ZAP)]: Scan Website
[Security Tools/APIs] --> [API Server (Node.js/Express)]: Return Results
[API Server (Node.js/Express)] --> [Database (Supabase/MongoDB)]: Store Results
[API Server (Node.js/Express)] --> [Saitama Web App]: Display Results
[Saitama Web App] --> [User]: Download Report (PDF)
