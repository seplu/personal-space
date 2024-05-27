package routes

import "github.com/gofiber/fiber/v2"

func home(context *fiber.Ctx) error {
	return context.Render("index", fiber.Map{})
}
