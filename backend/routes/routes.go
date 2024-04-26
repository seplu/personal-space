package routes

import "github.com/gin-gonic/gin"

func RegisterRoutes(server *gin.Engine) {
	server.POST("/api/v1/signup", signup)
	server.POST("/api/v1/login", login)
}
