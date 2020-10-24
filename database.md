// 1. install latest postgresql from docker hub
docker pull postgres

// 2. after install, check if postgresql is installed
docker images

// 3. run the postgres container
docker run --name docketeer-db \
 -p 5432:5432 -d \
 -e POSTGRES_PASSWORD=postgres \
 -e POSTGRES_USER=postgres \
 -e POSTGRES_DB=docketeer-db \
 -v docketeerdb:/var/lib/postgresql/data \
postgres

// 4. cd into the docketeer folder
// 5. run this command to create the sql schema
psql -h -U postgres -d docketeer-db -f schema.sql -p 5432

// username and password for psql
username: postgres
password: postgres

// 6. how to run queries and add queries to your local psql DB

// connects to local DB using pool and exports pool.query
import query from "./helper/psqlQuery";
// all SQL queries are imported here as queryType
import \* as queryType from "../constants/queryTypes";

// example to run GET_METRICS query
const getData = () => {
return query(queryType.GET_METRICS);
};

// example to run WRITE_METRICS query with params
const writeData = () => {
return query(queryType.WRITE_METRICS, ["1", "100%", "50%"]);
};

//** OPTIONAL **//

// connecting to postgres database via terminal
psql -h localhost -U postgres -d postgres

// connecting to postgres database via docker
docker exec -it <container-id> psql -U postgres

// expected structure of metrics from docker stats
-- {
-- "BlockIO":"0B / 4.1kB",
-- "CPUPerc":"0.00%",
-- "Container":"f498fb127561",
-- "ID":"f498fb127561",
-- "MemPerc":"0.32%",
-- "MemUsage":"6.387MiB / 1.944GiB",
-- "Name":"pg-docketeer",
-- "NetIO":"4.27kB / 4.29kB",
-- "PIDs":"7"
-- }

INSERT into metrics (container_id, container_name, cpu_pct, memory_pct) VALUES ('675dae0af5e2', 'dazzling_jennings', '0.32%', '0.45%'), ('675dae0af5e2', ‘dazzling_jennings’, '3.32%', '4.45%'), ('675dae0af5e2', ‘dazzling_jennings’, '7.62%', '1.45%'), ('675dae0af5e2', ‘dazzling_jennings’, '0.98%', '0.34%'),('675dae0af5e2', ‘dazzling_jennings’, '0.88%', '0.26%'), ('675dae0af5e2', ‘dazzling_jennings’, '0.58%', '0.90%'), ('622e002a9342', 'amazing_morse', '0.47%', '0.49%'), ('622e002a9342', 'amazing_morse', '0.55%', '0.99%'), ('622e002a9342', 'amazing_morse', '8.47%', '3.49%'), ('622e002a9342', 'amazing_morse', '1.47%', '9.49%'), ('622e002a9342', 'amazing_morse', '2.47%', '20.49%'), ('622e002a9342', 'amazing_morse', '0.38%', '0.08%'), ('622e002a9342', 'amazing_morse', '0.59%', '0.12%');

INSERT INTO
metrics (container_id, container_name, cpu_pct, memory_pct)
VALUES
('675dae0af5e2', 'dazzling_jennings', '0.32%', '0.45%'),
('675dae0af5e2', 'dazzling_jennings', '3.32%', '4.45%'),
('675dae0af5e2', 'dazzling_jennings', '7.62%', '1.45%'),
('675dae0af5e2', 'dazzling_jennings', '0.98%', '0.34%'),
('675dae0af5e2', 'dazzling_jennings', '0.88%', '0.26%'),
('675dae0af5e2', 'dazzling_jennings', '0.58%', '0.90%'),
('622e002a9342', 'amazing_morse', '0.47%', '0.49%'),
('622e002a9342', 'amazing_morse', '0.55%', '0.99%'),
('622e002a9342', 'amazing_morse', '8.47%', '3.49%'),
('622e002a9342', 'amazing_morse', '1.47%', '9.49%'),
('622e002a9342', 'amazing_morse', '2.47%', '20.49%'),
('622e002a9342', 'amazing_morse', '0.38%', '0.08%'),
('622e002a9342', 'amazing_morse', '0.59%', '0.12%');
