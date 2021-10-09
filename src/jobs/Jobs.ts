import {Database} from './Database';
import {Email} from './Email';
interface RequiredJobs {
    runDatabaseJobs():any
}
export class Jobs{
    static runRequiredJobs() {
        // Database.runDatabaseJobs();
        // Email.runEmailJobs();
    }
}
