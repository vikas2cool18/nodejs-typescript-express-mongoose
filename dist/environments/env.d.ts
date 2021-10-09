export interface Environment {
    db_url: string;
    jwt_secret: string;
}
export declare function getEnvironmentVariables(): Environment;
