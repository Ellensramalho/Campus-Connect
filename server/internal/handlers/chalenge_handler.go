package handlers

import (
	"net/http"
	"strconv"

	"github.com/LucasPaulo001/Campus-Connect/internal/dto"
	"github.com/LucasPaulo001/Campus-Connect/internal/models"
	config "github.com/LucasPaulo001/Campus-Connect/internal/repository"
	"github.com/gin-gonic/gin"
)

func CreateChallenge(c *gin.Context) {
	teacherId := c.GetUint("userId")
	groupIdStr := c.Param("id")

	groupId, err := strconv.Atoi(groupIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var body struct {
		Title 		string 					`json:"title"`
		Description string 					`json:"description"`
		Type 		models.ChallengeType 	`json:"type"`
		XP			int 					`json:"xp"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Buscando professor para saber se é válido
	var teacher models.Teacher
	if err := config.DB.
		Where("user_id = ?", teacherId).
		First(&teacher).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	
	// Buscando grupo para saber se é válido
	var group models.Group
	if err := config.DB.
		Where("id = ? AND teacher_id = ?", groupId, teacherId).
		First(&group).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

	// Cria challenge
	challenge := models.Challenge{
		Title:       body.Title,
		Description: body.Description,
		Type:        body.Type,
		XP: 		 body.XP,
		TeacherID:   teacherId,
		GroupID:     uint(groupId),
	}

	if err := config.DB.Create(&challenge).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"challenge": "Desafio criado com sucesso."})
}

func ListChallenges(c *gin.Context) {
	groupIdStr := c.Param("id")

	groupId, err := strconv.Atoi(groupIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Buscando grupo
	var group models.Group
	if err := config.DB.
		Where("id = ?", groupId).
		First(&group).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

	// Buscando o challenge
	var challenges []models.Challenge
	if err := config.DB.
		Where("group_id = ?", groupId).
		Preload("Teacher").
		Preload("Teacher.User").
		Find(&challenges).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

	var response []dto.ChalengeResponse
	for _, challenge := range challenges {
		response = append(response, dto.ChalengeResponse{
			ID: 			challenge.ID,
			Title: 			challenge.Title,
			Description: 	challenge.Description,
			Teacher:  dto.TeacherResponse{
				Departament:  challenge.Teacher.Departament,
				Formation:    challenge.Teacher.Formation,
				User: dto.UserInfo{
					Name: challenge.Teacher.User.Name,
					Role: challenge.Teacher.User.Role,	
				},
			},
			Type: 		string(challenge.Type),
			XP:   		challenge.XP,
			GroupID: 	challenge.GroupID,
			TeacherID: 	challenge.TeacherID,
		})
	} 
	

	c.JSON(http.StatusOK, response)
}