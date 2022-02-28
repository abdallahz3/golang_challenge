package config

import (
	"time"
)

type config struct {
	WaitInterval time.Duration
	SqliteDBPath string
	Port         string
}

var Config config
