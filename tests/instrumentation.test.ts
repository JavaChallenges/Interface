import {register} from "@/instrumentation";

describe('register', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('does not import production-instrumentation in non-production environment', async () => {
        await register();
    });
});