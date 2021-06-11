/**
 * ************************************
 *
 * @module <file name or app component>
 * @author Alex Smith, Catherine Larcheveque, Charles Ryu, Griffin Silver, Lorenzo Guevara
 * @date 6/10/2021
 * @description schema for user information/roles database
 *
 * ************************************
 */

CREATE TABLE IF NOT EXISTS Roles (
  _id SERIAL NOT NULL,
  role VARCHAR (255) UNIQUE NOT NULL,
  PRIMARY KEY (_id)
) WITH (
  OIDS = FALSE
);

CREATE TABLE IF NOT EXISTS Users (
    _id serial NOT NULL,
    username varchar (255) UNIQUE NOT NULL,
    email varchar (255) NOT NULL,
    password varchar (255) NOT NULL,
  phone varchar (255),
  role varchar (255),
  role_id serial,
  contact_pref varchar (255),
  mem_threshold integer DEFAULT 80,
  cpu_threshold integer DEFAULT 80,
  container_stops boolean DEFAULT true,
  PRIMARY KEY (_id),
  FOREIGN KEY (role_id) REFERENCES Roles(_id)
) WITH (
  OIDS = FALSE
);

-- establish roles
INSERT INTO Roles (role) VALUES ('system admin');
INSERT INTO Roles (role) VALUES ('admin');
INSERT INTO Roles (role) VALUES ('user');

