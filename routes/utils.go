package routes

import (
	"github.com/gofiber/fiber/v2"
	"seplu.pl/personal-space/utils"
)

func registerCheck(context *fiber.Ctx) error {
	register := utils.GetSettingValue("register")
	if register == "enabled" {
		return context.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Registration is enabled.", "value": register})
	} else {
		return context.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Registration is disabled.", "value": register})
	}
}
