const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// Get route to return latest workout
router.get("/workouts", async (req, res) => {
    try {
        const workouts = await Workout.aggregate([
            { $sort: { "day": -1 } },
            {
                $addFields: {
                    totalDuration: { $sum: '$exercises.duration' }
                }
            }
        ]);

        res.status(200).json(workouts);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Post route to create a new workout
router.post("/workouts", async (req, res) => {
    try {
        const newWorkout = await Workout.create(req.body);
        res.status(200).json(newWorkout);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Put route to add a new exercise to workout
router.put("/workouts/:id", (req, res) => {
    const id = req.params.id;
    Workout.findByIdAndUpdate(id, {
        $push: { exercises: req.body }
    })
    .then (newExercise => {
        res.status(200).json(newExercise);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

// Get route to return last 7 workouts
router.get("/workouts/range", async (req, res) => {
    try {
        const range = await Workout.aggregate([
            { $sort: { "day": -1 } },
            {
                $addFields: {
                    totalDuration: { $sum: '$exercises.duration' }
                }
            }
        ]).limit(7);

        res.status(200).json(range);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
