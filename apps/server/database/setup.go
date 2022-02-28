package database

import (
	"example.com/m/config"
	"example.com/m/models"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func Setup() {
	var err error
	DBConn, err = gorm.Open("sqlite3", config.Config.SqliteDBPath)
	if err != nil {
		panic("failed to connect database")
	}
	DBConn.AutoMigrate(&models.History{})
}
