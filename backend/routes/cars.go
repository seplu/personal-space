package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"seplu.pl/personal-space/models"
)

func createCar(context *gin.Context) {
	var car models.Car
	err := context.ShouldBindJSON(&car)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data."})
		return
	}
	userID := context.GetInt64("userId")
	err = models.CarService{}.CreateCar(&car, userID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create car."})
		return
	}
	context.JSON(http.StatusCreated, gin.H{"message": "Car created!", "car": car})
}

func getCars(context *gin.Context) {
	userID := context.GetInt64("userId")
	cars, err := models.CarService{}.CarList(userID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch cars."})
		return
	}
	context.JSON(http.StatusOK, cars)
}
