create database dbsproject;
use dbsproject;
show databases;

CREATE TABLE Agent( 
  agent_id INT,
	username VARCHAR(50),
	email VARCHAR(50),
  PRIMARY KEY (agent_id));

CREATE TABLE Property( 
  property_id INT,
	property_type VARCHAR(50),
	address VARCHAR(50),
	city VARCHAR(50),
	state VARCHAR(50),
	zip_code VARCHAR(50),
	size FLOAT(10, 2),
	price FLOAT(10, 2),
	description VARCHAR(255),
	status BOOLEAN,
	agent_id INT, 
  PRIMARY KEY (property_id),
	FOREIGN KEY (agent_id) REFERENCES Agent(agent_id));

CREATE TABLE Client( 
  client_id INT,
	username VARCHAR(50),
	email VARCHAR(50),
	password VARCHAR(20),
  PRIMARY KEY (client_id));

CREATE TABLE Transaction( 
  transaction_id INT,
	property_id INT,
	client_id INT,
	transaction_date VARCHAR(11),
	sale_price FLOAT(10, 2), 
  PRIMARY KEY (transaction_id),
	FOREIGN KEY (property_id) REFERENCES Property(property_id),
	FOREIGN KEY (client_id) REFERENCES Client(client_id));

CREATE TABLE Image( 
  image_id INT,
	property_id INT,
	image_url VARCHAR(1000), 
  PRIMARY KEY (image_id),
	FOREIGN KEY (property_id) REFERENCES Property(property_id));

CREATE TABLE PropertyFeatures( 
  feature_id INT,
	property_id INT,
	feature_name VARCHAR(50), 
  PRIMARY KEY (feature_id),
	FOREIGN KEY (property_id) REFERENCES Property(property_id));

CREATE TABLE PropertyCategories( 
  category_id INT,
	category_name VARCHAR(50),
	property_id INT, 
  PRIMARY KEY (category_id),
	FOREIGN KEY (property_id) REFERENCES Property(property_id));

CREATE TABLE PropertyRatings( 
  rating_id INT,
	property_id INT,
	rating_value INT,
	review TEXT,
	date DATE, 
  PRIMARY KEY (rating_id),
	FOREIGN KEY (property_id) REFERENCES Property(property_id));

