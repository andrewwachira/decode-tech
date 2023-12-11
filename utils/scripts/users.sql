CREATE TABLE IF NOT EXISTS Users
(
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    password VARCHAR(255),
    record_no  SERIAL NOT NULL,
    id UUID DEFAULT uuid_generate_v4() NOT NULL,
    user_photo VARCHAR(255),
    isAdmin BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    google_signin_id VARCHAR(255),
    isVerified BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
)