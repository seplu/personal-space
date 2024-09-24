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

const (
	createUsersTable = `CREATE TABLE IF NOT EXISTS users (
		ID INTEGER PRIMARY KEY AUTOINCREMENT,
		Username TEXT NOT NULL UNIQUE,
		Password TEXT NOT NULL,
		Email TEXT NOT NULL UNIQUE
	)`

	createCarsTable = `CREATE TABLE IF NOT EXISTS cars (
		ID INTEGER PRIMARY KEY AUTOINCREMENT,
		Brand TEXT NOT NULL,
		Model TEXT NOT NULL,
		Engine TEXT,
		LicensePlate TEXT,
		Mileage INTEGER,
		Year INTEGER NOT NULL,
		Owner INTEGER REFERENCES users(id)
	)`

	createCarCostsTable = `CREATE TABLE IF NOT EXISTS car_costs (
		ID INTEGER PRIMARY KEY AUTOINCREMENT,
		Date DATE NOT NULL,
		Title TEXT NOT NULL,
		Cost DECIMAL(10,2) NOT NULL,
		Description TEXT NOT NULL,
		Owner INTEGER REFERENCES users(id),
		Car INTEGER REFERENCES cars(id)
	)`

	createCarFuelTypeTable = `CREATE TABLE IF NOT EXISTS car_fuel_type (
		ID INTEGER PRIMARY KEY AUTOINCREMENT,
		Type TEXT NOT NULL
	)`

	createCarFuelChargeTable = `CREATE TABLE IF NOT EXISTS car_fuel_charge (
		ID INTEGER PRIMARY KEY AUTOINCREMENT,
		Date DATE NOT NULL,
		Mileage INTEGER NOT NULL,
		TypeOfFuel INTEGER REFERENCES car_fuel_type(id),
		UnitPrice DECIMAL(5,2) NOT NULL,
		TotalPrice DECIMAL(5,2) NOT NULL,
		LitersKwh DECIMAL(5,2) NOT NULL,
		Description TEXT NOT NULL,
		Owner INTEGER REFERENCES users(id),
		Car INTEGER REFERENCES cars(id)
	)`

	createSettingsTable = `CREATE TABLE IF NOT EXISTS settings (
		ID INTEGER PRIMARY KEY AUTOINCREMENT,
		SettingName TEXT NOT NULL,
		SettingValue TEXT NOT NULL
	)`
)

func createTables() {
	tables := []string{
		createUsersTable,
		createCarsTable,
		createCarCostsTable,
		createCarFuelTypeTable,
		createCarFuelChargeTable,
		createSettingsTable,
	}

	for _, table := range tables {
		if _, err := DB.Exec(table); err != nil {
			panic("Could not create table: " + err.Error())
		}
	}
}
