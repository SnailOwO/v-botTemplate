exports.install = function (Vue, options) {
    Vue.prototype.validateDate = function (dateTime) {
        let date_regex = /((19|20)[0-9]{2})-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) ([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/;
        let res = date_regex.test(dateTime);
        if (res) {
            let ymd = dateTime.match(/(\d{4})-(\d+)-(\d+).*/);
            let year = parseInt(ymd[1]);
            let month = parseInt(ymd[2]);
            let day = parseInt(ymd[3]);
            if (day > 28) {
                //获取当月的最后一天
                let lastDay = new Date(year, month, 0).getDate();
                return (lastDay >= day);
            }
            return true;
        }
        return false;
    };

    // 迭代生成menu 
    Vue.prototype.initCate = function (cate, pid) {
        let tree_ary = [];
        let len = cate.length;
        for (let i = 0; i < len; i++) {
            if (cate[i]['pid'] == pid) {
                let obj = {
                    id: cate[i]['id'],
                    title: this.$t('common.menu.' + cate[i]['name']),
                    expand: true,
                    level: cate[i]['level']
                };
                obj.children = this.initCate(cate, cate[i]['id']);
                tree_ary.push(obj);
            }
        }
        return tree_ary;
    }
};
