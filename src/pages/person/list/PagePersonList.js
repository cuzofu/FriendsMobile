/**
 * Created by chenliang on 2017-05-15.
 */

const { NavBar } = SaltUI;

class PagePersonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // navBar: {
            //     className: '',
            //     title: '朋友',
            //     rightText: '更多',
            //     isShow: true
            // },
        };
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

    render() {
        let t = this;
        let navBar = this.state.navBar;
        return (
            <div>
                {/*<NavBar className={navBar.className} title={navBar.title} rightText={navBar.rightText}*/}
                        {/*isShow={navBar.isShow} onLeftClick={this.handleOnLeftClick.bind(t)}*/}
                        {/*onRightClick={this.handleOnRightClick.bind(t)}*/}
                        {/*closeViewClick={this.handleCloseViewClick.bind(t)}>*/}
                {/*</NavBar>*/}

            </div>
        );
    }
}

module.exports = PagePersonList;
