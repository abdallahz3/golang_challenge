package models

import (
	// "github.com/jinzhu/gorm"
	"time"
)

type History struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	// DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at"`
	DeletedAt *time.Time `gorm:"index" json:"deleted_at"`
	UserAgent string     `json:"user_agent"`
}
