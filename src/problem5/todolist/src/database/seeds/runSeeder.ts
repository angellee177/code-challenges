import { connectionSource } from "../../config/typeorm";
import { setLog } from "../../common/logger.helper";
import { seedCategories } from "./Categories.seed";
import { seedTasks } from "./Todo.seed";

connectionSource.initialize().then(async () => {
    try {
        setLog({
            level: "info",
            method: "runSeeder",
            message: "Starting database seeding...",
        });

        await seedCategories();
        await seedTasks();

        setLog({
            level: "info",
            method: "runSeeder",
            message: "Database seeding completed successfully!",
        });

        process.exit();
    } catch (error) {
        setLog({
            level: "error",
            method: "runSeeder",
            message: `Error during seeding`,
            error: error as Error,
        });
        process.exit(1);
    }
});
