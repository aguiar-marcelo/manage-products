CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200),
    price DOUBLE NOT NULL,
    expiration_date DATE,
    image VARCHAR(255) UNIQUE,
    category_id INT,
    CONSTRAINT chk_price CHECK (price > 0),
    CONSTRAINT chk_expiration_date CHECK (expiration_date >= CURDATE()),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(id)
);