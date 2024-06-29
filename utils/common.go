package utils

import (
	"os"
	"seplu.pl/personal-space/db"
)

func GetEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return defaultValue
	}
	return value
}

func GetSettingValue(name string) string {
	query := `SELECT SettingValue FROM settings WHERE SettingName = ?`
	row := db.DB.QueryRow(query, name)

	var value string
	err := row.Scan(&value)

	if err != nil {
		return "not found"
	}
	return value
}
