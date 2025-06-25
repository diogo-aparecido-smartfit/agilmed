package user

import "time"

type UserFilter struct {
	Name      *string
	Role      *Role
	BirthDate *time.Time
}

type Repository interface {
	Create(user *UserRegister) (*UserResponse, error)
	GetAll(filter UserFilter) ([]*User, error)
	GetByID(id string) (*User, error)
	Update(id string, user UserUpdate) (*UserResponse, error)
	Delete(id string) error
}
