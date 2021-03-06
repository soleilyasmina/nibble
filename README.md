# Nibble API

## Routes
All requests are prefaced by `/api`.

## Users

`POST /auth/register` registers a user

`POST /auth/login` logs a user in

`PUT /auth/update` updates a user's information

`DELETE /auth/remove` removes a user

## Nibbles

`GET /users/:user_id/nibbles` gets all nibbles from a user with the id of `user_id`

`GET /users/:user_id/nibbles/:_id` gets a nibble with populated content

`POST /users/:user_id/nibbles/` creates a new nibble

`POST /users/:user_id/nibbles/:_id` creates a new nibble extending the path of the nibble with the id of `_id`

`PUT /users/:user_id/nibbles/:_id` edits the nibble with the id of `_id`

`DELETE /users/:user_id/nibbles/:_id` removes the nibble with the id of `_id`



