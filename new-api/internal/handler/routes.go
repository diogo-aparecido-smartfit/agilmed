package handler

import (
	"diogo-aparecido-smartfit/agilmed/internal/handler/user"

	"github.com/gin-gonic/gin"
)

func RegisterUserRoutes(r *gin.Engine, userHandler *user.UserHandler) {
	group := r.Group("/users")
	{
		group.POST("/register", userHandler.Register)
		// outras rotas do usuário
	}
}
