package main

import (
	"github.com/gin-gonic/gin"
	"seplu.pl/personal-space/db"
)

func main() {
	db.InitDB()
	server := gin.Default()
	err := server.Run(":8080")
	if err != nil {
		return
	}
}
