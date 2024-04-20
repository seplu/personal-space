package db

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func InitDB() {
	var err error
	db, err = sql.Open("sqlite3", "ps.sqlite")
	if err != nil {
		panic("Could not connect to the database.")
	}
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)

	createTables()
}

func createTables() {
	createUsersTable := `CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL    
	)`
	_, err := db.Exec(createUsersTable)
	if err != nil {
		panic("Could not create users table.")
	}
}
