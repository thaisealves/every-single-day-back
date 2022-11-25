<div align="center">
<h1>1% Every Single Day</h1>
</div>

# Description

<div align="center">
<img src="https://raw.githubusercontent.com/thaisealves/every-single-day-front/main/src/assets/images/target.png?raw=true" height="200px" alt="1%ESD" title="1%ESD"/>

</div>
This is a project designed and developed by me. The idea is to have the user to develop yourself, doing habits that I consider healthy, like drinking the correct amount of water, having plans and dream and making it easy to see them, some place the user can keep on track on his habits in a way to see its improvement a litte bit every single day.

<div align="center">

  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px" alt="Typescript" title="Typescript"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px" alt="PostgreSQL" title="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px" alt="Node.js" title="Node.js"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px" alt="Express.js" title="Express.js"/>  
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px" alt="Prisma" title="Prisma"/>
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" height="30px" alt="Jest" title="Jest"/>
  
</div>

## Features:

-   Sign up
-   Login
-   Post an image on a vision board
-   Selecting what's the user humor for the day
-   Get the track of how much water was drinked
-   Having a place to post water and plans

# References

### Sign Up

Creating an account

```http
POST /signup
```

#### Request:

| Body              | Type     | Description                                            |
| :---------------- | :------- | :----------------------------------------------------- |
| `name`            | `string` | **Required**. Name from the user                       |
| `email`           | `email`  | **Required**. Email for the application                |
| `password`        | `string` | **Required**. Password used on the current application |
| `confirmPassword` | `string` | **Required**. Password used on the current application |

####

### Login

Entering the application

```http
POST /login
```

#### Request:

| Body       | Type     | Description                                            |
| :--------- | :------- | :----------------------------------------------------- |
| `email`    | `email`  | **Required**. Email for the application                |
| `password` | `string` | **Required**. Password used on the current application |

####

## All the routes under the authorization routes, needs an Authorization on Headers!

####

| Headers         | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. Token from the user |

####

### Visions

Dealing with the vision board from the user

```http
POST /vision
```

#### Request:

| Body    | Type  | Description                             |
| :------ | :---- | :-------------------------------------- |
| `image` | `URL` | **Required**. Image from the user dream |

####

```http
GET /visions
```

#### Response :

All the images from the user vision board

```json
[
	{
		"id": 4,
		"userId": 10,
		"image": "IMAGE URL"
	},
	{
		"id": 5,
		"userId": 10,
		"image": "IMAGE URL"
	}
]
```

### Mood

The user mood for the day

```http
POST /mood
```

#### Request:

| Body        | Type     | Description                                                                            |
| :---------- | :------- | :------------------------------------------------------------------------------------- |
| `mood`      | `string` | **Required**. Mood from the user for the day, valids: awful, bad, average, good, happy |
| `createdAt` | `date`   | **Required**. Date from when its created. Format: DD-MM-YYYY                           |

####

```http
GET /mood/DAY
```

#### Response :

Finding the user mood from that day

```json
{
	"id": 5,
	"userId": 10,
	"mood": "good",
	"createdAt": "25-11-2022"
}
```

### Diary

The user diary and plans for the day

```http
POST /diary
```

#### The user can only have one plan and one diary by each day

#### Request:

| Body        | Type     | Description                                                         |
| :---------- | :------- | :------------------------------------------------------------------ |
| `type`      | `string` | **Required**. Diary from the user for the day, valids: plans, diary |
| `createdAt` | `date`   | **Required**. Date from when its created. Format: DD-MM-YYYY        |
| `text`      | `string` | **Required**. The text the user want to be your plan or diary       |

####

```http
GET /diary/DAY
```

#### Response :

Finding the user diary and plan from that day

```json
[
	{
		"id": 7,
		"userId": 10,
		"type": "plans",
		"text": "TEXT",
		"createdAt": "25-11-2022"
	},
	{
		"id": 6,
		"userId": 10,
		"type": "diary",
		"text": "TEXT",
		"createdAt": "25-11-2022"
	}
]
```

### Water

The user water for the day

```http
POST /water
```

#### Request:

| Body            | Type     | Description                                                  |
| :-------------- | :------- | :----------------------------------------------------------- |
| `waterQuantity` | `number` | **Required**. Quantity of water drinked by the user in L     |
| `createdAt`     | `date`   | **Required**. Date from when its created. Format: DD-MM-YYYY |

####

```http
GET /water/DAY
```

#### Response :

Finding the user water quantity from that day

```json
{
	"id": 4,
	"userId": 10,
	"waterQuantity": 2,
	"createdAt": "25-11-2022"
}
```

### Weight

The weight of the user

```http
POST /weight
```

#### Request:

| Body        | Type     | Description                                                  |
| :---------- | :------- | :----------------------------------------------------------- |
| `weight`    | `number` | **Required**. The weight on Kg from the user                 |
| `createdAt` | `date`   | **Required**. Date from when its created. Format: DD-MM-YYYY |

####

```http
GET /weight
```

#### Response :

Finding the user weight

```json
[
	{
		"id": 5,
		"userId": 10,
		"weight": 90,
		"createdAt": "25-11-2022"
	}
]
```

### Starting the application:

#### Clone application to machine

```
git clone git@github.com:thaisealves/every-single-day-back.git
```

#### Run application

```
npm run dev
```

#### Access to front end

```
https://github.com/thaisealves/every-single-day-front
```
