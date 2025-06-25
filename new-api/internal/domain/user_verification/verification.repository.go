package userverification

type Repository interface {
	Create(verification *Verification) error
	GetAll() ([]*Verification, error)
	GetByID(id string) (*Verification, error)
	GetByUserID(userId string) (*Verification, error)
	Update(id string, verification VerificationUpdate) (*Verification, error)
	Delete(id string) error
}
