import React, { PropsWithChildren, useEffect } from 'react';
import './index.less';
import { Carousel } from 'antd';
import { Slider } from '@/typings';
type Props = PropsWithChildren<{
    sliders: Slider[],
    getSliders: () => void;
}>

function HomeSliders(props: Props) {
    useEffect(() => {
        // 说明是第一次加载， 在这之前仓库里的sliders还是空的
        if (props.sliders.length === 0) {
            // 调用props.getSliders() 就相当于调用 dispatch({type: actionTypes.GET_SLIDERS, payload: getSliders()})
            // dispatch 一个action，返回的结果就是这个action
            // (connect方法中的bindActionCreator处理过了)
            // redux-promise发现action.payload是一个promise就会调用action.payload.then()方法返回一个promise, 之后等待这个promise处理完成, 然后在then方法内部再次dispatch({type: actionTypes.GET_SLIDERS, payload: 拿到的result})
            let result = props.getSliders();// 返回的是一个promise
            console.log('HomeSliders', result);
        }
    }, []);
    return (
        <Carousel effect="scrollx" autoplay draggable={false} touchMove={false}>
            {
                props.sliders.map((item: Slider, index: number) => (
                    <div key={item.id}>
                        <img src={item.url} />
                    </div>
                ))
            }
        </Carousel>
    )
}
export default HomeSliders;

