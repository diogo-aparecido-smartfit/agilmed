package db

import (
	"sync"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	instance *gorm.DB
	once     sync.Once
)

func GetDB() (*gorm.DB, error) {
	var err error

	once.Do(func() {
		dsn := "host=localhost user=postgres password=postgres dbname=gorm port=5432 sslmode=disable"
		instance, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	})

	return instance, err
}
