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

func (r *dbUserRepository) Create(user *userverification.Verification) error {
	return r.db.Create(user).Error
}

func (r *dbUserRepository) Delete(id string) error {
	return r.db.Where("id = ?", id).Delete(&userverification.Verification{}).Error
}

func (r *dbUserRepository) GetAll() ([]*userverification.Verification, error) {
	var filters []*userverification.Verification

	err := r.db.Find(&filters).Error

	return filters, err
}

func (r *dbUserRepository) GetByID(id string) (*userverification.Verification, error) {
	var u userverification.Verification
	err := r.db.Where("id = ?", id).First(&u).Error

	return &u, err
}

func (r *dbUserRepository) GetByUserID(userId string) (*userverification.Verification, error) {
	var u userverification.Verification
	err := r.db.Where("user_id = ?", userId).First(&u).Error

	return &u, err
}

func (r *dbUserRepository) Update(id string, payload userverification.VerificationUpdate) (*userverification.Verification, error) {
	if err := r.db.Model(&userverification.Verification{}).Where("id = ?", id).Updates(payload).Error; err != nil {
		return nil, err
	}

	var updatedUser userverification.Verification
	if err := r.db.Where("id = ?", id).First(&updatedUser).Error; err != nil {
		return nil, err
	}

	return &updatedUser, nil
}
