USE employee_tracker;

INSERT INTO department (dept_name)
VALUES ("Markting"),
       ("Sales"),
       ("Engineering"),
       ("HR"),
       ("Accounting");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Directo of Sales", 55000, 2),
       ("Accountant", 75000, 5),
       ("Full Stack Engineer", 100000, 3),
       ("HR Coordinator", 50000, 4),
       ("Marketing Intern", 20000, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Matt", "Benson", 3),
       ("Candy", "Pierce", 2),
       ("David", "Green", 4),
       ("Ella", "Lee", 1),
       ("Gwen", "Matthew", 5);