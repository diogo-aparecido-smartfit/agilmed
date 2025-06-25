package user

type Service interface {
	Register(input UserRegister) (*UserResponse, error)
	Verify(id string, code string) error
	Update(id string, data UserUpdate) (*UserResponse, error)
	GetProfile(userID string) (*User, error)
}
