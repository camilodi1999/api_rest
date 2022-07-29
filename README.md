To run one should follow these steps (from project root folder)

1. Install dependencies: npm install
2. Create `.env` with the following environment variables
- `PORT`: default is 3000
- `SECRET_KEY`: random string used to sign tokens, **required** 
- `DIALECT`: The dialect of the database, default is `sqlite`
- `DB_USERNAME`: database user, default is ` `
- `DB_PASSWORD`: password for database owner, default is ` `
- `DB_HOST`: host of the database, default `./database.sqlite`

- `GOOGLE_MAPS_API_KEY`= API Key of google cloud
- `TEXT_SEARCH_URL`= URL for the text search in the google places API

3. run: npm start

4. run test: npm test

## Endpoints

1. POST /user/signup : parameters = {String name, integer phone, integer age, string email, string password }

2. POST /user/login : parameters = { string email, string password}

3. POST /user/logout 

4. GET /restaurants: queryParamas = {place,lat,lon} must be passed either the placer or the coordinates

5. GET /transactions: queryParamas = {user,start,end} the user to query is optional and the start, end parameters of the pagination also are optional.