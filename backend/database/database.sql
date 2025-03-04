CREATE TABLE Users
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) UNIQUE,
    phone      VARCHAR(20) UNIQUE,
    password   VARCHAR(255) NOT NULL,
    role       ENUM('customer', 'owner', 'staff') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Stores
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    owner_id   BIGINT       NOT NULL,
    name       VARCHAR(255) NOT NULL,
    address    TEXT         NOT NULL,
    phone      VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES Users (id) ON DELETE CASCADE
);

CREATE TABLE Tables
(
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    store_id     BIGINT      NOT NULL,
    table_number VARCHAR(20) NOT NULL,
    status       ENUM('available', 'occupied') DEFAULT 'available',
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES Stores (id) ON DELETE CASCADE
);

CREATE TABLE QR_Codes
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    table_id   BIGINT NOT NULL,
    qr_code    TEXT   NOT NULL, -- Lưu đường link hoặc mã QR
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (table_id) REFERENCES Tables (id) ON DELETE CASCADE
);

CREATE TABLE Categories
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    store_id   BIGINT       NOT NULL,
    name       VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES Stores (id) ON DELETE CASCADE
);

CREATE TABLE Menu_Items
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    store_id    BIGINT         NOT NULL,
    category_id BIGINT         NOT NULL,
    name        VARCHAR(255)   NOT NULL,
    description TEXT,
    price       DECIMAL(10, 2) NOT NULL,
    image_url   VARCHAR(500),
    available   BOOLEAN   DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES Stores (id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories (id) ON DELETE CASCADE
);

CREATE TABLE Orders
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    store_id    BIGINT         NOT NULL,
    table_id    BIGINT         NOT NULL,
    user_id     BIGINT, -- Có thể null nếu khách không đăng nhập
    status      ENUM('pending', 'preparing', 'completed', 'cancelled') DEFAULT 'pending',
    total_price DECIMAL(10, 2) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES Stores (id) ON DELETE CASCADE,
    FOREIGN KEY (table_id) REFERENCES Tables (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE SET NULL
);

CREATE TABLE Order_Items
(
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id     BIGINT         NOT NULL,
    menu_item_id BIGINT         NOT NULL,
    quantity     INT            NOT NULL,
    price        DECIMAL(10, 2) NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders (id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES Menu_Items (id) ON DELETE CASCADE
);

CREATE TABLE Payments
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id       BIGINT NOT NULL,
    payment_method ENUM('cash', 'credit_card', 'momo', 'vn_pay') NOT NULL,
    status         ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    paid_at        TIMESTAMP NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders (id) ON DELETE CASCADE
);

CREATE TABLE Reviews
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id    BIGINT NOT NULL,
    store_id   BIGINT NOT NULL,
    rating     INT CHECK (rating BETWEEN 1 AND 5),
    comment    TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES Stores (id) ON DELETE CASCADE
);

CREATE TABLE Store_Staff
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    store_id   BIGINT NOT NULL,
    user_id    BIGINT NOT NULL,
    role       ENUM('waiter', 'chef', 'cashier', 'manager') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES Stores (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);
