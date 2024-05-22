# Dummy API Table

This table lists the endpoints of a dummy API, including the HTTP method, endpoint, description, and parameters.

| HTTP Method | Endpoint            | Description                | Parameters           |
|-------------|---------------------|----------------------------|----------------------|
| GET         | /api/v1/users       | Retrieves a list of users  | `page` (optional)    |
| POST        | /api/v1/users       | Creates a new user         | `name`, `email`      |
| GET         | /api/v1/users/{id}  | Retrieves a specific user  | `id`                 |
| PUT         | /api/v1/users/{id}  | Updates a specific user    | `id`, `name`, `email`|
| DELETE      | /api/v1/users/{id}  | Deletes a specific user    | `id`                 |

## Example Usage

### Get Users

**Request:**

```http
GET /api/v1/users?page=1 HTTP/1.1
Host: example.com

###doc 3

{% clickbox  title="doc3" %}
Click here to show DOC3
{% /clickbox %}