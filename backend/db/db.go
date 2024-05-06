package db

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "file:ps.sqlite?_foreign_keys=true")
	if err != nil {
		panic("Could not connect to the database.")
	}
	DB.SetMaxOpenConns(10)
	DB.SetMaxIdleConns(5)

	createTables()
}

func createTables() {
	createUsersTable := `CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL    
	)`
	_, err := DB.Exec(createUsersTable)
	if err != nil {
		panic("Could not create users table.")
	}

	createCarsTable := `CREATE TABLE IF NOT EXISTS cars (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	brand TEXT NOT NULL,
    	model TEXT NOT NULL,
    	year INTEGER NOT NULL,
    	owner INTEGER REFERENCES users(id)
    )`

	_, err = DB.Exec(createCarsTable)
	if err != nil {
		panic("Could not create cars table.")
	}

	createCarCostsTable := `CREATE TABLE IF NOT EXISTS car_costs (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	dateTime DATETIME NOT NULL,
    	title TEXT NOT NULL,
    	cost INTEGER NOT NULL,
    	description TEXT NOT NULL,
    	owner INTEGER REFERENCES users(id),
    	car INTEGER REFERENCES cars(id)
    )`

	_, err = DB.Exec(createCarCostsTable)
	if err != nil {
		panic("Could not create car_costs table.")
	}

	createCarFuelChargeTable := `CREATE TABLE IF NOT EXISTS car_fuel_charge (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	dateTime DATETIME NOT NULL,
    	mileage INTEGER NOT NULL,
    	unitPrice INTEGER NOT NULL,
    	totalPrice INTEGER NOT NULL,
    	liters_kwh INTEGER NOT NULL,
    	description TEXT NOT NULL,
    	owner INTEGER REFERENCES users(id),
    	car INTEGER REFERENCES cars(id)
    )`

	_, err = DB.Exec(createCarFuelChargeTable)
	if err != nil {
		panic("Could not create car_fuel_charge table.")
	}
}
