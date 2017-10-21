CREATE TABLE products(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  price FLOAT NOT NULL,
  description TEXT,  
  UNIQUE INDEX id (id),
  PRIMARY KEY (id)
);