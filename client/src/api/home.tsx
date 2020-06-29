import request from './index';
import { SliderData, LessonData } from '@/typings';
// get<SliderData, SliderData> 因为已经被拦截器处理过了，所以可以写成一样的
export function getSliders() {
    return request.get<SliderData, SliderData>(`/slider/list`);
}
/**
 * @param category 要获取哪个分类下面的课程列表 all是全部 react vue
 * @param offset 从哪个索引开始获取
 * @param limit  限定要返回的条目数
 */
export function getLessons<T>(
    category: string = 'all',
    offset: number,
    limit: number
) {
    return request.get<T, T>(
        `/lesson/list?category=${category}&offset=${offset}&limit=${limit}`);
}

export function getLesson<T>(id: string) {
    return request.get<T, T>(`/lesson/${id}`);
}