create table directors (
    id serial primary key,
    name varchar(100) not null,
    birth_date date,
    nationality varchar(50),
    experience_years integer,
    rating numeric(3,2)
);

create table movies (
    id serial primary key,
    title varchar(200) not null,
    release_date date,
    budget numeric(10,3),
    duration_minutes integer,
    director_id integer references directors(id) on delete set null 
);

insert into directors (name,birth_date,nationality,experience_years,rating) values
('Edward Zwick','1952-10-08','American',45,8.1),
('Steven Spielberg','1946-12-18','American',65,9.2),
('Michael Bay','1965-02-17','American',38,7.6);

insert into movies (title,release_date,budget,duration_minutes,director_id) values 
('the last samurai','2004-02-15',8000000.000,184,1),
('the jaws','1975-03-20',4000000.000,222,2),
('transformers','2007-03-11',8000000.000,111,3);