CREATE DATABASE fullstacktestdb;

\c fullstacktestdb

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
    budget numeric(15,3),
    duration_minutes integer,
    director_id integer references directors(id) on delete set null 
);

insert into directors (name,birth_date,nationality,experience_years,rating) values
('Edward Zwick', '1952-10-08', 'American', 45, 8.1),
('Steven Spielberg', '1946-12-18', 'American', 65, 9.2),
('Michael Bay', '1965-02-17', 'American', 38, 7.6),
('Quentin Tarantino', '1963-03-27', 'American', 30, 8.6),
('Martin Scorsese', '1942-11-17', 'American', 50, 8.7),
('Christopher Nolan', '1970-07-30', 'British', 25, 8.4),
('James Cameron', '1954-08-16', 'Canadian', 40, 8.0),
('Ridley Scott', '1937-11-30', 'British', 50, 8.0),
('Tim Burton', '1958-08-25', 'American', 35, 7.5),
('David Fincher', '1962-08-28', 'American', 35, 7.8),
('Greta Gerwig', '1983-08-04', 'American', 10, 8.1),
('Peter Jackson', '1961-10-31', 'New Zealander', 30, 8.4),
('Guillermo del Toro', '1964-10-09', 'Mexican', 35, 8.3),
('Clint Eastwood', '1930-05-31', 'American', 60, 8.5),
('Francis Ford Coppola', '1939-04-07', 'American', 55, 8.8),
('Wes Anderson', '1969-05-01', 'American', 25, 7.9),
('Sofia Coppola', '1971-05-14', 'American', 20, 7.4),
('Spike Lee', '1957-03-20', 'American', 40, 7.7),
('Denis Villeneuve', '1967-10-03', 'Canadian', 30, 8.4),
('Paul Thomas Anderson', '1970-06-26', 'American', 25, 8.2),
('George Lucas', '1944-05-14', 'American', 50, 8.6),
('David Lynch', '1946-01-20', 'American', 45, 8.1),
('Alejandro González Iñárritu', '1963-08-15', 'Mexican', 25, 8.5),
('Roman Polanski', '1933-08-18', 'Polish', 60, 8.0),
('Woody Allen', '1935-12-01', 'American', 65, 7.9),
('Ron Howard', '1954-03-01', 'American', 45, 7.8),
('Coen Brothers', '1957-09-21', 'American', 35, 8.4),
('Stanley Kubrick', '1928-07-26', 'American', 50, 8.9),
('John Carpenter', '1948-01-16', 'American', 40, 7.7),
('Peter Weir', '1944-08-21', 'Australian', 50, 7.8),
('Oliver Stone', '1946-09-15', 'American', 45, 8.1),
('Darren Aronofsky', '1969-02-12', 'American', 25, 8.0),
('Terrence Malick', '1943-11-30', 'American', 40, 7.6),
('Jean-Pierre Jeunet', '1953-09-03', 'French', 35, 7.9),
('Ang Lee', '1954-10-23', 'Taiwanese', 40, 8.3),
('Sam Mendes', '1965-08-01', 'British', 30, 8.1),
('Richard Linklater', '1960-07-30', 'American', 35, 7.8),
('John Woo', '1946-05-01', 'Chinese', 50, 7.5),
('Luc Besson', '1959-03-18', 'French', 40, 7.4),
('David Cronenberg', '1943-03-15', 'Canadian', 50, 7.9),
('Takashi Miike', '1960-08-24', 'Japanese', 35, 7.7),
('Akira Kurosawa', '1910-03-23', 'Japanese', 50, 8.7),
('Hayao Miyazaki', '1941-01-05', 'Japanese', 55, 8.8),
('Sergio Leone', '1929-01-03', 'Italian', 40, 8.5),
('Federico Fellini', '1920-01-20', 'Italian', 50, 8.6),
('Ingmar Bergman', '1918-07-14', 'Swedish', 55, 8.5),
('Lars von Trier', '1956-04-30', 'Danish', 40, 7.6),
('Robert Zemeckis', '1951-05-14', 'American', 40, 7.9),
('Spike Jonze', '1969-10-22', 'American', 25, 7.8),
('M. Night Shyamalan', '1970-08-06', 'American', 30, 7.3),
('Danny Boyle', '1956-10-20', 'British', 35, 8.1);

insert into movies (title,release_date,budget,duration_minutes,director_id) values 
('The Last Samurai', '2004-02-15', 8000000.000, 184, 1),
('Jaws', '1975-03-20', 4000000.000, 222, 2),
('Transformers', '2007-03-11', 8000000.000, 111, 3),
('Pulp Fiction', '1994-10-14', 8000000.000, 154, 4),
('The Wolf of Wall Street', '2013-12-25', 100000000.000, 180, 5),
('Inception', '2010-07-16', 160000000.000, 148, 6),
('Avatar', '2009-12-18', 237000000.000, 162, 7),
('Gladiator', '2000-05-05', 103000000.000, 155, 8),
('Beetlejuice', '1988-02-01', 15000000.000, 92, 9),
('Fight Club', '1999-10-15', 63000000.000, 139, 10),
('Lady Bird', '2017-11-03', 10000000.000, 94, 11),
('The Lord of the Rings: The Fellowship of the Ring', '2001-12-19', 93000000.000, 178, 12);