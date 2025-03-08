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

