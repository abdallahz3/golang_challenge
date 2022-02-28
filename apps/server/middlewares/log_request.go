package middlewares

import (
	models "example.com/m/models"
	"fmt"
	"github.com/gofiber/fiber/v2"

	"example.com/m/database"
)

func LogRequestToDatabase(c *fiber.Ctx) error {
	fmt.Println(string(c.Context().UserAgent()))
	hi := new(models.History)
	hi.UserAgent = string(c.Context().UserAgent())
	database.DBConn.Create(&hi)

	return c.Next()
}
