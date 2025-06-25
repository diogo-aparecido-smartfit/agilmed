package db

import (
	"diogo-aparecido-smartfit/agilmed/internal/domain/user"

	"gorm.io/gorm"
)

type dbUserRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) user.Repository {
	return &dbUserRepository{db: db}
}

func (r *dbUserRepository) Create(payload *user.UserRegister) (*user.UserResponse, error) {
	createdUser := &user.UserResponse{
		Name:              payload.Name,
		Email:             payload.Email,
		Document:          payload.Document,
		DocumentType:      payload.DocumentType,
		Birthdate:         *payload.Birthdate,
		Phone:             payload.Phone,
		ProfilePictureUrl: payload.ProfilePictureUrl,
		Role:              *payload.Role,
		IsVerified:        false,
	}

	return createdUser, r.db.Create(payload).Error
}

func (r *dbUserRepository) Delete(id string) error {
	return r.db.Where("id = ?", id).Delete(&user.User{}).Error
}

func (r *dbUserRepository) GetAll(filter user.UserFilter) ([]*user.User, error) {
	var users []*user.User

	query := r.db.Model(&user.User{})

	if filter.Name != nil {
		query = query.Where("full_name ILIKE ?", "%"+*filter.Name+"%")
	}

	if filter.Role != nil {
		query = query.Where("role = ?", *filter.Role)
	}

	err := query.Find(&users).Error

	return users, err
}

func (r *dbUserRepository) GetByID(id string) (*user.User, error) {
	var u user.User
	err := r.db.Where("id = ?", id).First(&u).Error
	return &u, err
}

func (r *dbUserRepository) Update(id string, payload user.UserUpdate) (*user.UserResponse, error) {
	if err := r.db.Model(&user.User{}).Where("id = ?", id).Updates(payload).Error; err != nil {
		return nil, err
	}

	var updatedUser user.UserResponse
	if err := r.db.Where("id = ?", id).First(&updatedUser).Error; err != nil {
		return nil, err
	}

	return &updatedUser, nil
}
