import { config } from "dotenv"
import { Apps } from "../src/index";
import { resolve } from "path"

config({ path: resolve(__dirname, "../.env") })

describe('Apps', () => {

    it('should list apps', async (done) => {

        try {

            // Change to your authoring key
            const authoringKey = process.env.LUIS_AUTHORING_KEY;
            const authoringEndpoint = process.env.LUIS_AUTHORING_ENDPOINT;

            const apps = new Apps();

            const results = await apps.list(authoringKey,authoringEndpoint);

            expect(results).not.toBe(undefined);

            done();

        } catch (err) {
            done(err)
        }
    });
});