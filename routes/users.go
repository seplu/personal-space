package routes

import (
	"github.com/gofiber/fiber/v2"
	"net/http"
	"seplu.pl/personal-space/models"
	"seplu.pl/personal-space/utils"
)

func signup(context *fiber.Ctx) error {
	var user models.User
	err := context.BodyParser(&user)
	if err != nil {
		return context.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "Could not parse request data."})
	}
	err = models.UserService{}.CreateUser(&user)
	if err != nil {
		return context.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Could not create user."})
	}
	return context.Status(http.StatusCreated).JSON(fiber.Map{"message": "User created!", "user": user})
}

func login(context *fiber.Ctx) error {
	var user models.User
	err := context.BodyParser(&user)
	if err != nil {
		return context.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "Could not parse request data."})
	}
	err = models.UserService{}.ValidateUserCredentials(&user)
	if err != nil {
		return context.Status(http.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid credentials."})
	}
	token, err := utils.GenerateToken(user.Email, user.ID)
	if err != nil {
		return context.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Could not generate token."})
	}
	return context.Status(http.StatusOK).JSON(fiber.Map{"message": "Logged in!", "token": token})
}
