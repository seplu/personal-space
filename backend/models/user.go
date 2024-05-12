package models

import (
	"database/sql"
	"errors"
	"seplu.pl/personal-space/db"
	"seplu.pl/personal-space/utils"
)

type User struct {
	ID       int64
	Email    string `binding:"required"`
	Password string `binding:"required"`
}

type UserService struct{}

func (us UserService) CreateUser(u *User) error {
	query := `INSERT INTO users (Email, Password) VALUES (?, ?)`
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

	hashedPassword, err := utils.HashPassword(u.Password)

	result, err := stmt.Exec(u.Email, hashedPassword)
	if err != nil {
		return err
	}
	userId, err := result.LastInsertId()
	u.ID = userId
	return err
}

func (us UserService) ValidateUserCredentials(u *User) error {
	query := `SELECT ID, Password FROM users WHERE Email = ?`
	row := db.DB.QueryRow(query, u.Email)

	var retrievedPassword string
	err := row.Scan(&u.ID, &retrievedPassword)

	if err != nil {
		return errors.New("invalid credentials")
	}

	passwordIsValid := utils.CheckPasswordHash(u.Password, retrievedPassword)

	if !passwordIsValid {
		return errors.New("invalid credentials")
	}
	return nil
}
