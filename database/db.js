require("dotenv").config();
const { Pool } = require("pg");
const fs = require("fs");

const pool = new Pool(
    process.env.DATABASE_URL && {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }
);

// https://x-team.com/blog/storing-secure-passwords-with-postgresql/
const migrate = async () => {
    try {
        const data = fs.readFileSync(__dirname + "/users.sql", {
            encoding: "utf-8",
        });
        // console.log(data);
        await pool.query(data);
        console.log("tablas creadas");
    } catch (error) {
        console.log(error);
    }
};

const users = async () => pool.query("SELECT * FROM users;");

const pruebaLogin = async () => {
    try {
        const data = await pool.query(
            "SELECT * FROM users WHERE email = $1 AND password = crypt($2, password);",
            ["admin@test.com", "123123"]
        );
        console.log(data.rows);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    migrate,
    users,
    pruebaLogin,
};
