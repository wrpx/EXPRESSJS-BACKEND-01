import { DataSource } from "typeorm";
import env from '../env';

const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ["src/Models/*.ts"],
  synchronize: true,
  logging: false,
});

const connectDB = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", (error as Error).message);
    process.exit(1);
  }
};

export { AppDataSource, connectDB };