import { connectionSource } from "../../config/typeorm";
import { Task } from "../../models/Task.entity";
import { setLog } from "../../common/logger.helper";
import { Category } from "../../models/Category.entity";

export const seedTasks = async () => {
    const taskRepo = connectionSource.getRepository(Task);
    const categoryRepo = connectionSource.getRepository(Category);

    const studyCategory = await categoryRepo.findOne({ where: { name: "Study" } });

    if (!studyCategory) {
        setLog({
            level: "error",
            method: "seedTasks",
            message: "'Study' category not found. Skipping task seeding.",
        });
        return;
    }

    const tasks = [
        { title: "Review Sorting Algorithm", description: "Understand mergeSort", categoryId: studyCategory.id },
        { title: "Explain the problem out loud", description: "Improve problem-solving and communication skills", categoryId: studyCategory.id },
        { title: "Time Drills", description: "Stick to 5 mins/easy, 10 mins/medium, and 15 mins/hard problems", categoryId: studyCategory.id },
    ];

    const existingTasks = await taskRepo.find({
        where: tasks.map((task) => ({ title: task.title })),
    });

    if (existingTasks.length > 0) {
        setLog({
            level: "info",
            method: "seedTasks",
            message: "Tasks already exist. Skipping task seeding.",
        });
        return;
    }

    const taskEntities = tasks.map((task) => {
        const newTask = new Task();
        Object.assign(newTask, task);
        return newTask;
    });

    await taskRepo.save(taskEntities);
    setLog({
        level: "info",
        method: "seedTasks",
        message: "Tasks seeded successfully!",
    });
};
