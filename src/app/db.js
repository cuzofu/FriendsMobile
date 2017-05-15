// See https://github.com/Jias/natty-fetch for more details.

const {API_URL, MOCK_URL, APP_URL} = require(`./../config/${ENV}.json`);

// const context = salt.fetch.context({
const context = nattyFetch.context({
    mockUrlPrefix: MOCK_URL,
    urlPrefix: API_URL,
    mock: true,
    // jsonp: true,
    withCredentials: false,
    postDataFormat: 'JSON',
    traditional: true,
    data: {
        page: "1", // 表示请求页码的参数名称
        size: "10", // 表示请求行数的参数名称
        sort: "firstName,DESC", // 表示用于排序的列名的参数名称 例  coding,DESC
    },
    timeout: 5000,
    fit: function (response) {
        console.log(response);
        let ret = {
            success: response.success
        };
        if (ret.success) {
            ret.content = response.data;
        } else {
            ret.error = {
                message: response.msg
            }
        }
        return ret;
    }
});

context.create('SomeModuleAPI', {
    getSomeInfo: {
        mockUrl: 'query/getSomeInfo.json',
        url: 'query/getSomeInfo.json'
    },

    'person.get': {
        method: 'GET',
        mock: false,
        url: 'person'
    },

    'person.save': {
        method: 'POST',
        mock: false,
        postDataFormat: 'JSON',
        url: 'person',
        fit: function (response) {

            let ret = {
                success: response.success
            };
            if (ret.success) {
                ret.content = response;
            } else {
                ret.error = {
                    message: response.msg
                }
            }
            return ret;
        }
    },

    'person.firstname': {
        method: 'GET',
        mock: false,
        url: 'person/findByFirstName',
        fit: function (response) {

            let ret = {
                success: response.success
            };
            if (ret.success) {
                ret.content = response;
            } else {
                ret.error = {
                    message: response.msg
                }
            }
            return ret;
        }
    }

});

module.exports = context.api;
