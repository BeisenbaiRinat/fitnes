document.addEventListener("DOMContentLoaded", () => {
    const workoutsContainer = document.getElementById("workouts-container");
    const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    
    workoutsContainer.innerHTML = ""; // Очищаем контейнер перед загрузкой

    workouts.forEach((workout, index) => {
        const workoutElement = document.createElement("div");
        workoutElement.classList.add("workout-item");
        workoutElement.innerHTML = `
            <h3>${workout.name}</h3>
            <p><strong>Продолжительность:</strong> ${workout.duration} минут</p>
            <p>${workout.description}</p>
            <button class="delete-btn" data-index="${index}">Удалить</button>
        `;
        workoutsContainer.appendChild(workoutElement);
    });

    // Функция удаления тренировки
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            deleteWorkout(index);
        });
    });

    function deleteWorkout(index) {
        const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        workouts.splice(index, 1);
        localStorage.setItem("workouts", JSON.stringify(workouts));
        location.reload(); // Обновляем страницу после удаления
    }
});
