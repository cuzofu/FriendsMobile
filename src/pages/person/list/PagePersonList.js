/**
 * Created by chenliang on 2017-05-15.
 */
require('./PagePersonList.styl')

import iScroll from "iscroll/build/iscroll-probe";
import ReactIScroll from 'reactjs-iscroll';

const reactMixin = require('react-mixin');
const Actions = require('./actions');
const Store = require('./stores');

const {NavBar, Group, Head, List, SearchBar} = SaltUI;

class PagePersonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: window.innerHeight,
            navBar: {
                className: '',
                title: '朋友',
                rightText: '更多',
                isShow: true
            },
            options: {
                click: this.iScrollClick(),
                mouseWheel: true, // 是否支持鼠标滚轮
                scrollbars: true, // 是否显示滚动条
                probeType: 2, // 滚动的节奏
                bounceTime: 450, // 滚动动画持续的时间，默认为600
                bounceEasing: 'quadratic', // 动画算法
                fadeScrollbars: true, // 是否使用滚动 fade 效果
                interactiveScrollbars: true // 滚动条是否可以被拖拽
            },
            keyword: '',
            persons: {},
        };
    }

    componentWillMount() {
        Actions.personInit();
    }

    iScrollClick() {
        if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
        if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
        if (/Silk/i.test(navigator.userAgent)) return false;
        if (/Android/i.test(navigator.userAgent)) {
            var s = navigator.userAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3);
            return parseFloat(s[0] + s[3]) < 44 ? false : true
        }
    }

    handleOnLeftClick() {
        location.hash = 'home';
    }

    handleOnRightClick() {
        salt.router.goBack();
    }

    handleCloseViewClick() {
        location.hash = 'home';
    }

    handleTextChange(param) {
    }

    handleClick() {
    }

    handleClickImg() {
    }

    handleDelete() {
    }

    onSearch(keyword) {
        this.setState({
            keyword,
        });
    }

    onSearchEnter() {
    }

    onSearchExit() {
    }

    handleRefresh() {
    }

    render() {
        let t = this;
        // let navBar = this.state.navBar;
        return (
            <div className="page-person-list">
                {/*                <NavBar className={navBar.className} title={navBar.title} rightText={navBar.rightText}
                 isShow={navBar.isShow} onLeftClick={this.handleOnLeftClick.bind(t)}
                 onRightClick={this.handleOnRightClick.bind(t)}
                 closeViewClick={this.handleCloseViewClick.bind(t)}>
                 </NavBar>*/}
                <div>
                    <SearchBar onSearch={this.onSearch.bind(this)} hasHistory={true}
                               onEnter={this.onSearchEnter.bind(this)} onExit={this.onSearchExit.bind(this)} className="tBC0">
                        <Group>
                            <Group.Head>查询结果</Group.Head>

                            <ReactIScroll options={this.state.options} iScroll={iScroll} pullUp={false} pullDown={false}
                                          ref="iScroll">
                            </ReactIScroll>

                        </Group>
                    </SearchBar>
                    <ReactIScroll options={this.state.options} iScroll={iScroll} ref="iScroll"
                                  handleRefresh={this.handleRefresh.bind(this)} className="engScroll react-i-scroll">
                        <Group>
                            {/*<Group.Head>记录列表</Group.Head>*/}
                            <Group.List>
                                <List
                                    layout="left"
                                    hasRightIcon={true}
                                    iconName="angle-right"
                                    iconWidth={20}
                                    isDelete={true}
                                    onClick={this.handleClick.bind(this)}
                                    clickPhoto={this.handleClickImg.bind(this)}
                                    onDelete={this.handleDelete.bind(this)}
                                    // demoTitle="左图右文有箭头icon"
                                    data={[{
                                        imgUrl: "src/images/default-female.png",
                                        text: "前端开发工程师",
                                        title: "马慧（穆心）"
                                    }, {
                                        imgUrl: "src/images/周姮.jpg",
                                        text: "资深交互设计师",
                                        title: "周姮"
                                    }, {
                                        imgUrl: "src/images/default-male.png",
                                        text: "交互设计师",
                                        title: "陈亮",
                                        date: "1985-03-09"
                                    }]}/>
                            </Group.List>
                            {this.state.lastPage &&
                            <Group.Head><p style={{textAlign:'center',height:'30px'}}>已经到底了</p></Group.Head>}
                        </Group>
                    </ReactIScroll>
                </div>
{/*                <div>
                    <List
                        layout="left"
                        hasRightIcon={true}
                        iconName="angle-right"
                        iconWidth={20}
                        isDelete={true}
                        onClick={this.handleClick.bind(this)}
                        clickPhoto={this.handleClickImg.bind(this)}
                        onDelete={this.handleDelete.bind(this)}
                        demoTitle="左图右文有箭头icon"
                        data={[{
                            imgUrl: "src/images/default-female.png",
                            text: "前端开发工程师",
                            title: "马慧（穆心）"
                        }, {
                            imgUrl: "src/images/周姮.jpg",
                            text: "资深交互设计师",
                            title: "周姮"
                        }, {
                            imgUrl: "src/images/default-male.png",
                            text: "交互设计师",
                            title: "陈亮",
                            date: "1985-03-09"
                        }]}/>
                </div>*/}
            </div>
        );
    }
}

Page.contextTypes = {
    router: React.PropTypes.object.isRequired
};
reactMixin.onClass(Page, Reflux.connect(Store));

module.exports = PagePersonList;
