import repoActions from "../../src/actions/repo_actions";
import ACTION_TYPES from "../../src/constants/action_types";
import * as sinon from "sinon";
import { expect } from "chai";

describe("Repo Actions", () => {

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Should be possible to add a repo", (done) => {

    // let dispatchMock = (action: any) => { /* DO NOTHING */ };
        let dispatchMock = () =>  { /* DO NOTHING */ };

        let dispatchMockSpy = sinon.spy(dispatchMock, "dispatch");

        let dispatchableAddRepoAsync = repoActions.addRepoAsync();

        dispatchableAddRepoAsync(dispatchMockSpy);

        setTimeout(() => {
            expect(dispatchMockSpy.getCall(0).args[0].type).eql(ACTION_TYPES.ADD_REPO_BEGIN);
            expect(dispatchMockSpy.getCall(1).args[0].type).eql(ACTION_TYPES.ADD_REPO_SUCCESS);
            done();
        }, 100);

    });

});
