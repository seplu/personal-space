package routes

import (
	"github.com/gofiber/fiber/v2"
	"net/http"
	"seplu.pl/personal-space/models"
	"strconv"
)

func createCar(context *fiber.Ctx) error {
	var car models.Car
	err := context.BodyParser(&car)
	if err != nil {
		return context.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "Could not parse request data."})
	}
	userIDRaw := context.Locals("userId")
	userID, _ := strconv.ParseInt(userIDRaw.(string), 10, 64)
	err = models.CarService{}.CreateCar(&car, userID)
	if err != nil {
		return context.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Could not create car."})
	}
	return context.Status(http.StatusCreated).JSON(fiber.Map{"message": "Car created!", "car": car})
}

func getCars(context *fiber.Ctx) error {
	userIDRaw := context.Locals("userId")
	userID, _ := strconv.ParseInt(userIDRaw.(string), 10, 64)
	cars, err := models.CarService{}.CarList(userID)
	if err != nil {
		return context.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Could not fetch cars."})
	}
	return context.Status(http.StatusOK).JSON(cars)
}
