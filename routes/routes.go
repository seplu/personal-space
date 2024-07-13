package routes

import (
	"github.com/gofiber/fiber/v2"
	"seplu.pl/personal-space/utils"
)

func RegisterRoutes(app *fiber.App) {
	api := app.Group("/api/v1")
	api.Post("/signup", signup)
	api.Post("/login", login)
	api.Get("/register/check", registerCheck)

	secured := app.Group("/api/v2").Use(utils.Auth)
	secured.Get("/cars", getCars)
	secured.Post("/cars", createCar)

	frontendRoutes := []string{
		"/",
		"/admin",
		"/login",
		"/unauthorized",
	}
	for _, route := range frontendRoutes {
		app.Get(route, home)
	}
}
