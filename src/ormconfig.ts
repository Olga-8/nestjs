import { DataSource } from "typeorm"

const ormconfig = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "1234",
    database: "np",
    synchronize: false,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
})

export default ormconfig