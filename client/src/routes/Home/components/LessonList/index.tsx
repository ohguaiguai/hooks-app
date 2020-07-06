import React, { PropsWithChildren, useEffect, forwardRef, useState } from 'react';
import './index.less';
import { Lessons, Lesson } from '@/typings';
import { Icon, Card, Button, Alert, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
type Props = PropsWithChildren<{
  lessons: Lessons;
  getLessons: () => void;
  container: any;
}>;

function LessonList(props: Props) {
  //forceUpdate是模拟类组件的forceUpdate方法。函数组件没有forceUpdate方法，我又想让组件强行刷新
  //const [_, forceUpdate] = useState(0);
  const [start, setStart] = useState(0);
  let rootFontSize = parseFloat(document.documentElement.style.fontSize); //37.5px
  useEffect(() => {
    if (props.lessons.list.length == 0) {
      props.getLessons();
    }
    props.container.current.addEventListener('scroll', () => {
      if (props.container.current) {
        //说明div已经 homeContainer 已经有了
        let scrollTop = props.container.current.scrollTop;
        //scrollTop - 轮播图的高度(4.26rem) - 全部课程的高度(1.33rem) 才能得到卷去卡片的高度
        // 然后除以一个卡片的高度(8.66667rem) 得到卷去了几个卡片
        let start = Math.floor(
          (scrollTop - (4.26 + 1.33) * rootFontSize) / (8.66667 * rootFontSize)
        );
        setStart(start);
      }
    });
  }, []);
  //let start = 0;//开始真正渲染的起始索引 从它开始向下渲染3条数据。除此以外的卡片都用空的DIV撑开发
  return (
    <section className="lesson-list">
      <h2>
        <Icon type="menu" />
        全部课程
      </h2>
      <Skeleton
        loading={props.lessons.loading && props.lessons.list.length == 0}
        active
        paragraph={{ rows: 8 }}
      >
        <div style={{ height: `${8.66667 * rootFontSize * start}px` }}></div>

        {props.lessons.list.slice(start, start + 3).map((item: Lesson, index: number) => (
          <Link key={item.id} to={{ pathname: `/detail/${item.id}`, state: item }}>
            <Card hoverable={true} style={{ width: '100%' }} cover={<img src={item.poster} />}>
              <Card.Meta title={item.title} description={`价格:¥${item.price}元`} />
            </Card>
          </Link>
        ))}

        <div
          style={{
            height: `${8.66667 * rootFontSize * (props.lessons.list.length - start - 3)}px`
          }}
        ></div>
      </Skeleton>

      {props.lessons.hasMore ? (
        <Button onClick={props.getLessons} loading={props.lessons.loading} type="primary" block>
          {props.lessons.loading ? '' : '加载更多'}
        </Button>
      ) : (
        <Alert style={{ textAlign: 'center' }} message="到底了" type="warning" />
      )}
    </section>
  );
}
export default LessonList;

/**
  {
                    props.lessons.list.map((item: Lesson, index: number) => (
                        index >= start && index <= start + 2 ? (
                            <Link key={item.id} to={{ pathname: `/detail/${item.id}`, state: item }}>
                                <Card
                                    hoverable={true}
                                    style={{ width: '100%' }}
                                    cover={<img src={item.poster} />}
                                >
                                    <Card.Meta title={item.title} description={`价格:¥${item.price}元`} />
                                </Card>
                            </Link>
                        ) : <div key={item.id} style={{ height: `${8.66667 * rootFontSize}px` }}></div>

                    ))
                }
 */
