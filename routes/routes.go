package routes

import (
	"github.com/gofiber/fiber/v2"
	"seplu.pl/personal-space/controllers"
)

func RegisterRoutes(app *fiber.App) {
	api := app.Group("/api/v1")
	api.Get("/cars", controllers.GetCars)
	api.Post("/cars", controllers.CreateCar)
	api.Post("/login", controllers.Login)
	api.Post("/logout", controllers.Logout)
	api.Post("/register", controllers.Register)
	api.Get("/register/check", registerCheck)
	api.Get("/user", controllers.User)

	frontendRoutes := []string{
		"/",
		"/admin",
		"/car",
		"/login",
	}
	for _, route := range frontendRoutes {
		app.Get(route, home)
	}
}
