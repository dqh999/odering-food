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
