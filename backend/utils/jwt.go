package utils

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"time"
)

var secretKey = GetEnv("SECRET_KEY", "useEnvVarForSecretKey")

func GenerateToken(email string, userId int64) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email":  email,
		"userId": userId,
		"exp":    time.Now().Add(time.Hour * 2).Unix(),
	})
	return token.SignedString([]byte(secretKey))
}

func VerifyToken(token string) (int64, error) {
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)

		if !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(secretKey), nil
	})
	if err != nil {
		return 0, errors.New("could not parse token")
	}
	tokenIsValid := parsedToken.Valid
	if !tokenIsValid {
		return errors.New("Invalid token.")
		return 0, errors.New("invalid token")
	}
	claims, ok := parsedToken.Claims.(jwt.MapClaims)
	if !ok {
		return 0, errors.New("could not parse token claims")
	}
	userId := int64(claims["userId"].(float64))
	return userId, nil
}

func Auth(context *gin.Context) {
	token := context.GetHeader("Authorization")
	if token == "" {
		context.AbortWithStatusJSON(401, gin.H{"message": "Not authorized."})
		return
	}
	uID, err := VerifyToken(token)
	if err != nil {
		context.AbortWithStatusJSON(401, gin.H{"message": "Not authorized."})
		return
	}
	context.Set("userId", uID)
	context.Next()
}
