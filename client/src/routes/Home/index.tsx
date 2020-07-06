import React, { PropsWithChildren, useRef, useEffect } from 'react';
import './index.less';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './components/HomeHeader';
import { CombinedState, HomeState } from '@/typings';
import mapDispatchToProps from '@/store/actions/home';
import HomeSliders from './components/HomeSliders';
import LessonList from './components/LessonList';
import { loadMore, downRefresh } from '@/utils';
import { Spin } from 'antd';
type Props = PropsWithChildren<
  RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps
>;
function Home(props: Props) {
  let homeContainer = useRef<HTMLDivElement>(null); //{current:null}=> {current:HTMLDivElement}
  useEffect(() => {
    loadMore(homeContainer.current, props.getLessons);
    downRefresh(homeContainer.current, props.refreshLessons);
    if (props.lessons.list.length > 0) {
      homeContainer.current.scrollTop = parseFloat(localStorage.getItem('homeScrollTop'));
    }
    // IMP: 当组件销毁的时候回执行这个函数
    return () => {
      localStorage.setItem('homeScrollTop', homeContainer.current.scrollTop + '');
    };
  }, []);
  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
        refreshLessons={props.refreshLessons}
      />
      <div className="refresh-loading">
        <Spin size="large" />
      </div>
      <div className="home-container" ref={homeContainer}>
        <HomeSliders sliders={props.sliders} getSliders={props.getSliders} />
        <LessonList
          container={homeContainer}
          lessons={props.lessons}
          getLessons={props.getLessons}
        />
      </div>
    </>
  );
}
const mapStateToProps = (state: CombinedState): HomeState => state.home;
export default connect(mapStateToProps, mapDispatchToProps)(Home);

/**
 * 因为此组件是由路由渲染出来的
 * 所以属性对象会包括路由属性
 * 另外此组件需要要连接仓库
 *
 */
