\connect docketeer

CREATE TABLE endpoint_type(
  id serial PRIMARY KEY NOT NULL,
  type_of varchar NOT NULL
);

CREATE TABLE datasource(
  id serial PRIMARY KEY NOT NULL,
  type_of integer REFERENCES endpoint_type(id) NOT NULL,
  url varchar NOT NULL,
  ssh_key varchar,
  match varchar,
  jobname varchar
);

CREATE TABLE dashboards(
  id serial PRIMARY KEY NOT NULL,
  name varchar NOT NULL,
  type_of integer NOT NULL,
  path varchar
);

CREATE TABLE services(
  id serial PRIMARY KEY NOT NULL,
  docker_instance_name varchar NOT NULL,
  docker_id varchar NOT NULL
);

INSERT INTO endpoint_type (type_of) VALUES ('Docker');
INSERT INTO endpoint_type (type_of) VALUES ('Kubernetes');