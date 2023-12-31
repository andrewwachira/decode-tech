CREATE TABLE IF NOT EXISTS Products
(
    admin INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    description VARCHAR(255),
    image VARCHAR(255) NOT NULL,
    count_in_stock INTEGER NOT NULL,
    rating INTEGER NOT NULL DEFAULT 0,
    reviews JSONB[],
    product_id  SERIAL NOT NULL,
    discount INTEGER,
    condition VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id),
    FOREIGN KEY (admin) REFERENCES Users(id)
)