CREATE TABLE people(
    id int primary key not null auto_increment,
    age int not null,
    name varchar(255)
);

INSERT INTO people(name, age) VALUES("José", 26);