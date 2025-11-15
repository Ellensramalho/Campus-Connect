package handlers

import (
	"net/http"
	"time"

	"github.com/LucasPaulo001/Campus-Connect/internal/models"
	config "github.com/LucasPaulo001/Campus-Connect/internal/repository"
	"github.com/LucasPaulo001/Campus-Connect/internal/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

// Pedir o reset de senha
func ForgotPassword(c *gin.Context) {

	// Corpo de requisição com email
	var body struct{
		Email  string  `json:"email"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Buscando usuário pelo email
	var user models.User
	if err := config.DB.Where("email = ?", body.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusOK, gin.H{
            "message": "Se o e-mail existir, enviaremos instruções",
        })
        return 
	}

	token := uuid.NewString()

	// Criando tabela de reset da senha
	reset := models.PasswordReset{
		UserID: 	user.ID,
		Token: 		token,
		ExpiresAt: 	time.Now().Add(1 * time.Hour),
	}

	config.DB.Create(&reset)

	resetLink := "http://localhost:3000/reset-password?token=" + token

	service.SendPasswordReset(body.Email, resetLink)

	c.JSON(http.StatusOK, gin.H{
        "message": "Se o e-mail existir, enviamos instruções",
    })
}

// Resetar a senha
func ResetPass(c *gin.Context) {
	var body struct {
		Token 	 	string 	`json:"token"`
		Password 	string 	`json:"password"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Buscando token
	var reset models.PasswordReset
	if err := config.DB.
		Where("token = ?", body.Token).
		First(&reset).
		Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Token inválido."})
			return
		}

	if time.Now().After(reset.ExpiresAt) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tempo de token expirado."})
		return
	}

	var user models.User
	config.DB.First(&user, reset.UserID)

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao processar nova senha."})
		return
	}
    user.Password = string(hash)
    config.DB.Save(&user)

    // apagar token para não reutilizar
    config.DB.Delete(&reset)

    c.JSON(http.StatusOK, gin.H{
        "message": "Senha alterada com sucesso.",
    })

}