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
create table store_staff
(
    id         varchar(45) primary key,
    store_id   varchar(45) not null,
    user_id    varchar(45) not null,
    role       varchar(20) not null,
    created_at timestamp,
    updated_at timestamp
);
