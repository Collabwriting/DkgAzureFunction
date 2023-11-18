export interface DkgResponse {

    UAL: string;
    publicAssertionId: string;
    operation: DkgOperation;

}

export interface DkgOperation {
    operationId: string;
    status: string;
    errorType?: string;
    errorMessage?: string;
}