/**
* ************************************
*
* @module Cloud Database Schema
* @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
* @date 6/14/2021
* @description Schema for elephantSQL cloud database that contains user/role information
*
* ************************************
*/

CREATE TABLE IF NOT EXISTS roles (
  _id SERIAL NOT NULL,
  role VARCHAR (255) NOT NULL,
  PRIMARY KEY (_id)
) WITH (
  OIDS = FALSE
);

CREATE TABLE IF NOT EXISTS users (
    _id SERIAL NOT NULL,
    username VARCHAR (255) UNIQUE NOT NULL,
    email VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
  phone VARCHAR (255),
  role VARCHAR (255) DEFAULT 'user',
  role_id INTEGER DEFAULT 3,
  contact_pref VARCHAR (255),
  mem_threshold INTEGER DEFAULT 80,
  cpu_threshold INTEGER DEFAULT 80,
  container_stops BOOLEAN DEFAULT true,
  PRIMARY KEY (_id),
  FOREIGN KEY (role_id) REFERENCES Roles(_id)
) WITH (
  OIDS = FALSE
);

-- establish roles
INSERT INTO roles (role) VALUES ('system admin');
INSERT INTO roles (role) VALUES ('admin');
INSERT INTO roles (role) VALUES ('user');

