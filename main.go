package main

import (
	"github.com/gofiber/fiber/v2"
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

	app.Static("/", "./public")
	routes.RegisterRoutes(app)
	port := utils.GetEnv("PORT", "8080")
	err := app.Listen(":" + port)
	if err != nil {
		return
	}
}
