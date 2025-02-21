import { connectionSource } from "../../config/typeorm";
import { Category } from "../../models/Category.entity";
import { setLog } from "../../common/logger.helper";

export const seedCategories = async () => {
    const categoryRepo = connectionSource.getRepository(Category);
    const categories = ["Study", "Personal", "Shopping"];

    const existingCategories = await categoryRepo.find({
        where: categories.map((name) => ({ name })),
    });

    if (existingCategories.length > 0) {
        setLog({
            level: "info",
            method: "seedCategories",
            message: "Categories already exist!",
        });
        return;
    }

    const categoryEntities = categories.map((name) => {
        const category = new Category();
        category.name = name;
        return category;
    });

    await categoryRepo.save(categoryEntities);
    setLog({
        level: "info",
        method: "seedCategories",
        message: "Categories seeded successfully!",
    });
};
