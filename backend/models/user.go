package models

import (
	"database/sql"
	"seplu.pl/personal-space/db"
)

type User struct {
	ID       int64
	Email    string `binding:"required"`
	Password string `binding:"required"`
}

func (u User) Create() error {
	query := `INSERT INTO users (email, password) VALUES (?, ?)`
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

	result, err := stmt.Exec(u.Email, u.Password)
	if err != nil {
		return err
	}
	userId, err := result.LastInsertId()
	u.ID = userId
	return err
}
