package main

import (
	"bufio"
	"time"

	"encoding/json"

	"example.com/m/config"
	"example.com/m/database"
	"example.com/m/middlewares"
	"example.com/m/models"
	"example.com/m/reader"
	_ "example.com/m/reader/file_reader"
	// _ "example.com/m/reader/inmemory_reader" // -> uncomment instead of the above line if you want to use inmemory reader instead of file based one

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/valyala/fasthttp"
)

func init() {
	config.Setup()
	database.Setup()
}

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowHeaders:     "Cache-Control",
		AllowCredentials: true,
	}))

	app.Get("/data",
		middlewares.LogRequestToDatabase,
		func(c *fiber.Ctx) error {
			c.Set("Content-Type", "text/event-stream")
			c.Set("Cache-Control", "no-cache")
			c.Set("Connection", "keep-alive")
			c.Set("Transfer-Encoding", "chunked")

			// stream the response
			c.Context().SetBodyStreamWriter(fasthttp.StreamWriter(func(w *bufio.Writer) {
				re := reader.New()
				defer re.Close()

				for data := range re.Read() {
					dataMashaled, _ := json.Marshal(fiber.Map{"data": data})

					w.Write(dataMashaled)
					w.Flush()

					time.Sleep(config.Config.WaitInterval * time.Second)
				}
			}))

			return nil
		},
	)

	app.Get("/history", func(c *fiber.Ctx) error {
		var history []models.History
		database.DBConn.Find(&history)

		c.JSON(fiber.Map{"success": true, "data": history})

		return nil
	})

	app.Listen(config.Config.Port)
}
