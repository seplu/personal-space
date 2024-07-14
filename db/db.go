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
		ID INTEGER PRIMARY KEY AUTOINCREMENT,
		Username TEXT NOT NULL UNIQUE,
		Password TEXT NOT NULL,
		Email TEXT NOT NULL UNIQUE	
	)`
	_, err := DB.Exec(createUsersTable)
	if err != nil {
		panic("Could not create users table.")
	}

	createCarsTable := `CREATE TABLE IF NOT EXISTS cars (
    	ID INTEGER PRIMARY KEY AUTOINCREMENT,
    	Brand TEXT NOT NULL,
    	Model TEXT NOT NULL,
    	Year INTEGER NOT NULL,
    	Owner INTEGER REFERENCES users(id)
    )`

	_, err = DB.Exec(createCarsTable)
	if err != nil {
		panic("Could not create cars table.")
	}

	createCarCostsTable := `CREATE TABLE IF NOT EXISTS car_costs (
    	ID INTEGER PRIMARY KEY AUTOINCREMENT,
    	DateTime DATETIME NOT NULL,
    	Title TEXT NOT NULL,
    	Cost INTEGER NOT NULL,
    	Description TEXT NOT NULL,
    	Owner INTEGER REFERENCES users(id),
    	Car INTEGER REFERENCES cars(id)
    )`

	_, err = DB.Exec(createCarCostsTable)
	if err != nil {
		panic("Could not create car_costs table.")
	}

	createCarFuelTypeTable := `CREATE TABLE IF NOT EXISTS car_fuel_type (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Type TEXT NOT NULL
	)`

	_, err = DB.Exec(createCarFuelTypeTable)
	if err != nil {
		panic("Could not create car_fuel_type table.")
	}

	createCarFuelChargeTable := `CREATE TABLE IF NOT EXISTS car_fuel_charge (
    	ID INTEGER PRIMARY KEY AUTOINCREMENT,
    	DateTime DATETIME NOT NULL,
    	Mileage INTEGER NOT NULL,
    	TypeOfFuel INTEGER REFERENCES car_fuel_type(id),
    	UnitPrice INTEGER NOT NULL,
    	TotalPrice INTEGER NOT NULL,
    	Liters_kwh INTEGER NOT NULL,
    	Description TEXT NOT NULL,
    	Owner INTEGER REFERENCES users(id),
    	Car INTEGER REFERENCES cars(id)
    )`

	_, err = DB.Exec(createCarFuelChargeTable)
	if err != nil {
		panic("Could not create car_fuel_charge table.")
	}

	createSettingsTable := `CREATE TABLE IF NOT EXISTS settings (
    	ID INTEGER PRIMARY KEY AUTOINCREMENT,
    	SettingName TEXT NOT NULL,
    	SettingValue TEXT NOT NULL
	)`

	_, err = DB.Exec(createSettingsTable)
	if err != nil {
		panic("Could not create settings table.")
	}
}
