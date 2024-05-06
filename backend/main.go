package main

import (
	"github.com/gin-gonic/gin"
	"seplu.pl/personal-space/db"
	"seplu.pl/personal-space/routes"
	"seplu.pl/personal-space/utils"
)

func main() {
	db.InitDB()
	server := gin.Default()
	routes.RegisterRoutes(server)
	port := utils.GetEnv("PORT", "8080")
	err := server.Run(":" + port)
	if err != nil {
		return
	}
}
