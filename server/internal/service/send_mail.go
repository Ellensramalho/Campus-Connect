package service

import (
	"os"

	"github.com/resend/resend-go/v3"
)


func SendPasswordReset(to, link string) error {
	api_key := os.Getenv("RESEND_API_KEY")
	client := resend.NewClient(api_key)

	params := &resend.SendEmailRequest{
		From: "Campus Connect <onboarding@resend.dev>",
		To: []string{to},
		Subject: "Redefinir senha",
		Html: "<p>Clique no link abaixo para redefinir sua senha:</p><a href='" + link + "'>Redefinir senha</a>",
	}

	_, err := client.Emails.Send(params)
	return err
}