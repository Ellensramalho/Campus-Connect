package dto

type GroupResponse struct {
	ID 				uint 				`json:"id"`
	Name 			string 				`json:"nome"`
	Description 	string				`josn:"description"`
	TeacherID 		uint 				`json:"teacher_id"`
	Teacher			TeacherResponse		`json:"teacher"`
	Members 		[]MemberResponse	`json:"members"`	
}

type MemberResponse struct {
	ID        uint     		`json:"id"`
	StudentID uint     		`json:"student_id"`
	Student   StudentInfo 	`json:"student"`
}

type StudentInfo struct {
    ID    uint   `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
    Bio   string `json:"bio"`
    Role  string `json:"role"`
}

type TeacherResponse struct {
	Departament		string  	`json:"departament"`
	Formation 		string  	`json:"formation"`
	User 			UserInfo 	`json:"user"`
}