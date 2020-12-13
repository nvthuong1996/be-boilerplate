export class BasicAuthorizer {
    private _request: any;
    private _enforcer: any;

    constructor(req, enforcer) {
        this._request = req;
        this._enforcer = enforcer;
    }

    getUserRole() {
        const { user } = this._request;
        return user?.role || 'any';
    }

    checkPermission(userRole) {
        const { originalUrl: path, method } = this._request;
        return this._enforcer.enforce(userRole, path, method);
    }
}
