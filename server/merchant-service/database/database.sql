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
