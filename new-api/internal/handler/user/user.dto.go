package user

import "time"

type RegisterUserRequest struct {
	Name         string    `json:"name" binding:"required"`
	Email        string    `json:"email" binding:"required,email"`
	Password     string    `json:"password" binding:"required,min=8"`
	Phone        string    `json:"phone"`
	DocumentType string    `json:"document_type"`
	Document     string    `json:"document"`
	Birthdate    time.Time `json:"birthdate" binding:"required"`
}
