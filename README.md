# redis-database-caching-pub-sub

> Redis caching database and pub sub topics have been studied.

## Table of Contents

  - [Table of Contents](#table-of-contents)
  - [General Information](#general-information)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Project Status](#project-status)
  - [Contact](#contact)
<!-- * [License](#license) -->


## General Information
- The general purpose of the project is to understand redis and make small examples, and also to see the redis database data types we used before



## Technologies Used
 <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg" alt="redis" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/>


## Features
List the ready features here:
- Redis Database and data type
- Redis Caching
- Redis pub/sub


## Screenshots
![Example screenshot](./images/img.png)



## Setup

```sh
npm init -y
npm install 
```
## Setup redis database module for redisJSON

- redis is a structure that also works on linux. Open Ubuntu shell

- The following packages are required to successfully build on Ubuntu 20.04:

```sh
  git clone https://github.com/RedisJSON/RedisJSON.git

```
```sh
  cd RedisJSON 
```
```sh
  sudo apt install build-essential llvm cmake libclang1 libclang-dev cargo
  cargo build --release
```
- Requirements:

    -  Redis v6.0 or above
- you can have Redis load the module using the following command line argument syntax:

```sh
 redis-server --loadmodule ./target/release/librejson.so
```

- check that it is loaded

```sh
 127.0.0.1:6379> JSON.SET num $ 0
OK
127.0.0.1:6379> JSON.NUMINCRBY num $ 1
"[1]"
127.0.0.1:6379> JSON.NUMINCRBY num $ 1.5
"[2.5]"
127.0.0.1:6379> JSON.NUMINCRBY num $ -0.75
"[1.75]"
127.0.0.1:6379> JSON.NUMMULTBY num $ 24
"[42]"
```




## Usage
How does one go about using it?
Provide various use cases and code examples here.

`write-your-code-here`


## Project Status
Project is: _in progress_ / _complete_ / _no longer being worked on_. If you are no longer working on it, provide reasons why.






## Contact
Created by [@nurettinsen](https://www.linkedin.com/in/nurettin-sen/) - feel free to contact me!

