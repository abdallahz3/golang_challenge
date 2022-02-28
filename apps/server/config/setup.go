package config

import (
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

func Setup() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Print("Error loading .env file")
	}

  waitIntervalInt, _ := strconv.Atoi(os.Getenv("WAIT_INTERVAL"))
  Config.WaitInterval = time.Duration(waitIntervalInt)

  Config.SqliteDBPath = os.Getenv("SQLITE_DB_PATH")


  Config.Port = os.Getenv("PORT")
}
