package user

import (
	"diogo-aparecido-smartfit/agilmed/internal/domain/user"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	service user.Service
}

func NewUserHandler(s user.Service) *UserHandler {
	return &UserHandler{service: s}
}

func (h *UserHandler) Register(c *gin.Context) {
	var req RegisterUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
		return
	}

	role := user.Role("patient")

	userRegister := user.UserRegister{
		Name:              req.Name,
		Email:             req.Email,
		PasswordHash:      req.Password,
		Phone:             req.Phone,
		DocumentType:      req.DocumentType,
		Document:          req.Document,
		ProfilePictureUrl: nil,
		Birthdate:         &req.Birthdate,
		Role:              &role,
	}

	user, err := h.service.Register(userRegister)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, user)
}
