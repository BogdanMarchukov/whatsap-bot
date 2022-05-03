export default () => ({
  db: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'mysecretpassword',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    entities: ['dist/**/*.entity.js'],
    migrationsTableName: 'migration',
    migrations: ['dist/migrations/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    autoLoadEntities: true,
  },
});
