package user

import "time"

type UserFilter struct {
	Name      *string
	Role      *Role
	BirthDate *time.Time
}

type Repository interface {
	Create(user *User) error
	GetAll(filter UserFilter) ([]*User, error)
	GetByID(id string) (*User, error)
	Update(id string, user UserUpdate) (*User, error)
	Delete(id string) error
}
