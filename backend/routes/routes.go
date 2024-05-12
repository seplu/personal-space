package routes

import (
	"github.com/gin-gonic/gin"
	"seplu.pl/personal-space/utils"
)

func RegisterRoutes(server *gin.Engine) {
	api := server.Group("/api/v1")
	{
		api.POST("/signup", signup)
		api.POST("/login", login)
		secured := api.Group("/").Use(utils.Auth)
		{
			secured.GET("/cars", getCars)
			secured.POST("/cars", createCar)
		}
	}
}
