/**
 * Created by cuzofu on 2017/5/16.
 */
const Actions = require('./actions');
const DB = require('../../../app/db');

const {OrderedMap, fromJS} = require('immutable');

const storagePersons = nattyStorage({
    type: 'localStorage',  // 缓存方式, 默认为'localStorage'
    key: 'persons',     // !!! 唯一必选的参数, 用于内部存储 !!!
});

module.exports = Reflux.createStore({
    listenables: [Actions],

    data: {
        lastPage: false,
        keyword: '',
        currentPage: 1,
        pageSize: 6,
        persons: OrderedMap(),
    },

    onPersonInit() {
        let t = this;
        if (t.data.persons.count() == 0) {
            var ps = storagePersons.get();
            let tmpData;
            for (var person in ps) {
                if (t.data.persons.count() == 0) {
                    t.data.persons = fromJS(ps[person]);
                } else {
                    t.data.persons = t.data.persons.concat(fromJs(ps[person]));
                }

                tmpData = JSON.parse(person);
            }
            t.data.currentPage = tmpData ? tmpData.page + 1 : 1;
        }

        if (t.data.persons.count() == 0) {
            this.onEngFetch({
                page: 1,
                downOrUp: 'down',
            });
        }

        t.updateComponent();

    },

    onPersonFetch(params, cb) {
        let t = this;

        if (params.downOrUp == 'down') {
            t.data.lastPage = false;
            t.data.currentPage = 1;
            params.page = t.data.currentPage;

            storagePersons.remove();
            storagePersons.destroy();
        } else {
            params.page = t.data.currentPage;
        }

        DB.person.get(params).then(
            function (content) {
                if (params.downOrUp == 'down') {
                    if (content.length < t.data.pageSize) {
                        t.data.lastPage = true;
                    }

                    t.data.persons = fromJS(content);

                } else {
                    if (content.length > 0) {
                        console.log(t.data.persons.count());
                        if (t.data.persons.count() == 0) {
                            t.data.persons = fromJS(content);
                        } else {
                            t.data.persons = t.data.persons.concat(fromJS(content));
                        }

                        console.log(t.data.persons);
                        //如果请求后数据数量小于pageSize则设置为最后一页
                        if (content.length < t.data.pageSize) {
                            t.data.lastPage = true;
                        }
                    } else {
                        t.data.lastPage = true;
                    }

                    t.data.currentPage = t.data.currentPage + 1;
                }

                t.updateComponent();
            },

            function (error) {
                Toast.hide(function () {
                    alert('错误提示: ' + error.message);
                });
            }
        );

        if (cb && typeof cb === 'function') {
            cb();
        }
    },

    updateComponent: function () {

        this.trigger(this.data);
    },

    getInitialState: function () {
        return this.data;
    }
});
