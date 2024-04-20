package main

import (
	"github.com/gin-gonic/gin"
	"seplu.pl/personal-space/db"
	"seplu.pl/personal-space/routes"
)

func main() {
	db.InitDB()
	server := gin.Default()
	routes.RegisterRoutes(server)
	err := server.Run(":8080")
	if err != nil {
		return
	}
}
