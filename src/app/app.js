require('./app.styl');

if (__LOCAL__ && window.chrome && window.chrome.webstore) { // This is a Chrome only hack
    // see https://github.com/livereload/livereload-extensions/issues/26
    setInterval(function() {
        document.body.focus();
    }, 200);
}

// bind fastclick
window.FastClick && FastClick.attach(document.body);

const { Router, Route, IndexRoute, Link, hashHistory } = ReactRouter;

const PageHome = require('../pages/home');
const PageDemo = require('../pages/demo');
const PagePersonList = require('../pages/person/list')

class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route name="app" path="/" component={App}>
            <IndexRoute component={PageHome}/>
            <Route path="home" component={PageHome}/>
            <Route path="demo" component={PageDemo}/>
            <Route path="person/list" component={PagePersonList}/>
        </Route>
    </Router>,
    document.getElementById('App')
);
