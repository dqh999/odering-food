create table users
(
    id         varchar(45) primary key,
    role       varchar(20)  not null, -- 'customer', 'owner', 'staff'
    provider_name    varchar(50),
    provider_user_id varchar(255),
    full_name       varchar(255) not null,
    avatar_url       text,
    email      varchar(255) UNIQUE,
    phone      varchar(20) UNIQUE,
    password   varchar(255),
    created_at timestamp,
    updated_at timestamp
);

create table brands
(
    id         varchar(45) primary key,
    name       varchar(255) not null UNIQUE,
    owner_id   varchar(45)       not null,
    created_at timestamp,
    updated_at timestamp
);

create table stores
(
    id         varchar(45) primary key,
    brand_id   varchar(45)       not null,
    name       varchar(255) not null,
    address    TEXT         not null,
    phone      varchar(20),
    created_at timestamp,
    updated_at timestamp
);

create table store_staff
(
    id         varchar(45) primary key,
    store_id   varchar(45)      not null,
    user_id    varchar(45)      not null,
    role       varchar(20) not null, -- 'waiter', 'chef', 'cashier', 'manager'
    created_at timestamp,
    updated_at timestamp
);

create table tables
(
    id           varchar(45) primary key,
    store_id     varchar(45)      not null,
    table_number varchar(20) not null,
    status       varchar(20) DEFAULT 'available', -- 'available', 'occupied'
    created_at   timestamp,
    updated_at   timestamp
);

create table qr_codes
(
    id         varchar(45) primary key,
    table_id   varchar(45) not null,
    qr_code    TEXT   not null, -- Lưu đường link hoặc mã QR
    url        TEXT,
    created_at timestamp,
    updated_at timestamp
);

create table categories
(
    id         varchar(45) primary key,
    name       varchar(255) not null,
    created_at timestamp,
    updated_at timestamp
);

create table menu_items
(
    id          varchar(45) primary key,
    store_id    varchar(45)         not null,
    category_id varchar(45)         not null,
    name        varchar(255)   not null,
    description TEXT,
    price       DECIMAL(10, 2) not null,
    image_url   varchar(500),
    available   BOOLEAN   DEFAULT TRUE,
    created_at  timestamp,
    updated_at  timestamp
);

create table orders
(
    id          varchar(45) primary key,
    store_id    varchar(45)         not null,
    table_id    varchar(45)         not null,
    user_id     varchar(45),                        -- Có thể null nếu khách không đăng nhập
    status      varchar(20) DEFAULT 'pending', -- 'pending', 'preparing', 'completed', 'cancelled'
    total_price DECIMAL(10, 2) not null,
    created_at  timestamp,
    updated_at  timestamp
);

create table order_items
(
    id           varchar(45) primary key,
    order_id     varchar(45)         not null,
    menu_item_id varchar(45)         not null,
    quantity     INT            not null,
    price        DECIMAL(10, 2) not null,
    created_at   timestamp,
    updated_at   timestamp
);

create table payments
(
    id             varchar(45) primary key,
    order_id       varchar(45)      not null,
    payment_method varchar(20) not null,          -- 'cash', 'credit_card', 'momo', 'vn_pay'
    status         varchar(20) DEFAULT 'pending', -- 'pending', 'paid', 'failed'
    paid_at        timestamp NULL,
    created_at     timestamp,
    updated_at     timestamp
);

create table reviews
(
    id         varchar(45) primary key,
    user_id    varchar(45) not null,
    store_id   varchar(45) not null,
    rating     INT CHECK (rating BETWEEN 1 AND 5),
    comment    TEXT,
    created_at timestamp,
    updated_at timestamp
);
