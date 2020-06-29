import * as actionTypes from '@/store/action-types';
import { validate } from '@/api/profile';
import { push } from 'connected-react-router';
import { RegisterPayload, LoginPayload } from '@/typings/profile';
import { message } from 'antd';
import { register, login } from '@/api/profile';
import { RegisterData, LoginData } from '@/typings/response';
export default {
    validate() {
        return {
            type: actionTypes.VALIDATE,
            payload: validate()// validate()返回的是一个promise,中间件promise会进行处理，得到结果之后再次派发该动作
        }
    },
    logout() {
        // thunk中间件可以派发函数
        return function (dispatch: any) {
            sessionStorage.removeItem('access_token');
            dispatch(push('/login'));
        }
    },
    register(values: RegisterPayload) {
        return function (dispatch: any, getState: any) {
            (async function () {
                try {
                    //AxiosResponse data才是响应体, 正常我们应该通过result.data.success获取，但是我们可以在拦截器中拦截做一层处理
                    let result: RegisterData = await register<RegisterData>(values);
                    if (result.success) {
                        dispatch(push('/login'));
                    } else {
                        message.error('注册失败');
                    }
                } catch (error) {
                    message.error('注册失败');
                }
            })();
        }
    },
    login(values: LoginPayload) {
        return function (dispatch: any, getState: any) {
            (async function () {
                try {
                    //AxiosResponse data才是响应体
                    let result: LoginData = await login<LoginData>(values);
                    if (result.success) {
                        sessionStorage.setItem('access_token', result.data);// 写token
                        dispatch(push('/profile'));
                    } else {
                        message.error('登录失败');
                    }
                } catch (error) {
                    message.error('登录失败');
                }
            })();
        }
    },
    setAvatar(avatarUrl: string) {
        return {
            type: actionTypes.SET_AVATAR,
            payload: avatarUrl
        }
    }
}
/**
 * JWT如何退出登录
 * 只要客户端把本地的token删除了，再发的时候就没有
 */