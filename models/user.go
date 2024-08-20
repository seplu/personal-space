package models

import (
	"database/sql"
	"errors"
	"seplu.pl/personal-space/db"
	"seplu.pl/personal-space/utils"
)

type User struct {
	ID       int64  `json:"id"`
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Email    string `json:"email" binding:"required"`
}

type UserService struct{}

func (us UserService) CreateUser(u *User) error {
	query := `INSERT INTO users (Username, Password, Email) VALUES (?, ?, ?)`
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

	result, err := stmt.Exec(u.Username, hashedPassword, u.Email)
	if err != nil {
		return err
	}
	userId, err := result.LastInsertId()
	u.ID = userId
	if u.ID == 1 {
		_, err = db.DB.Exec(`INSERT INTO settings (SettingName, SettingValue) VALUES ('register', 'disabled')`)
		if err != nil {
			return err
		}
	}
	return err
}

func (us UserService) ValidateUserCredentials(u *User) error {
	query := `SELECT ID, Password FROM users WHERE Username = ?`
	row := db.DB.QueryRow(query, u.Username)

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

func (us UserService) GetUser(u *User) (*User, error) {
	query := `SELECT ID, Username, Email FROM users WHERE ID = ?`
	row := db.DB.QueryRow(query, u.ID)

	var user User
	err := row.Scan(&user.ID, &user.Username, &user.Email)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (us UserService) GetUsers() ([]User, error) {
	query := `SELECT ID, Username, Email FROM users`
	rows, err := db.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {

		}
	}(rows)

	var users []User
	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Username, &user.Email)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}
