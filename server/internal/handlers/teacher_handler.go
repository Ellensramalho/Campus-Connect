package handlers

import (
	"net/http"
	"strconv"

	"github.com/LucasPaulo001/Campus-Connect/internal/dto"
	"github.com/LucasPaulo001/Campus-Connect/internal/models"
	config "github.com/LucasPaulo001/Campus-Connect/internal/repository"
	"github.com/gin-gonic/gin"
)

func CreateGroup(c *gin.Context) {
	teacherId := c.GetUint("userId")

	if teacherId == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Id não encontrado"})
		return
	}

	// Dados temporários
	var body struct {
		Name			string		`json:"name"`
		Description 	string		`json:"description"`
		Members 		[]uint		`json:"members"`
	}

	// Serealizando dados
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Criando grupo
	group := models.Group{
		Name: 			body.Name,
		Description: 	body.Description,
		TeacherID: 		teacherId,
	}

	if err := config.DB.Create(&group).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar grupo."})
		return
	}

	// Salvando estudantes no grupo
	var members []models.Member

	for _, studentId := range body.Members {
		var count int64
		config.DB.Model(&models.Student{}).Where("user_id = ?", studentId).Count(&count)
		if count == 0 {
			continue
		}
		members = append(members, models.Member{
			StudentID: studentId,
			GroupID: group.ID,
		})
	}

	if len(members) > 0 {
		if err := config.DB.Create(&members).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao adicionar estudante ao grupo."})
			return
		}
	}

	if err := config.DB.Preload("Members").Preload("Teacher").First(&group, group.ID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao carregar dados do grupo."})
		return
	}


	c.JSON(http.StatusCreated, gin.H{
		"message": "Grupo criado com sucesso.",
		"group": group,
		"members": members,
	})
}

// Excluir um grupo
func DeleteGroup(c *gin.Context) {
	groupIdStr := c.Param("id")

	var groupId uint

	if id, err := strconv.ParseUint(groupIdStr, 10, 32); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Id inválido."})
		return
	} else {
		groupId = uint(id)
	}

	if err := config.DB.
		Where("group_id = ?", uint(groupId)).
		Delete(&models.Member{}).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Erro ao deletar membros.", 
				"details": err.Error(),
			})
			return
		}

	result := config.DB.
		Where("id = ?", uint(groupId)).
		Delete(&models.Group{})
		
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao deletar grupo.", 
		})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Grupo não encontrado."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Grupo deletado com sucesso."})

}

// Editar grupo
func EditGroup(c *gin.Context) {
	groupIdStr := c.Param("id")
	teacherId := c.GetUint("userId")

	var groupId uint

	if id, err := strconv.ParseUint(groupIdStr, 10, 32); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Erro ao converter id.",
			"details": err.Error(),
		})
		return
	} else {
		groupId = uint(id)
	}

	var body struct {
		Name 			string    `json:"name"`
		Description		string	  `json:"description"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Buscando comentário
	var group models.Group
	if err := config.DB.First(&group, groupId).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Grupo não encontrado."})
		return
	}

	if group.TeacherID != uint(teacherId) {
		c.JSON(http.StatusForbidden, gin.H{"erro": "Acesso negado."})
		return
	}

	if err := config.DB.Model(&group).Updates(models.Group{
		Name: 			body.Name,
		Description: 	body.Description,
	}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar grupo"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Dados de grupo atualizados com sucesso."})

}

// Listar grupos criados pelo professor
func ListMyGroups(c *gin.Context) {
	teacherId := c.GetUint("userId")

	var groups []models.Group
	if err := config.DB.
		Preload("Members").
		Preload("Members.Student").
		Preload("Members.Student.User").
		Preload("Teacher").
		Preload("Teacher.User").
		Where("teacher_id = ?", teacherId).
		Find(&groups).
		Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var response []dto.GroupResponse
	for _, group := range groups {
		var membersDto []dto.MemberResponse

		for _, m := range group.Members {
			membersDto = append(membersDto, dto.MemberResponse{
				ID:        m.Student.UserID,
				StudentID: m.StudentID,
				Student: dto.StudentInfo{
					Name: m.Student.User.Name,
					Role: m.Student.User.Role,
				},
			})
		}

		response = append(response, dto.GroupResponse{
			ID:  			group.ID,
			Name: 			group.Name,
			Description: 	group.Description,
			TeacherID: 		teacherId,
			Teacher: dto.TeacherResponse{
				Departament: group.Teacher.Departament,
				Formation:   group.Teacher.Formation,
				User: 		 dto.UserInfo{
					ID: 	group.Teacher.UserID,
					Name: 	group.Teacher.User.Name,
					Role:   group.Teacher.User.Role,
				},	
			},
			Members: membersDto,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"groups": response,
	})
}

// Adicionar estudantes
func AddStudents(c *gin.Context) {
	teacherId := c.GetUint("userId")
	
	groupIdStr := c.Param("id")
	groupId, err := strconv.ParseUint(groupIdStr, 10, 30)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var body struct {
		Members   []uint   `json:"members"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var group models.Group
	if err := config.DB.
		Where("id = ?", groupId).
		Find(&group).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Grupo não encontrado"})
			return
		}

	if group.TeacherID != teacherId {
		c.JSON(http.StatusForbidden, gin.H{"error": "Permissão negada"})
		return
	}

	var existingMembers []models.Member
	config.DB.Where("group_id = ?", group.ID).Find(&existingMembers)

	// Criar um mapa para verificar duplicados
	existingMap := make(map[uint]bool)
	for _, m := range existingMembers {
		existingMap[m.StudentID] = true
	}

	// Filtrar e criar novos membros
	var newMembers []models.Member

	for _, studentId := range body.Members {
		// Verifica se o estudante existe
		var count int64
		config.DB.Model(&models.Student{}).Where("user_id = ?", studentId).Count(&count)
		if count == 0 {
			continue
		}

		// Verifica se já está no grupo
		if existingMap[studentId] {
			continue
		}

		newMembers = append(newMembers, models.Member{
			StudentID: studentId,
			GroupID:   uint(groupId),
		})
	}

	// Inserir no banco
	if len(newMembers) > 0 {
		if err := config.DB.Create(&newMembers).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao adicionar estudantes"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Estudantes adicionados com sucesso",
		"added":   newMembers,
	})
}

