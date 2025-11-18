package dto

import "time"

type PostResponse struct {
	ID         uint      `json:"id"`
    Title      string    `json:"title"`
    Content    string    `json:"content"`
    User       UserInfo  `json:"user"`
    LikesCount int64       `json:"likes_count"`
    LikedByMe  bool      `json:"liked_by_me"`
    CreatedAt  time.Time `json:"created_at"`
}