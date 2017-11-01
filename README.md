# Convenient

The most intelligent matchmaking system for mentors and students that maximises convenience and minimises waste.

## Database
![ERD](https://raw.githubusercontent.com/DidoVirus/cyf-finalProject-LondonClass2/master/database/schema.png) 

### Import database 

1. Go to the `database` folder
2. Run the command: `psql < db.sql`

### Export database 

1. Delete the `convenient_db` database
2. Go to the `database` folder
3. Run the command: `pg_dump -sC --no-owner convenient_db > db.sql`

## Installation Instructions
