/**
 * ************************************
 *
 * @module <file name or app component>
 * @author Catherine Larcheveque, Charles Ryu, Griffin Silver, Lorenzo Guevara, Alex Smith
 * @date 6/10/2021
 * @description schema for user information/roles database
 *
 * ************************************
 */

CREATE TABLE IF NOT EXISTS roles (
  _id SERIAL NOT NULL,
  role VARCHAR (255) UNIQUE NOT NULL,
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
  role VARCHAR (255),
  role_id INTEGER,
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
INSERT INTO Roles (role) VALUES ('system admin');
INSERT INTO Roles (role) VALUES ('admin');
INSERT INTO Roles (role) VALUES ('user');

