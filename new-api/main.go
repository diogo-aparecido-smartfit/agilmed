package main

import (
	"diogo-aparecido-smartfit/agilmed/internal/config/database"
	handler "diogo-aparecido-smartfit/agilmed/internal/handler"
	userHandler "diogo-aparecido-smartfit/agilmed/internal/handler/user"
	userRepo "diogo-aparecido-smartfit/agilmed/internal/infra/db/repository/user"
	userService "diogo-aparecido-smartfit/agilmed/internal/service/user"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	dbInstance, err := database.GetDB()

	if err != nil {
		return
	}

	userRepo := userRepo.NewRepository(dbInstance)
	userService := userService.NewService(userRepo)
	userHandler := userHandler.NewUserHandler(userService)

	handler.RegisterUserRoutes(r, userHandler)

	r.Run("localhost:3000")
}
