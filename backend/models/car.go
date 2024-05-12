package models

import (
	"database/sql"
	"seplu.pl/personal-space/db"
)

type Car struct {
	ID    int64
	Brand string `binding:"required"`
	Model string
	Year  int
	Owner int64
}

type CarService struct{}

func (cs CarService) CarList(userId int64) ([]Car, error) {
	query := `SELECT ID, Brand, Model, Year, Owner FROM cars WHERE Owner = ?`
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
		err := rows.Scan(&car.ID, &car.Brand, &car.Model, &car.Year, &car.Owner)
		if err != nil {
			return nil, err
		}
		cars = append(cars, car)
	}
	return cars, nil
}

func (cs CarService) CreateCar(c *Car, userId int64) error {
	query := `INSERT INTO cars (Brand, Model, Year, Owner) VALUES (?, ?, ?, ?)`
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
	result, err := stmt.Exec(c.Brand, c.Model, c.Year, userId)
	if err != nil {
		return err
	}
	id, err := result.LastInsertId()
	c.ID = id
	c.Owner = userId
	return nil
}
