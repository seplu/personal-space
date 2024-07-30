package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"seplu.pl/personal-space/models"
	"seplu.pl/personal-space/utils"
	"strconv"
	"time"
)

var secretKey = utils.GetEnv("SECRET_KEY", "useEnvVarForSecretKey")

func GenerateToken(userId int64) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		Issuer:    strconv.Itoa(int(userId)),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 1)),
	})
	return token.SignedString([]byte(secretKey))
}

func Register(c *fiber.Ctx) error {
	register := utils.GetSettingValue("register")
	if register != "disabled" {
		var user models.User
		if err := c.BodyParser(&user); err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "Could not parse request data", "error": err.Error()})
		}
		err := models.UserService{}.CreateUser(&user)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Could not create user", "error": err.Error()})
		}
		return c.Status(http.StatusCreated).JSON(fiber.Map{"message": "User created", "user": user})
	} else {
		return c.Status(http.StatusForbidden).JSON(fiber.Map{"message": "Registration is disabled"})
	}
}

func Login(c *fiber.Ctx) error {
	var user models.User
	err := c.BodyParser(&user)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "Could not parse request data", "error": err.Error()})
	}
	err = models.UserService{}.ValidateUserCredentials(&user)
	if err != nil {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid credentials", "error": err.Error()})
	}
	token, err := GenerateToken(user.ID)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Could not generate token", "error": err.Error()})
	}
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 1),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.Status(http.StatusOK).JSON(fiber.Map{"message": "Logged in!", "token": token})
}

func User(c *fiber.Ctx) error {
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

	result, err := models.UserService{}.GetUser(&models.User{ID: int64(id)})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Could not get user", "error": err.Error()})
	}

	return c.JSON(result)
}
