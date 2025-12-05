package models

type Member struct {
	ID        uint    `gorm:"primaryKey"`
	StudentID uint    `json:"student_id"`
	Student   Student `gorm:"foreignKey:StudentID;references:UserID"`
	GroupID   uint    `json:"group_id"`
}


type Group struct {
	ID				uint		`gorm:"primaryKey"`
	Name			string 		`json:"nome"`
	Description		string		`json:"description"`
	TeacherID		uint 		`json:"teacher_id"`
	Teacher			Teacher		`gorm:"foreignKey:TeacherID"`
	Members			[]Member	`gorm:"foreignKey:GroupID;constraint:OnDelete:CASCADE"`
}

type ChallengeType string

const (
	ChallengeXP          ChallengeType = "xp"
	ChallengeQuiz        ChallengeType = "quiz"
	ChallengeDelivery    ChallengeType = "delivery"
	ChallengeTimeLimited ChallengeType = "time_limited"
)

type Challenge struct {	
	ID  			uint 			`gorm:"primaryKey"`
	Title 			string			`json:"title"`
	Description 	string 			`json:"description"`
	Teacher			Teacher 		`gorm:"foreignKey:TeacherID"`
	Type 			ChallengeType	`gorm:"challenge_type"`
	XP				int 			`json:"xp"`
	GroupID 		uint 			`json:"group_id"`
	TeacherID   	uint   			`json:"teacher_id"`
}