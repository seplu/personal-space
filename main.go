package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/template/html/v2"
	"seplu.pl/personal-space/db"
	"seplu.pl/personal-space/routes"
	"seplu.pl/personal-space/utils"
)

func main() {
	db.InitDB()
	engine := html.New("./views", ".tmpl")

	app := fiber.New(fiber.Config{
		Views: engine,
	})

	port := utils.GetEnv("PORT", "8080")
	protocol := utils.GetEnv("PROTOCOL", "http")
	corsDomain := utils.GetEnv("DOMAIN", "localhost:"+port)

	app.Use(
		logger.New(logger.Config{
			Format: "[${ip}]:${port} ${status} - ${method} ${path}\n${body}\n${resBody}\n",
		}),
		cors.New(cors.Config{
			AllowCredentials: true,
			AllowOrigins: protocol + "://" + corsDomain,
		}),
	)

	app.Static("/", "./public")
	routes.RegisterRoutes(app)

	err := app.Listen(":" + port)
	if err != nil {
		return
	}
}
