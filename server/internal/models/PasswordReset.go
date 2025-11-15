package models

import "time"

type PasswordReset struct {
	ID			uint 	  `gorm:"primaryKey"`
	UserID		uint 	  `json:"user_id"`
	Token 		string 	  `gorm:"uniqueIndex;not null"`	
	ExpiresAt   time.Time `gorm:"not null"`
}