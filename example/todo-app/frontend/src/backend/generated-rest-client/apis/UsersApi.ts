/* tslint:disable */
/* eslint-disable */
/**
 * ToDo REST API
 * サービス開発ハンズオンで作成するToDoアプリのREST API。
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    InlineObject2,
    InlineObject2FromJSON,
    InlineObject2ToJSON,
    InlineObject3,
    InlineObject3FromJSON,
    InlineObject3ToJSON,
    InlineResponse200,
    InlineResponse200FromJSON,
    InlineResponse200ToJSON,
} from '../models';

export interface LoginRequest {
    inlineObject3: InlineObject3;
}

export interface SignupRequest {
    inlineObject2: InlineObject2;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * HTTPヘッダに設定するためのCSRFトークンを取得する。 
     * CSRFトークンの取得
     */
    async getCsrfTokenRaw(): Promise<runtime.ApiResponse<InlineResponse200>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/csrf_token`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse200FromJSON(jsonValue));
    }

    /**
     * HTTPヘッダに設定するためのCSRFトークンを取得する。 
     * CSRFトークンの取得
     */
    async getCsrfToken(): Promise<InlineResponse200> {
        const response = await this.getCsrfTokenRaw();
        return await response.value();
    }

    /**
     * ユーザー情報で認証を行い、認証に成功した場合はログインする。 一部のREST APIを利用するためには、このREST APIを利用して事前にログインしておく必要がある。 ログイン状態は、ログアウトするREST APIを呼び出すか、一定時間が経過するまで継続する。 
     * ログイン
     */
    async loginRaw(requestParameters: LoginRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.inlineObject3 === null || requestParameters.inlineObject3 === undefined) {
            throw new runtime.RequiredError('inlineObject3','Required parameter requestParameters.inlineObject3 was null or undefined when calling login.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InlineObject3ToJSON(requestParameters.inlineObject3),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * ユーザー情報で認証を行い、認証に成功した場合はログインする。 一部のREST APIを利用するためには、このREST APIを利用して事前にログインしておく必要がある。 ログイン状態は、ログアウトするREST APIを呼び出すか、一定時間が経過するまで継続する。 
     * ログイン
     */
    async login(requestParameters: LoginRequest): Promise<void> {
        await this.loginRaw(requestParameters);
    }

    /**
     * ログイン中である場合、ログアウトする。 
     * ログアウト
     */
    async logoutRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/logout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * ログイン中である場合、ログアウトする。 
     * ログアウト
     */
    async logout(): Promise<void> {
        await this.logoutRaw();
    }

    /**
     * ToDoアプリを利用するのに必要となるユーザーアカウントを登録する。 **ユーザー名**は識別できるように一意である必要がある。 
     * アカウントの登録
     */
    async signupRaw(requestParameters: SignupRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.inlineObject2 === null || requestParameters.inlineObject2 === undefined) {
            throw new runtime.RequiredError('inlineObject2','Required parameter requestParameters.inlineObject2 was null or undefined when calling signup.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/signup`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InlineObject2ToJSON(requestParameters.inlineObject2),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * ToDoアプリを利用するのに必要となるユーザーアカウントを登録する。 **ユーザー名**は識別できるように一意である必要がある。 
     * アカウントの登録
     */
    async signup(requestParameters: SignupRequest): Promise<void> {
        await this.signupRaw(requestParameters);
    }

}
