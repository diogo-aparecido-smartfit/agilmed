package user

import (
	"diogo-aparecido-smartfit/agilmed/internal/domain/user"

	"golang.org/x/crypto/bcrypt"
)

type userService struct {
	repo user.Repository
}

func NewService(repo user.Repository) user.Service {
	return &userService{repo: repo}
}

func (u *userService) GetProfile(userID string) (*user.User, error) {
	return u.repo.GetByID(userID)
}

func (u *userService) Register(input user.UserRegister) (*user.UserResponse, error) {
	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(input.PasswordHash), 14)

	if err != nil {
		return nil, err
	}

	entity := &user.UserRegister{
		Name:              input.Name,
		Email:             input.Email,
		PasswordHash:      string(hashedPwd),
		Phone:             input.Phone,
		DocumentType:      input.DocumentType,
		Document:          input.Document,
		ProfilePictureUrl: nil,
		Role:              input.Role,
		Birthdate:         input.Birthdate,
	}

	userResponse, err := u.repo.Create(entity)

	if err != nil {
		return nil, err
	}

	return userResponse, nil
}

func (u *userService) Update(id string, data user.UserUpdate) (*user.UserResponse, error) {
	return u.repo.Update(id, data)
}

func (u *userService) Verify(id string, code string) error {
	panic("unimplemented")
}
