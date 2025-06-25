package userverification

import "time"

type Verification struct {
	ID        string     `json:"id"`
	UserID    string     `json:"user_id"`
	Code      string     `json:"code"`
	ExpiresAt time.Time  `json:"expires_at"`
	UsedAt    *time.Time `json:"used_at,omitempty"`
	CreatedAt time.Time  `json:"created_at"`
}
