package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"seplu.pl/personal-space/models"
	"strconv"
)

func GetCars(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{"message": "unauthenticated"})
	}
	claims := token.Claims.(*jwt.RegisteredClaims)

	id, _ := strconv.Atoi(claims.Issuer)

	result, err := models.CarService{}.GetCarList(int64(id))
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Could not get cars list", "error": err.Error()})
	}

	return c.JSON(result)
}

func CreateCar(c *fiber.Ctx) error {
	var car models.Car
	if err := c.BodyParser(&car); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "Could not parse request data."})
	}
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "unauthenticated"})
	}
	claims := token.Claims.(*jwt.RegisteredClaims)
	userID, _ := strconv.ParseInt(claims.Issuer, 10, 64)

	err = models.CarService{}.CreateCar(&car, userID)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Could not create car."})
	}

	return c.Status(http.StatusCreated).JSON(fiber.Map{"message": "Car created!", "car": car})
}
