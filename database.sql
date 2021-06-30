CREATE DATABASE student_list;

CREATE TABLE student(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    subject VARCHAR(50),
    rol_no INT
);