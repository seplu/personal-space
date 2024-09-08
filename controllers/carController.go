package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"seplu.pl/personal-space/models"
	"strconv"
)

func GetCarDetails(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{"message": "unauthenticated"})
	}
	claims := token.Claims.(*jwt.RegisteredClaims)

	userId, _ := strconv.Atoi(claims.Issuer)

	carIdParam := c.Params("car_id")
	carId, err := strconv.Atoi(carIdParam)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "Invalid car ID", "error": err.Error()})
	}

	result, err := models.CarService{}.GetCarDetails(int(int64(carId)), int64(userId))
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Could not get car details", "error": err.Error()})
	}

	return c.JSON(result)
}
