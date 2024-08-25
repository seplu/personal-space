package models

import (
	"database/sql"
	"seplu.pl/personal-space/db"
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
