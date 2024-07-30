package routes

import (
	"github.com/gofiber/fiber/v2"
	"net/http"
	"seplu.pl/personal-space/models"
)

func users(context *fiber.Ctx) error {
	users, err := models.UserService{}.GetUsers()
	if err != nil {
		return context.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Could not get users.", "error": err.Error()})
	}
	return context.Status(http.StatusOK).JSON(users)
}
