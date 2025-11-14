package main

import (
	"log"
	"os"
	"time"

	"github.com/LucasPaulo001/Campus-Connect/internal/api/routes"
	"github.com/LucasPaulo001/Campus-Connect/internal/models"
	config "github.com/LucasPaulo001/Campus-Connect/internal/repository"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main(){
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Erro ao carregar arquivo .env")
	}

	config.ConnectDatabase()
	config.DB.AutoMigrate(
		&models.User{}, 
		&models.Post{}, 
		&models.Tags{}, 
		&models.Comment{},
		&models.LikePost{},
		&models.LikeComment{},
		&models.Group{},
		&models.Member{},
		&models.Teacher{},
		&models.Student{},
	)

	router := gin.Default()

	corsConfig(router)

	routes.SetupRoutes(router)

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "3000"
	}
	router.Run(":"+PORT)
}

func corsConfig(router *gin.Engine) {
	router.Use(cors.New(cors.Config{
		AllowOrigins: 	[]string{
			"http://localhost:5173",     // Vite
        	"http://localhost:3000",     // Next.js local
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
    	AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
    	ExposeHeaders:    []string{"Content-Length"},
    	AllowCredentials: true,
    	MaxAge:           12 * time.Hour,
	}))
}
