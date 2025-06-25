package user

import "time"

type Role string

const (
	RolePatient Role = "patient"
	RoleDoctor  Role = "doctor"
	RoleAdmin   Role = "admin"
)

type User struct {
	ID                string    `json:"id"`
	HealthID          string    `json:"health_id"`
	Name              string    `json:"name"`
	Email             string    `json:"email"`
	PasswordHash      string    `json:"password"`
	Phone             string    `json:"phone"`
	DocumentType      string    `json:"document_type"`
	Document          string    `json:"document"`
	ProfilePictureUrl *string   `json:"profile_picture_url"`
	IsVerified        bool      `json:"is_verified"`
	Birthdate         time.Time `json:"birthdate"`
	Role              Role      `json:"role"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
}

type UserRegister struct {
	Name              string
	Email             string
	PasswordHash      string
	Phone             string
	DocumentType      string
	Document          string
	ProfilePictureUrl **string
	Birthdate         *time.Time
	Role              *Role
}

type UserUpdate struct {
	Name              *string
	Email             *string
	PasswordHash      *string
	Phone             *string
	DocumentType      *string
	Document          *string
	ProfilePictureUrl **string
	IsVerified        *bool
	Birthdate         *time.Time
	Role              *Role
}

type UserResponse struct {
	Name              string
	Email             string
	Phone             string
	DocumentType      string
	Document          string
	ProfilePictureUrl **string
	IsVerified        bool
	Birthdate         time.Time
	Role              Role
}
