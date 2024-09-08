package models

import (
	"database/sql"
	"seplu.pl/personal-space/db"
	"time"
)

type Car struct {
	ID           int64  `json:"id"`
	Brand        string `json:"brand" binding:"required"`
	Model        string `json:"model"`
	Engine       string `json:"engine"`
	Year         int    `json:"year"`
	LicensePlate string `json:"license_plate"`
	Mileage      int    `json:"mileage"`
	Owner        int64  `json:"owner"`
}

type CarDetails struct {
	ID          int64     `json:"id"`
	DateTime    time.Time `json:"datetime"`
	Mileage     int       `json:"mileage"`
	TypeOfFuel  int       `json:"type_of_fuel"`
	UnitPrice   int       `json:"unit_price"`
	TotalPrice  int       `json:"total_price"`
	LitersKwh   int       `json:"litersKwh"`
	Description string    `json:"description"`
	Owner       int64     `json:"owner"`
}

type CarService struct{}

func ifNullString(ns sql.NullString, defaultValue string) string {
	if ns.Valid {
		return ns.String
	}
	return defaultValue
}

func ifNullInt64(ni sql.NullInt64, defaultValue int) int {
	if ni.Valid {
		return int(ni.Int64)
	}
	return defaultValue
}

func (cs CarService) GetCarList(userId int64) ([]Car, error) {
	query := `SELECT ID, Brand, Model, Year, Engine, LicensePlate, Mileage FROM cars WHERE Owner = ?`
	rows, err := db.DB.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			return
		}
	}(rows)

	var cars []Car
	for rows.Next() {
		var car Car
		var brand, model, engine, licensePlate sql.NullString
		var year, mileage sql.NullInt64

		err := rows.Scan(&car.ID, &brand, &model, &year, &engine, &licensePlate, &mileage)
		if err != nil {
			return nil, err
		}

		car.Brand = ifNullString(brand, "-")
		car.Model = ifNullString(model, "-")
		car.Engine = ifNullString(engine, "-")
		car.LicensePlate = ifNullString(licensePlate, "-")
		car.Year = ifNullInt64(year, 0)
		car.Mileage = ifNullInt64(mileage, 0)

		cars = append(cars, car)
	}
	return cars, nil
}

func (cs CarService) CreateCar(c *Car, userId int64) error {
	query := `INSERT INTO cars (Brand, Model, Year, LicensePlate, Engine, Mileage, Owner) VALUES (?, ?, ?, ?, ?, ?, ?)`
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}
	defer func(stmt *sql.Stmt) {
		err := stmt.Close()
		if err != nil {
			return
		}
	}(stmt)
	result, err := stmt.Exec(c.Brand, c.Model, c.Year, c.LicensePlate, c.Engine, c.Mileage, userId)
	if err != nil {
		return err
	}
	id, err := result.LastInsertId()
	c.ID = id
	c.Owner = userId
	return nil
}

func (cs CarService) GetCarDetails(carId int, userId int64) ([]CarDetails, error) {
	query := `SELECT ID, DateTime, Mileage, TypeOfFuel, UnitPrice, TotalPrice, LitersKwh, Description FROM car_fuel_charge WHERE Car = ? AND Owner = ?`
	rows, err := db.DB.Query(query, carId, userId)
	if err != nil {
		return nil, err
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			return
		}
	}(rows)

	var carFuelChargeDetails []CarDetails
	for rows.Next() {
		var carDetails CarDetails
		err := rows.Scan(&carDetails.ID, &carDetails.DateTime, &carDetails.Mileage, &carDetails.TypeOfFuel, &carDetails.UnitPrice, &carDetails.TotalPrice, &carDetails.LitersKwh, &carDetails.Description)
		if err != nil {
			return nil, err
		}
		carFuelChargeDetails = append(carFuelChargeDetails, carDetails)
	}
	return carFuelChargeDetails, nil
}

func (cs CarService) CreateCarDetails(cd *CarDetails, userId int64) error {
	query := `INSERT INTO car_fuel_charge (DateTime, Mileage, TypeOfFuel, UnitPrice, TotalPrice, LitersKwh, Description, Owner) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}
	defer func(stmt *sql.Stmt) {
		err := stmt.Close()
		if err != nil {
			return
		}
	}(stmt)
	result, err := stmt.Exec(cd.DateTime, cd.Mileage, cd.TypeOfFuel, cd.UnitPrice, cd.TotalPrice, cd.LitersKwh, cd.Description, userId)
	if err != nil {
		return err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return err
	}
	cd.ID = id
	cd.Owner = userId
	return nil
}
