document.addEventListener("DOMContentLoaded", () => {
    const workoutForm = document.getElementById("workout-form");
    const workoutsContainer = document.getElementById("workouts-container");

    // Функция загрузки тренировок из localStorage
    function loadWorkouts() {
        workoutsContainer.innerHTML = "";
        const workouts = JSON.parse(localStorage.getItem("workouts")) || [];

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

        // Добавляем обработчик удаления
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                deleteWorkout(index);
            });
        });
    }

    // Функция сохранения новой тренировки
    workoutForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const workoutName = document.getElementById("workout-name").value;
        const workoutDuration = document.getElementById("workout-duration").value;
        const workoutDescription = document.getElementById("workout-description").value;

        const newWorkout = { name: workoutName, duration: workoutDuration, description: workoutDescription };

        const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        workouts.push(newWorkout);
        localStorage.setItem("workouts", JSON.stringify(workouts));

        loadWorkouts();
        workoutForm.reset();
    });

    // Функция удаления тренировки
    function deleteWorkout(index) {
        const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        workouts.splice(index, 1);
        localStorage.setItem("workouts", JSON.stringify(workouts));
        loadWorkouts();
    }

    loadWorkouts();
});
