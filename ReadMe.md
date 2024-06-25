
## Rec Reservation API Demo

#### Application start procedures

__Start the DB__

> docker compose up // docker-compose up for older versions of docker

seed the db

> npm run seedDb

__Start the API__

> npm install

development: 
>npm run dev //runs using nodemon for hot-reloads

production
>npm build
>npm start

### API sample calls:

#### Restaurants
> get restaurants: GET URL/restaurants

> get available restaurants: POST URL/restaurants/available, body: {time: DateTime, eaters: string[]}

#### eaters

> get eaters: GET URL/eaters

#####reservations

> get reservations: GET URL/reservations

> create reservations: POST URL/reservations/create, body: {time: DateTime, eaters: string[], restaurant: string}

> delete resercation: DELETE URL/reservations/:id


### Application Design Philosophy

The base philosophy of this API architecture is to allow our models, schemas, and interfaces to shine and control how data flows through.

The first step to achieve this was to setup mongoose. Mongoose is a MongoDB ORM which let us treat our specific object models (eaters, restaurants, reservations) as both models and classes capable of performing database access operations. 

We then use Inversify to control application dependencies. Although inversion of control is not strictly needed, it forces us to pre-plan how we want our application to handle requests. 
