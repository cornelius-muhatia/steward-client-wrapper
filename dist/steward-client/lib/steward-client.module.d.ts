import { StewardConfig, ClientDetails } from './steward-client.service';
export declare class StewardClientModule {
    static forRoot(config: StewardConfig, clientDetails?: ClientDetails): {
        ngModule: typeof StewardClientModule;
        providers: ({
            provide: typeof StewardConfig;
            useValue: StewardConfig;
        } | {
            provide: typeof ClientDetails;
            useValue: ClientDetails;
        })[];
    };
}
