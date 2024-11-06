
![Logo](https://www.uniupo.it/themes/custom/uniupo_2020/uniupo-logo.svg)

## Corso di laurea in informatica, polo formativo di Vercelli. 

### MF0438 Metodologie di programmazione per il Web


## FLOPFLIX
#### "The project is inspired by the style and functionality of Netflix, parodying it as FlopFlix. It does not contain copyrighted films; all movies are sourced from YouTube. Users are randomly generated, and any resemblance to real persons is purely coincidental."

#### "The platform is built with a Desktop-First approach and uses server-side templating."
## Authors
- Marco Yuri Papa (20051241) a.a 2024/2025

- [@marco57589](https://www.github.com/marco57589)


## Used API

 - [RandomUserApi](https://randomuser.me/)
 - [Omdb](https://www.omdbapi.com/)
 - [YoutubeApi]()

## Features

- 3 user types managed (guest, user, admin).
- Load sample data from local files or API.
- Admin dashboard.
- Responsive design (desktop, tablet, mobile).
- Live database updates support (restore, refresh, reload) during FlopFlix execution.
- Encrypted data storage (does not store plain copies of sensitive data).

## Tech Stack

**Client:**  
- **Bootstrap**: A CSS framework that simplifies the creation of responsive and modern user interfaces, with pre-built classes for layout, components, and styling.

**Server:**  
- **Node.js**: A JavaScript runtime environment for executing JavaScript code outside the browser, used for handling server-side logic.
- **Express**: A web framework for Node.js that simplifies HTTP request handling, routing, middleware, and more.
- **ejs**: A templating engine for rendering dynamic HTML views on the server side.

**Authentication:**  
- **Passport.js**: An authentication library for Node.js that simplifies the integration of login strategies, such as local login, OAuth, and others.
- **passport-local**: A strategy for authenticating users using a username and password.

**Database:**  
- **SQLite**: A lightweight, embedded database used for managing and storing data locally within the project.

**Security:**  
- **bcrypt**: A library for hashing passwords, improving the security of authentication.
- **express-session**: A middleware for managing sessions in Express, essential for maintaining user login states.
- **crypto**: A built-in Node.js module used for cryptographic operations such as hashing, encryption, and creating secure random values, commonly used for additional security measures.

**Configuration Management:**  
- **dotenv**: A library for managing environment variables securely, useful for sensitive data like database credentials.

**Additional Dependencies:**  
- **Axios**: A library for making HTTP requests, used to interact with external APIs or services.
- **express-validator**: A set of middleware for validating and sanitizing user input in HTTP requests.
- **lodash**: A utility library for simplifying common JavaScript tasks and improving code readability.


## Installation

Clone the project

```bash
  git clone https://link-to-project
```
Navigate project folder

```bash
  cd flopflix
```
Install FlopFlix with npm

```bash
  npm install
```

Install dependencies

```bash
  npm install
```

Run database script without API

```bash
  npm run dbNoApi
```
Run database script with API

```bash
  npm run dbApi
```

Start the server

```bash
  npm run start
```

    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_PATH`="db/database.sqlite"

`OMDB_API_KEY`

`YOUTUBE_API_KEY`

`SECRET_KEY` used for encryption (32 bit)



## License

[MIT](https://choosealicense.com/licenses/mit/)

