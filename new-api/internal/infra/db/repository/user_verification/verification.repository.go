package userverification

import (
	userverification "diogo-aparecido-smartfit/agilmed/internal/domain/user_verification"

	"gorm.io/gorm"
)

type dbUserRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) userverification.Repository {
	return &dbUserRepository{db: db}
}

// Create implements userverification.Repository.
func (d *dbUserRepository) Create(verification *userverification.Verification) error {
	panic("unimplemented")
}

// Delete implements userverification.Repository.
func (d *dbUserRepository) Delete(id string) error {
	panic("unimplemented")
}

// GetAll implements userverification.Repository.
func (d *dbUserRepository) GetAll() ([]*userverification.Verification, error) {
	panic("unimplemented")
}

// GetByID implements userverification.Repository.
func (d *dbUserRepository) GetByID(id string) (*userverification.Verification, error) {
	panic("unimplemented")
}

// Update implements userverification.Repository.
func (d *dbUserRepository) Update(id string, verification userverification.Verification) (*userverification.Verification, error) {
	panic("unimplemented")
}
