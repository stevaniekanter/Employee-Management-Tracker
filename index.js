require("dotenv").config();
const mysql = require('mysql2');
const inquirer = require('inquirer')

// connect to dabase
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
    console.log(`Connected to employee_tracker database`)
);

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt([
      {
        name: "AddViewOrUpdate",
        type: "list",
        message: "What you would like to do",
        choices: [
          "View All Departments",
          "View All Employees",
          "View All Roles",
          "Add a Department",
          "Add an Employee",
          "Add a Role",
          "Update Employee Role",
        ],
      },
    ])
    .then(function (answer) {
      if (answer.AddViewOrUpdate === "View All Departments") {
        displayCurrentDept();
      } else if (answer.AddViewOrUpdate === "View All Employees") {
        viewEmployees();
      } else if (answer.AddViewOrUpdate === "View All Roles") {
        viewRoles();
      } else if (answer.AddViewOrUpdate === "Add a Department") {
        addDepartment();
      } else if (answer.AddViewOrUpdate === "Add an Employee") {
        addEmployee();
      } else if (answer.AddViewOrUpdate === "Add a Role") {
        addRole();
      } else if (answer.AddViewOrUpdate === "Update Employee Role") {
        updateEmployee();
      } else {
        connection.end();
      }
    });
}

// view department
function displayCurrentDept() {
  console.log(
    "Loading All Departments" 
  );

  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log(
      "Success! Here are the departments"
    );

    start();
  });
}

// view employee 
function viewEmployees() {
  console.log(
    "Loading All Employees"
  );

  connection.query("SELECT * from employee", function (err, res) {
    console.table(res);
    if (err) throw err;
    console.log(
      "Success! Here are all the employees"
    );

    start();
  });
}

// view role
function viewRoles() {
  console.log(
    "Loading All Roles"
  );

  connection.query("SELECT * from employee_role", function (err, res) {
    console.table(res);
    if (err) throw err;
    console.log(
        "Success! Here are all of the roles." 
    );
    
    start();
  });
}

// add department
function addDepartment() {
  console.log(
    "You have selected to add a new department"
  );

  inquirer
    .prompt([
      {
        name: "addNewDept",
        type: "input",
        message: "Enter department name",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: res.addNewDept,
        },
        function (err) {
          if (err) throw err;

          displayCurrentDept();
        }
      );
    });
}

// add employee
function addEmployee() {
  console.log(
    "You have selected to add a new employee"
  );

  inquirer
    .prompt([
      {
        name: "addEmployeeFirstName",
        type: "input",
        message: "Enter employee first name"
      },
      {
        name: "addEmployeeLastName",
        type: "input",
        message: "Enter employee last name"
      },
      {
        name: "addEmployeeId",
        type: "input",
        message: "Enter employee ID"
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: res.addEmployeeFirstName,
          last_name: res.addEmployeeLastName,
          role_id: res.addEmployeeId,
        },
        function (err) {
          if (err) throw err;

          viewEmployees();
        }
      );
    });
};

// add role
function addRole() {
  console.log(
    "You have selected to add a new role"
  );

  inquirer
    .prompt([
      {
        name: "addNewRole",
        type: "input",
        message: "Enter role",
      },
      {
        name: "addRoleSalary",
        type: "input",
        message: "Enter role salary",
      },
      {
        name: "askDeptId",
        type: "input",
        message: "Enter deptartment ID",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO employee_role SET ?",
        {
          role_title: res.addNewRole,
          role_salary: res.addRoleSalary,
          dept_id: res.askDeptId,
        },
        function (err) {
          if (err) throw err;

          viewRoles();
        }
      );
    });
};

// update employee 
function updateEmployee() {
  console.log(
    "You have selected to update an employee"
  );

  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          message: "Which employee would you like to update?",
          choices: function () {
            const choiceArray = [];
            for (let i = 0; i < res.length; i++) {
              choiceArray.push(res[i].first_name + " " + res[i].last_name);
            }
            return choiceArray;
          },
        },
        {
          name: "updateEmployeeRole",
          type: "input",
          message: "What is the updated role?",
        },
      ])
      .then(function (answer) {
        function getId() {
          for (let i = 0; i < res.length; i++) {
            const fullName = res[i].first_name + " " + res[i].last_name;
            if (answer.choice === fullName) {
              return res[i].id;
            }
          }
        }

        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: answer.updateEmployeeRole,
            },
            {
              id: getId(),
            },
          ],
          function (err, answer) {
            if (err) throw err;

            viewEmployees();
            start();
          }
        );
      });
  });
};

