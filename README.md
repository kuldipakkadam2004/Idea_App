Idea Sharing Platform (Backend)

Description : Backend API for managing user-submitted ideas, built with Node.js and Express.js. Follows a modular MVC architecture with validation, logging, and error handling.

Features :

CRUD operations for ideas. <br>
Request validation middleware. <br>
Error handling with proper HTTP codes.<br>
Modular MVC structure (routes, controllers, models, middleware). <br>
Logging with Morgan.
<br>
Tech Stack :
Node.js | Express.js | JavaScript | Morgan

API Endpoints:

GET /idea_app/v1/ideas — Get all ideas

GET /idea_app/v1/ideas/:id — Get idea by ID

POST /idea_app/v1/ideas — Create idea

PUT /idea_app/v1/ideas/:id — Update idea

DELETE /idea_app/v1/ideas/:id — Delete idea
