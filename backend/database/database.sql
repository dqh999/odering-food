create table users
(
    id               varchar(45) primary key,
    role             varchar(20)  not null, -- 'customer', 'owner', 'staff'
    provider_name    varchar(50),
    provider_user_id varchar(255),
    full_name        varchar(255) not null,
    avatar_url       text,
    email            varchar(255) UNIQUE,
    phone            varchar(20) UNIQUE,
    password         varchar(255),
    created_at       timestamp,
    updated_at       timestamp
);

create table brands
(
    id         varchar(45) primary key,
    name       varchar(255) not null UNIQUE,
    owner_id   varchar(45)  not null,
    created_at timestamp,
    updated_at timestamp
);

create table stores
(
    id               varchar(45) primary key,
    brand_id         varchar(45)  not null,
    name             varchar(255) not null,
    address          TEXT         not null,
    phone            varchar(20),
    tax_rate         decimal(5, 2) default 10.00,
    service_fee_rate decimal(5, 2) default 0.00,
    created_at       timestamp,
    updated_at       timestamp
);
create table store_staff
(
    id         varchar(45) primary key,
    store_id   varchar(45) not null,
    user_id    varchar(45) not null,
    role       varchar(20) not null,
    created_at timestamp,
    updated_at timestamp
);
create table store_tables
(
    id           varchar(45) primary key,
    store_id     varchar(45) not null,
    table_number varchar(20) not null,
    available    BOOLEAN DEFAULT TRUE,
    created_at   timestamp,
    updated_at   timestamp
);

create table brand_categories
(
    id          varchar(45) primary key,
    type        varchar(45),
    brand_id    varchar(45)  not null,
    name        varchar(255) not null,
    description varchar(255),
    created_at  timestamp,
    updated_at  timestamp
);

create table menu_items
(
    id            varchar(45) primary key,
    brand_id      varchar(45)    not null,
    category_id   varchar(45)    not null,
    name          varchar(255)   not null,
    description   TEXT,
    price         DECIMAL(10, 2) not null,
    image_url     varchar(500),
    is_popular    boolean default false,
    is_bestseller boolean default false,
    available     boolean default true,
    created_at    timestamp,
    updated_at    timestamp
);
create table store_menu_items
(
    id         varchar(45) primary key,
    store_id   varchar(45) not null,
    item_id    varchar(45) not null,
    available  BOOLEAN DEFAULT TRUE,
    created_at timestamp,
    updated_at timestamp
);
create table orders
(
    id               varchar(45) primary key,
    code             varchar(20),
    store_id         varchar(45)    not null,
    table_id         varchar(45)    not null,
    user_id          varchar(45),
    user_notes       varchar(255),
    sub_total        DECIMAL(10, 2),
    tax_rate         int,
    tax              DECIMAL(10, 2),
    service_fee_rate int,
    service_fee      decimal(10, 2),
    shipping_fee     DECIMAL(10, 2),
    discount         DECIMAL(10, 2),
    total_price      DECIMAL(10, 2) not null,
    status           varchar(20) DEFAULT 'pending',
    created_at       timestamp,
    updated_at       timestamp
);

create table order_items
(
    id           varchar(45) primary key,
    order_id     varchar(45)    not null,
    menu_item_id varchar(45)    not null,
    quantity     INT            not null,
    price        DECIMAL(10, 2) not null,
    created_at   timestamp,
    updated_at   timestamp
);

create table order_status_history
(
    id            varchar(45) primary key,
    order_id      varchar(45) not null,
    status        varchar(20) not null,
    changed_at    timestamp   not null,
    changed_by_id varchar(45),
    reason        varchar(255),
    created_at    timestamp,
    updated_at    timestamp
);
